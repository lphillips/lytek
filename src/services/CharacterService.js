import {
    ExaltedCharacter, SolarCharacter
}
from '../models';

export default class CharacterService {
    constructor() {
        this._character = null;
    }
    
    get character() {
        return this._character;
    }
    
    save() {
        
    }
    
    load(filename) {
        
    }
    
    createNew() {
        this._character = new SolarCharacter();
        return this.character;
    }
}