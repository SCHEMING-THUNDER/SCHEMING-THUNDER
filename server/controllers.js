var db = require('./db/dbNaive');
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
      db.Recipe.findAll({limit: 7})
        .complete(function(err, results){
          if (err) {
            console.log("error retrieving:", err);
          } else {
            console.log("retrieval results:", results);
            res.json(results);
          }
        });
      helpers.populateDb();
      db.User.findOrCreate({where:{username: "fakeUser"}});
      // helpers.getRecipes(res);         
      //res.json("Hello from Thunder");
    },
    post: function (req, res) {
      console.log(req);
      db.User.find({where: {username: "fakeUser"}}).
        complete(function(err,user){
          if (err) {
            console.log("userSearchError");
          } else {
            user.addRecipe({
              id: req.body.id,
              imageUrlsBySize: escapeHtml(req.body.imageUrlsBySize),
              sourceDisplayName: req.body.sourceDisplayName,
              ingredients: JSON.stringify(req.body.ingredients),
              smallImageUrls: req.body.smallImageUrls,
              recipeName: req.body.recipeName,
              totalTimeInSeconds: req.body.totalTimeInSeconds,
              attrib: escapeHtml(req.body.attrib),
              flavors: JSON.stringify(req.body.flavors),
              rating: req.body.rating
            })
              .complete(function(err, results){
                console.log("resPost", results);
                res.sendStatus(201);
              });
          }
        });
  //    helpers.addToLongList(req.body);
  //    console.log("list", helpers.longList);
  //    res.sendStatus(201);

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
      db.User.find({where: {username: "fakeUser"}}).
        complete(function(err,user){
          if (err) {
            console.log("userSearchErrorList");
          } else {
            user.getRecipes()
              .complete(function(err, favorites){
                console.log("favorites", favorites);
                res.json(favorites);
              });
          }
        });
      // res.json(helpers.longList);
    },
    post: function (req, res) {
      // never happens, not applicable;
    },
    todelete: function (req, res) { // The user wants to delete a recipe
      // delete the recipe from the longlist, then serve the longlist;
      db.User.find({where: {username: "fakeUser"}}).
        complete(function(err,user){
          if (err) {
            console.log("userSearchErrorDel");
          } else {
            user.destroyRecipe({where: {id: req.body.id}})
              .complete(function(err, results){
                if (err) {
                  console.log("error", err);
                } else {
                  console.log("deleteResults", results);
                }
                res.sendStatus(201);
              });
          }
        });
      // res.json(helpers.longList); - might not need it but call get from the client instead;
    }
  }
};
