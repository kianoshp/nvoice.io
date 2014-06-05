var mongoose = require('mongoose'),
    thisCompany = require('./company'),
    db = require('./db'),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10,
    SALT_SEED_LENGTH = 20;

var UserSchema = new db.Schema({
    firstName: {
        type: String,
        required: true
    },
    middleInitial: String,
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    companyId: db.Schema.ObjectId,
    email: {
        type: String,
        index: {
            unique: true
        },
        required: true
    },
    mainContact: {
        type: Boolean,
        default: false
    },
    phone: String,
    cell: String,
    role: {
        type: String,
        enum: ['administrator', 'client', 'invoiceCreator'],
        default: 'client'
    },
    lastLoggedIn: {
        type: Date,
        default: Date.now
    }
});


UserSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();

    var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR, SALT_SEED_LENGTH);

    user.password = bcrypt.hashSync(user.password, salt);

    next();
});

UserSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
};

module.exports = mongoose.model('user', UserSchema);
