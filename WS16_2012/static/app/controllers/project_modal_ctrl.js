/**
 * Created by Srđan on 5.5.2016..
 */
/*global angular*/
(function (angular) {
    "use strict";

    angular.module('app.ProjectModalCtrl', [])
        .controller('ProjectModalCtrl', function ($scope, $uibModalInstance, $resource) {
            var ProjectsResource = $resource('api/projects/:id',
                {id: '@id'},
                {update: {method: 'PUT'}});

            $scope.create = function () {
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

                $scope.project.$save(function () {
                    $scope.close(true);
                });
            };

            $scope.close = function (refresh) {
                refresh = refresh || false;
                $uibModalInstance.close(refresh);
            };

            (function () {
                $scope.project = new ProjectsResource();
            }());
        });
}(angular));