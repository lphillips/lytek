import angular from 'angular';
import CharacterLoadDialogController from 'shared/file-io/CharacterLoadDialogController';
import CharacterSaveDialogController from 'shared/file-io/CharacterSaveDialogController';

export default class LytekController {
    /* @ngInject */
    constructor($mdDialog, CharacterService) {
        this.$mdDialog = $mdDialog;
        this.tabs = ['Character', 'Charms', 'Sorcery', 'Martial Arts'];
        this.CharacterService = CharacterService;
    }
    
    tabView(index) {
        switch(index) {
            case 0: return 'partials/char-sheet.html';
            case 1: return 'partials/charm-browser.html';
            case 2: return 'partials/sorcery-browser.html';
            case 3: return 'partials/martial-arts-browser.html';
            default: return 'partials/char-sheet.html';
        }
    }
    
    showCharacterLoadDialog(event) {
        this.$mdDialog.show({
            controller: CharacterLoadDialogController,
            controllerAs: 'ctrl',
            templateUrl: 'partials/character-load-dialog.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true
        });
    }
    
    showCharacterSaveDialog(event) {
        this.$mdDialog.show({
            controller: CharacterSaveDialogController,
            controllerAs: 'ctrl',
            templateUrl: 'partials/character-save-dialog.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose:true
        });
    }
}