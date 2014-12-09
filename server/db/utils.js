/**
* @fileOverview General Database Helpers.
* @author Arthur Chan
* @version 0.0.1
*/

var db = require('./db');
//**********************************************
// General Database Helpers
//**********************************************

/**
* @function addListOfRecipes
* @param {Array} arrayOfRecipes
* @param {Function} [callback]
* callback receives three arrays: errors, entries, createdBools
*/
var addListOfRecipes = function(arrayOfRecipes, callback){
  var errLog = [];
  var listSaved = [];
  var createdBoolList = [];

  var recurse = function(index){
    var curr = arrayOfRecipes[index];

    db.Recipe.findOrCreate({where: {recipeName: curr.recipeName,
      totalTimeInSeconds: curr.totalTimeInSeconds,
      smallImageUrls: curr.smallImageUrls[0] || '',

      // Defaults to 0 if not available
      salty: curr.flavors ? curr.flavors.salty : 0,
      sour: curr.flavors ? curr.flavors.sour : 0,
      sweet: curr.flavors ? curr.flavors.sweet : 0,
      bitter: curr.flavors ? curr.flavors.bitter : 0,
      meaty: curr.flavors ? curr.flavors.meaty : 0,
      piquant: curr.flavors ? curr.flavors.piquant : 0,

      // Small arrays stored as strings w/ , delimiter
      course: curr.attributes.course ? curr.attributes.course.join(',') : '',
      cuisine: curr.attributes.cuisine ? curr.attributes.cuisine.join(',') : ''
    }})
    .complete(function(err, entry, createdBool){
      
      errLog.push(err);
      listSaved.push(entry);
      createdBoolList.push(createdBool);

        var recurseIngredients = function(i){
            // Save ingredients of recipe
            db.Ingredient.findOrCreate({where: {name: curr.ingredients[i]}})
            .complete(function(err, ingred){
                ingred[0].addRecipes(entry)
                .complete(function(){
                    if(i > 0){
                        recurseIngredients(i-1);
                    } else if (index > 0){
                        recurse(index-1);
                    } else {
                      if (callback) {
                        callback(errLog,listSaved,createdBoolList);
                      }
                    }
                });
            });
        }
        recurseIngredients(curr.ingredients.length-1);
    });
  }
  recurse(arrayOfRecipes.length - 1);
}

/**
* @function getAllRecipes
* @param {Function} callback
* Invokes callback(err, recipeList)
* <br>recipeList will be an array of recipe objects
* <ul>
*   Recipe Object:
*   <li> id </li>
*   <li> recipeName </li>
*   <li> totalTimeInSeconds </li>
*   <li> Ingredients </li>
*   <li> smallImageUrls </li>
*   <li> flavors </li>
*   <li> attributes </li>
* </ul>
*/
var getAllRecipes = function(callback){
    var results =[];
    db.Recipe.findAll({include: [db.Ingredient]}).complete(function(err,result){
        var results = [];
        console.log("resultofgetAll", result);
        for(var k=0; k<result.length; k++){
            var temp = {};
            temp.recipeName = result[k].dataValues.recipeName;
            temp.smallImageUrls = result[k].dataValues.smallImageUrls;
            temp.totalTimeInSeconds = result[k].dataValues.totalTimeInSeconds;
            temp.id = result[k].dataValues.id;

            // Grab the FLAVORS!
            temp.flavors = {};
            temp.flavors.salty = result[k].dataValues.salty;
            temp.flavors.sour = result[k].dataValues.sour;
            temp.flavors.sweet = result[k].dataValues.sweet;
            temp.flavors.bitter = result[k].dataValues.bitter;
            temp.flavors.meaty = result[k].dataValues.meaty;
            temp.flavors.piquant = result[k].dataValues.piquant;

            // Grab & format the attributes {course, cuisine}
            temp.attributes = {};
            temp.attributes.course = result[k].dataValues.course.split(',');
            temp.attributes.cuisine = result[k].dataValues.cuisine.split(',');

            temp.Ingredients = [];
            var ingreds = result[k].dataValues.Ingredients;
            for(var i=0,length=ingreds.length; i<length; i++){
                temp.Ingredients.push(ingreds[i].dataValues.name);
            }
            results.push(temp);
        }
        callback(err, results);
    });
}

/**
* @function findUser and authenticateUser
* @param {String} username
* @param {String} password
* @param {Function} callback
* callback receives error and user <br> user will be false if no user is found
*/
var authenticateUser;
var findUser = authenticateUser = function(username, password, callback){
  db.User.find({where: {username: username, password: password}})
  .complete(function(err, result){
    console.log("user search result", result);
    if (result === null) {
      callback(err, false);
    } else {
     callback(err, result.dataValues);
    }
  });
}

