import {
    SolarCharacter, ExaltedCharacter, AbilityRank, Attribute, Ability
}
from 'shared/character/models';
import CharacterService from 'shared/character/CharacterService';
import 'file?name=partials/char-sheet.html!components/character-sheet/char-sheet.html';
import './MeritsAssets';

export
default class CharacterSheetController {
    /*@ngInject */
    constructor($scope, MartialArts, Merits, CharacterService) {
        //=========================================================================
        // Initialization
        //=========================================================================
        // Flag indicating if the character is in the process of character creation.
        this.newCharacter = true;
        this.totalBonusPoints = 15;
        this.spentBonusPoints = 0;
        
//        this.attributeChunks = [ [Character.]]

        this.character = CharacterService.createNew();
        $scope.$watch(() => { 
            return CharacterService.character; 
        }, (newValue, oldValue) => {
            this._characterChanged(newValue, oldValue);
        }, true);
        
        this.attributeChunks = [
            [
                this.character.attributeRanks[Attribute.STRENGTH],
                this.character.attributeRanks[Attribute.DEXTERITY],
                this.character.attributeRanks[Attribute.STAMINA]
            ],
            [
                this.character.attributeRanks[Attribute.CHARISMA],
                this.character.attributeRanks[Attribute.MANIPULATION],
                this.character.attributeRanks[Attribute.APPEARANCE]
            ],
            [
                this.character.attributeRanks[Attribute.PERCEPTION],
                this.character.attributeRanks[Attribute.INTELLIGENCE],
                this.character.attributeRanks[Attribute.WITS]
            ]
        ];

        this.casteList = [SolarCharacter.SolarCaste.DAWN, SolarCharacter.SolarCaste.ZENITH, SolarCharacter.SolarCaste.TWILIGHT, SolarCharacter.SolarCaste.NIGHT, SolarCharacter.SolarCaste.ECLIPSE];

        this.conceptPlaceholder = 'My character concept is...';
        this.animaPlaceholder = 'My character\'s anima looks like...';
        this.addMeritPlaceholder = 'New merit...';
        this.addMartialArtPlaceholder = 'New martial art...';
        this.addCraftPlaceholder = 'New craft...';

        // Fetch the martial arts list.
        this.selectedMartialArt = null;
        this.martialArts = {};
        this.martialArtsList = [];
        this._fetchMartialArts(MartialArts);

        // Fetch the merits list.
        this.selectedMerit = null;
        this.merits = {};
        this.meritsList = [];
        this._fetchMerits(Merits);

        // Managing craft abilities.
        this.selectedCraft = null;
    }

    _fetchResource(resource, resultsArray, resultsDict) {
        resource.$promise.then((result) => {
            resultsArray.push.apply(resultsArray, result);
            for (var i = 0; i < result.length; i++) {
                resultsDict[result[i].id] = result[i];
            }
        });
    }

    _fetchMartialArts(MartialArts) {
        this._fetchResource(MartialArts.query(), this.martialArtsList, this.martialArts);
    }

    _fetchMerits(Merits) {
        this._fetchResource(Merits.query(), this.meritsList, this.merits);
    }
    
    _characterChanged(newValue, oldValue) {
        this.character = newValue;
    }

    finishCharacterCreation() {
        this.newCharacter = false;
        this.totalBonusPoints = 0;
        this.spentBonusPoints = 0;
    }

    isNewCharacter() {
        return this.newCharacter;
    }

    addMerit(newMerit) {
        console.log('newMerit = ' + newMerit);
        this.character.meritRanks[newMerit.id] = new AbilityRank(newMerit.id, newMerit.availableDots[0]);
    }

    removeMerit(existingMerit) {
        delete this.character.meritRanks[existingMerit];
    }

    labelForMerit(merit) {
        var labelText = merit.name + ' (';
        for (var i = 0; i < merit.availableDots.length; i++) {
            labelText += this._dotString(merit.availableDots[i]);
            if (merit.availableDots.length == 2) {
                if (i === 0) {
                    labelText += ' or ';
                }
            } else if (i < merit.availableDots.length - 2) {
                labelText += ', ';
            } else if (i == merit.availableDots.length - 2) {
                labelText += ', or ';
            }
        }
        labelText += ')';
        return labelText;
    }

    _dotString(count) {
        var result = '';

        if (count === 0) {
            return '0 dots';
        } else {
            for (var i = 0; i < count; i++) {
                result += '●';
            }
            return result;
        }
    }

    addMartialArt(newMartialArtId) {
        // Add the martial art to the list with a rank of 0 if it does not
        // already exist.
        if (!this.character.martialArtsRanks[newMartialArtId]) {
            this.character.martialArtsRanks[newMartialArtId] = new AbilityRank(newMartialArtId, 0);
        }
    }

    removeMartialArt(existingMartialArtId) {
        delete this.character.martialArtsRanks[existingMartialArtId];
    }

    addCraft(newCraft) {
        if (!this.character.craftsRanks[newCraft]) {
            this.character.craftsRanks[newCraft] = new AbilityRank(newCraft, 0);
        }
    }

    removeCraft(existingCraft) {
        delete this.character.craftsRanks[existingCraft];
    }
    
    getAttributeLabel(attribute) {
        return attribute.localizeKey.toLocaleString();
    }
    
    getAbilityLabel(ability) {
        return ability.localizeKey.toLocaleString();
    }
}