(function(){
  'use strict';

  angular
    .module('formationAngularLyon')
    .controller('TweetController', TweetController);


      /** @ngInject */
 function TweetController(list,Tweet,user,$log) {
	var vm = this;

  vm.list= list;

        vm.submitForm = function(tweet){
          $log.debug(tweet);
          tweet.createdAt = new Date().getTime();
          var promise;
            tweet.creatorId = user.me.id;
            promise = Tweet.create(tweet);

          return promise.then(function(data){
            return $mdDialog.hide(data);
          })
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



vm.init();

}
})();
