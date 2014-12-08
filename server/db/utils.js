var db = require('./db');
//**********************************************
// General Database Helpers
//**********************************************

// adds a list of recipes to the db, will not duplicate
// if ingredient of recipe does not exist in db, put it in
// build relationships
var addListOfRecipes = function(arrayOfRecipes, callback){
  var errLog = [];
  var listSaved = [];
  var createdBoolList = [];

  var recurse = function(index){
    var curr = arrayOfRecipes[index];

    db.Recipe.findOrCreate({where: {recipeName: curr.recipeName, totalTimeInSeconds: curr.totalTimeInSeconds, smallImageUrls: curr.smallImageUrls[0]}})
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
                        callback(errLog,listSaved,createdBoolList);
                    }
                });
            });
        }
        recurseIngredients(curr.ingredients.length-1);
    });
  }
  recurse(arrayOfRecipes.length - 1);
}

// Input: callback
// Output: invoke callback(err, recipeList)
// recipeList will be an array of recipe objects
var getAllRecipes = function(callback){
    var results =[];
    db.Recipe.findAll({include: [db.Ingredient]}).complete(function(err,result){
        var results = [];
        for(var k=0; k<result.length; k++){
            var temp = {};
            temp.recipeName = result[k].dataValues.recipeName;
            temp.totalTimeInSeconds = result[k].dataValues.totalTimeInSeconds;
            temp.id = result[k].dataValues.id;
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

// Input: username, password, and REQUIRED callback 
// Output: invoke callback(err, user)
// user will be an object with user data
var findUser = function(username, password, callback){
  db.User.find({where: {username: username, password: password}})
  .complete(function(err, result){
    if (result === null) {
      callback(err, result);
    } else {
      callback(err, result.dataValues);
    }
  });
}

// Input: username, password, and optional callback
// Ouput: If callback provided, invoke callback(err, user)
// user will be an object with user data
var addUser = function(username, password, callback){
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

// Input: user object, and a required callback
// Output: invokes callback(err, results)
// results will be an array of recipe objects
var getUserFavorites = function(user, callback){
  db.Favorite.find({where: {UserId: user.id}})
  .complete(function(err,fav){
    console.log(fav);
    fav.getRecipes().complete(function(err,recipes){
      // Format results
      if (recipes) {
        var results = [];
        var start = recipes.length-1;
        var recurse = function(index){
          results[index] = recipes[index].dataValues;
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

// Input: user object , recipe object, and an optional callback
// Output: if provided a callback, invoke callback(err, results)
var addRecipeToUserFavorites = function(user, recipe, callback){
  db.Favorite.find({where: {UserId: user.id}})
  .complete(function(err,fav){
    db.Recipe.find({where: {id: recipe.id}})
    .complete(function(err,recipeEntry){
      fav.addRecipes(recipeEntry).complete(function(err,results){
        if(callback){
          callback(err, results);
        }
      });
    });
  }); 
}

// Input: user object, recipe object, and an optional callback
// Output: if provided a callback, invoke callback(err, removed)
// if successful, removed === [1]
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
exports.addUser = addUser;
exports.getUserFavorites = getUserFavorites;
exports.addRecipeToUserFavorites = addRecipeToUserFavorites;
exports.removeRecipeFromUserFavorites = removeRecipeFromUserFavorites;
