/*jslint node: true*/
'use strict';

/* Services */

var lytekServices = angular.module('lytekServices', ['ngResource']);

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
