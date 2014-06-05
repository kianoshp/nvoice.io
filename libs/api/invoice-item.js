var mongoose = require('mongoose'),
    InvoiceItem = require('../model/invoice-item');

module.exports.addInvoiceItem = function(req, res) {
    thisInvoiceItem = new InvoiceItem({
        invoiceId: req.body.invoiceItem.invoiceId,
        description: req.body.invoiceItem.description,
        qty: req.body.invoiceItem.qty,
        rate: req.body.invoiceItem.rate
    });

    thisInvoiceItem.save(function(err) {
        if (err) return console.log(err);
        InvoiceItem.findById(thisInvoiceItem, function(err, doc) {
            if (err) return console.log(err);
            console.log('I added the new invoice item');
            console.log(doc);
        });
    });

};