angular.module('starter.controllers', [])

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

.controller('DashCtrl', function($scope, $http, $localstorage,TDCardDelegate,$timeout) {
  var cardTypes;

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
    console.log('destroyed');
    $timeout($scope.addCard,0);
  };

  $scope.addCard = function() {

    var newCard = cardTypes.splice(Math.floor(Math.random() * cardTypes.length),1)[0];
    newCard.id = Math.random();
    console.log('new card is', newCard);
    $scope.cards.push(angular.extend({}, newCard));
  }

  $scope.startExplore = function() {
    console.log($localstorage.getObject('temp'));

    if(Object.keys($localstorage.getObject('temp')).length ===0){
      console.log('making a http request');
      $http.get("http://mealmatch.azurewebsites.net/explore").success(function(data, status, headers, config) {
        console.log('success', data);
        cardTypes = data;
        $scope.cards = Array.prototype.slice.call(cardTypes, 1,4);
        $localstorage.setObject('temp', data);
      })
      .error(function(data, status, headers, config) {
      console.log('fail', data);
      }); 
    } else{ //currently pulling from local storage data to avoid overusing api

      //make a copy of local storage so that local storage remains persistant
      cardTypes = Array.prototype.slice.call($localstorage.getObject('temp'));
      //load 1 cards for view
      $scope.cards = Array.prototype.splice.call(cardTypes, 1,4);
    }
  };

  $scope.startExplore();
})

.controller('CardCtrl', function($scope, $http, TDCardDelegate) {
  //!!!!warning, swipe left and right doesn't seem to always register
  //maybe a library issue

  $scope.cardSwipedLeft = function(card) {
    console.log('LEFT SWIPE');
    // $scope.addCard();
  };
  $scope.cardSwipedRight = function(card) {
    console.log('RIGHT SWIPE');
    console.log(card);
    // $scope.addCard();
    $http.post("http://mealmatch.azurewebsites.net/explore", card).success(function(data, status, headers, config) {
        console.log('success', data, headers);
      })
      .error(function(data, status, headers, config) {
      console.log('fail', data, headers);
      }); 
  };

})

.filter('largerimages', function () {
  console.log('this ran');
    return function (item) {
      //modify the image url to load larger images
      return item.replace('s90', 's450');  
    }
  });
