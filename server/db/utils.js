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
                db.Recipe_Ingredients.findOrCreate({where: {IngredientId:ingred[0].dataValues.id,RecipeId:entry.id}})
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

addListOfRecipes([
        {
            "attributes": {
                "course": [
                    "Soups"
                ],
                "cuisine": [
                    "Italian"
                ]
            },
            "flavors": {
                "salty": 0.6666666666666666,
                "sour": 0.8333333333333334,
                "sweet": 0.6666666666666666,
                "bitter": 0.5,
                "meaty": 0.16666666666666666,
                "piquant": 0.5
            },
            "rating": 4.6,
            "id": "Vegetarian-Cabbage-Soup-Recipezaar",
            "smallImageUrls": [],
            "sourceDisplayName": "Food.com",
            "totalTimeInSeconds": 4500,
            "ingredients": [
                "garlic cloves",
                "ground pepper",
                "diced tomatoes",
                "celery",
                "tomato juice",
                "salt",
                "cabbage",
                "bell peppers",
                "oregano",
                "carrots",
                "basil",
                "vegetable broth",
                "chili pepper flakes",
                "green beans",
                "onions",
                "onion soup mix"
            ],
            "recipeName": "Vegetarian Cabbage Soup"
        },
        {
            "attributes": {
                "course": [
                    "Soups"
                ],
                "cuisine": [
                    "Moroccan",
                    "Asian"
                ]
            },
            "flavors": {
                "salty": 0.6666666666666666,
                "sour": 0.6666666666666666,
                "sweet": 0.5,
                "bitter": 0.5,
                "meaty": 0.3333333333333333,
                "piquant": 0.6666666666666666
            },
            "rating": 5,
            "id": "Oriental-Inspired-Vegetable-Soup-Recipezaar",
            "smallImageUrls": [],
            "sourceDisplayName": "Food.com",
            "totalTimeInSeconds": 24300,
            "ingredients": [
                "tamari",
                "rice vinegar",
                "bamboo shoots",
                "lime juice",
                "pepper",
                "vegetable bouillon",
                "sesame oil",
                "salt",
                "carrots",
                "yellow onions",
                "red pepper",
                "garlic",
                "fish",
                "baby corn",
                "crushed red pepper",
                "spinach",
                "cremini mushrooms",
                "ginger",
                "peanut oil",
                "water",
                "raw sugar",
                "ketchup",
                "chives",
                "cabbage",
                "water chestnuts",
                "hot chili oil"
            ],
            "recipeName": "Oriental Inspired Vegetable Soup"
        // },
        // {
        //     "attributes": {
        //         "course": [
        //             "Main Dishes",
        //             "Soups"
        //         ],
        //         "cuisine": [
        //             "Italian"
        //         ]
        //     },
        //     "flavors": {
        //         "salty": 0.6666666666666666,
        //         "sour": 0.5,
        //         "sweet": 0.5,
        //         "bitter": 0.8333333333333334,
        //         "meaty": 0.6666666666666666,
        //         "piquant": 0.6666666666666666
        //     },
        //     "rating": 5,
        //     "id": "Chunky-Rice-And-Bean-Soup-Recipezaar",
        //     "smallImageUrls": [],
        //     "sourceDisplayName": "Food.com",
        //     "totalTimeInSeconds": 2700,
        //     "ingredients": [
        //         "dried oregano",
        //         "chili powder",
        //         "chopped celery",
        //         "long grain rice",
        //         "kidney beans",
        //         "shredded cabbage",
        //         "red pepper",
        //         "carrot",
        //         "onion",
        //         "minced garlic",
        //         "green beans",
        //         "olive oil",
        //         "pepper",
        //         "vegetable stock"
        //     ],
        //     "recipeName": "Chunky Rice and Bean Soup"
        // },
        // {
        //     "attributes": {
        //         "course": [
        //             "Soups",
        //             "Appetizers"
        //         ],
        //         "cuisine": [
        //             "German"
        //         ]
        //     },
        //     "flavors": {
        //         "salty": 0.16666666666666666,
        //         "sour": 0.6666666666666666,
        //         "sweet": 0.3333333333333333,
        //         "bitter": 0.16666666666666666,
        //         "meaty": 0.16666666666666666,
        //         "piquant": 0.5
        //     },
        //     "rating": 5,
        //     "id": "7-Samurai-Vegan-Soup-Recipezaar",
        //     "smallImageUrls": [],
        //     "sourceDisplayName": "Food.com",
        //     "totalTimeInSeconds": 3000,
        //     "ingredients": [
        //         "carrots",
        //         "cauliflower",
        //         "water",
        //         "onions",
        //         "garlic cloves",
        //         "pepper",
        //         "potatoes",
        //         "brussels sprouts",
        //         "salt",
        //         "olive oil",
        //         "celery ribs",
        //         "curry powder"
        //     ],
        //     "recipeName": "7 Samurai Vegan Soup"
        }], function(err,item,createdBool){console.log(createdBool)});




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
