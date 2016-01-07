(function() {
  'use strict';

  angular
    .module('formationAngularLyon')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, triMenuProvider, DSProvider, DSHttpAdapterProvider, config, $authProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;


    angular.merge(DSProvider.defaults,config.api);
    angular.merge(DSHttpAdapterProvider.defaults,config.api);

    angular.merge($authProvider, config.auth);


    triMenuProvider.addMenu({
      name: 'Fil d\'actualité',
      icon: 'ion-home',
      type: 'link',
      state: 'twitter'
    });

    triMenuProvider.addMenu({
      name: 'Par thèmes :',
      icon: 'ion-chevron-down',
      type: 'dropdown',
      children:[{
        name: 'Vie de l\'entreprise',
        type: 'link',
        state: 'twitterVieEntreprise'
      },{
        name: 'Ressources Humaines',
        type: 'link',
        state: 'twitterRH'
      },
      {
        name: 'Challenge ICDC',
        type: 'link',
        state: 'twitterChallengeICDC'
      },
      {
        name: 'Développement',
        type: 'link',
        state: 'twitterDeveloppement'
      },
      {
        name: 'Projets',
        type: 'link',
        state: 'twitterProjets'
      }
      ]
    });
  }

})();
