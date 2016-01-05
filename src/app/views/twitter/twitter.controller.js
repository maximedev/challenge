(function(){
  'use strict';

  angular
    .module('formationAngularLyon')
    .controller('TwitterController', TwitterController);


      /** @ngInject */
 function TwitterController(Todo,user,$log) {
	var vm = this;

	vm.submitForm = function (todo){
		$log.debug(todo);
		todo.createdAt = new Date().getTime();
		var promise;
	if(todo.id){
		promise= Todo.update(todo.id,todo);
	}else{
		todo.creatorId = user.me.id;
		promise = Todo.create(todo);
      }
      return promise.then(function(data){
      $log.debug(data);
      })
    }

  }
})();