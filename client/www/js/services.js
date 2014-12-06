angular.module('starter.services', [])


.factory('Favorites', function() {
  // Might use a resource here that returns a JSON array
  
  var getFavoritesList = function() {
      return $http({
        method: 'GET',
        url: '/list'
      })
      .then(function(res) {
        return res.data;
      });
    };

 var deleteFromFavorites = function(item) {
      return $http({
        method: 'DELETE',
        url: '/list',
        data: item
      })
    }
  
  return {
    "getFavoritesList": getFavoritesList,
    "deleteFromFavorites": deleteFromFavorites
  }
})
.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);