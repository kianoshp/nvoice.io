var mongoose = require('mongoose'),
    db = require('./db');

var FeeSchema = db.Schema({
    description: {
        type: String,
        required: true
    },
    amount: Number,
    invoiceId: db.Schema.ObjectId
});

module.exports = mongoose.model('fee', FeeSchema);