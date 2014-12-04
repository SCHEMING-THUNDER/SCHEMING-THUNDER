angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
})

.directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
})

.controller('CardsCtrl', function($scope, $http, $localstorage,TDCardDelegate) {
  console.log('CARDS CTRL');
  var cardTypes;

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  }

  $scope.startExplore = function() {
    console.log($localstorage.getObject('temp'));

    if(!$localstorage.getObject('temp')){
      $http.get("http://localhost:3000/explore").success(function(data, status, headers, config) {
        console.log('success', data);
        cardTypes = data;
        $scope.cards = Array.prototype.slice.call(cardTypes, 0);
        $localstorage.setObject('temp', data);
      })
      .error(function(data, status, headers, config) {
      console.log('fail', data);
      }); 
    } else{
      cardTypes = $localstorage.getObject('temp');
      $scope.cards = Array.prototype.slice.call(cardTypes, 0);
    }
  };

  $scope.startExplore();
})

.controller('CardCtrl', function($scope, TDCardDelegate) {
  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
    $scope.addCard();
  };
  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    $scope.addCard();
  };
});
