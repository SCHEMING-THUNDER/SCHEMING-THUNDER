var path = require('path');
var Sequelize = require('sequelize');
var orm = new Sequelize('scheming_thunder', '', '', {
  dialect: 'sqlite',
  storage: path.join(__dirname, 'scheming_thunder')
});

orm.authenticate().complete(function(err){
  if(!!err){
    console.log('Unable to connect to database:', err)
  } else {
    console.log('Connection has been established successfully.')
  }
})

var User = orm.define('User', {
  username: {type: Sequelize.STRING, unique: true},
  password: Sequelize.STRING,
});

var Meal = orm.define('Meal', {
  title: Sequelize.STRING,
});

var Recipe = orm.define('Recipe', {
  totalTimeInSeconds: Sequelize.BIGINT,
  recipeName: {type: Sequelize.STRING, unique: true}
});

var Img = orm.define('Img', {
  url: Sequelize.STRING
});

var Ingredient = orm.define('Ingredient', {
  name: {type: Sequelize.STRING, unique: true}
});

var Recipe_Ingredients = orm.define('Recipe_Ingredients',{
  IngredientId: {type: Sequelize.INTEGER},
  RecipeId: {type: Sequelize.INTEGER}
});

User.hasMany(Meal);
Meal.belongsTo(User);

Meal.hasMany(Recipe);
Recipe.hasMany(Meal);

Recipe.hasMany(Img);
Img.belongsTo(Recipe);

Recipe.hasMany(Ingredient, {as:'Ingredients', through:'Recipe_Ingredients'});
Ingredient.hasMany(Recipe, {as:'Recipes', through:'Recipe_Ingredients'});

User.sync();
Meal.sync();
Recipe.sync();
Img.sync();
Ingredient.sync();
Recipe_Ingredients.sync();

exports.User = User;
exports.Meal = Meal;
exports.Recipe = Recipe;
exports.Img = Img;
exports.Ingredient = Ingredient;
exports.Recipe_Ingredients = Recipe_Ingredients;

