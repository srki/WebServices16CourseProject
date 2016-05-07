/**
 * Created by Srđan on 5.5.2016..
 */
/*global angular*/
(function (angular) {
    "use strict";

    angular.module('app.TaskModalCtrl', [])
        .controller('TaskModalCtrl', function ($scope, $uibModalInstance, Projects, PRIORITIES, STATUSES) {
            var init = function () {
                $scope.priorities = PRIORITIES;
                $scope.statuses = STATUSES;

                $scope.subject = "";
                $scope.description = "";
                $scope.priority = null;
                $scope.status = null;
            };

            $scope.create = function () {
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

                Projects.createTask($scope.projectId, $scope.subject, $scope.description, $scope.priority, $scope.status).then(
                    function () {
                        $scope.alertMessage = null;
                        $scope.close(true);
                    },
                    function (response) {
                        $scope.alertMessage = "Error: " + response.data.message;
                    }
                );
            };

            $scope.close = function (refresh) {
                refresh = refresh || false;
                $uibModalInstance.close(refresh);
            };

            init();
        });
}(angular));