/**
 * Created by Srđan on 4.5.2016..
 */
/*global angular*/
(function (angular) {
    "use strict";

    angular.module('app.RegisterCtrl', [])
        .controller('RegisterCtrl', function ($scope, $location, Auth, USERNAME_REGEX) {
            var init = function () {
                Auth.isLogged().then(
                    function (response) {
                        Auth.storeCredentials(response.data.role, response.data.id);
                        $location.path("/dashboard");
                    }
                );

                $scope.username = "";
                $scope.password = "";
                $scope.renteredPassword = "";
                $scope.alertMessage = null;
            };

            $scope.register = function () {
                if (!$scope.username) {
                    $scope.alertMessage = 'Username cannot be empty.';
                } else if (!USERNAME_REGEX.test($scope.username)) {
                    $scope.alertMessage = 'Username can contain only alphanumerical characters.';
                } else if (!$scope.password) {
                    $scope.alertMessage = 'Password cannot be empty.';
                } else if ($scope.password !== $scope.renteredPassword) {
                    $scope.alertMessage = 'Passwords do not match.';
                } else {
                    $scope.alertMessage = null;
                }

                if ($scope.alertMessage) {
                    return;
                }

                Auth.register($scope.username, $scope.password).then(
                    function () {
                        $scope.alertMessage = null;
                        $location.path('/login');
                    },
                    function (response) {
                        $scope.alertMessage = "Error: " + response.data.message;
                    }
                );
            };

            init();
        });
}(angular));