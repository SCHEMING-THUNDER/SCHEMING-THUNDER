var db = require('./db/db');
var util = require('./db/utils');

var bluebird = require('bluebird'); //promise library, will have to think more about it
var helpers = require('./helpers.js');
var bcrypt = require('bcrypt-nodejs');


module.exports = {
  login: {
    get: function(req, res){

    },
    post: function(req, res){
      // Expects req.body to have a username string and password string
      var username = req.body.username;
      var password = req.body.password;
      util.findUserByName(username, function(err, user){
        bcyrpt.compare(password, user.password, function(err, match){
          if (match) {
            // util.createSession(req, res, user);
            res.redirect('/explore');
          } else {
            res.redirect('/login');
          }
        });
      });
    }
  },

  signup: {
    get: function(req, res){

    },
    post: function(req, res){
      // Expects req.body to have a username string and password string
      var username = req.body.username;
      var password = req.body.password;
      util.doesUserExist(req.body.username, function(err, exists){
        if (exists) {
          res.redirect( 303 ,'/signup');
        } else {
          bcrypt.hash(password, null, null, function(err, hash){
            util.addUser(req.body.username, hash, function(err, user){
              // user should be user object
              res.redirect('/explore');
            });
          });
        }
      });
    }
  },

  explore: {
    get: function (req, res) {
      util.getAllRecipes(function(err,results) {
        if (err) {
          console.log("error retrieving:", err);
        } else {
          console.log("retrieval results:", results);
          res.json(results);
        } 
      });
    },
    post: function (req, res) {
      util.findUser("Bob", "Saget", function (err, user) {
        if(user){
          util.addRecipeToUserFavorites(user, req.body, function(err, recipeEntry){
            res.sendStatus(201);
          });
        } else {
          console.log('User Doesn\'t exist');
        }
      });
    }  
  },
            
  list: {
    get: function (req, res) {
      util.findUser('Bob','Saget',function(err, user){
        if(user){
          util.getUserFavorites(user, function(err, listOfFaves){
            if(listOfFaves){
              res.json(listOfFaves);
            } else {
              console.log('no list of favorites');
            }
          })
        }
      });   
    },
    post: function (req, res) {
      // never happens, not applicable;
    }
  }

}
