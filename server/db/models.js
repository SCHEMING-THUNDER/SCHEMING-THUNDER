var db = require('./config');

// Create table models and establish associations
var User = db.Model.extend({
  tableName: 'users',
  meals: function(){
    return this.belongsToMany(Meal);
  }
});

var Meal = db.Model.extend({
  tableName: 'meals',
  users: function(){
    return this.belongsToMany(User);
  },
  recipes: function(){
    return this.belongsToMany(Recipe);
  }
});

var Recipe = db.Model.extend({
  tableName: 'recipes',
  meals: function(){
    return this.belongsToMany(Meal);
  },
  ingredients: function(){
    return this.belongsToMany(Ingredient);
  }
});

var Ingredient = db.Model.extend({
  tableName: 'ingredients',
  recipes: function(){
    return this.belongsToMany(Recipe);
  }
});