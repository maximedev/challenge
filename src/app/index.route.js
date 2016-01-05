(function() {
  'use strict';

  angular
    .module('formationAngularLyon')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('auth', {
        url: '/login',
        templateUrl: 'app/views/auth/auth.html',
        controller: 'AuthController',
        controllerAs: 'auth',
        resolve: {
          skipIfLoggedIn:skipIfLoggedIn
        }
      })
      .state('main', {
        url: '',
        abstract: true,
        resolve: {
          loginRequired: loginRequired
        },
        templateUrl: 'app/views/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('todo', {
        url: '/todo',
        parent: 'main',
        templateUrl: 'app/views/todo/todo.html',
        controller: 'TodoController',
        controllerAs: 'todo',
        resolve: {
          list: /** @ngInject */function(Todo){
            return Todo.findAll({
              _start:0,
              _limit: 5
            })
          }
        }
      })
      .state('twitter', {
        url: '/twitter',
        parent: 'main',
        templateUrl: 'app/views/twitter/twitter.html',
        controller: 'TwitterController',
        controllerAs: 'twitter'
      })
      .state('chart', {
        url: '/chart',
        parent: 'main',
        templateUrl: 'app/views/chart/chart.html',
        controller: 'ChartController',
        controllerAs: 'chart'
      });


    $urlRouterProvider.otherwise('/twitter');
  }

  function skipIfLoggedIn($q, $auth) {
    return new Promise(function(resolve, reject){
      if ($auth.isAuthenticated()) {
        reject();
      } else {
        resolve();
      }
    });
  }

  function loginRequired($q, $location, $auth) {
    return new Promise(function(resolve){
      if ($auth.isAuthenticated()) {
        resolve();
      } else {
        //$state.go('auth');
        $location.path('/login');
      }
    });
  }

})();
