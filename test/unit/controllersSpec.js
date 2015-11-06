'use strict';

/* jasmine specs for controllers go here */
describe('Lytek controllers', function() {
//  console.log('unit test: ' + this.constructor)
  
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
    var scope, ctrl, $httpBackend, Charms,
        testCharms = function() {
          return [{"ability": "Archery",
                    "name": "Wise Arrow",
                    "cost": "1m",
                    "ability_min": "2",
                    "essence_min": "1",
                    "type": "Supplemental",
                    "keywords": ["Uniform"],
                    "duration": "Instant",
                    "prereqs": null
          }]
        };
    
    beforeEach(inject(function(_$httpBackend_, $injector, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('charms/testCharms.json').
          respond(200, testCharms());
      
      Charms = $injector.get("Charms");
      spyOn(Charms, "query").and.callFake(function() {
        return testCharms();
      });
      
      $routeParams.ability = "testCharms";
      scope = $rootScope.$new();
      ctrl = $controller('CharmBrowserCtrl', {$scope: scope});
    }));
    
    it('should fetch charm data', function() {      
      expect(Charms.query).toHaveBeenCalledWith({"ability":"testCharms"});
      expect(scope.charms).toEqual(testCharms());
    });
  });
  
});