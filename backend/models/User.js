const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    // L'erreur DeprecationWarning: collection.ensureIndex is deprecated viens du unique...
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true },
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);