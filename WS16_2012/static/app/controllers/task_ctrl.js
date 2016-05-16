/**
 * Created by Srđan on 5.5.2016..
 */
/*global angular*/
(function (angular) {
    "use strict";

    angular.module('app.TaskCtrl', [])
        .controller('TaskCtrl', function ($scope, $filter, $location, $routeParams, $resource, Projects, PRIORITIES, STATUSES) {
            var TasksResource = $resource('api/projects/' + $routeParams.projectId + '/tasks/:id',
                {id: '@id'},
                {update: {method: 'PUT'}});

            $scope.getParticipants = function (pattern) {
                return Projects.getParticipantsByPattern($scope.projectId, pattern, 5).then(function (response) {
                    return response.data;
                });
            };

            $scope.loadTask = function () {
                TasksResource.get({id: $routeParams.taskId}, function (data) {
                    $scope.task = data;
                    $scope.task.priority = $filter('lowercase')($scope.task.priority);
                    $scope.task.status = $filter('lowercase')($scope.task.status);
                });
            };

            $scope.update = function () {
                if (!$scope.task.subject) {
                    $scope.alertMessage = "Subject cannot be empty";
                } else if (!$scope.task.description) {
                    $scope.alertMessage = "Description cannot be empty";
                } else if (!$scope.task.priority) {
                    $scope.alertMessage = "You have to select priority.";
                } else if (!$scope.task.status) {
                    $scope.alertMessage = "You have to select status.";
                } else {
                    $scope.alertMessage = null;
                }

                if ($scope.alertMessage) {
                    return;
                }

                if ($scope.task.assigned) {
                    $scope.task.assigned = $scope.task.assigned.id;
                }
                if ($scope.task.created) {
                    $scope.task.created = $scope.task.created.id;
                }
                $scope.task.$update($scope.cancel);
            };

            $scope.backToProject = function () {
                $location.path('/projects/' + $scope.projectId);
            };

            $scope.revert = function (change) {
                $scope.edit = true;
                $scope.task.subject = change.subject;
                $scope.task.description = change.description;
                $scope.task.priority = $filter('lowercase')(change.priority);
                $scope.task.status = $filter('lowercase')(change.status);
                $scope.task.assignedTo = change.assigned;
            };

            $scope.cancel = function () {
                $scope.edit = false;
                $scope.loadTask();
                $scope.alertMessage = null;
            };

            (function () {
                $scope.PRIORITIES = PRIORITIES;
                $scope.STATUSES = STATUSES;
                $scope.projectId = $routeParams.projectId;
                $scope.taskId = $routeParams.taskId;
                $scope.edit = false;
                $scope.task = {};
                $scope.loadTask();
            }());
        });
}(angular));
