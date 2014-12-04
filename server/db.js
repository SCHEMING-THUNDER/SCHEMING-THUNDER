var Bookshelf = require('bookshelf');

var db = Bookshelf.initialize({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'scheming_thunder',
    charset: 'utf8',
  }
});

// Create table schemas
db.knex.schema.hasTable('users').then(function(exists){
  if(!exists){
    db.knex.schema.createTable('users', function(user){
      user.increments('id').primary();
      user.string('username', 100).unique();
      user.string('password', 100);
      user.timestamps();
    }).then(function(table){
      console.log('*********Created User Table*************', table);
    });
  }
});

db.knex.schema.hasTable('meals').then(function(exists){
  if(!exists){
    db.knex.schema.createTable('meals', function(meal){
      meal.increments('id').primary();
      meal.string('title').unique();
      meal.timestamps();
    }).then(function(table){
      console.log('*********Created Meal Table*********', table);
    });
  }
});

db.knex.schema.hasTable('recipes').then(function(exists){
  if(!exists){
    db.knex.schema.createTable('recipes', function(recipe){
      recipe.increments('id').primary();
      recipe.string('title').unique();
      recipe.timestamps();
      recipe.string('image').unique();
    }).then(function(table){
      console.log('********Created Recipe Table**********', table);
    });
  }
});

db.knex.schema.hasTable('ingredients').then(function(exists){
  if(!exists){
    db.knex.schema.createTable('ingredients', function(ingredient){
      recipe.increments('id').primary();
      recipe.string('name').unique();
    }).then(function(table){
      console.log('*********Created Ingredient Table***********', table);
    });
  }
});

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
})

module.exports = db;