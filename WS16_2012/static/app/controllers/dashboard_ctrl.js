/**
 * Created by Srđan on 5.5.2016..
 */
/*global angular*/
(function (angular) {
    "use strict";

    angular.module('app.DashboardCtrl', [])
        .controller('DashboardCtrl', function ($scope, $location, $resource, PRIORITIES, STATUSES) {
            var TasksResource = $resource('/api/tasks');

            $scope.loadPage = function () {
                TasksResource.query($scope.queryParams, function (data, headers) {
                    $scope.tasks = data;
                    $scope.count = headers().count;
                    $scope.alertMessage = null;
                });
            };

            $scope.openProject = function (id) {
                $location.path('/projects/' + id);
            };

            $scope.openTask = function (projectId, taskId) {
                $location.path('/projects/' + projectId + '/tasks/' + taskId);
            };

            (function () {
                $scope.PRIORITIES = PRIORITIES;
                $scope.STATUSES = STATUSES;
                $scope.tasks = [];
                $scope.count = 0;
                $scope.queryParams = {
                    page: 1,
                    per_page: 10,
                    priority: [],
                    status: []
                };

                $scope.loadPage();
                $scope.$watchGroup(['queryParams.status', 'queryParams.priority'], $scope.loadPage);
            }());
        });
}(angular));