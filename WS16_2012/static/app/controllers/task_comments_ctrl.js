/**
 * Created by Srđan on 6.5.2016..
 */
(function (angular) {
    "use strict";

    angular.module('app.TaskCommentsCtrl', [])
        .controller('TaskCommentsCtrl', function ($scope, Projects) {
            var init = function () {
                $scope.commentText = null;
                $scope.comments = [];
                $scope.count = 0;
                $scope.currentPage = 1;
                $scope.editId = null;

                $scope.loadComments();
            };

            $scope.loadComments = function () {
                Projects.getAllComments($scope.projectId, $scope.taskId, $scope.currentPage, 5).then(
                    function (response) {
                        $scope.comments = response.data.comments;
                        $scope.count = response.data.count;
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