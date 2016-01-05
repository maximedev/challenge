(function(){
  'use strict';

  angular
    .module('formationAngularLyon')
    .controller('TwitterController', TwitterController);


      /** @ngInject */
 function TwitterController(TweetService,user,$log) {
	var vm = this;


	vm.submitForm = function (tweet){

		$log.debug("Envoi d'un message");
		tweet.creatorId = user.me.id;
    tweet.createdAt = new Date().getTime();
    tweet.theme = "Informatique";
TweetService.createTweet(tweet).then(
        function(response){
          $log.debug(response.data);
          vm.list.psuh(response.data);
        }
      );
    }


 vm.init = function (){
  $log.debug("init");
  $log.debug(TweetService);
  var promise = TweetService.resource().refreshAll(); 
  return promise.then(function(data){
    $log.debug(data);
     vm.list = data ;
  })
};

vm.getPhoto = function(id){

  /*var promise = user.resource().get(id);
  return promise.then(function(data){
    $log.debug(data);
     vm.listUser = data ;
  })*/

};

//on initialise la page
vm.init();

}

})();