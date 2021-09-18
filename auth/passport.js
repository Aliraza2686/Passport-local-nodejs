const LocalStrategy = require('passport-local').Strategy
const User = require('../models/userModel')
const bcrypt = require('bcrypt')

module.exports = function(passport) {
   passport.use( new LocalStrategy({ usernameField : 'email'}, async(email, password, done) => {
       const user = await User.findOne({email : email})
       if(!user) {
           return done(null, false, { message : "No user found with this email"})
       }else {
           const isMatch = await bcrypt.compare(password, user.password)
           if(!isMatch) {
               return done(null, false, {message : "invalid password"})
           }else {
               done(null, user)
           }
       }
   }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => {
        done(null, user)
    })
    })
}