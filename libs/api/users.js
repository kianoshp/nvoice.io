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

    deleteUser: function(userId, cb) {
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
                        cb(err);
                    }

                    cb(null, doc);
                });
            }
        })
    }
}



module.exports.post = function(company) {
    user = new User({
        firstName: "Magdalene",
        middleInitial: "L",
        lastName: "Pourian",
        username: "mlp042007",
        companyId: company._id,
        email: "magdalene@gmail.com",
        phone: 5088264781,
        role: "invoiceCreator",
        lastLoggedIn: Date.now()
    });

    user.save(function(err) {
        if (err) return console.log(err);
        console.log('user is --> ');
        console.log(this);
        User.findById(user, function(err, thisUser) {
            if (err) return console.log(err);
            console.log('thisUser --> ');
            console.log(thisUser);
            thisUser.comparePassword(thisUser.password, function(err, isMatch) {
                if (err) return console.log(err);

                console.log(thisUser.password + ': ' + isMatch);
            });
            console.log('I added the new user');
            console.log(thisUser);
        });
    });

};

module.exports.searchUsers = function(companyId, searchExp) {
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
};

module.exports.editUser = function(req, res) {
    User.findOne({
        _id: req.body.user.id
    }, function(err, user) {
        if (err) return console.log(err);

        console.log('user is --> ');
        console.log(user);
        for (var field in User.schema.paths) {
            console.log('field is --> ');
            console.log(field);
            if ((field !== '_id') && (field !== '__v')) {
                if (req.body.user[field] !== undefined) {
                    user[field] = req.body.user[field];
                }
            }
        }
        user.save(function(err) {
            if (err) return console.log(err);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end();
        });

    });
};

module.exports.getUsers = function(req, res) {
    return User.find({
        companyId: req.query.companyId
    });
};

module.exports.userAPI = userAPI;