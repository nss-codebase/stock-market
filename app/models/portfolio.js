'use strict';

var Stock = require('./stock');

function Portfolio(name){
  this.name = name;
  this.stocks = [];
}

Portfolio.prototype.add = function(symbol, amount){
  var stock = findStock(this.stocks, symbol);

  if(stock){
    stock.count += amount;
  }else{
    stock = new Stock(symbol, amount);
    this.stocks.push(stock);
  }
};

// PRIVATE HELPER FUNCTIONS ///

function findStock(stocks, symbol){
  for(var i = 0; i < stocks.length; i++){
    if(stocks[i].symbol === symbol.toUpperCase()){
      return stocks[i];
    }
  }

  return null;
}

module.exports = Portfolio;

