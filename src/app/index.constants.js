/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('ChallengeICDC')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('config', {
      auth: {
        baseUrl: 'http://176.189.151.200:80',
        loginUrl : '/auth/signin',
        signupUrl :'/auth/signup'
      },
      api: {
        basePath: 'http://176.189.151.200:80'
      },
      listsCount:{}
    })

})();
