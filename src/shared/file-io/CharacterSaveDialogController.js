import 'file?name=partials/character-save-dialog.tmpl.html!./character-save-dialog.tmpl.html';

export
default class CharacterSaveDialogController {
    /* @ngInject */
    constructor($mdDialog, CharacterService) {
        this.CharacterService = CharacterService;
        this.$mdDialog = $mdDialog;
        this.fileName = null;
    }

    saveCharacterClicked(fileName) {
        this.CharacterService.save(fileName);

        // Dismiss dialog.
        this.$mdDialog.hide();
    }
}