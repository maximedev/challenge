(function(){
  'use strict';

  angular
    .module('formationAngularLyon')
    .service('user', UserService);

  /** @ngInject */
  function UserService(DS, $http, $auth, $state, config) {
    var User = DS.defineResource('user', {
      name: 'User',
      idAttribute: 'id',
      relations:{
        hasMany: {
          todo: {
            localField: 'todos',
            foreignKey: 'creatorId'
          }
        }
      }
    });

    User.getMe = function(){
      return $http.get(config.api.basePath+'/auth/me')
        .then(function(httpData){
          User.me = httpData.data;
        })
        .catch(function(){
          $auth.logout();
          $state.go('auth');
        })
    };

    return User;
  }
})();
