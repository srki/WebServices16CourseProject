/**
 * Created by Srđan on 6.5.2016..
 */
/*global angular*/
/*global angular*/
(function (angular) {
    "use strict";

    angular.module('app.TaskHistoryCtrl', [])
        .controller('TaskHistoryCtrl', function ($scope, Projects) {
            var init = function () {
                $scope.changes = [];
                $scope.count = 0;
                $scope.currentPage = 1;
                $scope.perPage = 3;

                $scope.loadHistory();
                $scope.$watch('task', $scope.loadHistory);
            };

            $scope.loadHistory = function () {
                Projects.getTaskHistory($scope.projectId, $scope.taskId, $scope.currentPage, $scope.perPage).then(
                    function (response) {
                        $scope.changes = response.data.changes;
                        $scope.count = response.data.count;

                        if ($scope.currentPage > Math.ceil($scope.count / $scope.perPage)) {
                            $scope.currentPage = Math.ceil($scope.count / $scope.perPage) || 1;
                        }

                        $scope.alertMessage = null;
                    },
                    function (response) {
                        $scope.alertMessage = "Error: " + response.data.message;
                    }
                );
            };

            init();
        });
}(angular));