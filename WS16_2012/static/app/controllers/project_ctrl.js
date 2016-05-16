/**
 * Created by Srđan on 5.5.2016..
 */
/*global angular*/
(function (angular) {
    "use strict";

    angular.module('app.ProjectCtrl', [])
        .controller('ProjectCtrl', function ($scope, $routeParams, $location, Auth, Projects) {
            var init = function () {
                $scope.projectId = $routeParams.id;
                $scope.project = {};

                $scope.edit = false;
                $scope.name = "";
                $scope.description = "";

                Projects.getById($scope.projectId).then(
                    function (response) {
                        $scope.project = response.data;
                        $scope.name = $scope.project.name;
                        $scope.description = $scope.project.description;
                        $scope.alertMessage = null;
                    },
                    function (response) {
                        $scope.alertMessage = "Error: " + response.data.message;
                    }
                );
            };

            $scope.update = function () {
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

                Projects.update($scope.projectId, $scope.name, $scope.description).then(
                    function (response) {
                        $scope.edit = false;
                        $scope.project = response.data;
                        $scope.name = $scope.project.name;
                        $scope.description = $scope.project.description;
                    },
                    function (response) {
                        $scope.alertMessage = "Error: " + response.data.message;
                    }
                );
            };

            $scope.showReports = function () {
                $location.path('/projects/' + $scope.projectId + '/reports');
            };

            $scope.cancel = function () {
                $scope.edit = false;
                $scope.alertMessage = null;
            };

            init();
        });
}(angular));