/**
* @function findUserByName
* @param {String} username
* @param {Function} callback
* callback receives error and user <br> user will be false if no user is found
*/
var findUserByName = function(username, callback){
  db.User.find({where: {username: username}})
  .complete(function(err, result){
    if (result === null) {
      callback(err, false);
    } else {
      callback(err, result.dataValues);
    }
  });
}

/**
* @function doesUserExist
* @param {String} username
* @param {Function} callback
* callback receives error and a boolean
*/
var doesUserExist = function(username, callback){
  db.User.find({where: {username: username}})
  .complete(function(err, result){
    if (result === null) {
      callback(err, false);
    } else {
      callback(err, true);
    }
  });
}

/**
* @function addUser
* @param {String} username
* @param {String} password
* @param {Function} [callback]
* callback receives error object and user object
*/
var addUser = function(username, password, callback){
  console.log("we are adding a user");
  db.User.create({
    username: username,
    password: password
  }).complete(function(err, user){
    db.Favorite.create().complete(function(err, fav){
      fav.setUser(user).complete(function(err, results){
        if(callback){
          callback(err, user.dataValues);
        }
      });
    });
  });
}

//**********************************************
// User favorites list helpers
//**********************************************

/**
* @function getUserFavorites
* @param {Object} user
* @param {Function} callback
* callback receives errors and an array of recipe objects
*/
var getUserFavorites = function(user, callback){
  db.Favorite.find({where: {UserId: user.id}})
  .complete(function(err,fav){
//    console.log(fav);
    fav.getRecipes().complete(function(err,recipes){
      // Format results
      if (recipes) {
        var results = [];
        var start = recipes.length-1;
        var recurse = function(index){
          results[index] = recipes[index].dataValues;

          // Grab the FLAVORS! & Formatting to expected output
          results[index].flavors = {};
          results[index].flavors.salty = results[index].salty;
          results[index].flavors.sour = results[index].sour;
          results[index].flavors.sweet = results[index].sweet;
          results[index].flavors.bitter = results[index].bitter;
          results[index].flavors.meaty = results[index].meaty;
          results[index].flavors.piquant = results[index].piquant;
          delete results[index].salty;
          delete results[index].sour;
          delete results[index].sweet;
          delete results[index].bitter;
          delete results[index].meaty;
          delete results[index].piquant;

          // Grab & format the attributes {course, cuisine}
          results[index].attributes = {};
          results[index].attributes.course = results[index].course.split(',');
          results[index].attributes.cuisine = results[index].cuisine.split(',');

          results[index].ingredients = [];
          recipes[index].getIngredients().complete(function(err, ingreds){
            for(var i=0; i<ingreds.length; i++){
              results[index].ingredients.push(ingreds[i].dataValues.name);
            }
            if(index > 0) recurse(index-1);
            else callback(err, results);
          });
        }
        if (start > 0) recurse(start);
        else callback(err, recipes);
      } else {
        callback(err, recipes);
      }
    });
  });
}

/**
* @function addRecipeToUserFavorites
* @param {Object} user
* @param {Object} recipe
* @param {Function} [callback]
* callback receives error and newRecipeEntry arguments
*/
var addRecipeToUserFavorites = function(user, recipe, callback){
  db.Favorite.find({where: {UserId: user.id}})
  //db.User.find({where:{username: usId}})
  .complete(function(err,fav){
   // console.log("fav", fav);
    db.FavoritesRecipes.find({where: {FavoriteId: fav.dataValues.id, RecipeId: recipe.id}})
    .complete(function(err, found){
      if (found && callback) {
        callback(err, fav.dataValues)
      } else {
        db.Recipe.find({where: {recipeName: recipe.recipeName}})
        .complete(function(err, recipeEntry){
          fav.addRecipe(recipeEntry).complete(function(err,results){
            if(callback){
              callback(err, results.dataValues);
            }
          });
        });  
      }
    });
  }); 
}

/**
* @function removeRecipeFromUserFavorites
* @param {Object} user
* @param {Object} recipe
* @param {Function} callback
* callback receives error and the removed recipe entry
*/
var removeRecipeFromUserFavorites = function(user, recipe, callback){
 db.Favorite.find({where: {UserId: user.id}})
 .complete(function(err,fav){
   db.Recipe.find({where: {id: recipe.id}})
   .complete(function(err,recipeEntry){
     fav.removeRecipe(recipeEntry).complete(function(err, removed){
       if(callback){
         callback(err, removed);
       }
     });
   });
 }); 
}

exports.addListOfRecipes = addListOfRecipes;
exports.getAllRecipes = getAllRecipes;
exports.findUser = findUser;
exports.authenticateUser = authenticateUser;
exports.findUserByName = findUserByName;
exports.doesUserExist = doesUserExist;
exports.addUser = addUser;
exports.getUserFavorites = getUserFavorites;
exports.addRecipeToUserFavorites = addRecipeToUserFavorites;
exports.removeRecipeFromUserFavorites = removeRecipeFromUserFavorites;
