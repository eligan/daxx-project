const mongoose = require('mongoose');
const config = require('config');

const { Schema } = mongoose;
const regExpList = config.get('regExpList');

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        match: new RegExp(regExpList.email),
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        maxlength: 25,
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 25,
    },
    city: {
        type: String,
        maxlength: 25,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
});

UserSchema.index({ email: 1 });
UserSchema.index({ firstName: 1 });
UserSchema.index({ lastName: 1 });
UserSchema.index({ city: 1 });

module.exports = mongoose.model('User', UserSchema);
