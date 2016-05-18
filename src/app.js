'use strict';

import 'angular-material/angular-material.css';
import './css/lytek.css';

/* App Module */
import ngRoute from 'angular-route';
import ngMaterial from 'angular-material';
import lytekControllers from './controllers';
import lytekServices from './services';
import lytekDirectives from './directives';

var lytekApp = angular.module("lytekApp", ["ngRoute", "ngMaterial", lytekControllers.name, lytekServices.name, lytekDirectives.name]);

lytekApp.config(["$routeProvider", "$logProvider",
    function($routeProvider, $logProvider) {
        $logProvider.debugInfoEnabled = true;

        $routeProvider.when("/lytek", {
            templateUrl: "partials/char-sheet.html",
            controller: "CharacterSheetCtrl",
            controllerAs: "charSheetCtrl"
        }).when("/lytek/charms/:ability", {
            templateUrl: "partials/charm-browser.html",
            controller: "CharmBrowserCtrl",
            controllerAs: "charmBrowserCtrl"
        }).otherwise({
            redirectTo: function redirectTo(routeParams, path, search) {
                return "/lytek";
            }
        });
    }
]);

export default lytekApp;