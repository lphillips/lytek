export default class LytekController {
    /* @ngInject */
    constructor($location) {
        this.tabs = ['Character', 'Charms', 'Sorcery', 'Martial Arts'];
        this.$location = $location;
    }
    
    tabView(index) {
        switch(index) {
            case 0: return 'partials/char-sheet.html';
            case 1: return 'partials/charm-browser.html';
            default: return 'partials/char-sheet.html';
        }
    }
}