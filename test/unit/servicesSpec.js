'use strict';

/* jasmine specs for controllers go here */
describe("Lytek controllers", function() {
  beforeEach(module("lytekApp"));
  
  describe("Charms", function() {
    var Charms, $httpBackend;
    
    beforeEach(inject(function($injector, _$httpBackend_) {
      $httpBackend = _$httpBackend_;
      Charms = $injector.get("Charms");
    }));
    
    // Test service availability
    it("should be available", function() {
      expect(Charms).toBeDefined();
    });
    
    // Test that the right request is made.
    it("should request the right charms", function() {
      $httpBackend.expectGET("charms/testRequest.json").
        respond(200, {"result": "Success"});
      Charms.get({"ability":"testRequest"});
    });
  });
});