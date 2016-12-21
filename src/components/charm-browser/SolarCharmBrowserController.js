import { Ability } from 'shared/character/models';
import CharmBrowserController from './CharmBrowserController';
import { solarCharmResourceId } from 'assets/solar-charms/SolarCharmsAssets';

import 'file?name=partials/charm-browser.html!components/charm-browser/charm-browser.html';


export
default class SolarCharmBrowserController extends CharmBrowserController {
    /* @ngInject */
    constructor($scope, $document, $mdSidenav, SolarCharms, CharacterService) {
        super($scope, $document, $mdSidenav, CharacterService);
        this.CharmsService = SolarCharms;
        this.loadCharmTree(Ability.ARCHERY);
    }

    getResource(ability) {
        return this.CharmsService.query({
            ability: solarCharmResourceId(ability)
        });
    }
}