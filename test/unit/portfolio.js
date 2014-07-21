/* global describe, it */

'use strict';

var expect = require('chai').expect;
var Portfolio = require('../../app/models/portfolio');

describe('Portfolio', function(){
  describe('constructor', function(){
    it('should create a new portfolio object', function(){
      var tech = new Portfolio('Tech Portfolio');

      expect(tech).to.be.instanceof(Portfolio);
      expect(tech.name).to.equal('Tech Portfolio');
      expect(tech.stocks).to.have.length(0);
    });
  });
});

