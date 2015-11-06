'use strict';

/* Controllers */

var lytekControllers = angular.module('lytekControllers', []);

lytekControllers.controller('CharacterSheetCtrl', ['$scope',
  function($scope) {
    $scope.character = new SolarCharacter();
    $scope.character.name = "Damascus";
    $scope.character.playerName = "Luke";
    $scope.character.caste = SolarCasteEnum.ZENITH;
    
    $scope.casteList = [SolarCasteEnum.DAWN, 
                        SolarCasteEnum.ZENITH, 
                        SolarCasteEnum.TWILIGHT, 
                        SolarCasteEnum.NIGHT, 
                        SolarCasteEnum.ECLIPSE];
  }
]);

lytekControllers.controller('CharmBrowserCtrl', ['$scope', '$routeParams', 'Charms',
  function($scope, $routeParams, Charms) {
    $scope.charms = Charms.query({ability: $routeParams.ability});
  }
]);

//phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
//  function($scope, $routeParams, Phone) {
//    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
//      $scope.mainImageUrl = phone.images[0];
//    });
//
//    $scope.setImage = function(imageUrl) {
//      $scope.mainImageUrl = imageUrl;
//    };
//  }]);