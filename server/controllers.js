`1var db = require('./db/db');
var util = require('./db/utils');
var bluebird = require('bluebird'); //promise library
var helpers = require('./helpers.js')


module.exports = {
 /* start: {  //can be uncommented and used for initialization if the client users local storage
    get: function(req, res) { //initialization (if the user does not send a request to explore
                              // because local storage is not empty)
    util.findUser("fakeUser", "fakePass", function (err, results) { 
          util.addUser("fakeUser", "fakePass", function (err, results) {
            if (err) {
              console.log("error adding user", err);
            }
          });
          helpers.getRecipes(util.addListOfRecipes);               
      });
    },
    post: function(req, res) {
       // never happens, not applicable;
    }
  },*/

  explore: {
    get: function (req, res) { //the user wants to get a stack of cards with pictures of various dishes
      
      // Step 1): initialization and population of the database (if it is empty)
      util.findUser("fakeUser", "fakePass", function (err, results) {  //if there are no users in the database, we add a user;
          util.addUser("fakeUser", "fakePass", function (err, results) {
            if (err) {
              console.log("error adding user", err);
            }
          });
          helpers.getRecipes(util.addListOfRecipes); //if there are no users in the Users database, this means
                                                     //that the Recipes database is empty too, so we populate it;
                                                     //the number of dishes fetched from the external API can be changed in the helpers file          
      });
  

      //Step 2): getting recipes from the db and sending them to the client;
      util.getAllRecipes(function(err,results) {
        if (err) {
          console.log("error retrieving:", err);
        } else {
          console.log("retrieval results:", results);
          res.json(results);
        } 
      });
    },

    post: function (req, res) { //the user shortlisted a card with a dish by doing the "right swipe"
      db.User.find({where: {username: "fakeUser"}}). //find the user to use as an argument to the helper function
        complete(function(err,user) {
          if (err) {
            console.log("userSearchErrorList");
          } else {
            console.log("userPost", user);
            db.Recipe.find({where: {recipeName: req.body.recipeName}}). //find the recipe to use as an argument to the helper function
              complete(function(err, recipeEntry) {
                if (err) {
                  console.log("recipeNotFound");
                } else {
                  console.log("recipeEntry", recipeEntry);
                  util.addRecipeToUserFavorites(user.dataValues, recipeEntry, function (err, results) { //add the recipe to the join table of user's favorite foods
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
           console.log("userGetList", user);
            util.getUserFavorites(user.dataValues, function(err, recipes) { //get all the favorites for this user
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
    /*todelete: function (req, res) { // The user wants to delete a recipe
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
    }*/
  }
}
