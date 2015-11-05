'use strict';

/* Controllers */

var lytekControllers = angular.module('lytekControllers', []);

lytekControllers.controller('CharacterSheetCtrl', ['$scope',
  function($scope) {
    $scope.charms = [];
    
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