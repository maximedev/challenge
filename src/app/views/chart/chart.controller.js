(function() {
  'use strict';

  angular
    .module('ChallengeICDC')
    .controller('ChartController', ChartController);

  /** @ngInject */
  function ChartController($interval, $log) {
    var vm = this;

    vm.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
    vm.data = [300, 500, 100, 40, 120];
    vm.types = ['PolarArea','Pie','Doughnut'];
    vm.type = vm.types[0];

    vm.onClick = function(point, event){
      $log.log(point, event);
    };

    $interval(function(){
      vm.data = vm.data.map(function(item){
        return item + Math.floor(Math.random() * 100) + 1
      })
    }, 5000);
  }
})();
