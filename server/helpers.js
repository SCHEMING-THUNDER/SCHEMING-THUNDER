var request = require('request');

exports.getRecipes = function (response) { //the function with the request to Yummy api
  var endPoint = "http://api.yummly.com/v1/api/recipes?_app_id=feaea292&_app_key=d3ff47a740116cf2804eae0d7ee7f00e&q=&requirePictures=true";
  //var endPoint = "http://api.bigoven.com/recipes?pg=1&rpp=5&title_kw=lasagna&api_key=dvxlv7u3W062jQ26EHMvqNnBDWZ4u5I0";
  request.get(endPoint, function(err,res, html) {
  	if (err) {
      console.log("scrapingErr", err);
    } else {
      var dishes = JSON.parse(res.body).matches;
      console.log("response", dishes);
      response.json(dishes);
    }
  });
};

exports.longList = {}; //an object where we can store longlist objects for all ongoing sessions;
//session ids are going to be keys;
//how do we know whether the session has just started?

exports.addToLongList = function () { //the function that adds to the longlist;

}

/*Options:
- scrape some actual ids; store them (server or database); make request to a random id;
- or make an array of random cooking related words; send requests for words based on this array;

Request example:
https://www.yummly.com/recipes?q=soup&noUserSettings=true&allowedIngredient=&excludedIngredient=&maxTotalTimeInSeconds=Any+time&flavor.salty=+&flavor.savory=+&flavor.sour=+&flavor.bitter=+&flavor.sweet=+&flavor.spicy=+&nutrition.cholesterol=+&nutrition.fat=+&nutrition.calories=+&nutrition.carbs=+&dish%5Edish-chili=754&dish%5Edish-pie=403&dish%5Edish-dip-spread=270&dish%5Edish-cake=66&dish%5Edish-pizza=32&dish%5Edish-risotto=23&dish%5Edish-salsa=10&dish%5Edish-marinade=4&dish%5Edish-cookie=3&dish%5Edish-cupcake=3&dish%5Edish-jelly-jam=0&difficulty%5Edifficulty-quick-and-easy=16586&nutrition%5Enutrition-low-sugar=28466&nutrition%5Enutrition-low-cholesterol=22611&nutrition%5Enutrition-low-calorie=19664&nutrition%5Enutrition-high-vitamin-c=17627&nutrition%5Enutrition-low-carb=16174&nutrition%5Enutrition-low-saturated-fat=14536&nutrition%5Enutrition-healthy=9835&nutrition%5Enutrition-low-sodium=9806&nutrition%5Enutrition-low-fat=7947&nutrition%5Enutrition-high-fiber=6170&nutrition%5Enutrition-high-potassium=4190&nutrition%5Enutrition-high-calcium=3020&nutrition%5Enutrition-fat-free=1067&nutrition%5Enutrition-heart-healthy=767&nutrition%5Enutrition-sugar-free=581&nutrition%5Enutrition-no-carb=34&nutrition%5Enutrition-sodium-free=26&imagesOnly=false&blogsOnly=false&myRecipesOnly=false&sortBy=qande

*/