/**
 * Created by Srđan on 5.5.2016..
 */
/*global angular*/
(function (angular) {
    "use strict";

    angular.module('app.ProjectCtrl', [])
        .controller('ProjectCtrl', function ($scope, $routeParams, $location, $resource) {
            var ProjectsResource = $resource('api/projects/:id',
                {id: '@id'},
                {update: {method: 'PUT'}});

            $scope.loadProject = function () {
                ProjectsResource.get({id: $scope.projectId}, function (data) {
                    $scope.project = data;
                });
            };

            $scope.update = function () {
                if (!$scope.project.name) {
                    $scope.alertMessage = "Name cannot be empty.";
                } else if (!$scope.project.description) {
                    $scope.alertMessage = "Description cannot be empty.";
                } else {
                    $scope.alertMessage = null;
                }

                if ($scope.alertMessage) {
                    return;
                }

                $scope.project.$update($scope.cancel, function (response) {
                    $scope.alertMessage = response.data.message;
                });
            };

            $scope.showReports = function () {
                $location.path('/projects/' + $scope.projectId + '/reports');
            };

            $scope.cancel = function () {
                $scope.edit = false;
                $scope.loadProject();
                $scope.alertMessage = null;
            };

            (function () {
                $scope.projectId = $routeParams.id;
                $scope.project = {};
                $scope.edit = false;
                $scope.loadProject();
            }());
        });
}(angular));