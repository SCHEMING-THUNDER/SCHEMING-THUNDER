var db = require('./db');
//var dbNaive = require('./dbNaive');
//**********************************************
// General Database Helpers
//**********************************************
var addListOfRecipes = function(){}

var findUser = function(userId, password, callback){

}

var addUser = function(userId, password, callback){
  
}

//**********************************************
// User favorites list helpers
//**********************************************
var getUserFavorites = function(){}

var addRecipeToUserFavorites = function(){}

var removeRecipeFromUserFavorites = function(){}

/*exports.addRecipeToDB = function(recipe){
  db.Recipe.findOrCreate({where: {username: req.body.username}})
        .complete(function(err, results){
          db.Message.create({
            userid: results[0].dataValues.id,
            text: req.body.message,
            roomname: req.body.roomname
          });
        });
}
*/
