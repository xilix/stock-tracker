define(
  ['./module', 'd3', 'settings']
, function (module, d3, settings) {
  "use strict";

  module.factory(
    'stockManager' 
  , function () {
    function processStock(stock) {
      var i = 0, iMax = stock.data.length
        , newValue = 100 * Math.random()
        , oldValue = stock.actual;

      // random simulation
      if (stock.nom == 'nasdaq') {
        newValue *= Math.random();
      }

      stock.variation = 100 * (newValue - oldValue) / (newValue + oldValue);

      stock.variation = parseFloat(stock.variation.toFixed(2), 10);
      stock.last = parseFloat(oldValue.toFixed(2), 10);
      stock.actual = parseFloat(newValue.toFixed(2), 10);
      stock.data.push(newValue); 
      
      return stock;
    }

    return {
      add: function (stocks, nom) {
        if (stocks === undefined) { stocks = []; }

        stocks.push({
          data: [],
          variation: 0,
          last: 0,
          actual: 0,
          nom: nom
        });

        return stocks;
      },
      refresh: function (stocks) {
        var i = 0, iMax = stocks.length;

        for (i = 0; i < iMax; i += 1) {
          stocks[i] = processStock(stocks[i]);
        };

        return stocks;
      },
    }
  });
});
