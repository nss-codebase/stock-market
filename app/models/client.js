'use strict';

var Stock = require('./stock');
var Portfolio = require('./portfolio');

function Client(name, deposit){
  this.name = name;
  this.cash = deposit;
  this.portfolios = [];
}

Client.prototype.purchase = function(symbol, amount, name, cb){
  var self = this;

  Stock.getQuote(symbol, function(quote){
    if(self.cash >= (quote * amount)){
      self.cash -= (quote * amount);

      var portfolio = Client.findPortfolio(self.portfolios, name);
      if(!portfolio){
        portfolio = new Portfolio(name);
        self.portfolios.push(portfolio);
      }

      portfolio.add(symbol, amount, quote);
    }

    cb();
  });
};

Client.prototype.sell = function(symbol, amount, name, cb){
  var self = this;

  var portfolio = Client.findPortfolio(self.portfolios, name);
  if(portfolio){
    var index = Portfolio.findStock(portfolio.stocks, symbol);
    var stock = portfolio.stocks[index];
    if(stock && (stock.count >= amount)){
      Stock.getQuote(symbol, function(quote){
        self.cash += (quote * amount);
        stock.count -= amount;
        cb();
      });
    }else{
      cb();
    }
  }else{
    cb();
  }
};

Client.prototype.position = function(){
  var position = 0;

  for(var i = 0; i < this.portfolios.length; i++){
    for(var j = 0; j < this.portfolios[i].stocks.length; j++){
      position += (this.portfolios[i].stocks[j].count * this.portfolios[i].stocks[j].price);
    }
  }

  return position;
};

Client.findPortfolio = function(portfolios, name){
  for(var i = 0; i < portfolios.length; i++){
    if(portfolios[i].name === name){
      return portfolios[i];
    }
  }

  return null;
};

module.exports = Client;

