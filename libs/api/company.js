<<<<<<< HEAD
var mongoose = require('mongoose'),
    Company = require('../model/company'),
    User = require('../model/user');
=======
var mongoose    = require('mongoose')
    , Company   = require('../model/company')
    , User      = require('../model/user');
>>>>>>> 3a9166cbaf0264bc0435f22fc5dae4551d8231a5

module.exports.createCompany = function(req, res) {
    console.log("I am going to create a new entry in the DB");

<<<<<<< HEAD
    var thisCompany = new Company({
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
=======
    thisCompany = new Company({
        companyName: req.body.company.companyName
        , address: {
            address1: req.body.company.address.address1
            , address2: req.body.company.address.address2
            , city: req.body.company.address.city
            , state: req.body.company.address.state
            , country: req.body.company.address.country
            , zip: req.body.company.address.zip    
        }
        , phone: req.body.company.phone
        , email: req.body.company.email
        , created: Date.now()
>>>>>>> 3a9166cbaf0264bc0435f22fc5dae4551d8231a5
    });
    // console.log('the new company is --> ');
    // console.log(thisCompany);
    //TODO handle the error process more gracefully and 
    //don't let the process continue.
    thisCompany.save(function(err) {
<<<<<<< HEAD
        if (err) return console.log(err);
        Company.findById(thisCompany, function(err, doc) {
            if (err) return console.log(err);
=======
        if(err) return console.log(err);
        Company.findById(thisCompany, function(err, doc) {
            if(err) return console.log(err);
>>>>>>> 3a9166cbaf0264bc0435f22fc5dae4551d8231a5
            // console.log('I added the new company');
            // console.log(doc);
        });

    });

<<<<<<< HEAD
    var user = new User({
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
=======
    user = new User({
        firstName: req.body.user.firstName
        , middleInitial: req.body.user.middleInitial
        , lastName: req.body.user.lastName
        , password: req.body.user.password
        , companyId: thisCompany._id
        , mainContact: true
        , email: req.body.user.email
        , phone: req.body.user.phone
        , role: req.body.user.role
        , lastLoggedIn: Date.now()
>>>>>>> 3a9166cbaf0264bc0435f22fc5dae4551d8231a5
    });

    user.save(function(err) {
        console.log('I am about to save a user');
<<<<<<< HEAD
        if (err) {
            thisCompany.remove({
                id: thisCompany._id
            });
            return console.log(err);
        }
        User.findById(user, function(err, thisUser) {
            if (err) return console.log(err);
=======
        if(err) {
            thisCompany.remove( { id: thisCompany._id } );
            return console.log(err);
        }
        User.findById(user, function(err, thisUser) {
            if(err) return console.log(err);
>>>>>>> 3a9166cbaf0264bc0435f22fc5dae4551d8231a5
            thisUser.comparePassword(thisUser.password, function(err, isMatch) {
                if (err) return console.log(err);

                console.log(thisUser.password + ': ' + isMatch);
            });
            console.log('I added the new user');
            console.log(thisUser);
        });
    });

    return thisCompany;
};

module.exports.CompanySchema = Company;
module.exports.UserSchema = User;
