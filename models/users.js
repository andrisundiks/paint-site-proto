const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];

// Schema maps to a collection
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: 'String',
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: 'String',
        required: true,
        trim: true,
    },
});

// Encrypt password before save using pre hook
userSchema.pre('save', function(next) {
    const user = this;
    if(!user.isModified || !user.isNew) { // don't rehash if old user
        next();
    } else {
        bcrypt.hash(user.password, stage.saltingRounds, function(err, hash) {
            if(err) {
                console.log('Error hashing password for user');
                next(err);
            } else {
                user.password = hash;
                next();
            }
        });
    }
});

module.exports = mongoose.model('User', userSchema);
