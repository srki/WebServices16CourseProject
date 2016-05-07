/**
 * Created by Srđan on 5.5.2016..
 */
/*global angular*/
(function (angular) {
    "use strict";

    angular.module('app.ProjectModalCtrl', [])
        .controller('ProjectModalCtrl', function ($scope, $uibModalInstance, Projects) {
            var init = function () {
                $scope.alertMessage = null;
                $scope.name = "";
                $scope.description = "";
            };

            $scope.create = function () {
                if (!$scope.name) {
                    $scope.alertMessage = "Name cannot be empty.";
                } else if (!$scope.description) {
                    $scope.alertMessage = "Description cannot be empty.";
                } else {
                    $scope.alertMessage = null;
                }

                if ($scope.alertMessage) {
                    return;
                }

                Projects.create($scope.name, $scope.description).then(
                    function () {
                        $scope.alertMessage = null;
                        $scope.close(true);
                    },
                    function (response) {
                        $scope.alertMessage = "Error: " + response.data.message;
                    }
                );
            };

            $scope.close = function (refresh) {
                refresh = refresh || false;
                $uibModalInstance.close(refresh);
            };

            init();
        });
}(angular));