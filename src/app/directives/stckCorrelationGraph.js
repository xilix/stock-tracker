define(
  ['./module', 'd3', 'settings']
, function (module, d3, settings) {
  "use strict";

  module.directive('stckCorrelationGraph', function () {

    function createGraphSvg(element) {
      var scaleX, scaleY, xAxis, yAxis, svg
        , padding = 20
        , margin = {
          top: 20, 
          right: 30, 
          bottom: 30, 
          left: 40,
        }
        , width = element.offsetWidth
        , height = element.offsetHeight
        , domHolder = element.firstElementChild || element.firstChild;

      scaleX = d3.scale.linear()
                .range([
                  margin.left + padding, 
                  width - margin.left - margin.right - 2*padding
                ]);

      scaleY = d3.scale.linear()
                .range([
                  height - margin.top - margin.bottom - 2*padding,
                  margin.top + padding
                ]);

      xAxis = d3.svg.axis()
                .scale(scaleX)
                .orient('bottom');

      yAxis = d3.svg.axis()
                .scale(scaleY)
                .orient('left');

      svg = d3.select(domHolder).append('svg')
          .attr('width', width)
          .attr('height', height)
        .append('g')
          .attr(
              'tranform', 
              'translate(' + padding + ',' + padding + ')'
          );

      return {
        scaleX  : scaleX,
        scaleY  : scaleY,
        xAxis   : xAxis,
        yAxis   : yAxis,
        svg     : svg,
        width   : width,
        height  : height,
        margin  : margin,
        padding : padding,
      };
    }

    function reformAxis(graph, data) {
      if (data !== undefined) {
        d3.selectAll('.axis').remove();

        graph.scaleX.domain(d3.extent(data, function (d) {
          return d[0];
        })).nice();

        graph.scaleY.domain(d3.extent(data, function (d) {
          return d[1];
        })).nice();

        graph.svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + (graph.height - graph.padding - graph.margin.bottom) + ")")
          .call(graph.xAxis)
        .append("text")
          .attr("class", "label")
          .attr("x", graph.width - graph.padding - graph.margin.right)
          .attr("y", -6)
          .style("text-anchor", "end")
          .text("NASDAQ");

        graph.svg.append("g")
          .attr("class", "y axis")
          .attr("transform", "translate(" + (graph.margin.left + graph.padding - 5) + ",0)")
          .call(graph.yAxis)
        .append("text")
          .attr("class", "label")
          .attr("transform", "rotate(-90)")
          .attr("y", - graph.margin.left)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("EUROSTOX");
      }
      return graph; 
    }

    function getNewDataValues(data, stocks) {
      var stocksAmount, dataAmount, i;

      if (stocks !== undefined && stocks.length > 0) {
        stocksAmount = stocks[0].data.length;
        dataAmount = data.length;

        for (i = dataAmount; i < stocksAmount; i += 1) {
          data.push([
            stocks[0].data[i],
            stocks[1].data[i],
          ]);
        }
      }
      return data;
    } 

    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'app/templates/correlation-graph.html',
      link: function (scope, element, attr) {
        var graph = createGraphSvg(element[0])
          , data = [], i, iMax;

        function updatePoints() {
          data = getNewDataValues(data, scope.stocks);
          iMax = data.length;

          graph = reformAxis(graph, data);

          for (i = 0; i < iMax; i += 1) {
            graph.svg.selectAll('.dot')
                .data(data)
              .enter().append('circle')
                .attr('class', 'dot')
                .attr('r', 3.5)
                .attr('cx', function (d) {
                  return graph.scaleX(d[0]);
                })
                .attr('cy', function (d) {
                  return graph.scaleY(d[1]);
                })
                .attr('fill', 'black');
          };
        }

        scope.$watch(function () {
          return scope.stocks[0].data.length;
        }, updatePoints, true);
      },
    };
  });
});
