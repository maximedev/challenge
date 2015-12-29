(function(){
  'use strict';

  angular
    .module('formationAngularLyon')
    .controller('UserConfigController', UserConfigController);


  /** @ngInject */
  function UserConfigController($mdDialog,$log, options, user){
    var vm = this;

    vm.title = options.title;
    vm.buttonLabel = options.buttonLabel;

    vm.submitForm = submitForm;
    vm.close = close;

    init();

    function submitForm(userForm){
      $log.debug("Test");
      var promise;
      promise= user.update(userForm.id,userForm);
      return promise.then(function(data){
        return $mdDialog.hide(data);
      })
    }

    function close(){
      $mdDialog.cancel();
    }

    function init(){
      if(options.user){
        vm.user = angular.copy(options.user);
      }
    }
  }

})();