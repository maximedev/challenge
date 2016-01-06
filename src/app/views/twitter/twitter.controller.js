(function(){
  'use strict';

  angular
    .module('formationAngularLyon')
    .controller('TwitterController', TwitterController);


      /** @ngInject */
 function TweetController(list, Tweet, user, $mdDialog, toastr, $log) {
	var vm = this;

	vm.submitForm = function (tweet){

		$log.debug("Envoi d'un message");
		tweet.creatorId = user.me.id;
    tweet.createdAt = new Date().getTime();
    tweet.theme = "Informatique";
    TweetService.createTweet(tweet).then(
        function(response){
          $log.debug(response.data);
          vm.list.push(response.data);
        }
      );
    }

  function creationDialogTweet(event){
    $log.debug("Appel dialog tweet");
     return $mdDialog.show({
         templateUrl: 'app/views/twitter/dialog/twitter.dialog.html',
         controller: 'TwitterDialogController',
         controllerAs: 'dialog',
         targetEvent: event,
         locals: {
           options:{
             title: 'Ajouter un nouveau Tweet',
             buttonLabel: 'Publier'
           }
         }
       })
       .then(function(createdDTweet){
         vm.list.push(createdDTweet);
         toastr.info('created !!!!')
       })
   }

  function createTweet (tweet){
    $log.debug(tweet);
    toastr.info('created !!!!');
    }

  vm.init = function (){
    $log.debug("init");
    $log.debug(user);

    vm.listeTweet = [];

    var promise = TweetService.resource().refreshAll();
    promise.then(function(data){
      $log.debug(data);
      vm.list = data ;
    });

    promise = user.refreshAll();

    promise.then(function(data){
      $log.debug(data);
      vm.listuser = data ;
    })

  };

  vm.getPhoto = function(id){
    for( var i in vm.listuser){
      if(vm.listuser[i].id === id){
        return vm.listuser[i].image ;
      }
    }
  };

  vm.getUserName = function(id){
    for( var i in vm.listuser){
      if(vm.listuser[i].id === id){
        return vm.listuser[i].username ;
      }
    }
  };


//on initialise la page
  vm.init();

}

})();
