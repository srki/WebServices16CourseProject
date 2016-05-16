/**
 * Created by Srđan on 5.5.2016..
 */
/*global angular*/
(function (angular) {
    "use strict";

    angular.module('app.DashboardCtrl', [])
        .controller('DashboardCtrl', function ($scope, $location, Auth, Tasks, PRIORITIES, STATUSES) {
            var init = function () {
                $scope.priorities = PRIORITIES;
                $scope.statuses = STATUSES;
                $scope.selectedPriorities = [];
                $scope.selectedStatuses = [];
                $scope.currentPage = 1;
                $scope.count = 0;
                $scope.perPage = 10;

                $scope.loadTasks();
                $scope.$watch('selectedPriorities', $scope.loadTasks);
                $scope.$watch('selectedStatuses', $scope.loadTasks);
            };

            $scope.loadTasks = function () {
                Tasks.getAll($scope.currentPage, $scope.perPage, $scope.selectedPriorities, $scope.selectedStatuses).then(
                    function (response) {
                        $scope.tasks = response.data.tasks;
                        $scope.count = response.data.count;

                        if ($scope.currentPage > Math.ceil($scope.count / $scope.perPage)) {
                            $scope.currentPage = Math.ceil($scope.count / $scope.perPage) || 1;
                        }

                        $scope.alertMessage = null;
                    },
                    function (response) {
                        $scope.alertMessage = "Error " + response.data.message;
                    }
                );
            };

            $scope.openProject = function (id) {
                $location.path('/projects/' + id);
            };

            $scope.openTask = function (projectId, taskId) {
                $location.path('/projects/' + projectId + '/tasks/' + taskId);
            };

            init();
        });
}(angular));