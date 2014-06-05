<<<<<<< HEAD
var mongoose = require('mongoose'),
    Fee = require('../model/fee'),
    Invoice = require('../model/invoice');

module.exports.addFeeToInvoice = function(req, res) {
    Invoice.findByIdAndUpdate(req.body.fee.invoiceId, {
        'feeApplied': true
    }, function(err, invoice) {
        var fee = new Fee({
            description: req.body.fee.description,
            amount: req.body.fee.amount,
            invoiceId: req.body.fee.invoiceId
        });

        fee.save(function(err) {
            if (err) return console.log(err);
            Fee.findById(fee, function(err, doc) {
                if (err) return console.log(err);
=======
var mongoose    = require('mongoose')
    , Fee       = require('../model/fee')
    , Invoice   = require('../model/invoice');

module.exports.addFeeToInvoice = function(req, res) {
    Invoice.findByIdAndUpdate(req.body.fee.invoiceId, { 'feeApplied': true }, function(err, invoice) {
        var fee = new Fee({
            description: req.body.fee.description
            , amount: req.body.fee.amount
            , invoiceId: req.body.fee.invoiceId
        });

        fee.save(function(err) {
            if(err) return console.log(err);
            Fee.findById(fee, function(err, doc) {
                if(err) return console.log(err);
>>>>>>> 3a9166cbaf0264bc0435f22fc5dae4551d8231a5
                console.log('I added the fee');
                console.log(doc);
            });
        });
    });
};