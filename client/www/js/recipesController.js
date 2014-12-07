angular.module('starter.controllers.favorites', [])

.controller('FavoritesCtrl', function($scope, Favorites) {
  angular.extend($scope, Favorites);
  //$scope.favorites = [];
  $scope.getFavoritesList()
    .then(function(data) {
      console.log("data", data);
      $scope.favorites = data;
      console.log(Favorites);
    })
    .catch(function(er) {console.error(er);});
  
  $scope.deleteCard = function(card) {
    $scope.deleteFromFavorites(card);
  };

})