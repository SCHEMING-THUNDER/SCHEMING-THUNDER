angular.module('starter.controllers.favorites', [])

.controller('FavoritesCtrl', function($scope, Favorites) {
  angular.extend($scope, Favorites);
  //$scope.favorites = [];
  $scope.getFavoritesList();
  
  $scope.deleteCard = function(card) {
    $scope.deleteFromFavorites(card);
  };

})