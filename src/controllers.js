import CharacterSheetController from './controllers/CharacterSheetController';
import CharmBrowserController from './controllers/CharmBrowserController';
import LytekController from './controllers/LytekController';
import CharacterLoadDialogController from './controllers/CharacterLoadDialogController';
import CharacterSaveDialogController from './controllers/CharacterSaveDialogController';

/* Controllers */

var lytekControllers = angular.module('lytekControllers', []);
export
default lytekControllers;

lytekControllers
    .controller('LytekCtrl', LytekController)
    .controller('CharacterSheetCtrl', CharacterSheetController)
    .controller('CharmBrowserCtrl', CharmBrowserController)
    .controller('CharacterLoadDialogController', CharacterLoadDialogController)
    .controller('CharacterSaveDialogController', CharacterSaveDialogController);