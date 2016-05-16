/**
 * Created by Srđan on 5.5.2016..
 */
/*global angular*/
(function (angular) {
    "use strict";

    angular.module('app.TaskModalCtrl', [])
        .controller('TaskModalCtrl', function ($scope, $uibModalInstance, $resource, Projects, PRIORITIES, STATUSES) {
            var TasksResource = $resource('api/projects/' + $scope.projectId + '/tasks/:id',
                {id: '@id'},
                {update: {method: 'PUT'}});

            $scope.create = function () {
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

                $scope.task.$save(function () {
                    $scope.close(true);
                });
            };

            $scope.getParticipants = function (pattern) {
                return Projects.getParticipantsByPattern($scope.projectId, pattern, 5).then(function (response) {
                    return response.data;
                });
            };

            $scope.close = function (refresh) {
                refresh = refresh || false;
                $uibModalInstance.close(refresh);
            };

            (function () {
                $scope.PRIORITIES = PRIORITIES;
                $scope.STATUSES = STATUSES;
                $scope.task = new TasksResource();
            }());
        });
}(angular));