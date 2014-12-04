var request = require('request');

exports.getRecipes = function () { //the function with the request to Yummy api
  var endPoint = "http://api.yummly.com/v1/api/recipes?_app_id=feaea292&_app_key=d3ff47a740116cf2804eae0d7ee7f00e&q=onion%20soup";
  request.get(endPoint, function(err,res, html) {
  	if (err) {
      console.log("scrapingErr", err);
    } else {
      console.log("response", res.body);
    }
  });
};

exports.longList = {}; //an object where we can store longlist objects for all ongoing sessions;
//session ids are going to be keys;
//how do we know whether the session has just started?

exports.addToLongList = function () { //the function that adds to the longlist;

}