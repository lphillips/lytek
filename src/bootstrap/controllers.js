import CharacterSheetController from 'components/character-sheet/CharacterSheetController';
import CharmBrowserController from 'components/charm-browser/CharmBrowserController';
import SolarCharmBrowserController from 'components/charm-browser/SolarCharmBrowserController';
import MartialArtsCharmBrowserController from 'components/charm-browser/MartialArtsCharmBrowserController';
import SorceryBrowserController from 'components/charm-browser/SorceryBrowserController';
import LytekController from 'components/home/LytekController';
import CharacterLoadDialogController from 'shared/file-io/CharacterLoadDialogController';
import CharacterSaveDialogController from 'shared/file-io/CharacterSaveDialogController';

/* Controllers */

var lytekControllers = angular.module('lytekControllers', []);
export
default lytekControllers;

lytekControllers
    .controller('LytekCtrl', LytekController)
    .controller('CharacterSheetCtrl', CharacterSheetController)
    .controller('CharmBrowserCtrl', CharmBrowserController)
    .controller('SolarCharmBrowserCtrl', SolarCharmBrowserController)
    .controller('MartialArtsCharmBrowserCtrl', MartialArtsCharmBrowserController)
    .controller('SorceryBrowserCtrl', SorceryBrowserController)
    .controller('CharacterLoadDialogController', CharacterLoadDialogController)
    .controller('CharacterSaveDialogController', CharacterSaveDialogController);