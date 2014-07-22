/* global describe, it */

'use strict';

var expect = require('chai').expect;
var Client = require('../../app/models/client');
var Portfolio = require('../../app/models/portfolio');
var Stock = require('../../app/models/stock');

describe('Client', function(){
  describe('constructor', function(){
    it('should create a new client object', function(){
      var bob = new Client('Bob Smith', 50000);

      expect(bob).to.be.instanceof(Client);
      expect(bob.name).to.equal('Bob Smith');
      expect(bob.cash).to.equal(50000);
      expect(bob.portfolios).to.have.length(0);
    });
  });

  describe('#purchase', function(){
    it('should purchase stock', function(done){
      var bob = new Client('Bob Smith', 50000);
      bob.purchase('aapl', 10, 'Tech Portfolio', function(){
        expect(bob.cash).to.be.below(50000);
        expect(bob.position()).to.be.above(0);
        expect(bob.portfolios).to.have.length(1);
        done();
      });
    });

    it('should NOT purchase stock - not enough money', function(done){
      var bob = new Client('Bob Smith', 15);
      bob.purchase('aapl', 10, 'Tech Portfolio', function(){
        expect(bob.cash).to.equal(15);
        expect(bob.position()).to.equal(0);
        expect(bob.portfolios).to.have.length(0);
        done();
      });
    });
  });

  describe('#sell', function(){
    it('should sell stock', function(done){
      var bob = new Client('Bob Smith', 0);
      var tech = new Portfolio('Tech Stocks');
      var aapl = new Stock('aapl', 10, 75);
      var msft = new Stock('msft', 20, 50);

      tech.stocks.push(aapl, msft);
      bob.portfolios.push(tech);

      bob.sell('aapl', 5, 'Tech Stocks', function(){
        expect(bob.cash).to.be.above(0);
        expect(bob.position()).to.be.above(0);
        expect(bob.portfolios).to.have.length(1);
        done();
      });
    });

    it('should NOT sell stock - not enought to sell', function(done){
      var bob = new Client('Bob Smith', 100);
      var tech = new Portfolio('Tech Stocks');
      var aapl = new Stock('aapl', 10, 75);
      var msft = new Stock('msft', 20, 50);

      tech.stocks.push(aapl, msft);
      bob.portfolios.push(tech);

      bob.sell('aapl', 20, 'Tech Stocks', function(){
        expect(bob.cash).to.equal(100);
        done();
      });
    });
  });
});

