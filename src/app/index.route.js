(function() {
  'use strict';

  angular
    .module('ChallengeICDC')
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
     /* .state('todo', {
        url: '/todo',
        parent: 'main',
        templateUrl: 'app/views/todo/todo.html',
        controller: 'TodoController',
        controllerAs: 'todo',
        resolve: {*/
         // list: /** @ngInject */function(Todo){
           /* return Todo.findAll({
              _start:0,
              _limit: 5
            })
          }
        }
      })*/
      .state('twitter', {
        url: '/twitter',
        parent: 'main',
        templateUrl: 'app/views/twitter/twitter.html',
        controller: 'TweetController',
        controllerAs: 'tweet',
        resolve: {
          themeSelected: function () {
              return {value: ''};
          }
        }
      })
      .state('twitterVieEntreprise', {
        url: '/twitter/VieEntreprise',
        parent: 'main',
        templateUrl: 'app/views/twitter/twitter.html',
        controller: 'TweetController',
        controllerAs: 'tweet',
        resolve: {
          themeSelected: function () {
            return {value: 'Vie de l\'entreprise'};
          }
        }
      })
      .state('twitterDeveloppement', {
        url: '/twitter/Developpement',
        parent: 'main',
        templateUrl: 'app/views/twitter/twitter.html',
        controller: 'TweetController',
        controllerAs: 'tweet',
        resolve: {
          themeSelected: function () {
            return {value: 'Développement'};
          }
        }
      })
      .state('twitterProjets', {
        url: '/twitter/Projets',
        parent: 'main',
        templateUrl: 'app/views/twitter/twitter.html',
        controller: 'TweetController',
        controllerAs: 'tweet',
        resolve: {
          themeSelected: function () {
            return {value: 'Projets'};
          }
        }
      })
      .state('twitterChallengeICDC', {
        url: '/twitter/ChallengeICDC',
        parent: 'main',
        templateUrl: 'app/views/twitter/twitter.html',
        controller: 'TweetController',
        controllerAs: 'tweet',
        resolve: {
          themeSelected: function () {
            return {value: 'Challenge ICDC'};
          }
        }
      })
      .state('twitterLoisirs', {
        url: '/twitter/Loisirs',
        parent: 'main',
        templateUrl: 'app/views/twitter/twitter.html',
        controller: 'TweetController',
        controllerAs: 'tweet',
        resolve: {
          themeSelected: function () {
            return {value: 'Loisirs'};
          }
        }
      })
      .state('profile', {
        url: '/profile',
        parent: 'main',
        resolve: {
          loginRequired: loginRequired
        },
        templateUrl: 'app/views/profile/profile.html',
        controller: 'ProfileController',
        controllerAs: 'profile'
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
