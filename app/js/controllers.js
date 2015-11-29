'use strict';

/* Controllers */

var lytekControllers = angular.module("lytekControllers", []);

lytekControllers.controller("CharacterSheetCtrl", ["$scope",
  function($scope) {
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
                        SolarCasteEnum.ECLIPSE];
    
    $scope.conceptPlaceholder = "My character concept is...";
    $scope.animaPlaceholder = "My character's anima looks like...";
    
    $scope.finishCharacterCreation = function () {
      this.newCharacter = false;
      $scope.totalBonusPoints = 0;
      $scope.spentBonusPoints = 0;
    };
    
    $scope.isNewCharacter = function() {
      return newCharacter;
    };
  }
]);

lytekControllers.controller("CharmBrowserCtrl", ["$scope", "$routeParams", "Charms",
  function($scope, $routeParams, Charms) {
    $scope.charms = [];
    var charmsResource = Charms.query({ability: $routeParams.ability});
    
    // When the list of charm is received, build the graph info.
    charmsResource.$promise.then(function(result) {
      $scope.charms = result;
      
      // Build the list of nodes and edges.
      angular.forEach ($scope.charms, function(charm, key) {
        $scope.nodes.add({id: charm.id, label: charm.name});

        angular.forEach (charm.prereqs, function(charmId, key) {
          $scope.edges.add({id: charmId + charm.id, from: charmId, to: charm.id});
        });
      });
    });
    
    $scope.nodes = new vis.DataSet();
    $scope.edges = new vis.DataSet();
//    
//    $scope.nodes.add([
//      {id: "SolarArchery001", label: "Wise Arrow", level: 1},
//      {id: "SolarArchery002", label: "Sight Without Eyes", level: 2},
//      {id: "SolarArchery003", label: "Blood Without Balance", level: 3},
//      {id: "SolarArchery004", label: "Force Without Fire", level: 3},
//      {id: "SolarArchery005", label: "Trance of Unhesitating Speed", level: 2},
//      {id: "SolarArchery006", label: "Phantom Arrow Technique", level: 1},
//      {id: "SolarArchery007", label: "Fiery Arrow Attack", level: 2},
//      {id: "SolarArchery008", label: "There Is No Wind", level: 3}, 
//      {id: "SolarArchery009", label: "Accuracy Without Distance", level: 4},
//      {id: "SolarArchery010", label: "Arrow Storm Technique", level: 3},
//      {id: "SolarArchery011", label: "Flashing Vengeance Draw", level: 3},
//      {id: "SolarArchery012", label: "Hunter's Swift Answer", level: 4},
//      {id: "SolarArchery013", label: "Immaculate Golden Bow", level: 2},
//      {id: "SolarArchery014", label: "Dazzling Flare Attack", level: 3},
//      {id: "SolarArchery015", label: "Seven Omens Shot", level: 5},
//      {id: "SolarArchery016", label: "Revolving Bow Discipline", level: 4},
//      {id: "SolarArchery017", label: "Finishing Snipe", level: 5},
//      {id: "SolarArchery018", label: "Rain of Feathered Death", level: 2},
//      {id: "SolarArchery019", label: "Shadow-Seeking Arrow", level: 4},
//      {id: "SolarArchery020", label: "Searing Sunfire Interdiction", level: 4},
//      {id: "SolarArchery021", label: "Solar Spike", level: 4},
//      {id: "SolarArchery022", label: "Heart-Eating Incineration", level: 5},
//      {id: "SolarArchery023", label: "Dust and Ash Sleight", level: 6},
//      {id: "SolarArchery024", label: "Heavens Crash Down", level: 5},
//      {id: "SolarArchery025", label: "Streaming Arrow Stance", level: 6},
//      {id: "SolarArchery026", label: "Whispered Prayer of Judgment", level: 7}
//    ]);
//    
//    $scope.edges.add([
//      {from: "SolarArchery001", to: "SolarArchery002"},
//      {from: "SolarArchery002", to: "SolarArchery003"},
//      {from: "SolarArchery002", to: "SolarArchery004"},
//      {from: "SolarArchery001", to: "SolarArchery005"},
//      {from: "SolarArchery006", to: "SolarArchery007"},
//      {from: "SolarArchery002", to: "SolarArchery008"},
//      {from: "SolarArchery004", to: "SolarArchery009"},
//      {from: "SolarArchery005", to: "SolarArchery010"},
//      {from: "SolarArchery005", to: "SolarArchery011"},
//      {from: "SolarArchery011", to: "SolarArchery012"},
//      {from: "SolarArchery006", to: "SolarArchery013"},
//      {from: "SolarArchery007", to: "SolarArchery014"},
//      {from: "SolarArchery009", to: "SolarArchery015"},
//      {from: "SolarArchery010", to: "SolarArchery016"},
//      {from: "SolarArchery012", to: "SolarArchery017"},
//      {from: "SolarArchery006", to: "SolarArchery018"},
//      {from: "SolarArchery014", to: "SolarArchery019"},
//      {from: "SolarArchery014", to: "SolarArchery020"},
//      {from: "SolarArchery014", to: "SolarArchery021"},
//      {from: "SolarArchery021", to: "SolarArchery022"},
//      {from: "SolarArchery015", to: "SolarArchery023"},
//      {from: "SolarArchery016", to: "SolarArchery024"},
//      {from: "SolarArchery017", to: "SolarArchery025"},
//      {from: "SolarArchery025", to: "SolarArchery026"}
//    ]);
    
    $scope.charmData = {
      nodes: $scope.nodes,
      edges: $scope.edges
    };
    
    $scope.network_options = {
        layout: {
            hierarchical: {
              enabled: true,
              direction: "UD"
            }
        },
        physics: {
            enabled: true,
            hierarchicalRepulsion: {
              nodeDistance: 200
            }
        }
    };
  }
]);