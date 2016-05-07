import angular from 'angular';

/* Services */

var lytekServices = angular.module('lytekServices', ['ngResource']);
export
default lytekServices;

lytekServices.factory('Charms', ['$resource',
    function($resource) {
        return $resource('charms/:ability.json', {}, {});
    }
]);

lytekServices.factory('MartialArts', ['$resource',
    function($resource) {
        return $resource('martial-arts/martial-arts.json', {}, {});
    }
]);

lytekServices.factory('Merits', ['$resource',
    function($resource) {
        return $resource('merits/merits.json', {}, {});
    }
]);