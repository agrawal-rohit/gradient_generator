const passport = require('passport');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local');

const User = require('../models/user');
const config = require('../config');

var jwtOptions = {
  secretOrKey: config.secret,
  jwtFromRequest: ExtractJwt.fromHeader('authorization')
}

var jwtStrategy = new JwtStrategy(jwtOptions, function (payload, done){
  User.findById(payload.sub, function(err, user){
    if(err) { return done(err, false) }
    if(user) {
      done(null, user);         // Success
    }
    else {
      done(null, false);        // User doesn't exist
    }
  });
});


var localOptions = {
  usernameField: 'username'
};

var localStrategy = new LocalStrategy(localOptions, function(username, password, done){
  //Verify the username and password
  User.findOne({username: username}, function(err, user){
    if (err) {return done(err)}
    if (!user) {return done(null, false)}             // No user
    user.comparePassword(password, function(err,isMatch){
      if (err) { return done(err)}
      if (!isMatch) {return done(null, false)}        // Wrong Password
      return done(null,user);                         // User present
    });
  });
});

passport.use(jwtStrategy);
passport.use(localStrategy);
