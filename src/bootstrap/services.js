import angular from 'angular';
import 'angular-resource';
import CharacterService from 'shared/character/CharacterService';
import FileService from 'shared/file-io/FileService';

import 'assets/martial-arts/martial-arts.json';
import 'assets/solar-charms/SolarCharmsAssets';
import { solarCharmPath } from 'assets/solar-charms/SolarCharmsAssets';

/* Services */

var lytekServices = angular.module('lytekServices', ['ngResource']);
export
default lytekServices;

lytekServices.factory('Charms', ['$resource',
    function($resource) {
        return $resource('solar-charms/:ability.json', {}, {});
    }
]);

lytekServices.factory('SolarCharms', ['$resource',
    function($resource) {
        return $resource(solarCharmPath + '/:ability.json', {}, {});
    }
]);

lytekServices.factory('MartialArtsCharms', ['$resource',
    function($resource) {
        return $resource('martial-arts/:martialartname.json', {}, {});
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

lytekServices.factory('Sorcery', ['$resource', 
     function($resource) {
         return $resource('sorcery/sorcery.json');
     }
 ]);

lytekServices.factory('SorcerySpells', ['$resource', 
    function($resource) {
        return $resource('sorcery/:circlename.json', {}, {});
    }
]);

let characterServiceArray = CharacterService.$inject;
characterServiceArray.push(CharacterService);
let fileServiceArray = FileService.$inject;
fileServiceArray.push(FileService);
lytekServices.service('CharacterService', characterServiceArray)
             .service('FileService', fileServiceArray);