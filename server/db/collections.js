var db = require('./config');
var models = require('./models');

exports.Users = new db.Collection();
exports.Users.model = models.User;

exports.Meal = new db.Collection();
exports.Meal.model = models.Meal;

exports.Recipe = new db.Collection();
exports.Recipe.model = models.Recipe;

exports.Ingredient = new db.Collection();
exports.Ingredient.model = models.Ingredient;