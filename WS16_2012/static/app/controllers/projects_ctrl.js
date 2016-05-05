/**
 * Created by Srđan on 5.5.2016..
 */
/*global angular*/
(function (angular) {
    "use strict";

    angular.module('app.ProjectsCtrl', [])
        .controller('ProjectsCtrl', function ($scope, $location, $uibModal, Auth, Projects) {
            var init = function () {
                if (!Auth.hasStoredCredentials()) {
                    $location.path("/login");
                }

                $scope.projects = [];
                $scope.itemsCount = 0;
                $scope.currentPage = 1;
                $scope.loadPage();
            };

            $scope.loadPage = function () {
                Projects.getAll($scope.currentPage).then(
                    function (response) {
                        $scope.projects = response.data.items;
                        $scope.itemsCount = response.data.itemsCount;
                    },
                    function (response) {
                        $scope.alertMessage = "Error: " + response.data.message;
                    }
                );
            };

            $scope.create = function () {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'static/partials/project_modal.html',
                    controller: 'ProjectModalCtrl'
                }).result.then(function (refresh) {
                    if (refresh) {
                        $scope.loadPage();
                    }
                });
            };

            $scope.open = function (id) {
                $location.path("/projects/" + id);
            };

            init();
        });
}(angular));