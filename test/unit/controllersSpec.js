'use strict';

/* jasmine specs for controllers go here */
describe('Lytek controllers', function() {
  
  beforeEach(module('lytekApp'));
  
  describe('CharacterSheetCtrl', function() {
    var scope, ctrl;
    
    beforeEach(inject(function($rootScope, $controller) {
//      $httpBackend = _$httpBackend_;
//      $httpBackend.expectGET('phones/phones.json').
//          respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);

      scope = $rootScope.$new();
      ctrl = $controller('CharacterSheetCtrl', {$scope: scope});
    }));
    
    it('should create a Character', function() {
      expect(scope.character.name).toBe('Damascus');
    });
  });
  
});