(function() {
  'use strict';

  angular
    .module('ChallengeICDC')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($mdSidenav,$scope, $auth, $state,$log,$http,$mdDialog,toastr,config) {
    var vm = this;

    vm.toggleAside = toggleAside;
    vm.logout = logout;

    //$scope.$apply();
    
    function toggleAside(){
      $mdSidenav('left').toggle();
    }

    function logout(){
      $auth.logout();
      $state.go('auth');
    }

      vm.init = function(){
         $http.get(config.api.basePath+'/auth/me')
             .then(function(httpData){
                vm.user = httpData.data;
              })
               .catch(function(){
                    $auth.logout();
                    $state.go('auth');
             });
     }


   vm.init(); 
  }
})();
