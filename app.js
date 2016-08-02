var app = angular.module('hearthstoneApp', ['checklist-model']);

app.controller('classController', ['$scope', '$http', 'apiService', function classController($scope, $http, apiService) {
  $scope.classSelections = [];
  $scope.setSelections = [];
  $scope.typeSelections = [];
  $scope.qualitySelections = [];
  $scope.raceSelections = [];
  $scope.costSelections = [];
  $scope.attackSelections = [];
  $scope.healthSelections = [];
  $scope.cards = [];
  $http.get('https://omgvamp-hearthstone-v1.p.mashape.com/info?mashape-key=9pTa6oeWRPmshmneQgsJFe8DiNTmp1hhHNljsnhHFvYUd0RklN')
  .then(function(res) {
    $scope.info = res.data;
  });
  $http.get('https://omgvamp-hearthstone-v1.p.mashape.com/cards?mashape-key=9pTa6oeWRPmshmneQgsJFe8DiNTmp1hhHNljsnhHFvYUd0RklN')
  .then(function(res) {
    angular.forEach(res.data, function(value, key) {
      //angular.forEach(value, function(value2, key2) {
      //  if (value2.collectible) {
          $scope.cards = $scope.cards.concat(value);
      //  }
      //});
    });
  });
  $scope.switchSets = function(sets) {
    $scope.setSelections = [];
    angular.forEach(sets, function(value, key) {
      $scope.setSelections = $scope.setSelections.concat(value);
    });
  };
  //apiService.getCards('Mage').then(function(res) {
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
        }
      }
    }
    return output;
  };
});

app.filter('byType', function() {
  return function(input, scope) {
    if (scope.typeSelections.length==0) {
      return input;
    }
    var output = [];
    for(var i = 0; i < input.length; i++) {
      for (var ii = 0; ii < scope.typeSelections.length; ii++) {
        if (input[i].type == scope.typeSelections[ii]) {
          output = output.concat(input[i]);
        }
      }
    }
    return output;
  };
});

app.filter('byQuality', function() {
  return function(input, scope) {
    if (scope.qualitySelections.length==0) {
      return input;
    }
    var output = [];
    for(var i = 0; i < input.length; i++) {
      for (var ii = 0; ii < scope.qualitySelections.length; ii++) {
        if (input[i].rarity == scope.qualitySelections[ii]) {
          output = output.concat(input[i]);
        }
      }
    }
    return output;
  };
});

app.filter('byRace', function() {
  return function(input, scope) {
    if (scope.raceSelections.length==0) {
      return input;
    }
    var output = [];
    for(var i = 0; i < input.length; i++) {
      for (var ii = 0; ii < scope.raceSelections.length; ii++) {
        if (input[i].race == scope.raceSelections[ii]) {
          output = output.concat(input[i]);
        }
      }
    }
    return output;
  };
});

app.filter('byCost', function() {
  return function(input, scope) {
    if (scope.costSelections.length==0) {
      return input;
    }
    var output = [];
    for(var i = 0; i < input.length; i++) {
      for (var ii = 0; ii < scope.costSelections.length; ii++) {
        if (input[i].cost == scope.costSelections[ii]) {
          output = output.concat(input[i]);
        }
      }
    }
    return output;
  };
});

app.filter('byAttack', function() {
  return function(input, scope) {
    if (scope.attackSelections.length==0) {
      return input;
    }
    var output = [];
    for(var i = 0; i < input.length; i++) {
      for (var ii = 0; ii < scope.attackSelections.length; ii++) {
        if (scope.attackSelections[ii] == '10+') {
          if (input[i].attack >= 10) {
            output = output.concat(input[i]);
            continue;
          }
        }
        if (input[i].attack == scope.attackSelections[ii]) {
          output = output.concat(input[i]);
        }
      }
    }
    return output;
  };
});

app.filter('byHealth', function() {
  return function(input, scope) {
    if (scope.healthSelections.length==0) {
      return input;
    }
    var output = [];
    for(var i = 0; i < input.length; i++) {
      for (var ii = 0; ii < scope.healthSelections.length; ii++) {
        if (scope.healthSelections[ii] == '10+') {
          if (input[i].health >= 10 || input[i].durability >= 10) {
            output = output.concat(input[i]);
            continue;
          }
        }
        if (input[i].health == scope.healthSelections[ii] || input[i].durability == scope.healthSelections[ii]) {
          output = output.concat(input[i]);
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
