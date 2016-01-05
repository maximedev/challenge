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
  /*function createTwit(twitter) {
    $log.debug(twitter);
    twitter.createdAt = new Date().getTime();
    twitter.creatorId = user.me.id;
    list.push(twitter);
    return Twitter.create(twitter)
      .then(function(twitter){
      vm.list.push(twitter);
      toastr.info('created Twitter !!!!')
    });
  }*/



	/*function createTwit (todo){
		$log.debug(todo);
    twitter.createdAt = new Date().getTime();
		var promise;
	if(todo.id){
		promise= Todo.update(todo.id,todo);
	}else{
    twitter.creatorId = user.me.id;
		promise = Todo.create(todo);
      }
      return promise.then(function(data){
      $log.debug(data);
      })
   }*/

  function createTweet (tweet){
    $log.debug(tweet);
    toastr.info('created !!!!');

    tweet.createdAt = new Date().getTime();
    var promise;
    tweet.creatorId = user.me.id;
    promise = Tweet.create(tweet);
    return promise.then(function(data){
      $log.debug(data);
    })
  }

  function ajoutTweet(tweet){
    $log.debug(tweet);
    vm.createTweet(tweet)
      .then(function(createdTweet){
      vm.list.push(createdTweet);
      toastr.info('created !!!!')
    })
  }
  }
})();
