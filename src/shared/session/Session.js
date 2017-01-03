import CharacterService from 'shared/character/CharacterService';

export default class Session {
    constructor(CharacterService) {
        this.CharacterService = CharacterService;
        this.token = null;
    }
    
    static TokenStorageId() {
        return 'LytekSessionTokenId';
    }
    
    startSession() {
        // If session has already started
        this.token = localStorage.getItem(Session.TokenStorageId)
        
        if (this.token && !this.isTimedOut(token)) {
            // Restore stored data.
        }
        else {
            // Initialize new data.
        }
        
        // Update the stored token to offically start the session.
        this.token = Date.now().toString();
    }
    
    restoreData() {
        
    }
    
    initializeData() {
        this.CharacterService.createNew();
    }
}