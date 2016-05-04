/**
 * Created by Srđan on 4.5.2016..
 */
/*global angular*/
(function (angular) {
    "use strict";

    angular.module('app.RegisterCtrl', [])
        .controller('RegisterCtrl', function ($scope, $location, Auth) {
            var init = function () {
                $scope.username = "";
                $scope.password = "";
                $scope.renteredPassword = "";
                $scope.alertMessage = null;
                if (Auth.hasStoredCredentials()) {
                    $location.path("/dashboard");
                }
            };

            $scope.register = function () {
                if (!$scope.username) {
                    $scope.alertMessage = 'Username cannot be empty.';
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
                        $scope.alertMessage = "Error: " + response.message;
                    }
                );
            };

            init();
        });
}(angular));