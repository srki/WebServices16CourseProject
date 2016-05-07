/**
 * Created by Srđan on 5.5.2016..
 */
/*global angular*/
(function (angular) {
    "use strict";

    angular.module('app.ProjectTasksCtrl', [])
        .controller('ProjectTasksCtrl', function ($scope, $location, $uibModal, Projects) {
            var init = function () {
                $scope.tasks = [];
                $scope.count = 0;
                $scope.currentPage = 1;
                $scope.perPage = 10;

                $scope.loadTasks();
            };

            $scope.loadTasks = function () {
                Projects.getAllTasks($scope.projectId, $scope.currentPage, $scope.perPage).then(
                    function (response) {
                        $scope.tasks = response.data.tasks;
                        $scope.count = response.data.count;

                        if ($scope.currentPage > Math.ceil($scope.count / $scope.perPage)) {
                            $scope.currentPage = Math.ceil($scope.count / $scope.perPage) || 1;
                        }

                        $scope.alertMessage = null;
                    },
                    function (response) {
                        $scope.alertMessage = 'Error: ' + response.data.message;
                    }
                );
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
                        $scope.loadTasks();
                    }
                });
            };

            $scope.open = function (id) {
                $location.path('/projects/' + $scope.projectId + '/tasks/' + id);
            };

            $scope.remove = function (id) {
                Projects.removeTask($scope.projectId, id).then(
                    function () {
                        $scope.loadTasks();
                        $scope.alertMessage = null;
                    },
                    function (response) {
                        $scope.alertMessage = 'Error: ' + response.data.message;
                    }
                );
            };

            init();
        });
}(angular));