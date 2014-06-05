var mongoose = require('mongoose'),
    db = require('./db');

var TaxSchema = db.Schema({
<<<<<<< HEAD
    state: {
        type: String,
        required: true
    },
    amount: Number,
    inventoryId: db.Schema.ObjectId
=======
    state: { type: String, required: true }
    , amount: Number
    , inventoryId: db.Schema.ObjectId
>>>>>>> 3a9166cbaf0264bc0435f22fc5dae4551d8231a5
});

module.exports = mongoose.model('tax', TaxSchema);