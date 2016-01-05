(function(){
  'use strict';

  angular
    .module('formationAngularLyon')
    .controller('TwitterController', TwitterController);


      /** @ngInject */
 function TwitterController(Message,user,$log) {
	var vm = this;

	vm.submitForm = function (todo){
		$log.debug("Envoi d'un message");

		var promise;
	if(todo.id){
		promise= Message.update(todo.id,todo);
	}else{
		todo.creatorId = user.me.id;
    $log.debug("Creation");
		promise = Message.create(todo);
  }
      return promise.then(function(){
        vm.init();
      })
    }


vm.init = function (){
  $log.debug(Message);
  var promise = Message.refreshAll(); 

   return promise.then(function(data){
     vm.list = data ;
  })
}

vm.getPhoto = function(id){
    $log.debug(id);
   /* var promise = user.find(id); 
    return promise.then(function(data){
      $log.debug(data);
     vm.photoTest = data.image ;
  })*/
}

//on initialise la page
vm.init();

}

})();