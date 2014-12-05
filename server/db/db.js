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
  title: {type: Sequelize.STRING, unique: true}
});

var Ingredient = orm.define('Ingredient', {
  name: {type: Sequelize.STRING, unique: true}
});

User.hasMany(Meal);
Meal.belongsTo(User);
Meal.hasMany(Recipe);
Recipe.hasMany(Meal);
Recipe.hasMany(Ingredient);
Ingredient.hasMany(Recipe);

User.sync();
Meal.sync();
Recipe.sync();
Ingredient.sync();

exports.User = User;
exports.Meal = Meal;
exports.Recipe = Recipe;
exports.Ingredient = Ingredient;

