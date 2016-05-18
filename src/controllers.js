'use strict';

import {
    SolarCharacter, ExaltedCharacter, AbilityRank
}
from './models';
import CharacterSheetController from './controllers/CharacterSheetController';
import CharmShape from './charmshape';
import vis from 'vis';
import 'vis/dist/vis.css';

/* Controllers */

var lytekControllers = angular.module('lytekControllers', []);
export
default lytekControllers;

lytekControllers.controller("CharacterSheetCtrl", CharacterSheetController);

lytekControllers.controller("CharmBrowserCtrl", ["$scope", "$mdSidenav", "$routeParams", "Charms", 'CharacterService',
    function($scope, $mdSidenav, $routeParams, Charms, CharacterService) {
        $scope.charms = {};
        $scope.character = CharacterService.character;
        $scope.selectedCharm = null;
        
        var charmsResource = Charms.query({
            ability: $routeParams.ability
        });

        // When the list of charm is received, build the graph info.
        charmsResource.$promise.then(function(result) {
            // Build the list of nodes and edges.
            var nodeLevels = {};
            $scope.selectedCharm = result[0];
            angular.forEach(result, function(charm, key) {
                $scope.charms[charm.id] = charm;
                nodeLevels[charm.id] = maxPrereqLevel(nodeLevels, charm) + 1;
                $scope.nodes.add({
                    id: charm.id,
                    label: stringDivider(charm.name, 16, '', '\n'),
                    level: nodeLevels[charm.id]
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

        $scope.onSelectNode = function(params) {
            let nodeId = params.nodes[0];
            $scope.selectedCharm = $scope.charms[nodeId];
        };

        $scope.network_options = {
            autoResize: true,
            height: '100%',
            width: '100%',
            nodes: {
                customShape: function customShape(options, body, labelModule, image) {
                    return new CharmShape(options, body, labelModule);
                },
                font: {
                    face: 'Sorts Mill Goudy',
                    align: 'center'
                }
            },
            edges: {
                arrows: {
                    to: true
                }
            },
            layout: {
                hierarchical: {
                    enabled: true,
                    direction: 'UD',
                    sortMethod: 'directed',
                    nodeSpacing: 200
                }
            },
            physics: {
                enabled: false
            }
        };

        $scope.openLeftMenu = function() {
            $mdSidenav('left').toggle();
        };
        
        $scope.addCharm = function(charm) {
            console.log(charm);
            $scope.character.charms[charm.id] = charm; 
        };

        function stringDivider(str, width, prefix, postfix) {
            if (str.length > width) {
                var p = width;
                for (; p > 0 && !/\s/.test(str[p]); p--) {}
                if (p > 0) {
                    var left = str.substring(0, p);
                    var right = str.substring(p + 1);
                    return prefix + left + postfix + stringDivider(right, width, prefix, postfix);
                }
            }
            return str;
        }

        function maxPrereqLevel(nodeLevels, charm) {
            var maxLevel = 0;
            for (var idx = 0; idx < charm.prereqs.length; idx++) {
                maxLevel = Math.max(maxLevel, nodeLevels[charm.prereqs[idx]]);
            }
            return maxLevel;
        }
    }
]);