angular.module('starter.controllers.recipes', [])

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})