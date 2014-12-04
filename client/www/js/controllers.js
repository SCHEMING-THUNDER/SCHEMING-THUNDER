angular.module('starter.controllers', [])

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

.controller('DashCtrl', function($scope, $http, $localstorage,TDCardDelegate) {
  var cardTypes;

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
    // $scope.addCard();
    console.log('destroyed');
  };

  $scope.addCard = function() {

    var newCard = cardTypes.splice(Math.floor(Math.random() * cardTypes.length),1)[0];
    //newCard.id = Math.random();
    console.log('new card is', newCard);
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
    } else{ //currently pulling from local storage data to avoid overusing api

      //make a copy of local storage so that local storage remains persistant
      cardTypes = Array.prototype.slice.call($localstorage.getObject('temp'));
      //load 3 cards for view
      $scope.cards = Array.prototype.splice.call(cardTypes, 0,3);
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
})

.filter('largerimages', function () {
  console.log('this ran');
    return function (item) {
      return item.replace('s90', 's360');  
    }
  });
