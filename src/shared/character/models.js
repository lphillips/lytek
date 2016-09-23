import {
    Enum
}
from 'enumify';

//=============================================================================
// ENUM: Attribute
//=============================================================================
export class Attribute extends Enum {}
Attribute.initEnum({
    STRENGTH: {
        localizeKey: '%strength'
    },
    DEXTERITY: {
        localizeKey: '%dexterity'
    },
    STAMINA: {
        localizeKey: '%stamina'
    },
    CHARISMA: {
        localizeKey: '%charisma'
    },
    MANIPULATION: {
        localizeKey: '%manipulation'
    },
    APPEARANCE: {
        localizeKey: '%appearance'
    },
    INTELLIGENCE: {
        localizeKey: '%intelligence'
    },
    WITS: {
        localizeKey: '%wits'
    },
    PERCEPTION: {
        localizeKey: '%perception'
    }
});

//=============================================================================
// ENUM: Ability
//=============================================================================
export class Ability extends Enum {}
Ability.initEnum({
    ARCHERY: {
        localizeKey: '%archery'
    },
    ATHLETICS: {
        localizeKey: '%athletics'
    },
    AWARENESS: {
        localizeKey: '%awareness'
    },
    BRAWL: {
        localizeKey: '%brawl'
    },
    BUREAUCRACY: {
        localizeKey: '%bureaucracy'
    },
    CRAFT: {
        localizeKey: '%craft'
    },
    DODGE: {
        localizeKey: '%dodge'
    },
    INTEGRITY: {
        localizeKey: '%integrity'
    },
    INVESTIGATION: {
        localizeKey: '%investigation'
    },
    LARCENY: {
        localizeKey: '%larceny'
    },
    LINGUISTICS: {
        localizeKey: '%linguistics'
    },
    LORE: {
        localizeKey: '%lore'
    },
    MARTIAL_ARTS: {
        localizeKey: '%martial_arts'
    },
    MEDICINE: {
        localizeKey: '%medicine'
    },
    MELEE: {
        localizeKey: '%melee'
    },
    OCCULT: {
        localizeKey: '%occult'
    },
    PERFORMANCE: {
        localizeKey: '%performance'
    },
    PRESENCE: {
        localizeKey: '%presence'
    },
    RESISTANCE: {
        localizeKey: '%resistance'
    },
    RIDE: {
        localizeKey: '%ride'
    },
    SAIL: {
        localizeKey: '%sail'
    },
    SOCIALIZE: {
        localizeKey: '%socialize'
    },
    STEALTH: {
        localizeKey: '%stealth'
    },
    SURVIVAL: {
        localizeKey: '%survival'
    },
    THROWN: {
        localizeKey: '%thrown'
    },
    WAR: {
        localizeKey: '%war'
    }
});

//=============================================================================
// CLASS: ExaltedCharacter
//=============================================================================

export class ExaltedCharacter {
    constructor() {
        this.name = '';
        this.playerName = '';
        this.concept = '';
        this.essence = 1;
        this.willpower = 1;
        this.limitBreak = '';
        this.limitTrigger = '';

        // Attribute Ranks
        this.attributeRanks = {};
        for (var attribute of Attribute) {
            let newAttributeRank = new AbilityRank(attribute, 1);
            newAttributeRank.minRank = 1;
            this.attributeRanks[attribute] = newAttributeRank;
        }

        // Ability ranks
        this.abilityRanks = [];
        for (var ability of Ability) {
            let newAbilityRank = null;
            if (ability === Ability.CRAFT) {
                newAbilityRank = new AbilityGroupRank(ability, this.craftsRanks);
            } else if (ability === Ability.MARTIAL_ARTS) {
                newAbilityRank = new AbilityGroupRank(ability, this.martialArtsRanks);
            } else {
                newAbilityRank = new AbilityRank(ability, 0);
            }
            this.abilityRanks.push(newAbilityRank);
        }

        // Other ranks
        this.meritRanks = {};
        this.martialArtsRanks = {};
        this.craftsRanks = {};

        // Charms
        this.charms = {};

        // XP
        this.spentXP = 0;
        this.totalXP = 0;
    }

    getAbilityRank(ability) {
        var result = null;
        for (var i = 0; i < this.abilityRanks.length; i++) {
            if (this.abilityRanks[i].abilityId == ability) {
                result = this.abilityRanks[i];
                break;
            }
        }
        return result;
    }

