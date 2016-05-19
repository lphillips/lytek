import CharacterSheetController from './controllers/CharacterSheetController';
import CharmBrowserController from './controllers/CharmBrowserController';
import LytekController from './controllers/LytekController';

/* Controllers */

var lytekControllers = angular.module('lytekControllers', []);
export
default lytekControllers;

lytekControllers
    .controller('LytekCtrl', LytekController)
    .controller('CharacterSheetCtrl', CharacterSheetController)
    .controller('CharmBrowserCtrl', CharmBrowserController);