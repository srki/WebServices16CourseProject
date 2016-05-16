/**
 * Created by Srđan on 7.5.2016..
 */
/*global angular*/
/*global window*/
/*global Chart*/
(function (angular) {
    "use strict";

    angular.module('app.ReportsCtrl', [])
        .controller('ReportsCtrl', function ($scope, $location, $routeParams, Auth, Reports, Projects, REPORT_TYPES) {
            var init = function () {
                $scope.types = REPORT_TYPES;
                $scope.type = $scope.types[0];
                $scope.projectId = $routeParams.projectId;
                $scope.user = null;
                $scope.selectUser = false;
                $scope.alertMessage = null;
                $scope.chart = null;

                $scope.$watch('type', function () {
                    if ($scope.type === $scope.types[0] || $scope.type === $scope.types[1] ||
                        $scope.type === $scope.types[2] || $scope.type === $scope.types[3]) {
                        $scope.selectUser = false;
                        $scope.alertMessage = null;
                    } else if ($scope.type === $scope.types[4]) {
                        // User activities
                        $scope.selectUser = true;
                        $scope.alertMessage = null;
                    } else {
                        $scope.alertMessage = "Selected report type does not exist.";
                    }
                });

                $scope.update();
            };

            $scope.getParticipants = function (pattern) {
                return Projects.getParticipantsByPattern($scope.projectId, pattern, 5).then(function (response) {
                    return response.data.users;
                });
            };

            $scope.createChart = function (labels, datasets, type) {
                type = type || 'bar';
                datasets[0].backgroundColor = ["#FF6384", "#4BC0C0", "#FFCE56", "#E7E9ED", "#36A2EB"];

                if ($scope.chart) {
                    $scope.chart.destroy();
                }

                var ctx = window.document.getElementById("chart");
                $scope.chart = new Chart(ctx, {
                    type: type,
                    data: {
                        labels: labels,
                        datasets: datasets
                    }
                });
            };

            $scope.update = function () {
                var onError = function (response) {
                    $scope.alertMessage = "Error: " + response.data.message;
                };

                if ($scope.type === $scope.types[0]) {
                    // Assigned tasks
                    Reports.getAssignedReport($scope.projectId).then(function (response) {
                        var labels = [],
                            datasets = [{
                                label: "percentage of assigned task for user",
                                data: []
                            }],
                            item;

                        for (item in response.data) {
                            if (response.data.hasOwnProperty(item)) {
                                labels.push(response.data[item].username);
                                datasets[0].data.push(response.data[item].percentage);
                            }
                        }

                        $scope.createChart(labels, datasets, 'pie');
                    }, onError);
                } else if ($scope.type === $scope.types[1]) {
                    // Finished tasks
                    Reports.getCompletedReport($scope.projectId).then(function (response) {
                        var labels = [],
                            datasets = [{
                                label: "percentage of finished task for user",
                                data: []
                            }],
                            item;

                        for (item in response.data) {
                            if (response.data.hasOwnProperty(item)) {
                                labels.push(response.data[item].username);
                                datasets[0].data.push(response.data[item].percentage);
                            }
                        }

                        $scope.createChart(labels, datasets, 'pie');
                    }, onError);
                } else if ($scope.type === $scope.types[2]) {
                    // The dynamics of creating tasks
                    Reports.getCreatedReport($scope.projectId).then(function (response) {
                        var datasets = [{
                            label: "# of created tasks",
                            data: response.data.data
                        }];

                        $scope.createChart(response.data.labels, datasets, 'bar');
                    }, onError);
                } else if ($scope.type === $scope.types[3]) {
                    // The dynamics of finishing tasks
                    Reports.getDoneReport($scope.projectId).then(function (response) {
                        var datasets = [{
                            label: "# of finished tasks",
                            data: response.data.data
                        }];
                        $scope.createChart(response.data.labels, datasets, 'bar');
                    }, onError);
                } else if ($scope.type === $scope.types[4]) {
                    // User activities
                    if (!$scope.user) {
                        $scope.alertMessage = "Select a user";
                    } else {
                        $scope.alertMessage = null;
                    }

                    if ($scope.alertMessage) {
                        return;
                    }

                    Reports.getUserDoneReport($scope.projectId, $scope.user.id).then(function (response) {
                        var datasets = [{
                            label: "# of finished tasks",
                            data: response.data.data
                        }];
                        $scope.createChart(response.data.labels, datasets, 'bar');
                    }, onError);
                } else {
                    $scope.alertMessage = "Selected report type does not exist.";
                }
            };

            $scope.backToProject = function () {
                $location.path('/projects/' + $scope.projectId);
            };


            init();
        });
}(angular));