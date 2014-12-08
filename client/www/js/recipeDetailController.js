angular.module('starter.controllers.recipe_detail', [])

.controller('RecipeDetailCtrl', function($scope, $stateParams, Favorites) {
  angular.extend($scope, Favorites);
  $scope.recipe = $scope.getData()[$stateParams.friendId];
  console.log($scope.recipe);
})
