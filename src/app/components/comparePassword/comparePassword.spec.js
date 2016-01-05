describe('component: compareTo', function() {
  var element, scope;

  beforeEach(module('formationAngularLyon'));

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();

    element = '<form name="form"><input type="password" name="pass" compare-to="otherPassword" ng-model="password"/></form>';


    element = $compile(element)(scope);
  }));

  it('should put an html5 compareTo error on the input if values mismatch', function(){
    scope.password = 'aaa';
    scope.otherPassword = 'zzz';
    scope.$digest();

    expect(scope.form.pass.$error.compareTo).toBeTruthy();
  });

  it('should validate the field if te two value are the same', function(){
    scope.password = 'aaa';
    scope.otherPassword = 'aaa';
    scope.$digest();

    expect(scope.form.pass.$error.compareTo).toBeUndefined();
  })
});
