/**
 * Created by Srđan on 5.5.2016..
 */
/*global angular*/
(function (angular) {
    "use strict";

    angular.module('app.ProjectCtrl', [])
        .controller('ProjectCtrl', function ($scope, $routeParams, Projects) {
            var init = function () {
                $scope.projectId = $routeParams.id;
                $scope.project = {};
                $scope.name = "";
                $scope.description = "";

                Projects.getById($scope.projectId).then(
                    function (response) {
                        $scope.project = response.data;
                        $scope.name = $scope.project.name;
                        $scope.description = $scope.project.description;
                    },
                    function (response) {
                        $scope.alertMessage = "Error: " + response.data.message;
                    }
                );

            };

            $scope.update = function () {
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

            init();
        });
}(angular));