/**
 * Created by Srđan on 4.5.2016..
 */
/*global angular*/
(function (angular) {
    "use strict";

    angular.module('app.LoginCtrl', [])
        .controller('LoginCtrl', function ($scope, $location, Auth) {

            var init = function () {
                Auth.isLogged().then(
                    function (response) {
                        Auth.storeCredentials(response.data.role, response.data.id);
                        $location.path('/dashboard');
                    },
                    function () {
                        $location.path("/login");
                    }
                );

                $scope.username = "";
                $scope.password = "";
                $scope.alertMessage = null;
            };

            $scope.login = function () {
                if (!$scope.username) {
                    $scope.alertMessage = 'Username cannot be empty.';
                } else if (!$scope.password) {
                    $scope.alertMessage = 'Password cannot be empty.';
                } else {
                    $scope.alertMessage = null;
                }

                if ($scope.alertMessage) {
                    return;
                }

                Auth.login($scope.username, $scope.password).then(
                    function (response) {
                        Auth.storeCredentials(response.data.role, response.data.id);
                        $scope.alertMessage = null;
                        $location.path('/dashboard');
                    },
                    function (response) {
                        $scope.alertMessage = "Error: " + response.data.message;
                    }
                );
            };

            $scope.register = function () {
                $location.path('/register');
            };

            init();
        });
}(angular));