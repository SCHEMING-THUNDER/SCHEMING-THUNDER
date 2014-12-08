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
           	data.push(Math.floor(flavors[key]*100));
           }
           console.log(data);
           chart = d3.select('#chart')
             .append("div").attr("class", "chart")
             .selectAll('div')
             .data(data).enter()
             .append("div")
             .transition().ease("elastic")
             .style("width", function(d) { return d + "%"; })
             .text(function(d) { return d + "%"; });
         } 
      };
   });
