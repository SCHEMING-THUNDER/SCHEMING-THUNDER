angular.module('starter.services', [])


.factory('Favorites', function($http) {
  // Might use a resource here that returns a JSON array

  var favorites = [];
  
  var getFavoritesList = function() {
    var self = this;
      return $http({
        method: 'GET',
        url: 'http://mealmatch.azurewebsites.net/list'
      })
      .then(function(res) {
        return res.data;
      }).then(function(data) {
        console.log("data", data);
        self.favorites = data;
        console.log(self.favorites);
      })
      .catch(function(er) {console.error(er);});
    };

 var deleteFromFavorites = function(item) {
      return $http({
        method: 'DELETE',
        url: '/list',
        data: item
      })
    }
  
  return {
    favorites : favorites,
    getFavoritesList: getFavoritesList,
    deleteFromFavorites: deleteFromFavorites
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