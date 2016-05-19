export default class LytekController {
    /* @ngInject */
    constructor($location) {
        this.tabs = ['Character', 'Charms', 'Sorcery', 'Martial Arts'];
        this.$location = $location;
    }
    
    switchTab(index) {
        switch(index) {
            case 0: this.$location.path('/lytek'); break;
            case 1: this.$location.path('/lytek/charms/awareness'); break;
            default: this.$location.path('/lytek'); break;
        }
    }
}