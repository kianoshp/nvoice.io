var mongoose = require('mongoose'),
    Company = require('../model/company');

module.exports.addClientToCompany = function(companyId, clientId) {
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

        console.log(data);
    });
};

module.exports.getClients = function(req, res) {
    Company.find({
        _id: req.query.companyId
    }, 'client', function(err, data) {
        if (err) throw new Error(err);

        var clientIdArr = data[0].client;
        console.log('clientIdArr is --> ');
        console.log(clientIdArr);
        Company.find({
            _id: {
                $in: clientIdArr
            }
        }, function(err, companies) {
            if (err) throw new Error(err);

            res.json(companies);
        });
    });
};

module.exports.searchClients = function(req, res) {
    Company.find({
        _id: req.query.companyId
    }, 'client', function(err, data) {
        if (err) throw new Error(err);

        var clientIdArr = data[0].client;
        var regEx = new RegExp(req.query.searchExp, 'i');
        Company.find({
            _id: {
                $in: clientIdArr
            },
            companyName: regEx
        }, function(err, companies) {
            if (err) throw new Error(err);

            res.json(companies);
        });
    });
};