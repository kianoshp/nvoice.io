var mongoose 	= require('mongoose')
	, Invoice 	= require('../model/invoice');

module.exports.createInvoice = function(req, res) {
	Invoice.find( { 'companyId': req.body.invoice.companyId } ).sort( { 'createdOn': -1 } ).limit( 1 ).execFind(function(err, invoice) {
		var lastInvoice = invoice[0];
		req.body.invoice.invoiceNumber = invoice[0] ? invoice[0].invoiceNumber + 1 : 1000;
		thisInvoice = new Invoice({
		  title: req.body.invoice.title
		  , description: req.body.invoice.description
		  , clientId: req.body.invoice.clientId
		  , companyId: req.body.invoice.companyId
		  , poNumber: req.body.invoice.poNumber
		  , status: req.body.invoice.status
		  , invoiceNumber: req.body.invoice.invoiceNumber
		});

		thisInvoice.save(function(err) {
			if(err) return console.log(err);
			Invoice.findById(thisInvoice, function(err, doc) {
				if(err) return console.log(err);
				console.log('I added the new invoice');
				console.log(doc);
			});
		});
	});
};