(function() {
  'use strict';

  angular
    .module('formationAngularLyon')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($mdSidenav,$scope, $auth, $state,$log,user,$mdDialog,toastr) {
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


    vm.editDialog = function(event, user){
      return $mdDialog.show({
        templateUrl: 'app/views/user/userConfig.html',
        controller: 'UserConfigController',
        controllerAs: 'dialog',
        targetEvent: event,
        locals: {
          options:{
            user: user,
            title: 'Paramètre du compte '+user.username,
            buttonLabel: 'Confirmation'
          }
        }
      })
        .then(function(){
          //vm.list[index] = updatedTodo;
          toastr.info('updated !!!!')
        })
    }
  }
})();
