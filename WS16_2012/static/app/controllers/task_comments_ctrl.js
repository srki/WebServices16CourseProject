/**
 * Created by Srđan on 6.5.2016..
 */
/*global angular*/
(function (angular) {
    "use strict";

    angular.module('app.TaskCommentsCtrl', [])
        .controller('TaskCommentsCtrl', function ($scope, $resource) {
            var CommentResource = $resource('api/projects/' + $scope.projectId + '/tasks/' + $scope.taskId + '/comments/:id',
                {id: '@id'},
                {update: {method: 'PUT'}});

            $scope.loadPage = function () {
                $scope.comment = new CommentResource();
                CommentResource.query($scope.queryParams, function (data, headers) {
                    $scope.comments = data;
                    $scope.tasks = data;
                    $scope.count = headers().count;
                });
            };

            $scope.edit = function (comment) {
                $scope.comment = comment;
            };

            $scope.cancel = function () {
                $scope.comment = new CommentResource();
                $scope.loadPage();
                $scope.alertMessage = null;
            };


            $scope.save = function () {
                if (!$scope.comment) {
                    $scope.alertMessage = "You must enter comment text";
                } else {
                    $scope.alertMessage = null;
                }

                if ($scope.alertMessage) {
                    return;
                }

                if ($scope.comment.id) {
                    $scope.comment.$update($scope.cancel);
                } else {
                    $scope.comment.$save($scope.cancel);
                }
            };

            $scope.remove = function (comment) {
                comment.$delete($scope.loadPage);
            };

            (function () {
                $scope.comments = [];
                $scope.count = 0;
                $scope.queryParams = {
                    page: 1,
                    per_page: 5
                };

                $scope.loadPage();
            }());
        });
}(angular));