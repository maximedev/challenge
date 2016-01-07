(function(){
  'use strict';

  angular
    .module('formationAngularLyon')
    .controller('TweetController', TweetController);

      /** @ngInject */
 function TweetController(themeSelected, Tweet, user, $mdDialog, toastr, $log) {
	var vm = this;

  vm.selectedTheme = themeSelected.value;

	/*vm.submitForm = function (tweet){
		$log.debug("Envoi d'un message");
		tweet.creatorId = user.me.id;
    tweet.createdAt = new Date().getTime();
    tweet.theme = "Informatique";
    Tweet.createTweet(tweet).then(
        function(response){
          $log.debug(response.data);
          vm.list.push(response.data);
        }
      );
    }*/

  vm.creationDialogTweet = function(event){
    $log.debug("Appel dialog tweet");
     return $mdDialog.show({
         templateUrl: 'app/views/twitter/dialog/twitter.dialog.html',
         controller: 'TwitterDialogController',
         controllerAs: 'dialog',
         targetEvent: event,
         locals: {
           options:{
             title: 'Publier un nouveau message',
             buttonValiderLabel: 'Publier',
             buttonQuitterLabel: 'Annuler'
           }
         }
       })
       .then(function(createdDTweet){
         toastr.info('Tweet envoyé !');
         Tweet.createTweet(createdDTweet).then(
            function(){
              vm.getAllTweet();
          });
       })
   };

  vm.init = function (){
    $log.debug("init");

    vm.getAllTweet();

    var promise = user.refreshAll();
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


  vm.getAllTweet = function(){
    var promise = Tweet.getAllTweets();
    promise.then(function(obj){
      $log.debug(obj.data.tweets);
      vm.list = obj.data.tweets;
    });
  }

  vm.imagePresente = function(tweet){
    return tweet.image;
  }
//on initialise la page
  vm.init();

}

})();
