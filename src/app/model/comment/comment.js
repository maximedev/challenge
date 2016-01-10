(function(){
  'use strict';

  angular
    .module('ChallengeICDC')
    .service('Comment',CommentService);

  /** @ngInject */
  function CommentService(DS,config,$http) {
     var comment = DS.defineResource('comment', {
         name: 'Comment',
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

   comment.createComment =  function(comment){
        return $http({
          method: 'POST',
          url: config.api.basePath + "/add/comment",
          data: comment
        });
      }

    comment.getAllComment =  function(){
        return $http({
          method: 'GET',
          url: config.api.basePath + "/get/comment"
        });
      }    

    return comment ;

  }
})();