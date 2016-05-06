'use strict';

/* App Module */

import lytekControllers from './controllers';
import lytekServices from './services';
import lytekDirectives from './directives';

var lytekApp = angular.module("lytekApp", ["ngRoute", lytekControllers.name, lytekServices.name, lytekDirectives.name]);

lytekApp.config(["$routeProvider", "$logProvider",
    function($routeProvider, $logProvider) {
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
    }
]);

export default lytekApp;