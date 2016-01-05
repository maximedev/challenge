(function(){
  'use strict';

  angular
    .module('formationAngularLyon')
    .service('Todo', TodoService);

  /** @ngInject */
  function TodoService(DS) {
    return DS.defineResource('todo', {
      name: 'Todo',
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
