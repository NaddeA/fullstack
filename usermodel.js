const mongoose = require('mongoose');
const mongooseLocalPassport = require('passport-local-mongoose');

//here we create a schema for the user and password, we can add more stuff if we want
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

//managing the password and username adds methods to schema so it supports reg and hashing pass.
userSchema.plugin(mongooseLocalPassport);
//creare a model for the schema
module.exports = mongoose.model('User', userSchema);
