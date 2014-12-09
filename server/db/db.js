var path = require('path');
var Sequelize = require('sequelize');
/*var orm = new Sequelize('scheming_thunder', '', '', {
  dialect: 'sqlite',
  storage: path.join(__dirname, 'scheming_thunder')
});*/

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

// User's Favorite's table
var Favorite = orm.define('Favorite', {
});

var Meal = orm.define('Meal', {
  title: Sequelize.STRING,
});

var Recipe = orm.define('Recipe', {
  totalTimeInSeconds: Sequelize.BIGINT,
  recipeName: {type: Sequelize.STRING, unique: true},
  smallImageUrls: Sequelize.STRING,
  
  salty: Sequelize.FLOAT,
  sour: Sequelize.FLOAT,
  sweet: Sequelize.FLOAT,
  bitter: Sequelize.FLOAT,
  meaty: Sequelize.FLOAT,
  piquant: Sequelize.FLOAT,

  course: Sequelize.STRING,

  cuisine: Sequelize.STRING
});

/*var Img = orm.define('Img', {
  url: Sequelize.STRING
});*/

var Ingredient = orm.define('Ingredient', {
  name: {type: Sequelize.STRING, unique: true}
});

//****************************************
//*******JOIN TABLES**********************
//****************************************
orm.define('IngredientsRecipes',{
  IngredientId: Sequelize.INTEGER,
  RecipeId: Sequelize.INTEGER
}).sync();

orm.define('MealsRecipes',{
  MealId: Sequelize.INTEGER,
  RecipeId: Sequelize.INTEGER
}).sync();

orm.define('FavoritesRecipes',{
  FavoriteId: Sequelize.INTEGER,
  RecipeId: Sequelize.INTEGER
}).sync();

//****************************************
//*******ASSOCIATIONS*********************
//****************************************
User.hasMany(Meal);
Meal.belongsTo(User);

Favorite.belongsTo(User);
User.belongsTo(Favorite);

Recipe.hasMany(Favorite);
Favorite.hasMany(Recipe);

Meal.hasMany(Recipe);
Recipe.hasMany(Meal);

/*Recipe.hasMany(Img);
Img.belongsTo(Recipe);*/

Recipe.hasMany(Ingredient);
Ingredient.hasMany(Recipe);



User.sync();
Favorite.sync();
Meal.sync();
Recipe.sync();
//Img.sync();
Ingredient.sync();

exports.User = User;
exports.Favorite = Favorite;
exports.Meal = Meal;
exports.Recipe = Recipe;
//exports.Img = Img;
exports.Ingredient = Ingredient;
