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
    // Replace data for only collectible
    $scope.info.sets = ['Basic', 'Classic', 'Naxxramas', 'Goblins vs Gnomes', 'Blackrock Mountain', 'The Grand Tournament', 'The League of Explorers', 'Whispers of the Old Gods', 'Promo', 'Reward'];
    $scope.info.classes = ['Druid', 'Hunter', 'Mage', 'Paladin', 'Priest', 'Rogue', 'Shaman', 'Warlock', 'Warrior'];
    $scope.info.types = ['Minion', 'Spell', 'Weapon'];
  });
  $http.get('https://omgvamp-hearthstone-v1.p.mashape.com/cards?mashape-key=9pTa6oeWRPmshmneQgsJFe8DiNTmp1hhHNljsnhHFvYUd0RklN')
  .then(function(res) {
    angular.forEach(res.data, function(value, key) {
      $scope.cards = $scope.cards.concat(value);
    });
  });
  $scope.switchSets = function(sets) {
    $scope.setSelections = [];
    angular.forEach(sets, function(value, key) {
      $scope.setSelections = $scope.setSelections.concat(value);
    });
  };
  $scope.openCard = function(cardID) {
    $('.singleCard').css('display', 'block');
    $('.singleCard').animate({'height': '100%'}, 'slow', function() {
      $('.close').fadeIn('slow');
    });
    $http.get('https://omgvamp-hearthstone-v1.p.mashape.com/cards/' + cardID + '?mashape-key=9pTa6oeWRPmshmneQgsJFe8DiNTmp1hhHNljsnhHFvYUd0RklN')
    .then(function(res) {
      $scope.curCard = res.data;
      $('.cardInfo').fadeIn('slow');
    });
  };
  $scope.closeCard = function() {
    $('.singleCard, .cardInfo, .close').fadeOut('slow', function() {
      $('.singleCard').css('height', '0');
      $scope.curCard = [];
    });
  };
}]);

app.filter('byCollectible', function() {
  return function(input, scope) {
    var output = [];
    for(var i = 0; i < input.length; i++) {
      if (input[i].collectible == true && input[i].type != 'Hero') {
        output = output.concat(input[i]);
      }
    }
    return output;
  };
});

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
        if (scope.costSelections[ii] == '7+') {
          if (input[i].cost >= 7) {
            output = output.concat(input[i]);
            continue;
          }
        }
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
