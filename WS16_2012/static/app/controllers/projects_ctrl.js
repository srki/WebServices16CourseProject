/**
 * Created by Srđan on 5.5.2016..
 */
/*global angular*/
(function (angular) {
    "use strict";

    angular.module('app.ProjectsCtrl', [])
        .controller('ProjectsCtrl', function ($scope, $location, $uibModal, Auth, Projects) {
            var init = function () {
                Auth.isLogged().then(
                    function (response) {
                        Auth.storeCredentials(response.data.role, response.data.id);
                    },
                    function () {
                        $location.path('/login');
                    }
                );

                $scope.projects = [];
                $scope.itemsCount = 0;
                $scope.currentPage = 1;
                $scope.perPage = 10;
                $scope.loadPage();
            };

            $scope.loadPage = function () {
                Projects.getAll($scope.currentPage).then(
                    function (response) {
                        $scope.projects = response.data.projects;
                        $scope.itemsCount = response.data.count;

                        if ($scope.currentPage > Math.ceil($scope.count / $scope.perPage)) {
                            $scope.currentPage = Math.ceil($scope.count / $scope.perPage) || 1;
                        }

                        $scope.alertMessage = null;
                    },
                    function (response) {
                        $scope.alertMessage = 'Error: ' + response.data.message;
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
                $location.path('/projects/' + id);
            };

            $scope.showReports = function (id) {
                $location.path('/projects/' + id + '/reports');
            };

            init();
        });
}(angular));