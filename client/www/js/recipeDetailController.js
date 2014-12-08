angular.module('starter.controllers.recipe_detail', [])

.controller('RecipeDetailCtrl', function($scope, $stateParams, Favorites) {
  console.log($stateParams.friendId);
  //$scope.recipe = Favorites.get($stateParams.friendId);
})
