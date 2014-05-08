var mongoose    = require('mongoose')
    , Company   = require('../model/company')
    , User      = require('../model/user');

module.exports.post = function(company) {
    user = new User({
        firstName: "Magdalene"
        , middleInitial: "L"
        , lastName: "Pourian"
        , username: "mlp042007"
        , companyId: company._id
        , email: "magdalene@gmail.com"
        , phone: 5088264781
        , role: "invoiceCreator"
        , lastLoggedIn: Date.now()
    });

    user.save(function(err) {
        if(err) return console.log(err);
        console.log('user is --> ');
        console.log(this);
        User.findById(user, function(err, thisUser) {
            if(err) return console.log(err);
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
        .find( { 'companyId': companyId } )
        .or( [ { 'firstName': regEx }, { 'lastName': regEx } ])
        .sort( 'lastName' );
};

module.exports.editUser = function(req, res) {
    User.findOne( { _id: req.body.user.id }, function(err, user) {
        if(err) return console.log(err);

        console.log('user is --> ');
        console.log(user);
        for (var field in User.schema.paths) {
            console.log('field is --> ');
            console.log(field);
            if( ( field !== '_id' ) && ( field !== '__v' ) ) {
                if(req.body.user[field] !== undefined) {
                    user[field] = req.body.user[field];
                }
            }
        }
        user.save(function(err) {
            if(err) return console.log(err);
            res.writeHead(200, { 'Content-Type' : 'application/json' });
            res.end();
        });

    });
};

module.exports.getUsers = function(req, res) {
    return User.find({companyId: req.query.companyId});
};
