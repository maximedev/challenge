(function () {
    'use strict';

    angular
        .module('ChallengeICDC')
        .controller('TweetController', TweetController);

    /** @ngInject */
    function TweetController(themeSelected, Tweet, Comment, user, $mdDialog, toastr, $log) {
        var vm = this;

        vm.selectedTheme = themeSelected.value;


        vm.creationDialogTweet = function (event) {
            $log.debug("Appel dialog tweet");
            return $mdDialog.show({
                    templateUrl: 'app/views/twitter/dialog/twitter.dialog.html',
                    controller: 'TwitterDialogController',
                    controllerAs: 'dialog',
                    targetEvent: event,
                    locals: {
                        options: {
                            title: 'Publier un nouveau message',
                            buttonValiderLabel: 'Publier',
                            buttonQuitterLabel: 'Annuler'
                        }
                    }
                })
                .then(function (createdDTweet) {
                    toastr.info('Tweet envoyé !');
                    Tweet.createTweet(createdDTweet).then(
                        function () {
                            vm.getAllTweet();
                        });
                })
        };

        vm.creationDialogComment = function (event, id) {
            return $mdDialog.show({
                    templateUrl: 'app/views/twitter/dialogComment/comment.dialog.html',
                    controller: 'CommentDialogController',
                    controllerAs: 'commentDialog',
                    targetEvent: event,
                    locals: {
                        options: {
                            title: 'Publier un nouveau commentaire',
                            buttonValiderLabel: 'Publier',
                            buttonQuitterLabel: 'Annuler',
                            idTweet: id
                        }
                    }
                })
                .then(function (createdComment) {
                    toastr.info('Commentaire envoyé !');
                    Comment.createComment(createdComment).then(
                        function () {
                            vm.getAllComment();
                        });
                })
        };

        vm.init = function () {
            $log.debug("init");

            vm.getAllTweet();

            vm.getAllComment();

            var promise = user.refreshAll();
            promise.then(function (data) {
                $log.debug(data);
                vm.listuser = data;
            })

        };


        vm.getPhoto = function (id) {
            for (var i in vm.listuser) {
                if (vm.listuser[i].id === id) {
                    return vm.listuser[i].image;
                }
            }
        };

        vm.getUserName = function (id) {
            for (var i in vm.listuser) {
                if (vm.listuser[i].id === id) {
                    return vm.listuser[i].username;
                }
            }
        };

        vm.getComments = function (id) {
            var listeComm = [];
            for (var i in vm.listCommentaire) {
                if (vm.listCommentaire[i].idTweet === id) {
                    listeComm.push(vm.listCommentaire[i])
                }
            }
            return listeComm;
        };


        vm.getAllTweet = function () {
            var promise = Tweet.getAllTweets();
            promise.then(function (obj) {
                vm.list = obj.data.tweets;
                for (var i in  vm.list) {
                    vm.list[i].afficherComment = true;
                }

            });
        }

        vm.getAllComment = function () {
            var promise = Comment.getAllComment();
            promise.then(function (obj) {
                vm.listCommentaire = obj.data.comment;
            });
        }

        /*vm.imagePresente = function(tweet){
         return tweet.image;
         }*/

        vm.affichage = function (idList) {
            $log.debug("affichage");
            vm.list[idList].commentAffichage = !vm.list[idList].commentAffichage;
        }


//on initialise la page
        vm.init();
    }

})();
