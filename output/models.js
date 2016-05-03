"use strict";

//=============================================================================
// CLASS: ExaltedCharacter
//=============================================================================

function ExaltedCharacter() {
    this.name = "";
    this.playerName = "";
    this.concept = "Big old sucka";
    this.essence = 1;

    this.AttributeEnum = {
        STRENGTH: "Strength",
        DEXTERITY: "Dexterity",
        STAMINA: "Stamina",
        CHARISMA: "Charisma",
        MANIPULATION: "Manipulation",
        APPEARANCE: "Appearance",
        INTELLIGENCE: "Intellligence",
        WITS: "Wits",
        PERCEPTION: "Perception"
    };

    // Attribute Ranks
    this.attributeRanks = {};
    for (var attribute in this.AttributeEnum) {
        var newAbilityRank = new AbilityRank(attribute, 1);
        newAbilityRank.minRank = 1;
        this.attributeRanks[attribute] = newAbilityRank;
    }

    this.AbilityEnum = {
        ARCHERY: "Archery",
        ATHLETICS: "Athletics",
        AWARENESS: "Awareness",
        BRAWL: "Brawl",
        BUREAUCRACY: "Bureaucracy",
        CRAFT: "Craft",
        DODGE: "Dodge",
        INTEGRITY: "Integrity",
        INVESTIGATION: "Investigation",
        LARCENY: "Larceny",
        LINGUISTICS: "Linguistics",
        LORE: "Lore",
        MARTIAL_ARTS: "Martial Arts",
        MEDICINE: "Medicine",
        MELEE: "Melee",
        OCCULT: "Occult",
        PERFORMANCE: "Performance",
        PRESENCE: "Presence",
        RESISTANCE: "Resistance",
        RIDE: "Ride",
        SAIL: "Sail",
        SOCIALIZE: "Socialize",
        STEALTH: "Stealth",
        SURVIVAL: "Survival",
        THROWN: "Thrown",
        WAR: "War"
    };

    // Ability ranks
    this.abilityRanks = [];
    for (var ability in this.AbilityEnum) {
        var newAbilityRank = null;

        if (ability === "CRAFT") {
            newAbilityRank = new AbilityGroupRank(ability, this.craftsRanks);
        } else if (ability == "MARTIAL_ARTS") {
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

    this.spentXP = 0;
    this.totalXP = 0;
}

ExaltedCharacter.prototype.getAbilityRank = function (ability) {
    var result = null;
    for (var i = 0; i < this.abilityRanks.length; i++) {
        if (this.abilityRanks[i].abilityId == ability) {
            result = this.abilityRanks[i];
            break;
        }
    }
    return result;
};

ExaltedCharacter.prototype.getAttributeRank = function (attribute) {
    return this.attributeRanks[attribute];
};

//=============================================================================
// CLASS: SolarCharacter extends ExaltedCharacter
//=============================================================================

var SolarCasteEnum = {
    DAWN: "Dawn",
    ZENITH: "Zenith",
    TWILIGHT: "Twilight",
    NIGHT: "Night",
    ECLIPSE: "Eclipse"
};

function SolarCharacter() {
    ExaltedCharacter.call(this);
    this.caste = SolarCasteEnum.DAWN;
    this.supernalAbility = "What";
    this.anima = "Yeah";

    this.spentSolarXP = 0;
    this.totalSolarXP = 0;
}

SolarCharacter.prototype = Object.create(ExaltedCharacter.prototype);

//=============================================================================
// CLASS: AbilityRank
//=============================================================================

function AbilityRank(abilityId, rank) {
    this.abilityId = abilityId;
    this._rank = rank;
    this.minRank = 0;
    this.maxRank = 5;
}

Object.defineProperty(AbilityRank.prototype, "rank", {
    enumerable: true,
    get: function get() {
        return this.__get_rank();
    },
    set: function set(newRank) {
        this.__set_rank(newRank);
    }
});

AbilityRank.prototype.__get_rank = function () {
    return this._rank;
};

AbilityRank.prototype.__set_rank = function (newRank) {
    var val = newRank;
    val = Math.max(this.minRank, val);
    val = Math.min(this.maxRank, val);
    this._rank = val;
};

//=============================================================================
// CLASS: AbilityGroupRank extends AbilityRank
//=============================================================================

function AbilityGroupRank(abilityId, abilityGroup) {
    AbilityRank.call(this, abilityId, 0);
    this.abilityGroup = abilityGroup;
}

AbilityGroupRank.prototype = Object.create(AbilityRank.prototype);
AbilityGroupRank.prototype.constructor = AbilityGroupRank;

AbilityGroupRank.prototype.__get_rank = function () {
    // Searching for the highest rank sub-ability.
    var highestRank = 0;
    for (var id in this.abilityGroup) {
        highestRank = this.abilityGroup[id].rank > highestRank ? this.abilityGroup[id].rank : highestRank;
    }
    return highestRank;
};

AbilityGroupRank.prototype.__set_rank = function (newRank) {};

//=============================================================================
// CLASS: Prereq
//=============================================================================

function Prereq(prereqKey, prereqValue) {
    this.key = prereqKey;
    this.value = prereqValue;
}

Prereq.prototype.isSatisfied = function (character) {
    return false;
};

//=============================================================================
// CLASS: AttributePrereq extends Prereq
//=============================================================================

function AttributePrereq(prereqKey, prereqValue) {
    Prereq.call(this, prereqKey, prereqValue);
}

AttributePrereq.prototype = Object.create(Prereq.prototype);
AttributePrereq.prototype.constructor = AttributePrereq;

AttributePrereq.prototype.isSatisfied = function (character) {
    var attributeRank = character.getAttributeRank(this.key);
    return attributeRank.rank >= this.value;
};

//=============================================================================
// CLASS: AbilityPrereq extends Prereq
//=============================================================================

function AbilityPrereq(prereqKey, prereqValue) {
    Prereq.call(this, prereqKey, prereqValue);
}

AbilityPrereq.prototype = Object.create(Prereq.prototype);
AbilityPrereq.prototype.constructor = AbilityPrereq;

AbilityPrereq.prototype.isSatisfied = function (character) {
    var abilityRank = character.getAbilityRank(this.key);
    return abilityRank.rank >= this.value;
};

//=============================================================================
// CLASS: EssencePrereq extends Prereq
//=============================================================================

function EssencePrereq(prereqValue) {
    Prereq.call(this, null, prereqValue);
}

EssencePrereq.prototype = Object.create(Prereq.prototype);
EssencePrereq.prototype.constructor = EssencePrereq;

EssencePrereq.prototype.isSatisfied = function (character) {
    return character.essence >= this.value;
};

//=============================================================================
// CLASS: CharmPrereq extends Prereq
//=============================================================================

function CharmPrereq(prereqKey, prereqValue) {
    Prereq.call(this, prereqKey, prereqValue);
}

CharmPrereq.prototype = Object.create(Prereq.prototype);
CharmPrereq.prototype.constructor = CharmPrereq;

//CharmPrereq.prototype.isSatisfied(character) {
//  // TODO: Check if charm exists in character.
//  return false;
//}

//=============================================================================
// CLASS: CharmCountPrereq extends Prereq
//=============================================================================

function CharmCountPrereq(prereqKey, prereqValue) {
    Prereq.call(this, prereqKey, prereqValue);
}

CharmCountPrereq.prototype = Object.create(Prereq.prototype);
CharmCountPrereq.prototype.constructor = CharmCountPrereq;

//CharmCountPrereq.prototype.isSatisfied(character) {
//  // TODO: Check if character has enough charms of the specified type.
//  return false;
//}

//=============================================================================
// CLASS: AndPrereq extends Prereq
//=============================================================================

function AndPrereq(firstPrereq, secondPrereq) {
    Prereq.call(this, null, null);
    this.firstPrereq = firstPrereq;
    this.secondPrereq = secondPrereq;
}

AndPrereq.prototype = Object.create(Prereq.prototype);
AndPrereq.prototype.constructor = AndPrereq;

//=============================================================================
// CLASS: OrPrereq extends Prereq
//=============================================================================

function OrPrereq(firstPrereq, secondPrereq) {
    Prereq.call(this, null, null);
    this.firstPrereq = firstPrereq;
    this.secondPrereq = secondPrereq;
}

OrPrereq.prototype = Object.create(Prereq.prototype);
OrPrereq.prototype.constructor = OrPrereq;