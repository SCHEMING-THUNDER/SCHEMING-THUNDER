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
  username: {type: Sequelize.STRING, unique: true}
});

var Recipe = orm.define('Recipe', {
  imageUrlsBySize: Sequelize.BLOB,
  sourceDisplayName: Sequelize.STRING,
  ingredients: Sequelize.BLOB,
  id: {type: Sequelize.STRING, unique: true},
  smallImageUrls: Sequelize.BLOB,
  recipeName: Sequelize.STRING,
  totalTimeInSeconds: Sequelize.INTEGER,
  attrib: Sequelize.BLOB,
  flavors: Sequelize.BLOB,
  rating: Sequelize.INTEGER
});



User.hasMany(Recipe);
Recipe.hasMany(User);

User.sync();
Recipe.sync();

exports.User = User;
exports.Recipe = Recipe;

