import {
    ExaltedCharacter
}
from '../models.js';
import CharmShape from '../charmshape';
import angular from 'angular';
import vis from 'vis';
import 'vis/dist/vis.css';

export
default class CharmBrowserController {
    constructor($mdSidenav, $routeParams, Charms, CharacterService) {
        /* @ngInject */
        this.charms = {};
        this.character = CharacterService.character;
        this.selectedCharm = null;

        let charmsResource = Charms.query({
            ability: $routeParams.ability
        });

        // When the list of charm is received, build the graph info.
        charmsResource.$promise.then((result) => {
            // Build the list of nodes and edges.
            let nodeLevels = {};
            this.selectedCharm = result[0];
            angular.forEach(result, (charm, key) => {
                this.charms[charm.id] = charm;
                nodeLevels[charm.id] = this.maxPrereqLevel(nodeLevels, charm) + 1;
                this.nodes.add({
                    id: charm.id,
                    label: this.stringDivider(charm.name, 16, '', '\n'),
                    level: nodeLevels[charm.id]
                });

                angular.forEach(charm.prereqs, (charmId, key) => {
                    this.edges.add({
                        id: charmId + charm.id,
                        from: charmId,
                        to: charm.id
                    });
                });
            });
        });

        this.nodes = new vis.DataSet();
        this.edges = new vis.DataSet();

        this.charmData = {
            nodes: this.nodes,
            edges: this.edges
        };

        this.network_options = {
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
    }

    openLeftMenu() {
        $mdSidenav('left').toggle();
    }

    addCharm(charm) {
        this.character.charms[charm.id] = charm;
    }

    onSelectNode(params) {
        let nodeId = params.nodes[0];
        this.selectedCharm = this.charms[nodeId];
    }

    stringDivider(str, width, prefix, postfix) {
        if (str.length > width) {
            let p = width;
            for (; p > 0 && !/\s/.test(str[p]); p--) {}
            if (p > 0) {
                let left = str.substring(0, p);
                let right = str.substring(p + 1);
                return prefix + left + postfix + this.stringDivider(right, width, prefix, postfix);
            }
        }
        return str;
    }

    maxPrereqLevel(nodeLevels, charm) {
        let maxLevel = 0;
        for (let idx = 0; idx < charm.prereqs.length; idx++) {
            maxLevel = Math.max(maxLevel, nodeLevels[charm.prereqs[idx]]);
        }
        return maxLevel;
    }
}