    getAttributeRank(attribute) {
        return this.attributeRanks[attribute];
    }
}

//=============================================================================
// CLASS: SolarCharacter extends ExaltedCharacter
//=============================================================================

export class SolarCharacter extends ExaltedCharacter {
    constructor() {
        super();
        this.caste = SolarCharacter.SolarCaste.DAWN;
        this.supernalAbility = 'What';
        this.anima = 'Yeah';

        this.spentSolarXP = 0;
        this.totalSolarXP = 0;
    }
}

SolarCharacter.SolarCaste = {
    DAWN: 'Dawn',
    ZENITH: 'Zenith',
    TWILIGHT: 'Twilight',
    NIGHT: 'Night',
    ECLIPSE: 'Eclipse'
};

//=============================================================================
// CLASS: AbilityRank
//=============================================================================

export class AbilityRank {
    constructor(abilityId, rank) {
        this.abilityId = abilityId;
        this._rank = rank;
        this.minRank = 0;
        this.maxRank = 5;
    }

    get rank() {
        return this._rank;
    }

    set rank(newRank) {
        var val = newRank;
        val = Math.max(this.minRank, val);
        val = Math.min(this.maxRank, val);
        this._rank = val;
    }
}

//=============================================================================
// CLASS: AbilityGroupRank extends AbilityRank
//=============================================================================

export class AbilityGroupRank extends AbilityRank {
    constructor(abilityId, abilityGroup) {
        super(abilityId, 0);
        this.abilityGroup = abilityGroup;
    }

    get rank() {
        // Searching for the highest rank sub-ability.
        var highestRank = 0;
        for (var id in this.abilityGroup) {
            highestRank = this.abilityGroup[id].rank > highestRank ? this.abilityGroup[id].rank : highestRank;
        }
        return highestRank;
    }

    set rank(newRank) {}
}

//=============================================================================
// CLASS: Prereq
//=============================================================================

export class Prereq {
    constructor(prereqKey, prereqValue) {
        this.key = prereqKey;
        this.value = prereqValue;
    }

    isSatisfied(character) {
        return false;
    }
}

//=============================================================================
// CLASS: AttributePrereq extends Prereq
//=============================================================================

export class AttributePrereq extends Prereq {
    constructor(prereqKey, prereqValue) {
        super(prereqKey, prereqValue);
    }

    isSatisfied(character) {
        var attributeRank = character.getAttributeRank(this.key);
        return attributeRank.rank >= this.value;
    }
}

//=============================================================================
// CLASS: AbilityPrereq extends Prereq
//=============================================================================

export class AbilityPrereq extends Prereq {
    constructor(prereqKey, prereqValue) {
        super(prereqKey, prereqValue);
    }

    isSatisfied(character) {
        var abilityRank = character.getAbilityRank(this.key);
        return abilityRank.rank >= this.value;
    }
}

//=============================================================================
// CLASS: EssencePrereq extends Prereq
//=============================================================================

export class EssencePrereq extends Prereq {
    constructor(prereqValue) {
        super(null, prereqValue);
    }

    isSatisfied(character) {
        return character.essence >= this.value;
    }
}

//=============================================================================
// CLASS: CharmPrereq extends Prereq
//=============================================================================

export class CharmPrereq extends Prereq {
    constructor(prereqKey, prereqValue) {
        super(prereqKey, prereqValue);
    }
}

//=============================================================================
// CLASS: CharmCountPrereq extends Prereq
//=============================================================================

export class CharmCountPrereq extends Prereq {
    constructor(prereqKey, prereqValue) {
        super(prereqKey, prereqValue);
    }
}

//=============================================================================
// CLASS: AndPrereq extends Prereq
//=============================================================================

export class AndPrereq extends Prereq {
    constructor(firstPrereq, secondPrereq) {
        super(null, null);
        this.firstPrereq = firstPrereq;
        this.secondPrereq = secondPrereq;
    }
}

//=============================================================================
// CLASS: OrPrereq extends Prereq
//=============================================================================

export class OrPrereq extends Prereq {
    constructor(firstPrereq, secondPrereq) {
        super(null, null);
        this.firstPrereq = firstPrereq;
        this.secondPrereq = secondPrereq;
    }
}