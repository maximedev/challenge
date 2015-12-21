(function() {
  'use strict';

  angular
    .module('formationAngularLyon')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($mdSidenav,$scope, $auth, $state,$log,user) {
    var vm = this;

    vm.toggleAside = toggleAside;
    vm.logout = logout;
    vm.user = user.me;
    //$scope.$apply();
    
    function toggleAside(){
      $mdSidenav('left').toggle();
    }

    function logout(){
      $auth.logout();
      $state.go('auth');
    }

  }
})();
