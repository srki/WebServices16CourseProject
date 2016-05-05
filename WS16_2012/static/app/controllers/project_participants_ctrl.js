/**
 * Created by Srđan on 5.5.2016..
 */
/*global angular*/
(function (angular) {
    "use strict";

    angular.module('app.ProjectParticipantsCtrl', [])
        .controller('ProjectParticipantsCtrl', function ($scope, Users, Projects) {
            var init = function () {
                $scope.newParticipant = null;
                $scope.participants = [];
                $scope.itemsCount = 0;
                $scope.currentPage = 1;

                $scope.loadParticipants();
            };

            $scope.getUsers = function (pattern) {
                return Users.getByPattern(pattern).then(function (response) {
                    return response.data;
                });
            };

            $scope.loadParticipants = function () {
                Projects.getAllParticipants($scope.projectId, $scope.currentPage).then(
                    function (response) {
                        $scope.participants = response.data.users;
                        $scope.itemsCount = response.data.count;
                        $scope.alertMessage = null;
                    },
                    function (response) {
                        $scope.alertMessage = "Error: " + response.data.message;
                    }
                );
            };

            $scope.addParticipant = function () {
                if (!$scope.newParticipant) {
                    $scope.alertMessage = "Please select valid user.";
                } else {
                    $scope.alertMessage = null;
                }

                if ($scope.alertMessage) {
                    return;
                }

                Projects.addParticipant($scope.projectId, $scope.newParticipant.id).then(
                    function () {
                        $scope.loadParticipants();
                        $scope.alertMessage = null;
                    },
                    function (response) {
                        $scope.alertMessage = "Error: " + response.data.message;
                    }
                );
            };

            $scope.removeParticipant = function (id) {
                Projects.removeParticipant($scope.projectId, id).then(
                    function () {
                        $scope.loadParticipants();
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