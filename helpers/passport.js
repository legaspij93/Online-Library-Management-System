const LocalStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")
const crypto = require("crypto")

const User = require("../models/user")

module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField: "username"}, (username, password, done)=>{
            User.findOne({username:username})
                .then(user =>{
                    if(!user){
                        return done(null, false, {message: "That username does not exist"})
                    }

                    if(crypto.createHash("md5").update(password).digest("hex") == user.password){
                        return done(null, user)
                    }
                    else{
                        return done(null, false, {message: "Incorrect password"})
                    }
                })
                .catch(err => console.log(err))
        })
    )

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
}