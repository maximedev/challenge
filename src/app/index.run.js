(function() {
  'use strict';

  angular
    .module('formationAngularLyon')
    .run(runBlock);

  /** @ngInject */
  function runBlock($rootScope, DSHttpAdapter, config, $auth, user,$log) {
    var uiRouterEvent = $rootScope.$on('$stateChangeError',uiRouterErrorHandler);
    DSHttpAdapter.defaults.deserialize = storeXCountHeader;

    $rootScope.$on('$destroy',uiRouterEvent);

    if($auth.isAuthenticated()){
      $log.debug(user.getMe());
      return user.getMe();
    }

    function uiRouterErrorHandler(evt, toState, toParams, fromState, fromParams, error) {
      throw error;
    }

    //bricolage un peu crade pour recuperer le nombre d"'element d'une collection avec json-server
    function storeXCountHeader (resource, data) {
      config.listsCount[resource.name] = data.headers('X-Total-Count');
      return data.data;
    }

  }

})();
