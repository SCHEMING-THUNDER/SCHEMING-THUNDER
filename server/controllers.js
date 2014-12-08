var db = require('./db/db');
var util = require('./db/utils');
var bluebird = require('bluebird'); //promise library, will have to think more about it
var helpers = require('./helpers.js')


module.exports = {
  /*'/': {
    get: function (req, res) {
      res.redirect('/explore');
    },
    post: function (req, res) {

    }
  }, */
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
      helpers.getRecipes(util.addListOfRecipes);
      util.findUser("fakeUser", "fakePass", function (err, results) {
          
          util.addUser("fakeUser", "fakePass", function (err, results) {
            if (err) {
              console.log("error adding user", err);
            }
          })
  
      });
    },
    post: function (req, res) {
      db.User.find({where: {username: "fakeUser"}}).
        complete(function(err,user) {
          if (err) {
            console.log("userSearchErrorList");
          } else {
            db.Recipe.find({where: {recipeName: req.body.recipeName}}).
              complete(function(err, recipeEntry) {
                if (err) {
                  console.log("recipeNotFound");
                } else {
                  console.log("recipeEntry", recipeEntry);
                  util.addRecipeToUserFavorites(user, recipeEntry, function (err, results) {
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
      // helpers.addToLongList(req.body);
      // console.log("list", helpers.longList);
      //This means the user decided whether he likes the dish or not;
      // if he likes it, add the dish to the longlist object.
      // save the information to the "join" table of the database;
      // do the same thing that you did with the get request;
      // alternatively, create the "longlist object" at the client side;      
  

  list: {
    get: function (req, res) { // This means the user wants to see the longlist;
      // serve the longlist object for this session;
      db.User.find({where: {username: "fakeUser"}}).
        complete(function(err,user) {
          if (err) {
            console.log("userSearchErrorListOnGet");
          } else {
       //     console.log("userGetList", user);
            util.getUserFavorites(user, function(err, recipes) {
              if (err) {
                console.log("Error retrieving favorites", err);
              } else {
                console.log("Userfavorites", recipes);
                res.json(recipes);
              }  
            });
          }
        });    
    },
    post: function (req, res) {
      // never happens, not applicable;
    },
    todelete: function (req, res) { // The user wants to delete a recipe
      // delete the recipe from the longlist, then serve the longlist;
      util.removeRecipeFromUserFavorites("fakeUser", req.body.id, function(err) {
        if (err) {
          console.log("deletion error,", err);
        }
      })
      // helpers.deleteFromLongList(req.body);
      // res.json(helpers.longList); - might not need it but call get from the client instead;
    }
  }
}
