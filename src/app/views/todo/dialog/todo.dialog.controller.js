(function(){
  'use strict';

  angular.module('ChallengeICDC')
    .controller('TodoDialogController', TodoDialogController);

  /** @ngInject */
  function TodoDialogController(Todo, $mdDialog, options, user){
    var vm = this;

    vm.title = options.title;
    vm.buttonLabel = options.buttonLabel;

    vm.submitForm = submitForm;
    vm.close = close;

    init();

    function submitForm(todo){
      todo.createdAt = new Date().getTime();
      var promise;
      if(todo.id){
        promise= Todo.update(todo.id,todo);
      }else{
        todo.creatorId = user.me.id;
        promise = Todo.create(todo);
      }
      return promise.then(function(data){
        return $mdDialog.hide(data);
      })
    }

    function close(){
      $mdDialog.cancel();
    }

    function init(){
      if(options.todo){
        vm.todo = angular.copy(options.todo);
        vm.todo.dueTo = new Date(vm.todo.dueTo);
      }
    }
  }

})();
