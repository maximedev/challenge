(function() {
  'use strict';

  angular
    .module('formationAngularLyon')
    .controller('AuthController', AuthController);

  /** @ngInject */
  function AuthController($scope,$auth,$state,$http,$log,toastr,user) {
    var vm = this;
    vm.selectedTab = 1;

    vm.signin = function(){
      if(vm.signinForm.$valid) {
        $auth.login(vm.signinUser)
          .then(function () {
            return user.getMe()
          })
          .then(function(){
            $state.go('todo');
          })
          .catch(function () {
            toastr.error('bad credentials');
          })
      }
    };

    vm.signup = function(){
      if(vm.signupForm.$valid){
        var canvas = document.getElementById("myCanvas");
        vm.signupUser.image = canvas.toDataURL();

        $log.debug(vm.signupUser);
        $auth.signup(vm.signupUser)
          .then(function(){
            toastr.success('account successfully created !!');
            vm.selectedTab = 0;
          })
          .catch(function(){
            toastr.error('something wrong happen');
          })
      }
    };

  //Ajout de la photo
  vm.src  = "assets/images/default128.png";

  vm.choisirPhoto = function(){
   //Angular element ne fonctionne pas pour simuler un click, on passe donc directement par le javascript natif 
   //angular.element($document.querySelector('#triggerInput')).trigger('click');
     document.getElementById('triggerInput').click();
    };

  vm.setFile = function(element) {

      vm.currentFile = element.files[0];
      var reader = new FileReader();

      reader.onload = function(event) {
        vm.render(event.target.result);
      };
    
    // when the file is read it triggers the onload event above.
    reader.readAsDataURL(element.files[0]);
  };

var MAX_HEIGHT = 80;


vm.render = function(src){
  var image = new Image();

  image.onload = function(){
   // var canvas = angular.element('#myCanvas'); ne fonctionne pas !!
   var canvas = document.getElementById("myCanvas");
  
    if(image.height > MAX_HEIGHT) {
      image.width *= MAX_HEIGHT / image.height;
      image.height = MAX_HEIGHT;
    }
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0, image.width, image.height);
    $log.debug(ctx);
    $log.debug(ctx.dataURL);
    $scope.$apply();
    $log.debug(canvas.toDataURL());
  };

  image.src = src;
}

  }
})();
