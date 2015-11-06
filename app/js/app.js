'use strict';

/* App Module */

var lytekApp = angular.module('lytekApp', [
  'ngRoute',
  
  'lytekControllers',
  'lytekServices'
]);

lytekApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/lytek', {
        templateUrl: 'partials/char-sheet.html',
        controller: 'CharacterSheetCtrl'
      }).
      when('/lytek/charms/:ability', {
        templateUrl: 'partials/charm-browser.html',
        controller: 'CharmBrowserCtrl'
      }).
      otherwise({
        redirectTo:'/lytek'
    });
}]);