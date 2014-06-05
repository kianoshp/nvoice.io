var mongoose = require('mongoose'),
    db = require('./db');

var InvoiceSchema = new db.Schema({
    title: String,
    description: String,
    clientId: db.Schema.ObjectId,
    companyId: db.Schema.ObjectId,
    poNumber: Number,
    invoiceNumber: {
        type: Number,
        default: 1000
    },
    taxApplied: {
        type: Boolean,
        default: false
    },
    feeApplied: {
        type: Boolean,
        default: false
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['presented', 'entered', 'hold', 'paid', 'partially paid', 'reversed', 'void'],
        required: true
    }
});

module.exports = mongoose.model('invoice', InvoiceSchema);
