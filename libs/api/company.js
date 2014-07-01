var mongoose = require('mongoose'),
    Company = require('../model/company'),
    User = require('../model/user'),
    client = require('./client'),
    _ = require('lodash');

var companyAPI = {
    companyObj: {
        company: {},
        user: {}
    },

    createCompanyObject: function(req) {
        var companyObject = new Company({
            companyName: req.body.company.companyName,
            address: {
                address1: req.body.company.address.address1,
                address2: req.body.company.address.address2,
                city: req.body.company.address.city,
                state: req.body.company.address.state,
                country: req.body.company.address.country,
                zip: req.body.company.address.zip
            },
            phone: req.body.company.phone,
            email: req.body.company.email,
            created: Date.now()
        });

        return companyObject;
    },

    createUserObject: function(req, thisCompany) {
        var userObject = new User({
            firstName: req.body.user.firstName,
            middleInitial: req.body.user.middleInitial,
            lastName: req.body.user.lastName,
            password: req.body.user.password,
            companyId: thisCompany._id,
            mainContact: true,
            email: req.body.user.email,
            phone: req.body.user.phone,
            role: req.body.user.role,
            lastLoggedIn: Date.now()
        });

        return userObject;
    },

    createCompany: function(companyObj, userObj) {
        // create company 
        companyObj.save(function(err) {
            if (err) throw new Error('Error has occured in creating a company because of ' + err.message);
            Company.findById(companyObj, function(err, doc) {
                if (err) throw new Error('Error has occured in creating a company because of ' + err.message);
            });
        });

        userObj.save(function(err) {
            if (err) {
                companyObj.remove({
                    id: companyObj._id
                });
                return console.log(err);
            }
            User.findById(userObj, function(err, thisUser) {
                if (err) return console.log(err);
                thisUser.comparePassword(thisUser.password, function(err, isMatch) {
                    if (err) return console.log(err);
                });
            });
        });
        companyAPI.companyObj.company = companyObj;
        companyAPI.companyObj.user = userObj;

        return companyAPI;
    },

    readCompany: function(companyId, cb) {
        Company.findById(companyId, function(err, doc) {
            if (err) throw new Error('Error has occured in creating a company because of ' + err.message);

            cb(null, doc);
        });
    },

    updateCompany: function(companyObj, companyId) {

    },

    deleteCompany: function(companyId) {
        User.remove({
            'companyId': companyId
        }, function(err) {
            if (err) return false;
            //remove all clients
            client.getClients(companyId, function(err, clients) {

                if (clients && clients.length > 0) {
                    var ids = _.pluck(clients, '_id');
                    User.remove({
                        companyId: {
                            $in: ids
                        }
                    }, function(err, data) {
                        Company.remove(clients, function(err, clients) {
                            //remove the company
                            Company.remove({
                                _id: companyId
                            }, function(err) {
                                if (err) return false;

                                return true;
                            });
                        });
                    });
                } else {
                    Company.remove({
                        _id: companyId
                    }, function(err) {
                        if (err) return false;

                        return true;
                    });

                }
            });
        });

        return true;

    }
};

module.exports.CompanySchema = Company;
module.exports.UserSchema = User;
module.exports.companyAPI = companyAPI;