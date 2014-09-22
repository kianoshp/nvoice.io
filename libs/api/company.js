var mongoose = require('mongoose'),
    Company = require('../model/company'),
    User = require('../model/user'),
    userAPI = require('./users').userAPI,
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
            created: Date.now(),
            isClient: req.body.company.isClient
        });

        return companyObject;
    },

    createCompany: function(companyObj, userObj, parentCompanyId) {
        var self = this;
        // create company 
        companyObj.save(function(err) {
            if (err) throw new Error('Error has occured in creating a company because of ' + err.message);
            Company.findById(companyObj, function(err, doc) {
                if (err) throw new Error('Error has occured in creating a company because of ' + err.message);
                if(parentCompanyId) {
                    self.addClientToCompany(parentCompanyId, doc._id);
                }
            });
        });

        userAPI.createUser(userObj, function(err, user) {
            if (err) {
                companyObj.remove({
                    id: companyObj._id
                });
                return console.log(err);
            }

            companyAPI.companyObj.user = userObj;
        });

        companyAPI.companyObj.company = companyObj;

        return companyAPI;
    },

    readCompany: function(companyId, cb) {
        Company.findById(companyId, function(err, doc) {
            if (err) throw new Error('Error has occured in creating a company because of ' + err.message);

            cb(null, doc);
        });
    },

    updateCompany: function(companyId, companyObj, options, cb) {
        Company.findByIdAndUpdate(companyId, companyObj, options, function(err, doc) {
            if(err) {
                cb(err);
            }

            cb(null, doc);
        });
    },

    deleteCompany: function(companyId) {
        var self = this;
        console.log("companyId --> ");
        console.log(companyId);
        User.remove({
            'companyId': companyId
        }, function(err) {
            if (err) return false;
            //remove all clients
            self.getCompanyClients(companyId, function(err, clients) {
                console.log("here are the clients -->");
                console.log(clients);
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
    },

    addClientToCompany: function(companyId, clientId) {
        Company.update({
            _id: companyId
        }, {
            $push: {
                client: clientId
            }
        }, {
            upsert: true
        }, function(err, data) {
            if (err) console.log(err);
            return data;
        });
    },

    getCompanyClients: function(companyId, cb) {
        Company.find({
            _id: companyId
        }, 'client', function(err, data) {
            if (err) return cb(err);

            var clientIdArr = data[0].client;
            Company.find({
                _id: {
                    $in: clientIdArr
                }
            }, function(err, companies) {
                if (err) return cb(err);
        
                cb(null, companies);
            });
        });
    },

    searchClients: function(companyId, searchExp, cb) {
        Company.find({
            _id: companyId
        }, 'client', function(err, data) {
            if (err) throw new Error(err);

            var clientIdArr = data[0].client;
            var regEx = new RegExp(searchExp, 'i');
            Company.find({
                _id: {
                    $in: clientIdArr
                },
                companyName: regEx
            }, function(err, companies) {
                if (err) cb(err);

                cb(null, companies);
            });
        });
    }
};

module.exports.CompanySchema = Company;
module.exports.UserSchema = User;
module.exports.companyAPI = companyAPI;