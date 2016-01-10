(function() {
  'use strict';

  describe('auth controller', function(){
    var vm;
    var $state;
    var $auth;

    beforeEach(module('ChallengeICDC'));
    beforeEach(inject(function(_$controller_, _$state_, _$auth_) {
      vm = _$controller_('AuthController');
      $state = _$state_;
      $auth = _$auth_;

      spyOn($state, 'go').and.returnValue();
      spyOn($auth, 'login').and.callThrough();
      spyOn($auth, 'signup').and.callThrough();
    }));

    it('should signup the user if the form is valid', function() {
      vm.signupForm = {
        $valid : true
      };
      vm.signupUser = {};
      vm.signup();
      expect($auth.signup).toHaveBeenCalledWith(vm.signupUser);
    });

    it('should not signup the user if the form is unvalid', function() {
      vm.signupForm = {
        $valid : false
      };
      vm.signupUser = {};
      vm.signup();
      expect($auth.signup).not.toHaveBeenCalled();
    });
  });
})();
