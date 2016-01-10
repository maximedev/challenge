(function () {
    'use strict';

    angular
        .module('ChallengeICDC')
        .controller('ProfileController', ProfileController);

    /** @ngInject */
    function ProfileController($mdSidenav, $scope, $auth, $state, $log, user, $mdDialog, toastr, $document) {
        var vm = this;
        vm.user = user.me;

        vm.updateUser = function (userdata) {
            if (vm.editForm.$valid) {
                //$log.debug(userdata);

                var promise;
                promise = user.update(userdata.id, userdata);
                return promise.then(function (data) {
                    toastr.info('updated !!!! ' + userdata.id)
                    $log.debug(data);
                })
            }
        }

        //Ajout de la photo
        vm.src = "assets/images/default128.png";

        vm.choisirPhoto = function () {
            $document[0].getElementById('triggerInput').click();
        };

        vm.setFile = function (element) {

            vm.currentFile = element.files[0];
            var reader = new FileReader();

            reader.onload = function (event) {
                vm.render(event.target.result);
            };

            // when the file is read it triggers the onload event above.
            reader.readAsDataURL(element.files[0]);
        };

        var MAX_HEIGHT = 80;


        vm.render = function (src) {
            var image = new Image();

            image.onload = function () {

                $log.debug($document);
                var canvas = $document[0].getElementById('canvasPhoto');

                if (image.height > MAX_HEIGHT) {
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
