/**
 * Created by Judikael on 05/01/2016.
 */
(function(){
  'use strict';

  angular.module('formationAngularLyon')
    .controller('TwitterDialogController', TwitterDialogController);

  /** @ngInject */
  function TwitterDialogController(Tweet, $mdDialog, options, user, $log){
    var vm = this;
    $log.debug(options);
    vm.title = options.title;
    vm.buttonLabel = options.buttonLabel;

    vm.themeSelect = '';
    vm.themes = ('Vie de l\'entreprise;Ressources Humaines;Challenge ICDC;Développement;Projets')
      .split(';')
      .map(function (theme) { return { label: theme };});

    vm.submitForm = submitForm;
    vm.close = close;

    function submitForm(tweetToPost){
      $log.debug(tweetToPost);
      tweetToPost.createdAt = new Date().getTime();
      tweetToPost.creatorId = user.me.id;
      return $mdDialog.hide(tweetToPost);
    }

    function close(){
      $mdDialog.cancel();
    }

  }

})();

