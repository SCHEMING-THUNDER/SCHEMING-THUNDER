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

    db.Recipe.findOrCreate({where: {recipeName: curr.recipeName, totalTimeInSeconds: curr.totalTimeInSeconds}})
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
        callback(results);
    });
}

// If user exists: returns user object
// if user does not exist: returns null
var findUser = function(username, password, callback){
  db.User.find({where: {username: username, password: password}})
  .complete(function(err, result){
    callback(err, result.dataValues);
  });
}

var addUser = function(username, password, callback){
  db.User.create({
    username: username,
    password: password
  }).complete(function(err, result){
    callback(err, result.dataValues);
  });
}

//**********************************************
// User favorites list helpers
//**********************************************
var getUserFavorites = function(){}

var addRecipeToUserFavorites = function(){}

var removeRecipeFromUserFavorites = function(){}


exports.addListOfRecipes = addListOfRecipes;
exports.findUser = findUser;
exports.addUser = addUser;
exports.getUserFavorites = getUserFavorites;
exports.addRecipeToUserFavorites = addRecipeToUserFavorites;
exports.removeRecipeFromUserFavorites = removeRecipeFromUserFavorites;
