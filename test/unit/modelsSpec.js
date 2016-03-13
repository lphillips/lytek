'use strict';

/* jasmine spec for prereq parser */
describe('Lytek models', function() {
  
  describe('ExaltedCharacter', function() {
    
    it('should return the right AbilityRank', function() {
      var character = new ExaltedCharacter();
      
      var abilityRank = character.getAbilityRank('DODGE');
      expect(abilityRank.abilityId).toEqual('DODGE');
      expect(abilityRank.rank).toEqual(0);
    });
    
  });
  
  describe('AbilityPrereq', function() {
    
    it('should correctly check the prerequisite', function() {
      var mockAbilityRank = new Object();
      var mockCharacter = new Object();
      mockAbilityRank.rank = 3;
      mockAbilityRank.ability = 'DODGE';
      mockCharacter.getAbilityRank = function(ability) {
        return mockAbilityRank;
      }
      
      var satisfiedPrereq = new AbilityPrereq('DODGE', 2);
      expect(satisfiedPrereq.isSatisfied(mockCharacter)).toBe(true);
      
      var matchedPrereq = new AbilityPrereq('DODGE', 3);
      expect(matchedPrereq.isSatisfied(mockCharacter)).toBe(true);
      
      var unsatisifedPrereq = new AbilityPrereq('DODGE', 4);
      expect(unsatisifedPrereq.isSatisfied(mockCharacter)).toBe(false);
    });
    
  });
  
  describe('AttributePrereq', function() {
    
    it('should correctly check the prerequisite', function() {
      var mockAttributeRank = new Object();
      var mockCharacter = new Object();
      mockAttributeRank.rank = 3;
      mockAttributeRank.ability = 'STRENGTH';
      mockCharacter.getAttributeRank = function(attribute) {
        return mockAttributeRank;
      }
      
      var satisfiedPrereq = new AttributePrereq('STRENGTH', 2);
      expect(satisfiedPrereq.isSatisfied(mockCharacter)).toBe(true);
      
      var matchedPrereq = new AttributePrereq('STRENGTH', 3);
      expect(matchedPrereq.isSatisfied(mockCharacter)).toBe(true);
      
      var unsatisifedPrereq = new AttributePrereq('STRENGTH', 4);
      expect(unsatisifedPrereq.isSatisfied(mockCharacter)).toBe(false);
    });
    
  });
  
  describe('EssencePrereq', function() {
    
    it('should correctly check the prerequisite', function() {
      var mockCharacter = new Object();
      mockCharacter.essence = 3;
      
      var satisfiedPrereq = new EssencePrereq(2);
      expect(satisfiedPrereq.isSatisfied(mockCharacter)).toBe(true);
      
      var matchedPrereq = new EssencePrereq(3);
      expect(matchedPrereq.isSatisfied(mockCharacter)).toBe(true);
      
      var unsatisifedPrereq = new EssencePrereq(4);
      expect(unsatisifedPrereq.isSatisfied(mockCharacter)).toBe(false);
    });
    
  });
  
});