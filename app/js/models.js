//=============================================================================
// CLASS: ExaltedCharacter
//=============================================================================

function ExaltedCharacter() {
  this.name = "";
  this.playerName = "";
  this.concept = "Big old sucka";

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
  for(var attribute in this.AttributeEnum) {
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
  this.martialArtsRanks = {};
  this.craftsRanks = {};
  for (var ability in this.AbilityEnum) {
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
  enumerable:true,
  get: function() {
    return this.__get_rank();
  },
  set: function(newRank) {
    this.__set_rank(newRank);
  }
});

AbilityRank.prototype.__get_rank = function() {
  return this._rank;
};

AbilityRank.prototype.__set_rank = function(newRank) {
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

AbilityGroupRank.prototype.__get_rank = function() {
  // Searching for the highest rank sub-ability.
  var highestRank = 0;
  for (var id in this.abilityGroup) {
    highestRank = (this.abilityGroup[id].rank > highestRank) ? this.abilityGroup[id].rank : highestRank;
  }
  return highestRank;
}

AbilityGroupRank.prototype.__set_rank = function(newRank) {}

