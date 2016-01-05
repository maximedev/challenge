(function(){
  'use strict';

  angular
    .module('formationAngularLyon')
    .service('Tweet', TweetService);

  /** @ngInject */
  function TweetService(DS) {
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
})();
