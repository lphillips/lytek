//=============================================================================
// CLASS: ExaltedCharacter
//=============================================================================

function ExaltedCharacter() {
  this.name = "";
  this.playerName = "";
  this.concept = "Big old sucka";

  this.strength = 1;
  this.dexterity = 1;
  this.stamina = 1;
  this.charisma = 1;
  this.manipulation = 1;
  this.appearance = 1;
  this.perception = 1;
  this.intelligence = 1;
  this.wits = 1;
  
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
  this.martialArtsRanks = [];
  this.craftsRanks = [];
  for (ability in this.AbilityEnum) {
    var newAbilityRank = null;
    
    if (ability === "CRAFT") {
      newAbilityRank = new AbilityGroupRank(ability, this.craftsRanks);
    }
    else if (ability == "MARTIAL_ARTS") {
      newAbilityRank = new AbilityGroupRank(ability, this.martialArtsRanks);
    }
    else {
      newAbilityRank = new AbilityRank(ability, 0);
    }
    this.abilityRanks.push(newAbilityRank);
  }
  
  this.spentXP = 0;
  this.totalXP = 0;
}

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
}

Object.defineProperty(AbilityRank.prototype, "rank", {
  enumerable:true,
  get: function() {
    return this._rank;
  },
  set: function(newRank) {
    this._rank = newRank;
  }
});

//=============================================================================
// CLASS: AbilityGroupRank extends AbilityRank
//=============================================================================

function AbilityGroupRank(abilityId, abilitySubList) {
  AbilityRank.call(this, abilityId, 0);
  this.abilitySubList = abilitySubList;
}

Object.defineProperty(AbilityGroupRank.prototype, "rank", {
  get: function() {
    // Searching for the highest rank sub-ability.
    var highestRank = 0;
    for (var rankObj in this.abilitySubList) {
      highestRank = (rankObj.rank > highestRank) ? rankObj.rank : highestRank;
    }
    return highestRank;
  },
  set: function(newRank) {}
});

AbilityGroupRank.prototype = Object.create(AbilityRank.prototype);
AbilityGroupRank.prototype.constructor = AbilityGroupRank;