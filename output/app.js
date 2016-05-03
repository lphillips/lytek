'use strict';

/* App Module */

var lytekApp = angular.module("lytekApp", ["ngRoute", "lytekControllers", "lytekServices", "lytekDirectives"]);

lytekApp.config(["$routeProvider", "$logProvider", function ($routeProvider, $logProvider) {
  $logProvider.debugInfoEnabled = true;

  $routeProvider.when("/lytek", {
    templateUrl: "partials/char-sheet.html",
    controller: "CharacterSheetCtrl"
  }).when("/lytek/charms/:ability", {
    templateUrl: "partials/charm-browser.html",
    controller: "CharmBrowserCtrl"
  }).otherwise({
    redirectTo: function redirectTo(routeParams, path, search) {
      return "/lytek";
    }
  });
}]);