var db = require('../db');
var bluebird = require('bluebird'); //promise library, will have to think more about it
var helpers = require('./helpers.js')


module.exports = {
  pictures: {
    get: function (req, res) {   //This means the user wants to get a new picture;
    // have to send an api request to Yummly;
    //   if Yummly responds with an error, send a request to our database
    //     when receive the response (from Yummly/database):
    //        1) parse the response
    //        2) serve the picture to the user as the response;
    //        3) save the dish to the dishes table in the database;
    //         
        
    },
    post: function (req, res) {  //This means the user decided whether he likes the dish or not;
      // if he likes it, add the dish to the longlist object.
      // save the information to the "join" table of the database;      
    }
  },

  longlist: {
    get: function (req, res) { // This means the user wants to see the longlist;
      // serve the longlist object for this session;
    },
    post: function (req, res) {
      // never happens, not applicable;
    }
  }
};