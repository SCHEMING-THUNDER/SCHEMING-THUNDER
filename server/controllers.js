var db = require('./db/db');
var util = require('./db/utils');
var bluebird = require('bluebird'); //promise library, will have to think more about it
var helpers = require('./helpers.js')


module.exports = {
  explore: {
    get: function (req, res) { //the user wants to get a stack of cards with pictures of various dishes
      //Step 1): get recipes from the db;
      util.getAllRecipes(function(err,results) {
        if (err) {
          console.log("error retrieving:", err);
        } else {
          console.log("retrieval results:", results);
          res.json(results);
        } 
      });
      //Step 2): populate db with new recipes;
      helpers.getRecipes(util.addListOfRecipes);
      //Step 3): temporary. Since we do not have a sign-up page, add at least one 
      //fake user to the database.
      util.findUser("fakeUser", "fakePass", function (err, results) {
          
          util.addUser("fakeUser", "fakePass", function (err, results) {
            if (err) {
              console.log("error adding user", err);
            }
          })
  
      });
    },
    post: function (req, res) { //the user shortlisted a card with a dish by doing the "right swipe"
      db.User.find({where: {username: "fakeUser"}}). //find the user to use as an argument to the helper function
        complete(function(err,user) {
          if (err) {
            console.log("userSearchErrorList");
          } else {
            db.Recipe.find({where: {recipeName: req.body.recipeName}}). //find the recipe to use as an argument to the helper function
              complete(function(err, recipeEntry) {
                if (err) {
                  console.log("recipeNotFound");
                } else {
                  console.log("recipeEntry", recipeEntry);
                  util.addRecipeToUserFavorites(user, recipeEntry, function (err, results) { //add the recipe to the join table of user's favorite foods
                  if (err) {
                    console.log("Error when adding to favs:", err);
                  }
                  res.sendStatus(201);      
                  });  
                }
              })            
          }
        });
    }    
  },
            
  list: {
    get: function (req, res) { // This means the user wants to see the list of his favorite dishes;
      db.User.find({where: {username: "fakeUser"}}). //find the user to use as an argument to the helper function
        complete(function(err,user) {
          if (err) {
            console.log("userSearchErrorListOnGet");
          } else {
       //     console.log("userGetList", user);
            util.getUserFavorites(user, function(err, recipes) { //get all the favorites for this user
              if (err) {
                console.log("Error retrieving favorites", err);
              } else {
                console.log("Userfavorites", recipes);
                res.json(recipes); //send the array of recipes to the client
              }  
            });
          }
        });    
    },
    post: function (req, res) {
      // never happens, not applicable;
    },
    todelete: function (req, res) { // The user wants to delete a recipe
      db.User.find({where: {username: "fakeUser"}}). //find the user to use as an argument to the helper function
        complete(function(err,user) {
          if (err) {
            console.log("userSearchErrorDelete");
          } else {
            db.Recipe.find({where: {recipeName: req.body.recipeName}}). //find the recipe to use as an argument to the helper function
              complete(function(err, recipeEntry) {
                if (err) {
                  console.log("recipeNotFound");
                } else {
                  console.log("recipeEntry", recipeEntry);
                  util.removeRecipeFromUserFavorites(user, recipeEntry, function (err) { //delete the recipe
                  if (err) {
                    console.log("Deletion error:", err);
                  }
                  res.sendStatus(200);      
                  });  
                }
              })            
          }
        });
    }
  }
}
