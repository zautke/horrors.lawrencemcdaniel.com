(function () {
    "use strict";

    angular.module('public')
    .controller('GCScatterController', GCScatterController)
    .directive('gcScatter', GCScatterDirective);

    function GCScatterDirective() {
      var ddo = {
          controller: GCScatterController,
          controllerAs: 'ctrl',
          templateUrl: 'src/public/charts/gc.scatter.directive.html'
          };

      return ddo;
    }


    GCScatterController.$inject = ['$scope', '$sce'];
    function GCScatterController($scope, $sce) {
        console.log('GCScatterController instantiated');
        var ctrl = this;

     /* ---------- Google Chart ----------*/
     google.charts.load('current', {'packages':['scatter'], 'callback': drawChart});

    function drawChart () {

      var data = new google.visualization.DataTable();
      data.addColumn('number', 'Student ID');
      data.addColumn('number', 'Hours Studied');
      data.addColumn('number', 'Final');

      data.addRows([
        [0, 0, 67],  [1, 1, 88],   [2, 2, 77],
        [3, 3, 93],  [4, 4, 85],   [5, 5, 91],
        [6, 6, 71],  [7, 7, 78],   [8, 8, 93],
        [9, 9, 80],  [10, 10, 82], [11, 0, 75],
        [12, 5, 80], [13, 3, 90],  [14, 1, 72],
        [15, 5, 75], [16, 6, 68],  [17, 7, 98],
        [18, 3, 82], [19, 9, 94],  [20, 2, 79],
        [21, 2, 95], [22, 2, 86],  [23, 3, 67],
        [24, 4, 60], [25, 2, 80],  [26, 6, 92],
        [27, 2, 81], [28, 8, 79],  [29, 9, 83]
      ]);

      var options = {
        chart: {
          title: 'Students\' Final Grades',
          subtitle: 'based on hours studied'
        },
        series: {
          0: {axis: 'hours studied'},
          1: {axis: 'final grade'}
        },
        axes: {
          y: {
            'hours studied': {label: 'Hours Studied'},
            'final grade': {label: 'Final Exam Grade'}
          }
        }
      };

      var chart = new google.charts.Scatter(document.getElementById('scatter_dual_y'));

      chart.draw(data, options);

      function resizeChart () {
         console.log('resizeChart - scatter');
          chart.draw(data, options);
      }
      if (document.getElementById('scatter_dual_y').addEventListener) {
          document.getElementById('scatter_dual_y').addEventListener('resize', resizeChart);
      }
      else if (document.getElementById('scatter_dual_y').attachEvent) {
          document.getElementById('scatter_dual_y').attachEvent('onresize', resizeChart);
      }
      else {
          window.resize = resizeChart;
      }

    }


  }  /* GCScatterController() */


})();
