'use strict';

/* jasmine specs for controllers go here */
describe('Lytek controllers', function() {
  var customMatchers = {
    toEqualData: function(util, customEqualityTesters) {
      return {
        compare: function(actual, expected) {
          return angular.equals(actual, expected);
        }
      }
    }
  }
  
  beforeEach(function() {
    jasmine.addMatchers(customMatchers);
  });
  
  beforeEach(module('lytekApp'));
  beforeEach(module('lytekServices'));
  
  describe('CharacterSheetCtrl', function() {
    var scope, ctrl;
    
    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('CharacterSheetCtrl', {$scope: scope});
    }));
    
    it('should create a Character', function() {
      expect(scope.character.name).toBe('Damascus');
    });
  });
  
  describe('CharmBrowserCtrl', function() {
    var scope, ctrl, $httpBackend, Charms, deferredQuery,
        testCharms = function() {
          return [{
                    "ability": "Archery",
                    "id": "Charm1Id",
                    "name": "Charm 1",
                    "cost": "1m",
                    "ability_min": "2",
                    "essence_min": "1",
                    "type": "Supplemental",
                    "keywords": ["Uniform"],
                    "duration": "Instant",
                    "prereqs": []
                  },
                  {
                    "ability": "Archery",
                    "id": "Charm2Id",
                    "name": "Charm 2",
                    "cost": "1m",
                    "ability_min": "2",
                    "essence_min": "1",
                    "type": "Supplemental",
                    "keywords": ["Uniform"],
                    "duration": "Instant",
                    "prereqs": ["Charm1Id"]
                  }]
        };
    
    beforeEach(inject(function($injector, $rootScope, $routeParams, $controller, $q) {
      Charms = $injector.get("Charms");
      spyOn(Charms, "query").and.callFake(function() {
        var deferred = $q.defer();
        deferred.resolve(testCharms());
        return {$promise: deferred.promise};
      });
      
      $routeParams.ability = "testCharms";
      scope = $rootScope.$new();
      ctrl = $controller("CharmBrowserCtrl", {$scope: scope});
    }));
    
    it("should fetch data and build a charm graph", function() {
      expect(Charms.query).toHaveBeenCalledWith({"ability":"testCharms"});
      expect(scope.charms).toEqual([]);
      scope.$apply();
      
      expect(scope.charms).toEqual(testCharms());
      expect(scope.nodes.length).toBe(2);
      expect(scope.edges.length).toBe(1);
      
      expect(scope.nodes.get("Charm1Id").label).toEqual("Charm 1");
      expect(scope.nodes.get("Charm2Id").label).toEqual("Charm 2");
      expect(scope.edges.get("Charm1IdCharm2Id").from).toEqual("Charm1Id");
      expect(scope.edges.get("Charm1IdCharm2Id").to).toEqual("Charm2Id");
      expect(scope.charmData).toBeDefined();
    })
  });
  
});