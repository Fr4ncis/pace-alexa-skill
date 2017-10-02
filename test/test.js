var rewire = require('rewire');
var assert = require('assert');

var pacer = rewire('./../pacer.js');

describe('Pacer', function() {
  describe('#durationStrToSeconds()', function() {
    var durationStrToSeconds = pacer.__get__('durationStrToSeconds');

    it('should return 3600 for PT1H', function() {
      assert.equal(durationStrToSeconds('PT1H'), 3600);
    });

    it('should return 7210 for PT2H10S', function() {
      assert.equal(durationStrToSeconds('PT2H10S'), 7210);
    });

    it('should return 12005 for PT3H20M5S', function() {
      assert.equal(durationStrToSeconds('PT3H20M5S'), 12005);
    });

    it('should return 0 for P4', function() {
      assert.equal(0, durationStrToSeconds('P4'));
    });
  });

  describe('#paceWithDuration()', function() {
    var paceWithDuration = pacer.__get__('paceWithDuration');

    it('should return for 2h', function() {
      assert.deepEqual(paceWithDuration(7200), {m: 2, s: 51});
    });

    it('should return for 3h15m39s', function() {
      assert.deepEqual(paceWithDuration(11739), {m: 4, s: 38});
    });

    it('should return 4 min/km for 2h48m47s', function() {
      assert.deepEqual(paceWithDuration(10127), {m: 4, s: 0});
    });

    it('should return 5 min/km for 3h30m40s', function() {
      assert.deepEqual(paceWithDuration(12640), {m: 5, s:0});
    });
  });

  describe('#paceStringWithDurationString()', function() {
    it('should return for 2h', function() {
      assert.equal(pacer.paceStringWithDurationString('PT2H'), `2'51"`);
    });

    it('should return for 3h15m39s', function() {
      assert.equal(pacer.paceStringWithDurationString('PT3H15M39S'), `4'38"`);
    });
  });
});
