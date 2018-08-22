var router = require('express').Router();
const User = require('../models/user');
const Gradient = require('../models/gradient');
const passportService = require('./passport');
const passport = require('passport');
const AuthenticationController = require('../controllers/authentication_controller')
var spawn = require("child_process").spawn;

var requireAuth = passport.authenticate('jwt', {session: false});
var requireLogin = passport.authenticate('local', {session: false});

function protected(req,res,next){
  res.send("Success");
}

function showData(req, res){
  Gradient.find({}, function (err, gradients){
    res.json(gradients);
  });
}

function addGradient(req, res, next){
  var name = req.body.name;
  var creator_name = req.body.creator_name;
  var color1 = req.body.color1;
  var color2 = req.body.color2;

  //Check if user already exists, send error if they do
  Gradient.findOne({name: name}, function(err, existingGradient){
    if (err) { return next(err) }         // Random error
    if (existingGradient) {                   // Check if gradient exists
      return res.status(422).json({'error': "Gradient with same name already exists"});
    }
    var gradient = new Gradient({                 // New gradient addition
      name: name,
      creator_name: creator_name,
      color1: color1,
      color2: color2,
      upvotes: 0,
      upvotedBy: []
    });
    gradient.save(function(err){
      if (err) {
        return next(err)
      }
      res.json({name: gradient.name, creator_name: creator_name});
    });
  });
}

function upvoteHandler(req, res, next){
  var currentUpvotes;
  var currentUpvotesList = [];
  Gradient.findOne({name: req.body.name}, function(err, existingGradient){
    if (err) { return next(err) }
    currentUpvotes = existingGradient.upvotes;
    currentUpvotesList = existingGradient.upvotedBy;
    if(currentUpvotesList.includes(req.body.user_id)){
      return res.status(422).json({'error': "You have already upvoted it!"});
    }
    else{
      currentUpvotesList.push(req.body.user_id)
      Gradient.update({name: req.body.name}, {upvotes: currentUpvotes + 1, upvotedBy: currentUpvotesList}, function(err, affected, resp){
        if (err) { return next(err) }
        res.json(existingGradient);
      });
    }
  });

}

router.route('/').get(function (req,res,next){
  res.send('Server Running!')
});
router.route('/allgradients').get(showData);
router.route('/protected').get(requireAuth,protected);

// Auth Routes
router.route('/signup').post(AuthenticationController.signup);
router.route('/signin').post(requireLogin, AuthenticationController.signin);

router.route('/addgradient').post(addGradient);
router.route('/upvote').post(upvoteHandler);

module.exports = router;
