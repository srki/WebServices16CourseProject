/**
 * Created by Srđan on 5.5.2016..
 */
/*global angular*/
(function (angular) {
    "use strict";

    angular.module('app.DashboardCtrl', [])
        .controller('DashboardCtrl', function ($scope, $location, Auth, Tasks, PRIORITIES, STATUSES) {
            var init = function () {
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
                $scope.selectedPriorities = [];
                $scope.selectedStatuses = [];
                $scope.currentPage = 1;
                $scope.count = 0;

                $scope.loadTasks();
                $scope.$watch('selectedPriorities', $scope.loadTasks);
                $scope.$watch('selectedStatuses', $scope.loadTasks);
            };

            $scope.loadTasks = function () {
                Tasks.getAll($scope.currentPage, 15, $scope.selectedPriorities, $scope.selectedStatuses).then(
                    function (response) {
                        $scope.tasks = response.data.tasks;
                        $scope.count = response.data.count;
                        $scope.alertMessage = null;
                    },
                    function (response) {
                        $scope.alertMessage = "Error " + response.data.message;
                    }
                );
            };

            init();
        });
}(angular));