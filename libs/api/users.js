var mongoose = require('mongoose'),
    Company = require('../model/company'),
    companyAPI = require("./company").companyAPI,
    User = require('../model/user');

var userAPI = {
    createUserObject: function(req, companyId) {
        var userObject = new User({
            firstName: req.body.user.firstName,
            middleInitial: req.body.user.middleInitial,
            lastName: req.body.user.lastName,
            password: req.body.user.password,
            companyId: companyId,
            mainContact: req.body.user.mainContact,
            email: req.body.user.email,
            phone: req.body.user.phone,
            role: req.body.user.role,
            lastModified: Date.now(),
            lastLoggedIn: null
        });

        return userObject;        
    },

    createUser: function(userObj, cb) {
        userObj.save(function(err) {
            if (err) {
                console.log(err);
                return cb(err);
            }
            User.findById(userObj, function(err, thisUser) {
                if (err) {
                    console.log(err);
                    return cb(err);
                } 
                thisUser.comparePassword(thisUser.password, function(err, isMatch) {
                    if (err) {
                        console.log(err)
                        return cb(err);
                    }

                    console.log(thisUser.password + ': ' + isMatch);
                });
                cb(null, userObj);
            });
        });
    },

    readUser: function(userId, cb) {
        User.findById(userId, function(err, thisUser) {
            if(err) {
                return cb(err);
            }

            cb(null, thisUser);
        });
    }, 

    updateUser: function(userId, userObj, options, cb) {
        User.findByIdAndUpdate(userId, userObj, options, function(err, doc) {
            if(err) {
                return cb(err);
            }

            return cb(null, doc);
        });
    },

    deleteUser: function(userId) {
        this.readUser(userId, function(err, thisUser) {
            if(err) {
                return false;
            }

            if(thisUser.mainContact) {
                companyAPI.deleteCompany(thisUser.companyId);
            } else {
                User.remove({
                    _id: userId
                }, function(err, doc) {
                    if(err) {
                        return false;
                    }

                    return true;
                });
            }
        })
    },

    searchUsers: function(companyId, searchExp) {
        var regEx = new RegExp(searchExp, 'i');

        return User
            .find({
                'companyId': companyId
            })
            .or([{
                'firstName': regEx
            }, {
                'lastName': regEx
            }])
            .sort('lastName');        
    }
};

module.exports.userAPI = userAPI;