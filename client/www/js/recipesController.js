angular.module('starter.controllers.favorites', [])

.controller('FavoritesCtrl', function($scope, Favorites) {
  $scope.favorites = [];
  Favorites.getFavoritesList()
    .then(function(data) {
      console.log("data", data);
      $scope.favorites = data;
    })
    .catch(function(er) {console.error(er);});
  

})