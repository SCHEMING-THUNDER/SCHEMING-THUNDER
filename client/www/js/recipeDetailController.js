angular.module('starter.controllers.recipe_detail', [])

.controller('RecipeDetailCtrl', function($scope, $stateParams, Favorites) {
  angular.extend($scope, Favorites);
  $scope.recipe = $scope.getData()[$stateParams.friendId];
  console.log($scope.recipe);
})
.directive('bars', function ($parse) {
      return {
         restrict: 'E',
         replace: true,
         template: '<div id="chart"></div>',
         link: function (scope, element, attrs) {
           var flavors = JSON.parse(attrs.data);
           var data = [];
           for(var key in flavors){
           	var percent = Math.floor(flavors[key]*100);

           	//if percent is less than 15, default to 15.
           	//this is so that there is room for text.

           	if(percent < 15){percent = 15}

           	//scale everything down so that max is 90.

           	percent = percent*0.9;
           	data.push([key, percent]);
           }
           console.log(data);
           chart = d3.select('#chart')
             .append("div").attr("class", function(d) {
                console.log(d);
                return "chart"
             })
             .selectAll('div')
             .data(data).enter()
             .append("div")
             .transition().ease("elastic")
             .style("width", function(d) { return d[1] + "%"; })
             .text(function(d) { return d[0]; });
         } 
      };
   });
