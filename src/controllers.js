'use strict';

/* Controllers */

var lytekControllers = angular.module("lytekControllers", []);

lytekControllers.controller("CharacterSheetCtrl", ["$scope", "MartialArts", "Merits",
    function($scope, MartialArts, Merits) {

        //=========================================================================
        // fetchResource(resource, resultsArray)
        //=========================================================================
        $scope.fetchResource = function(resource, resultsArray) {
            resource.$promise.then(function(result) {
                for (var i = 0; i < result.length; i++) {
                    resultsArray[result[i].id] = result[i];
                }
            });
        }

        //=========================================================================
        // fetchMartialArts()
        //=========================================================================
        $scope.fetchMartialArts = function() {
            $scope.fetchResource(MartialArts.query(), $scope.martialArts);
        };

        //=========================================================================
        // fetchMerits()
        //=========================================================================
        $scope.fetchMerits = function() {
            $scope.fetchResource(Merits.query(), $scope.merits);
        };

        //=========================================================================
        // Initialization
        //=========================================================================

        // Flag indicating if the character is in the process of character creation.
        var newCharacter = true;
        $scope.totalBonusPoints = 15;
        $scope.spentBonusPoints = 0;

        $scope.character = new SolarCharacter();
        $scope.character.name = "Damascus";
        $scope.character.playerName = "Luke";
        $scope.character.caste = SolarCasteEnum.ZENITH;

        $scope.casteList = [SolarCasteEnum.DAWN,
            SolarCasteEnum.ZENITH,
            SolarCasteEnum.TWILIGHT,
            SolarCasteEnum.NIGHT,
            SolarCasteEnum.ECLIPSE
        ];

        $scope.conceptPlaceholder = "My character concept is...";
        $scope.animaPlaceholder = "My character's anima looks like...";
        $scope.addMeritPlaceholder = "New merit...";
        $scope.addMartialArtPlaceholder = "New martial art...";
        $scope.addCraftPlaceholder = "New craft...";

        // Fetch the martial arts list.
        $scope.selectedMartialArt = null;
        $scope.martialArts = {};
        $scope.fetchMartialArts();

        // Fetch the merits list.
        $scope.selectedMerit = null;
        $scope.merits = {};
        $scope.fetchMerits();

        // Managing craft abilities.
        $scope.selectedCraft = null;

        //=========================================================================
        // finishCharacterCreation()
        //=========================================================================
        $scope.finishCharacterCreation = function() {
            this.newCharacter = false;
            $scope.totalBonusPoints = 0;
            $scope.spentBonusPoints = 0;
        };

        //=========================================================================
        // isNewCharacter()
        //=========================================================================
        $scope.isNewCharacter = function() {
            return newCharacter;
        };

        //=========================================================================
        // addMerit(newMerit)
        //=========================================================================
        $scope.addMerit = function(newMerit) {
            var merit = $scope.merits[newMerit];
            $scope.character.meritRanks[newMerit] = new AbilityRank(newMerit, merit.availableDots[0]);
        }

        //=========================================================================
        // removeMerit(existingMerit)
        //=========================================================================
        $scope.removeMerit = function(existingMerit) {
            delete $scope.character.meritRanks[existingMerit];
        }

        //=========================================================================
        // labelForMerit(merit)
        //=========================================================================
        $scope.labelForMerit = function(merit) {
            var labelText = merit.name + " (";
            for (var i = 0; i < merit.availableDots.length; i++) {
                labelText += $scope.dotString(merit.availableDots[i]);
                if (merit.availableDots.length == 2) {
                    if (i === 0) {
                        labelText += " or ";
                    }
                } else if (i < merit.availableDots.length - 2) {
                    labelText += ", ";
                } else if (i == merit.availableDots.length - 2) {
                    labelText += ", or ";
                }
            }
            labelText += ")";
            return labelText;
        }

        //=========================================================================
        // dotString(count)
        //=========================================================================
        $scope.dotString = function(count) {
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

        //=========================================================================
        // addMartialArt(newMartialArt)
        //=========================================================================
        $scope.addMartialArt = function(newMartialArt) {
            // Add the martial art to the list with a rank of 0 if it does not
            // already exist.
            if (!$scope.character.martialArtsRanks[newMartialArt]) {
                $scope.character.martialArtsRanks[newMartialArt] = new AbilityRank(newMartialArt, 0);
            }
        };

        //=========================================================================
        // removeMartialArt(existingMartialArt)
        //=========================================================================
        $scope.removeMartialArt = function(existingMartialArt) {
            delete $scope.character.martialArtsRanks[existingMartialArt];
        };

        //=========================================================================
        // addCraft(newCraft)
        //=========================================================================
        $scope.addCraft = function(newCraft) {
            if (!$scope.character.craftsRanks[newCraft]) {
                $scope.character.craftsRanks[newCraft] = new AbilityRank(newCraft, 0);
            }
        };

        //=========================================================================
        // removeCraft(existingCraft)
        //=========================================================================
        $scope.removeCraft = function(existingCraft) {
            delete $scope.character.craftsRanks[existingCraft];
        };
    }
]);

lytekControllers.controller("CharmBrowserCtrl", ["$scope", "$routeParams", "Charms",
    function($scope, $routeParams, Charms) {
        $scope.charms = [];
        $scope.character = new ExaltedCharacter();
        var charmsResource = Charms.query({
            ability: $routeParams.ability
        });

        // When the list of charm is received, build the graph info.
        charmsResource.$promise.then(function(result) {
            $scope.charms = result;

            // Build the list of nodes and edges.
            angular.forEach($scope.charms, function(charm, key) {
                $scope.nodes.add({
                    id: charm.id,
                    label: stringDivider(charm.name, 16, '', '\n')
                });

                angular.forEach(charm.prereqs, function(charmId, key) {
                    $scope.edges.add({
                        id: charmId + charm.id,
                        from: charmId,
                        to: charm.id
                    });
                });
            });
        });

        $scope.nodes = new vis.DataSet();
        $scope.edges = new vis.DataSet();

        $scope.charmData = {
            nodes: $scope.nodes,
            edges: $scope.edges
        };

        $scope.network_options = {
            nodes: {
                customShape: function(options, body, labelModule, image) {
                    return new CharmShape(options, body, labelModule);
                },
                font: {
                    face: 'Sorts Mill Goudy',
                    align: 'center'
                },
                shape: 'box',
            },
            layout: {
                hierarchical: {
                    enabled: true,
                    direction: "UD",
                    levelSeparation: 150,
                    nodeSpacing: 300,
                    treeSpacing: 50
                }
            },
            physics: {
                enabled: false
            }
        };

        function stringDivider(str, width, prefix, postfix) {
            if (str.length > width) {
                var p = width
                for (; p > 0 && !/\s/.test(str[p]); p--) {}
                if (p > 0) {
                    var left = str.substring(0, p);
                    var right = str.substring(p + 1);
                    return prefix + left + postfix + stringDivider(right, width, prefix, postfix);
                }
            }
            return str;
        }
    }
]);

import Box from 'vis';

function CharmShape(options, body, labelModule) {
    Box.call(this, options, body, labelModule);
    console.log('We are making Charm shapes');
}

CharmShape.prototype.resize = function(ctx, selected) {
    Box.call(this, ctx, selected);
    console.log('We are resizing Charm shapes');
    if(this.width < 400) {
        this.width = 400;
    }
    if(this.height < 300) {
        this.height = 400;
    }
}