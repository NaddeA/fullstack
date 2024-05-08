
//We import using require instead of the CommonJS module(easier to use in my opinion)
const passport = require('passport');
// Imports Local Strategy from the passport-local package. 
//This is used for username and password login.
const LocalStrategy = require('passport-local').Strategy;
//import the file userModal.js
const userCred = require('./usermodel'); 
//uses an instance of LocalStrategy to authenticate users.
passport.use(new LocalStrategy(userCred.authenticate()));
passport.serializeUser(userCred.serializeUser());
passport.deserializeUser(userCred.deserializeUser());

//exports the passport object so it can be used in our app.js file.
module.exports = passport;