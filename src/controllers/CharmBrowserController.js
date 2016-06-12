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
    constructor($scope, $document, $mdSidenav, CharacterService) {
        /* @ngInject */
        this.$scope = $scope;
        this.charmNetworkName = 'charmTreeNetwork';
        this.$mdSidenav = $mdSidenav;
        this.charmTreeNetwork = null;

        this.character = CharacterService.character;
        this.selectedCharm = null;

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

    get charmTreeNetwork() {
        return this._charmTreeNetwork;
    }

    set charmTreeNetwork(network) {
        this._charmTreeNetwork = network;
        if (this._charmTreeNetwork) {
            this._charmTreeNetwork.on('selectNode', (params) => {
                this.onSelectNode(params);
            });
        }
    }

    openLeftMenu(menuName) {
        this.$mdSidenav(menuName).toggle();
    }
    
    getResource(charmTreeName) {
        return null;
    }

    loadCharmTree(charmTreeName) {
        // Clear the previously loaded charms.
        this.charms = {};

        // Begin the load of the new charm trees.
        let charmsResource = this.getResource(charmTreeName);

        // When the list of charm is received, build the graph info.
        charmsResource.$promise.then((result) => {
            // Build the list of nodes and edges.
            let nodeLevels = {};
            this.selectedCharm = result[0];

            let nodes = new vis.DataSet();
            let edges = new vis.DataSet();
            let charmData = {
                nodes: nodes,
                edges: edges
            };
            angular.forEach(result, (charm, key) => {
                this.charms[charm.id] = charm;
                nodeLevels[charm.id] = this.maxPrereqLevel(nodeLevels, charm) + 1;
                nodes.add({
                    id: charm.id,
                    label: this.stringDivider(charm.name, 16, '', '\n'),
                    level: nodeLevels[charm.id]
                });

                angular.forEach(charm.prereqs, (charmId, key) => {
                    edges.add({
                        id: charmId + charm.id,
                        from: charmId,
                        to: charm.id
                    });
                });
            });

            this.charmTreeNetwork.setOptions(this.network_options);
            this.charmTreeNetwork.setData(charmData);
            this.charmTreeNetwork.redraw();
        });
    }

    addCharm(charm) {
        this.character.charms[charm.id] = charm;
    }

    onSelectNode(params) {
        this.$scope.$apply(() => {
            let nodeId = params.nodes[0];
            this.selectedCharm = this.charms[nodeId];
        });
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