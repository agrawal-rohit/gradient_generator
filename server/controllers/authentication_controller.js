const User = require('../models/user');
const jwt = require('jwt-simple'); //For tokens and its encryption
const config = require('../config');

function tokenForUser(user){
  var timeStamp = new Date().getTime();
  return jwt.encode({
    sub: user._id,           // Subject
    iat: timeStamp,         // Time of registration
  }, config.secret);        // Secret key for encryption
}


exports.signin = function (req,res,next) {
  var user = req.user;
  res.send({token: tokenForUser(user), user_id: user._id, email: user.email});
}


exports.signup = function (req, res, next) {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  if(!email || !password || !username){
    return res.status(422).json({'error': "You must provide an email and password!"});
  }

  //Check if user already exists, send error if they do
  User.findOne({email: email}, function(err, existingUser){
    if (err) { return next(err) }         // Random error
    if (existingUser) {                   // Check if user exists
      return res.status(422).json({'error': "Email Taken"});
    }
    var user = new User({                 // New user registration
      username: username,
      email: email,
      password: password
    });
    user.save(function(err){
      if (err) {
        return next(err)
      }
      res.json({user_id: user._id, token: tokenForUser(user)});
    });
  });
}
