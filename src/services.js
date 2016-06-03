import angular from 'angular';
import CharacterService from './services/CharacterService';
import FileService from './services/FileService';
import 'angular-resource';

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

let characterServiceArray = CharacterService.$inject;
characterServiceArray.push(CharacterService);
let fileServiceArray = FileService.$inject;
fileServiceArray.push(FileService);
lytekServices.service('CharacterService', characterServiceArray)
             .service('FileService', fileServiceArray);