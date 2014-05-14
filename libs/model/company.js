var mongoose = require('mongoose'),
    db = require('./db');

var CompanySchema = new db.Schema({
    companyName: {
        type: String,
        required: true
    },
    address: {
        address1: {
            type: String,
            required: true
        },
        address2: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: String,
        zip: {
            type: String,
            required: true
        }
    },
    client: [{
        type: db.Schema.ObjectId
    }],
    phone: {
        type: String,
        required: true
    },
    fax: String,
    cell: String,
    email: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('company', CompanySchema);