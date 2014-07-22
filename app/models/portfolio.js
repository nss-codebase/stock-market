'use strict';

var Stock = require('./stock');

function Portfolio(name){
  this.name = name;
  this.stocks = [];
}

Portfolio.prototype.add = function(symbol, amount, price){
  var index = Portfolio.findStock(this.stocks, symbol);

  if(index >= 0){
    this.stocks[index].count += amount;
  }else{
    var stock = new Stock(symbol, amount, price);
    this.stocks.push(stock);
  }
};

Portfolio.prototype.del = function(symbol, amount){
  var index = Portfolio.findStock(this.stocks, symbol);

  if(index >= 0){
    this.stocks[index].count -= amount;

    if(this.stocks[index].count <= 0){
      this.stocks.splice(index, 1);
    }
  }
};

Portfolio.findStock = function(stocks, symbol){
  for(var i = 0; i < stocks.length; i++){
    if(stocks[i].symbol === symbol.toUpperCase()){
      return i;
    }
  }

  return -1;
};

module.exports = Portfolio;

