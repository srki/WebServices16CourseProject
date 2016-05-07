/**
 * Created by Srđan on 6.5.2016..
 */
/*global angular*/
(function (angular) {
    "use strict";

    angular.module('app.TaskCommentsCtrl', [])
        .controller('TaskCommentsCtrl', function ($scope, Projects) {
            var init = function () {
                $scope.commentText = null;
                $scope.comments = [];
                $scope.editId = null;
                $scope.count = 0;
                $scope.currentPage = 1;
                $scope.perPage = 5;

                $scope.loadComments();
            };

            $scope.loadComments = function () {
                Projects.getAllComments($scope.projectId, $scope.taskId, $scope.currentPage, $scope.perPage).then(
                    function (response) {
                        $scope.comments = response.data.comments;
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

            $scope.setEdit = function (id, text) {
                $scope.editId = id;
                $scope.commentText = text;
            };

            $scope.cancel = function () {
                $scope.editId = null;
                $scope.commentText = "";
            };

            $scope.remove = function (id) {
                Projects.removeComment($scope.projectId, $scope.taskId, id).then(
                    function () {
                        $scope.cancel();
                        $scope.loadComments();
                        $scope.alertMessage = null;
                    },
                    function (response) {
                        $scope.alertMessage = "Error: " + response.data.message;
                    }
                );
            };

            $scope.send = function () {
                var success = function () {
                        $scope.cancel();
                        $scope.loadComments();
                        $scope.alertMessage = null;
                    },
                    error = function (response) {
                        $scope.alertMessage = "Error: " + response.data.message;
                    };

                if (!$scope.commentText) {
                    $scope.alertMessage = "You must enter comment text";
                } else {
                    $scope.alertMessage = null;
                }

                if ($scope.alertMessage) {
                    return;
                }

                if (!$scope.editId) {
                    Projects.createComment($scope.projectId, $scope.taskId, $scope.commentText).then(success, error);
                } else {
                    Projects.updateComment($scope.projectId, $scope.taskId, $scope.editId, $scope.commentText).then(success, error);
                }
            };

            init();
        });
}(angular));