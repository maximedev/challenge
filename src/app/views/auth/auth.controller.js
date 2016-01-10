(function() {
  'use strict';

  angular
    .module('ChallengeICDC')
    .controller('AuthController', AuthController);

  /** @ngInject */
  function AuthController($scope,$auth,$state,$http,$log,$document,toastr,user,$crypthmac) {
    var vm = this;
    vm.selectedTab = 0;

    vm.signin = function(){
      if(vm.signinForm.$valid) {

        var dataToSend ={};

        var encryptPassword = $crypthmac.encrypt(vm.signinUser.password,"");
        dataToSend.email =  vm.signinUser.email;
        dataToSend.password = encryptPassword;

        $auth.login(dataToSend)
          .then(function () {
            return user.getMe()
          })
          .then(function(){
            $state.go('twitter');
          })
          .catch(function () {
            toastr.error('bad credentials');
          })
      }
    };
    
    vm.signup = function(){
      if(vm.signupForm.$valid){

        var dataToSend ={};

        var encryptPassword = $crypthmac.encrypt(vm.signupUser.password,"");
        var encryptConfirmPassword = $crypthmac.encrypt(vm.signupUser.confirmPassword,"");

        dataToSend.password = encryptPassword ;
        dataToSend.confirmPassword = encryptConfirmPassword ;

        var canvas = $document[0].getElementById('canvasPhoto');
        dataToSend.image = canvas.toDataURL();
        dataToSend.username = vm.signupUser.username ;
        dataToSend.email = vm.signupUser.email ;

        $log.debug(dataToSend);
        $auth.signup(dataToSend)
          .then(function(){
            toastr.success('Utilisateur enregistré !!');
            vm.selectedTab = 0;
          })
          .catch(function(){
            toastr.error('Erreur lors de l\'inscrisption');
          })
      }
    };

  //Ajout de la photo
  //vm.src  = "assets/images/default128.png";

  vm.initdefautPhoto = function(){
    var imageObj = new Image();



      imageObj.onload = function() {
        var canvas = $document[0].getElementById('canvasPhoto');
        var ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = 80;
        canvas.height = 80;
        ctx.drawImage(imageObj, 0, 0, 80, 80);
  };
  imageObj.src = 'assets/images/default128.png';


};

    vm.initdefautPhoto();

  vm.choisirPhoto = function(){
     $document[0].getElementById('triggerInput').click();
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

    var canvas = $document[0].getElementById('canvasPhoto');

    if(image.height > MAX_HEIGHT) {
      image.width *= MAX_HEIGHT / image.height;
      image.height = MAX_HEIGHT;
    }
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0, image.width, image.height);
    $scope.$apply();
  };

  image.src = src;
}

  }
})();
