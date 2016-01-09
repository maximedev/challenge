/**
 * Created by Judikael on 05/01/2016.
 */
(function(){
  'use strict';

  angular.module('formationAngularLyon')
    .controller('TwitterDialogController', TwitterDialogController);

  /** @ngInject */
  function TwitterDialogController(Tweet, $mdDialog, options, user, $log, $document, $scope){
    var vm = this;
    $log.debug(options);
    vm.title = options.title;
    vm.buttonValiderLabel = options.buttonValiderLabel;
    vm.buttonQuitterLabel = options.buttonQuitterLabel;

    vm.themeSelect = '';
    vm.themes = ('Vie de l\'entreprise;Développement;Projets;Challenge ICDC;Loisirs')
      .split(';')
      .map(function (theme) { return { label: theme };});

    vm.submitForm = submitForm;
    vm.close = close;
    vm.photoPresent = false ;
    function submitForm(tweetToPost){
      $log.debug(tweetToPost);
      if(vm.tweetForm.$valid) {
        tweetToPost.createdAt = new Date().getTime();
        tweetToPost.creatorId = user.me.id;
        if(vm.photoPresent){
        var canvas = $document[0].getElementById('canvasPhotoTweet');
        tweetToPost.image = canvas.toDataURL();
		}
        return $mdDialog.hide(tweetToPost);
      }
    }

    function close(){
      $mdDialog.cancel();
    }

    //Ajout de la photo
    vm.src  = "assets/images/default128.png";

    vm.choisirPhotoTweet = function(){
      $document[0].getElementById('triggerInput').click();
    };

    vm.setFileTweet = function(element) {

      vm.currentFile = element.files[0];
      var reader = new FileReader();

      reader.onload = function(event) {
        vm.render(event.target.result);
      };

      vm.photoPresent = true ;
      // when the file is read it triggers the onload event above.
      reader.readAsDataURL(element.files[0]);
    };

    var MAX_HEIGHT = 100;

    vm.render = function(src){
      var image = new Image();

      image.onload = function(){

        $log.debug($document);
        var canvas = $document[0].getElementById('canvasPhotoTweet');

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

