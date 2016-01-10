/**
 * Created by Judikael on 05/01/2016.
 */
(function () {
    'use strict';

    angular.module('ChallengeICDC')
        .controller('CommentDialogController', CommentDialogController);

    /** @ngInject */
    function CommentDialogController(Tweet, $mdDialog, options, user, $log) {
        var vm = this;
        $log.debug(options.idTweet);
        vm.title = options.title;
        vm.buttonValiderLabel = options.buttonValiderLabel;
        vm.buttonQuitterLabel = options.buttonQuitterLabel;
        vm.submitForm = submitForm;
        vm.close = close;
        vm.idTweet = options.idTweet;

        function submitForm(commentToPost) {
            if (vm.commentForm.$valid) {
                commentToPost.createdAt = new Date().getTime();
                commentToPost.creatorId = user.me.id;
                commentToPost.idTweet = vm.idTweet;
                return $mdDialog.hide(commentToPost);
            }
        }

        function close() {
            $mdDialog.cancel();
        }

    }

})();

