(function() {
  'use strict';

  describe('main controller', function(){
    var vm;
    var $state;
    var $auth;

    beforeEach(module('ChallengeICDC'));
    beforeEach(inject(function(_$controller_, _$state_, _$auth_) {
      vm = _$controller_('MainController');
      $state = _$state_;
      $auth = _$auth_;

      spyOn($state, 'go').and.returnValue();
      spyOn($auth, 'logout').and.callThrough();
    }));

    it('should logout and redirect to the auth view', function() {
      vm.logout();
      expect($auth.logout).toHaveBeenCalled();
      expect($state.go).toHaveBeenCalledWith('auth');
    });
  });
})();
