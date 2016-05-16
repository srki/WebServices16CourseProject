/**
 * Created by Srđan on 6.5.2016..
 */

/*global angular*/
(function (angular) {
    "use strict";

    angular.module('app.TaskHistoryCtrl', [])
        .controller('TaskHistoryCtrl', function ($scope, $resource) {
            var TaskHistoryResource = $resource('api/projects/' + $scope.projectId + '/tasks/' + $scope.taskId + '/history');

            $scope.loadPage = function () {
                TaskHistoryResource.query($scope.queryParams, function (data, headers) {
                    $scope.changes = data;
                    $scope.count = headers().count;
                    $scope.alertMessage = null;
                });
            };

            (function () {
                $scope.changes = [];
                $scope.count = 0;
                $scope.queryParams = {
                    page: 1,
                    per_page: 3
                };

                $scope.loadPage();
                $scope.$watch('task', $scope.loadPage);
            }());
        });
}(angular));