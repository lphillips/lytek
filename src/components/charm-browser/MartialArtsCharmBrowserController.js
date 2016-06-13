import CharmBrowserController from './CharmBrowserController';
import 'file?name=partials/martial-arts-browser.html!components/charm-browser/martial-arts-browser.html';
import './MartialArtsAssets';

//require.context('assets/martial-arts', true)("./" + expr + "");

//var requireTest = require.context('assets/martial-arts', true, /\*\.json$/);
//requireTest.keys().forEach(requireTest);

export
default class MartialArtsCharmBrowserController extends CharmBrowserController {
    /* @ngInject */
    constructor($scope, $document, $mdSidenav, MartialArts, MartialArtsCharms, CharacterService) {
        super($scope, $document, $mdSidenav, CharacterService);
        this.MartialArtsCharmsService = MartialArtsCharms;
        //        this.loadCharmTree('snakestyle');

        this.martialArts = [];
        MartialArts.query().$promise.then((result) => {
            this.martialArts.push.apply(this.martialArts, result);
            this.loadCharmTree(this.martialArts[0].id);
        });
    }

    getResource(charmTreeName) {
        return this.MartialArtsCharmsService.query({
            martialartname: charmTreeName
        });
    }
}