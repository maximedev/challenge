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
    vm.themes = ('RH;Challenge ICDC;Technique; Offre Mobilité')
      .split(';')
      .map(function (theme) { return { label: theme };});

    vm.submitForm = submitForm;
    vm.close = close;

    init();

    function submitForm(tweet){
      $log.debug("test submit form");
      tweet.createdAt = new Date().getTime();
      var promise;
      tweet.creatorId = user.me.id;
      promise = Tweet.create(tweet);
      return promise.then(function(data){
        return $mdDialog.hide(data);
      })
    }

    function close(){
      $mdDialog.cancel();
    }

    function init(){

      if(options.tweet){
        vm.tweet = angular.copy(options.tweet);
      }
    }
  }

})();

