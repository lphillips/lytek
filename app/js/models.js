var SolarCasteEnum = {
    DAWN: "Dawn",
    ZENITH: "Zenith",
    TWILIGHT: "Twilight",
    NIGHT: "Night",
    ECLIPSE: "Eclipse"
};

function ExaltedCharacter() {
    this.name = "";
    this.playerName = "";
    this.concept = "";
    
    this.strength = 1;
    this.dexterity = 1;
    this.stamina = 1;
    this.charisma = 1;
    this.manipulation = 1;
    this.appearance = 1;
    this.perception = 1;
    this.intelligence = 1;
    this.wits = 1;
}

function SolarCharacter() {
    this.caste = SolarCasteEnum.DAWN;
    this.supernalAbility = "What";
    this.anima = "Yeah";
}

SolarCharacter.prototype = new ExaltedCharacter();
