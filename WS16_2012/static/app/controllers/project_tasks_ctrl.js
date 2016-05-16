/**
 * Created by Srđan on 5.5.2016..
 */
/*global angular*/
(function (angular) {
    "use strict";

    angular.module('app.ProjectTasksCtrl', [])
        .controller('ProjectTasksCtrl', function ($scope, $location, $uibModal, $resource) {
            var TasksResource = $resource('api/projects/' + $scope.projectId + '/tasks/:id',
                {id: '@id'},
                {update: {method: 'PUT'}});

            $scope.loadPage = function () {
                TasksResource.query($scope.queryParams, function (data, headers) {
                    $scope.tasks = data;
                    $scope.count = headers().count;
                    $scope.alertMessage = null;
                });
            };

            $scope.createTask = function () {
                var scope = $scope.$new(true);
                scope.projectId = $scope.projectId;

                $uibModal.open({
                    animation: true,
                    templateUrl: 'static/partials/task_modal.html',
                    controller: 'TaskModalCtrl',
                    scope: scope
                }).result.then(function (refresh) {
                    if (refresh) {
                        $scope.loadPage();
                    }
                });
            };

            $scope.open = function (id) {
                $location.path('/projects/' + $scope.projectId + '/tasks/' + id);
            };

            $scope.remove = function (task) {
                task.$delete($scope.loadPage);
            };

            (function () {
                $scope.tasks = [];
                $scope.count = 0;
                $scope.queryParams = {
                    page: 1,
                    per_page: 10
                };
                $scope.loadPage();
            }());
        });
}(angular));