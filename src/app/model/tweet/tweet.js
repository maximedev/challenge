(function(){
  'use strict';

  angular
    .module('ChallengeICDC')
    .service('Tweet',TweetService);

  /** @ngInject */
  function TweetService(DS,config,$http) {
     var tweet = DS.defineResource('tweet', {
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
       });

   tweet.createTweet =  function(tweet){
        return $http({
          method: 'POST',
          url: config.api.basePath + "/add/tweet",
          data: tweet
        });
      }

    tweet.getAllTweets =  function(){
        return $http({
          method: 'GET',
          url: config.api.basePath + "/get/tweet"
        });
      }    

    return tweet ;

  }
})();
