var mongoose = require('mongoose'),
    db = require('./db');

var FeeSchema = db.Schema({
<<<<<<< HEAD
    description: {
        type: String,
        required: true
    },
    amount: Number,
    invoiceId: db.Schema.ObjectId
=======
    description: { type: String, required: true }
    , amount: Number
    , invoiceId: db.Schema.ObjectId
>>>>>>> 3a9166cbaf0264bc0435f22fc5dae4551d8231a5
});

module.exports = mongoose.model('fee', FeeSchema);