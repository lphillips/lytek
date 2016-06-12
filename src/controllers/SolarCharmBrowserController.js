import CharmBrowserController from './CharmBrowserController';

export
default class SolarCharmBrowserController extends CharmBrowserController {
    /* @ngInject */
    constructor($scope, $document, $mdSidenav, Charms, CharacterService) {
        super($scope, $document, $mdSidenav, CharacterService);
        this.CharmsService = Charms;
        this.loadCharmTree('awareness');
    }

    getResource(charmTreeName) {
        return this.CharmsService.query({
            ability: charmTreeName
        });
    }
}