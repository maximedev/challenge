(function(){
  'use strict';

  angular
    .module('formationAngularLyon')
    .service('Tweet',TweetService);

  /** @ngInject */
  function TweetService(DS,config,$http) {
     var tweet = [] ;

     tweet.resource =function(){
      return DS.defineResource('tweet', {
      name: 'Tweet',
      idAttribute: 'id',
      relations: {
        hasOne: {
          User: {
            localField: 'creator',
            localKey: 'creatorId'
          }
        }
      }
    })

    }

   tweet.createTweet =  function(tweet){
        return $http({
          method: 'POST',
          url: config.api.basePath + "/add/tweet",
          data: tweet
        });
      }

     return tweet ;

  }
})();
