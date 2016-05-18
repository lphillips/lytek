import CharacterSheetController from './controllers/CharacterSheetController';
import CharmBrowserController from './controllers/CharmBrowserController';

/* Controllers */

var lytekControllers = angular.module('lytekControllers', []);
export
default lytekControllers;

lytekControllers
    .controller('CharacterSheetCtrl', CharacterSheetController)
    .controller('CharmBrowserCtrl', CharmBrowserController);