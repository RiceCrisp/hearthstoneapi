var app = angular.module('hearthstoneApp', []);

app.controller('classController', ['$scope', '$http', 'apiService', function classController($scope, $http, apiService) {
  $scope.classSelections = [];
  $scope.setSelections = [];
  $scope.cards = [];
  $http.get('https://omgvamp-hearthstone-v1.p.mashape.com/info?mashape-key=9pTa6oeWRPmshmneQgsJFe8DiNTmp1hhHNljsnhHFvYUd0RklN')
  .then(function(res) {
    $scope.info = res.data;
  });
  $http.get('https://omgvamp-hearthstone-v1.p.mashape.com/cards?mashape-key=9pTa6oeWRPmshmneQgsJFe8DiNTmp1hhHNljsnhHFvYUd0RklN')
  .then(function(res) {
    angular.forEach(res.data, function(value, key) {
      $scope.cards = $scope.cards.concat(value);
    });
  });
  //apiService.getCards('Mage').then(function(res) {
  $scope.updateClass = function(newClass) {
    var index = $scope.classSelections.indexOf(newClass);
    if (index>=0) {
      $scope.classSelections.splice(index, 1);
    } else {
      $scope.classSelections.push(newClass);
    }
  };
  $scope.updateSet = function(newSet) {
    var index = $scope.setSelections.indexOf(newSet);
    if (index>=0) {
      $scope.setSelections.splice(index, 1);
    } else {
      $scope.setSelections.push(newSet);
    }
  };
}]);

app.filter('byClass', function() {
  return function(input, scope) {
    if (scope.classSelections.length==0) {
      return input;
    }
    var output = [];
    for(var i = 0; i < input.length; i++) {
      for (var ii = 0; ii < scope.classSelections.length; ii++) {
        if (input[i].playerClass == scope.classSelections[ii]) {
          output = output.concat(input[i]);
          break;
        }
      }
    }
    return output;
  };
});

app.filter('bySet', function() {
  return function(input, scope) {
    if (scope.setSelections.length==0) {
      return input;
    }
    var output = [];
    for(var i = 0; i < input.length; i++) {
      for (var ii = 0; ii < scope.setSelections.length; ii++) {
        if (input[i].cardSet == scope.setSelections[ii]) {
          output = output.concat(input[i]);
          break;
        }
      }
    }
    return output;
  };
});

app.factory('apiService', ['$http', function($http) {
  var apiService = {};
  apiService.getCards = function(newClass) {
    return $http.get('https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/'+ newClass + '?mashape-key=9pTa6oeWRPmshmneQgsJFe8DiNTmp1hhHNljsnhHFvYUd0RklN');
  };
  return apiService;
}]);
