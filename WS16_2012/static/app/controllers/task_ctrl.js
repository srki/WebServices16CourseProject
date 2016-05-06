/**
 * Created by Srđan on 5.5.2016..
 */
/*global angular*/
(function (angular) {
    "use strict";

    angular.module('app.TaskCtrl', [])
        .controller('TaskCtrl', function ($scope, $filter, $location, $routeParams, Auth, Projects, PRIORITIES, STATUSES) {
            var initEditFields = function () {
                    $scope.task.priority = $filter('lowercase')($scope.task.priority);
                    $scope.task.status = $filter('lowercase')($scope.task.status);

                    $scope.code = $scope.task.code;
                    $scope.subject = $scope.task.subject;
                    $scope.description = $scope.task.description;
                    $scope.priority = $scope.task.priority;
                    $scope.status = $scope.task.status;
                },
                init = function () {
                    Auth.isLogged().then(
                        function (response) {
                            Auth.storeCredentials(response.data.role);
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
                    $scope.subject = "Subject";
                    $scope.description = "";
                    $scope.priority = "";
                    $scope.status = "";

                    Projects.getTaskById($scope.projectId, $scope.taskId).then(
                        function (response) {
                            $scope.task = response.data;
                            // TODO: remove 2 following lines
                            $scope.task.code = $scope.task.name;
                            $scope.task.subject = "test subject";

                            initEditFields($scope.task);
                        },
                        function (response) {
                            $scope.alertMessage = "Error: " + response.data.message;
                        }
                    );
                };

            $scope.update = function () {

            };

            init();
        });
}(angular));
