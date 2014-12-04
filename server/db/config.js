// Establish connection with mysql database
var knex = require('knex')({
  client:'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'scheming_thunder',
    charset: 'utf8',
  }
});
var db = require('bookshelf')(knex);

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
      ingredient.increments('id').primary();
      ingredient.string('name').unique();
    }).then(function(table){
      console.log('*********Created Ingredient Table***********', table);
    });
  }
});

module.exports = db;