var db = require('./db');

db.Recipe.find({where: {recipeName: 'Vegetarian Cabbage Soup'}})
.complete(function(err, entry){
  var x = entry.getIngredients().complete(function(err, entry){
    console.log('VEGY CABY SOUP INGREDS****************************');
    for(var i=0; i<entry.length;i++){
      console.log(entry[i].dataValues.name);
    }
  });
})

db.Recipe.find({where: {recipeName: 'Oriental Inspired Vegetable Soup'}})
.complete(function(err, entry){
  var x = entry.getIngredients().complete(function(err, entry){
    console.log('ORI INSP VEG SOUP INGREDS*************************');
    for(var i=0; i<entry.length;i++){
      console.log(entry[i].dataValues.name);
    }
  });
})

db.Ingredient.find({where: {name: 'hot chili oil'}})
.complete(function(err, entry){
  var x = entry.getRecipes().complete(function(err, entry){
    console.log('HOT CHILI OIL RECIPES*************************');
    for(var i=0; i<entry.length; i++){
      console.log(entry[i].dataValues.recipeName);
    }
  });
})