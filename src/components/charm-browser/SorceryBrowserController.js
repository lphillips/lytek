import CharmBrowserController from './CharmBrowserController';
import './SorceryAssets';

export default class SorceryBrowserController extends CharmBrowserController {
    /* @ngInject */
    constructor($scope, $document, $mdSidenav, CharacterService, Sorcery, SorcerySpells) {
        super($scope, $document, $mdSidenav, CharacterService);
        this.SorceryService = Sorcery;
        this.SorcerySpellsService = SorcerySpells;
        
        this.sorcery = [];
        Sorcery.query().$promise.then((result) => {
            this.sorcery.push.apply(this.sorcery, result);
            this.loadCharmTree(this.sorcery[0].id);
        });
    }
    
    getResource(charmTreeName) {
        return this.SorcerySpellsService.query({
            circlename: charmTreeName
        });
    }
}