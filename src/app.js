import 'angular-material/angular-material.css';
import './css/lytek.css';

/* App Module */
import ngMaterial from 'angular-material';
import lytekControllers from './controllers';
import lytekServices from './services';
import lytekDirectives from './directives';

var lytekApp = angular.module("lytekApp", ["ngMaterial", lytekControllers.name, lytekServices.name, lytekDirectives.name]);

lytekApp.config(["$logProvider", "$mdThemingProvider", 

    function($logProvider, $mdThemingProvider) {
        $logProvider.debugInfoEnabled = true;

        $mdThemingProvider.theme('default')
            .primaryPalette('pink')
            .accentPalette('orange');
    }
]);

export
default lytekApp;