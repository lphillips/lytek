import 'angular-material/angular-material.css';
import 'assets/css/lytek.css';
import 'file?name=index.html!approot/index.html';
import en_lang from 'assets/js/en_lang.js';

/* App Module */
import ngMaterial from 'angular-material';
import 'angular-translate';
import lytekControllers from './controllers';
import lytekServices from './services';
import lytekDirectives from './directives';

var lytekApp = angular.module('lytekApp', ['ngMaterial', 'pascalprecht.translate', lytekControllers.name, lytekServices.name, lytekDirectives.name]);

lytekApp.config(['$logProvider', '$mdThemingProvider', '$translateProvider',

    function($logProvider, $mdThemingProvider, $translateProvider) {        
        $logProvider.debugInfoEnabled = true;

        $mdThemingProvider.theme('default')
            .primaryPalette('pink')
            .accentPalette('orange');
        
        $translateProvider.translations('en', en_lang).preferredLanguage('en');
    }
]);

export
default lytekApp;