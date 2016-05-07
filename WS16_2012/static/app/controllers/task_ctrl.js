/**
 * Created by Srđan on 5.5.2016..
 */
/*global angular*/
(function (angular) {
    "use strict";

    angular.module('app.TaskCtrl', [])
        .controller('TaskCtrl', function ($scope, $filter, $location, $routeParams, Auth, Projects, PRIORITIES, STATUSES) {
            var setEditFields = function () {
                    $scope.task.priority = $filter('lowercase')($scope.task.priority);
                    $scope.task.status = $filter('lowercase')($scope.task.status);

                    $scope.code = $scope.task.code;
                    $scope.subject = $scope.task.subject;
                    $scope.description = $scope.task.description;
                    $scope.priority = $scope.task.priority;
                    $scope.status = $scope.task.status;
                    $scope.assignedTo = $scope.task.assigned;
                },
                init = function () {
                    Auth.isLogged().then(
                        function (response) {
                            Auth.storeCredentials(response.data.role, response.data.id);
                        },
                        function () {
                            $location.path("/login");
                        }
                    );

                    $scope.priorities = PRIORITIES;
                    $scope.statuses = STATUSES;

                    $scope.projectId = $routeParams.projectId;
                    $scope.taskId = $routeParams.taskId;
                    $scope.task = {};

                    $scope.edit = false;
                    $scope.code = "";
                    $scope.subject = "";
                    $scope.description = "";
                    $scope.priority = "";
                    $scope.status = "";
                    $scope.assignedTo = "";

                    Projects.getTaskById($scope.projectId, $scope.taskId).then(
                        function (response) {
                            $scope.task = response.data;
                            setEditFields($scope.task);
                        },
                        function (response) {
                            $scope.alertMessage = "Error: " + response.data.message;
                        }
                    );
                };

            $scope.getParticipants = function (pattern) {
                return Projects.getParticipantsByPattern($scope.projectId, pattern, 5).then(function (response) {
                    return response.data.users;
                });
            };

            $scope.update = function () {
                if (!$scope.subject) {
                    $scope.alertMessage = "Subject cannot be empty";
                } else if (!$scope.description) {
                    $scope.alertMessage = "Description cannot be empty";
                } else if (!$scope.priority) {
                    $scope.alertMessage = "You have to select priority.";
                } else if (!$scope.status) {
                    $scope.alertMessage = "You have to select status.";
                } else {
                    $scope.alertMessage = null;
                }

                if ($scope.alertMessage) {
                    return;
                }

                Projects.updateTask($scope.projectId, $scope.taskId, $scope.subject, $scope.description,
                    $scope.status, $scope.priority, $scope.assignedTo ? $scope.assignedTo.id : null).then(
                    function (response) {
                        $scope.task = response.data;
                        $scope.cancel();
                    },
                    function (response) {
                        $scope.alertMessage = "Error: " + response.data.message;
                    }
                );
            };

            $scope.revert = function (change) {
                $scope.edit = true;
                $scope.subject = change.subject;
                $scope.description = change.description;
                $scope.priority = $filter('lowercase')(change.priority);
                $scope.status = $filter('lowercase')(change.status);
                $scope.assignedTo = change.assigned;
            };

            $scope.cancel = function () {
                setEditFields();
                $scope.edit = false;
                $scope.alertMessage = null;
            };

            init();
        });
}(angular));
