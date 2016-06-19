class MrGoneSheetFiller {
    constructor(characterData) {
        this.dataMap = this.createDataMap(characterData);
    }

    createDataMap(characterData) {
        let dataMap = {
            'name': characterData.name,
            'player': characterData.playerName,
            'caste': characterData.caste,
            'concept': characterData.concept,
            'anima': characterData.anima,
            'SA': characterData.supernalAbility
        };

        this.fillSheet(dataMap, characterData);
        return dataMap;
    }

    fillSheet(dataMap, characterData) {
        this.fillAttributeDots(dataMap, characterData);
        this.fillAbilityDots(dataMap, characterData);
        this.fillMerits(dataMap, characterData);
    }

    fillAttributeDots(dataMap, characterData) {
        let attributes = {
            'STRENGTH': ['dot1', 'dot2', 'dot3', 'dot4', 'dot5'],
            'DEXTERITY': ['dot9', 'dot10', 'dot11', 'dot12', 'dot13'],
            'STAMINA': ['dot17', 'dot18', 'dot19', 'dot20', 'dot21'],
            'CHARISMA': ['dot6', 'dot7', 'dot8', 'dot8a', 'dot8az'],
            'MANIPULATION': ['dot14', 'dot15', 'dot16', 'dot16a', 'dot16az'],
            'APPEARANCE': ['dot22', 'dot23', 'dot24', 'dot24a', 'dot24az'],
            'PERCEPTION': ['dot25', 'dot26', 'dot27', 'dot28', 'dot29'],
            'INTELLIGENCE': ['dot33', 'dot34', 'dot35', 'dot36', 'dot37'],
            'WITS': ['dot41', 'dot42', 'dot43', 'dot44', 'dot45']
        };

        Object.keys(attributes).forEach((key, idx) => {
            this.fillDotRow(dataMap, attributes[key], characterData.attributeRanks[key]._rank);
        });
    }

    fillAbilityDots(dataMap, characterData) {
        let abilities = {
            'ARCHERY': ['dot30', 'dot31', 'dot32', 'dot32a', 'dot32az'],
            'ATHLETICS': ['dot38', 'dot39', 'dot40', 'dot40a', 'dot40az'],
            'AWARENESS': ['dot46', 'dot47', 'dot48', 'dot48a', 'dot48az'],
            'BRAWL': ['dot49', 'dot50', 'dot51', 'dot52', 'dot53'],
            'BUREAUCRACY': ['dot57', 'dot58', 'dot59', 'dot60', 'dot61'],
            'CRAFT': ['dot65', 'dot66', 'dot67', 'dot68', 'dot69'],
            'DODGE': ['dot54', 'dot55', 'dot56', 'dot56a', 'dot56az'],
            'INTEGRITY': ['dot62', 'dot63', 'dot64', 'dot64a', 'dot64az'],
            'INVESTIGATION': ['dot70', 'dot71', 'dot72', 'dot72a', 'dot72az'],
            'LARCENY': ['dot73', 'dot74', 'dot75', 'dot76', 'dot77'],
            'LINGUISTICS': ['dot81', 'dot82', 'dot83', 'dot84', 'dot85'],
            'LORE': ['dot89', 'dot90', 'dot91', 'dot92', 'dot93'],
            'MARTIAL_ARTS': ['dot97', 'dot98', 'dot99', 'dot100', 'dot101'],
            'MEDICINE': ['dot105', 'dot106', 'dot107', 'dot108', 'dot109'],
            'MELEE': ['dot113', 'dot114', 'dot115', 'dot116', 'dot117'],
            'OCCULT': ['dot121', 'dot122', 'dot123', 'dot124', 'dot125'],
            'PERFORMANCE': ['dot129', 'dot130', 'dot131', 'dot132', 'dot133'],
            'PRESENCE': ['dot137', 'dot138', 'dot139', 'dot140', 'dot141'],
            'RESISTANCE': ['dot145', 'dot146', 'dot147', 'dot148', 'dot149'],
            'RIDE': ['dot145q', 'dot146q', 'dot147q', 'dot148q', 'dot149q'],
            'SAIL': ['dot78', 'dot79', 'dot80', 'dot80a', 'dot80az'],
            'SOCIALIZE': ['dot86', 'dot87', 'dot88', 'dot88a', 'dot88az'],
            'STEALTH': ['dot94', 'dot95', 'dot96', 'dot96a', 'dot96az'],
            'SURVIVAL': ['dot102', 'dot103', 'dot104', 'dot104a', 'dot104az'],
            'THROWN': ['dot110', 'dot111', 'dot112', 'dot112a', 'dot112az'],
            'WAR': ['dot118', 'dot119', 'dot120', 'dot120a', 'dot120az']
        };

        for (let i = 0; i < characterData.abilityRanks.length; i++) {
            this.fillDotRow(dataMap, abilities[characterData.abilityRanks[i].abilityId], characterData.abilityRanks[i]._rank);
        }
    }

    fillMerits(dataMap, characterData) {
        let meritsRows = ['merits10', 'merits11', 'merits12', 'merits13', 'merits14',
            'merits15', 'merits16', 'merits17', 'merits18'
        ];
        let meritsDots = [
            ['dot225q', 'dot226q', 'dot227q', 'dot228q', 'dot229q'],
            ['dot150', 'dot151', 'dot152', 'dot152a', 'dot152az'],
            ['dot166', 'dot167', 'dot168', 'dot168a', 'dot168az'],
            ['dot174', 'dot175', 'dot176', 'dot176a', 'dot176az'],
            ['dot182', 'dot183', 'dot184', 'dot184a', 'dot184az'],
            ['dot190', 'dot191', 'dot192', 'dot192a', 'dot192az'],
            ['dot198', 'dot199', 'dot200', 'dot200a', 'dot200az'],
            ['dot206', 'dot207', 'dot208', 'dot208a', 'dot208az'],
            ['dot214', 'dot215', 'dot216', 'dot216a', 'dot216az']
        ];

        let i = 0;
        Object.keys(characterData.meritRanks).forEach((key, idx) => {
                if (i < meritsRows.length) {
                    dataMap[meritsRows[i]] = characterData.meritRanks[key].abilityId;
                    this.fillDotRow(dataMap, meritsDots[i], characterData.meritRanks[key]._rank);
                    i++;
                }
            });
        }

        fillDotRow(dataMap, fieldNames, value) {
            for (let i = 0; i < value; i++) {
                dataMap[fieldNames[i]] = 'Yes';
            }
        }
    }

    module.exports = MrGoneSheetFiller;