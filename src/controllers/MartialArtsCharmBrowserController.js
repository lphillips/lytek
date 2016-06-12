import CharmBrowserController from './CharmBrowserController';

export
default class MartialArtsCharmBrowserController extends CharmBrowserController {
    /* @ngInject */
    constructor($scope, $document, $mdSidenav, MartialArtsCharms, CharacterService) {
        super($scope, $document, $mdSidenav, CharacterService);
        this.MartialArtsCharmsService = MartialArtsCharms;
        this.loadCharmTree('snakestyle');
    }

    getResource(charmTreeName) {
        return this.MartialArtsCharmsService.query({
            martialartname: charmTreeName
        });
    }
}