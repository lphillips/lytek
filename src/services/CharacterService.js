import {
    ExaltedCharacter, SolarCharacter
}
from '../models';
import angular from 'angular';

export default class CharacterService {
    /* @ngInject */
    constructor(FileService) {
        this._character = null;
        this.FileService = FileService;
    }
    
    get character() {
        return this._character;
    }
    
    save() {
        let characterJSON = JSON.stringify(this.character);
        this.FileService.write(characterJSON, 'character.lyt', 'text/plain;charset=utf-8');
    }
    
    load(characterFile) {
        let promise = this.FileService.read(characterFile).then((result) => {
            // Create a new Character object, and then merge in the data from
            // the loaded character JSON.
            let characterData = JSON.parse(result);
            this.createNew();
            angular.merge(this.character, characterData);
        });
        return promise;
    }
    
    createNew() {
        this._character = new SolarCharacter();
        return this.character;
    }
}