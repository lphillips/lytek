import 'file?name=partials/character-load-dialog.tmpl.html!./character-load-dialog.tmpl.html';

export default class CharacterLoadDialogController {
    /* @ngInject */
    constructor($mdDialog, CharacterService) {
        this.selectedFile = null;
        this.CharacterService = CharacterService;
        this.$mdDialog = $mdDialog;
    }
    
    loadCharacterClicked() {
        this.loadCharacterFile(this.selectedFile).then(() => {
            // Dismiss dialog.
            this.$mdDialog.hide();
        });
    }
    
    loadCharacterFile(characterFile) {
        return this.CharacterService.load(characterFile);
    }
}