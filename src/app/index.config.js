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
      name: 'Todo',
      icon: 'ion-compose',
      type: 'link',
      state: 'todo'
    });

    triMenuProvider.addMenu({
      name: 'Par thèmes :',
      icon: 'ion-pie-graph',
      type: 'dropdown',
      children:[{
        name: 'Thème 1',
        type: 'link',
        state: 'twitter'
      },{
        name: 'Thème 2',
        type: 'link',
        state: 'twitter'
      },
      {
        name: 'Thème 3',
        type: 'link',
        state: 'twitter'
      }
      ]
    });
  }

})();
