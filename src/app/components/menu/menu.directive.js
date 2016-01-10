(function() {
    'use strict';

    angular
        .module('ChallengeICDC')
        .directive('triMenu', triMenuDirective);

    /* @ngInject */
    function triMenuDirective() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            restrict: 'E',
            template: '<md-content><tri-menu-item ng-repeat="item in triMenuController.menu" item="::item"></tri-menu-item></md-content>',
            scope: {},
            controller: triMenuController,
            controllerAs: 'triMenuController'
        };
        return directive;
    }

    /* @ngInject */
    function triMenuController(triMenu) {
        var triMenuController = this;
        // get the menu and order it
        triMenuController.menu = triMenu.menu;
    }
})();
