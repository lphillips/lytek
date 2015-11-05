'use strict';

/* App Module */

var lytekApp = angular.module('lytekApp', [
  'ngRoute',
  
  'lytekControllers'
]);

lytekApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/lytek', {
        templateUrl: 'partials/char-sheet.html',
        controller: 'CharacterSheetCtrl'
      }).
      otherwise({
        redirectTo:'/lytek'
    });
}]);