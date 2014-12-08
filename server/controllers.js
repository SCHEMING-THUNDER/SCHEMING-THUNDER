var db = require('./db/db');
var util = require('./');
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
    get: function (req, res) {   //This means the user wants to get a new picture;
    // have to send an api request to Yummly;
    //   if Yummly responds with an error, send a request to our database
    //     when receive the response (from Yummly/database):
    //        1) parse the response
    //        2) serve the picture to the user as the response;
    //        3) save the dish to the dishes table in the database;
      /*db.Recipe.findAll()
        .complete(function(err, results){
          // optional mapping step
          res.json(results)
        });*/
      // helpers.getRecipes(res);         
      //res.json("Hello from Thunder");
      util.getAllRecipes(function(err,results) {
        if (err) {
          console.log("error retrieving:", err);
        } else {
          console.log("retrieval results:", results);
          res.json(results);
        } 
      });
      helpers.getRecipes(util.addListOfRecipes);
      util.addUser("fakeUser", "fakePass", function (err) {
        console.log("error when adding user");
      });
    },
    post: function (req, res) {
      util.findUser("fakeUser", "fakePass", function (err,user) {
        if (err) {
          console.log("user not found")
        } else {
          
        }
      })
      util.addRecipeToUserFavorites = function(user, recipe, callback)
      helpers.addToLongList(req.body);
      console.log("list", helpers.longList);
      res.sendStatus(201);

      //This means the user decided whether he likes the dish or not;
      // if he likes it, add the dish to the longlist object.
      // save the information to the "join" table of the database;
      // do the same thing that you did with the get request;
      // alternatively, create the "longlist object" at the client side;      
    }
  },

  list: {
    get: function (req, res) { // This means the user wants to see the longlist;
      // serve the longlist object for this session;
      res.json(helpers.longList);
    },
    post: function (req, res) {
      // never happens, not applicable;
    },
    todelete: function (req, res) { // The user wants to delete a recipe
      // delete the recipe from the longlist, then serve the longlist;
      helpers.deleteFromLongList(req.body);
      // res.json(helpers.longList); - might not need it but call get from the client instead;
    }
  }
};
