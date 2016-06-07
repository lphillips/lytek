import {
    ExaltedCharacter, SolarCharacter
}
from '../models';
import angular from 'angular';

const kSaveFileExtension = 'lyt';

export
default class CharacterService {
    /* @ngInject */
    constructor(FileService) {
        this._character = null;
        this.FileService = FileService;
        this.saveFileName = null;
    }

    get character() {
        return this._character;
    }

    save(fileName) {
        // Determine what the file name should be.  We use the argument if supplied,
        // else we save over the last character loaded.  If there is no good file
        // name available, we throw an exception.
        let saveFileName = this.sanitizeFileName(fileName);

        if (saveFileName !== null) {
            // Proceed with the save if the file name is good.
            let characterJSON = JSON.stringify(this.character);
            this.FileService.write(characterJSON, saveFileName, 'text/plain;charset=utf-8');
            this.saveFileName = fileName;
        } else {
            // Throw an exception because we don't know what name to use for this file.
            throw new InvalidFileNameException('No file name for saving character file.');
        }
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
        this.saveFileName = null;
        return this.character;
    }

    sanitizeFileName(fileName) {
        let sanitized = null;
        if (fileName != 'undefined' && fileName !== null) {
            sanitized = fileName.trim();
            if (sanitized.length === 0) {
                sanitized = null;
            } else {
                sanitized += '.' + kSaveFileExtension;
            }
        }

        return sanitized;
    }
}

export class InvalidFileNameException {
    constructor(message) {
        this.message = message;
        this.name = 'InvalidFileNameException';
    }
}