'use strict';

/* jasmine spec for prereq parser */
describe('Lytek prereq parser', function() {
  
  // ATTENTION!!!!
  // The generated parse function does not seem to implement toString()
  // correctly.  If you see a test fail due to
  // 'TypeError: Function.prototype.toString is not generic', 
  // that means there was a parse error.
  
  it('should parse an Attribute prereq', function() {
    expect(function () {
      var prereq = prereqParser.parse('ATTRIBUTE:STRENGTH:3');
      expect(prereq instanceof AttributePrereq).toBe(true);
      expect(prereq.key).toEqual('STRENGTH');
      expect(prereq.value).toEqual(3);
    }).not.toThrow();
  });
  
  it('should parse an Ability prereq', function() {
    expect(function () {
      var prereq = prereqParser.parse('ABILITY:MEDICINE:3');
      expect(prereq instanceof AbilityPrereq).toBe(true);
      expect(prereq.key).toEqual('MEDICINE');
      expect(prereq.value).toEqual(3);
    }).not.toThrow();
  });
  
  it('should parse an Essence prereq', function() {
    expect(function () {
      var prereq = prereqParser.parse('ESSENCE:3');
      expect(prereq instanceof EssencePrereq).toBe(true);
      expect(prereq.key).toBe(null);
      expect(prereq.value).toEqual(3);
    }).not.toThrow();
  });
  
  it('should parse an And prereq', function() {
    expect(function () {
      var prereq = prereqParser.parse('ESSENCE:3 & ABILITY:MEDICINE:3');
      expect(prereq instanceof AndPrereq).toBe(true);
      expect(prereq.firstPrereq instanceof EssencePrereq).toBe(true);
      expect(prereq.secondPrereq instanceof AbilityPrereq).toBe(true);
    }).not.toThrow();
  });
  
  it('should parse an Or prereq', function() {
    expect(function () {
      var prereq = prereqParser.parse('ESSENCE:3 | ABILITY:MEDICINE:3');
      expect(prereq instanceof OrPrereq).toBe(true);
      expect(prereq.firstPrereq instanceof EssencePrereq).toBe(true);
      expect(prereq.secondPrereq instanceof AbilityPrereq).toBe(true);
    }).not.toThrow();
  });
  
  it('should parse a prereq with parens', function() {
    expect(function () {
      var prereq = prereqParser.parse('(ESSENCE:3 & ABILITY:MEDICINE:3) & ATTRIBUTE:STRENGTH:3');
      expect(prereq instanceof AndPrereq).toBe(true);
      expect(prereq.firstPrereq instanceof AndPrereq).toBe(true);
      expect(prereq.secondPrereq instanceof AttributePrereq).toBe(true);
    }).not.toThrow();
  });
  
});