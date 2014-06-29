define(function (Settings) {
  "use strict";

  return {
    miner: [
      {
        nom: 'NASDAQ',
        url: "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20in%20(%22%5EIXIC%22)%20and%20startDate%3D%22#DATE INI#%22%20and%20endDate%3D%22#DATE END#%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=",
      },
      {
        nom: 'EUROSTOX',
        url: "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20in%20(%22%5ESTOXX50E%22)%20and%20startDate%3D%22#DATE INI#%22%20and%20endDate%3D%22#DATE END#%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=",
      },
    ],
    tracker: {
      frecuency: 2000,
      treshold : 5,
    },
    graphs: {
      corr: {
        width : 400,
        height: 300,
      }
    },
  };
});
