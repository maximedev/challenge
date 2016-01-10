/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('ChallengeICDC')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('config', {
      auth: {
        baseUrl: 'http://localhost:3000',
        loginUrl : '/auth/signin',
        signupUrl :'/auth/signup'
      },
      api: {
        basePath: 'http://localhost:3000'
      },
      listsCount:{}
    })

})();
