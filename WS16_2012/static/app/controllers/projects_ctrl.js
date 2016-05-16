/**
 * Created by Srđan on 5.5.2016..
 */
/*global angular*/
(function (angular) {
    "use strict";

    angular.module('app.ProjectsCtrl', [])
        .controller('ProjectsCtrl', function ($scope, $location, $uibModal, $resource) {
            var ProjectsResource = $resource('api/projects/:id',
                {id: '@id'},
                {update: {method: 'PUT'}});

            $scope.loadPage = function () {
                ProjectsResource.query($scope.queryParams, function (data, headers) {
                    $scope.projects = data;
                    $scope.count = headers().count;
                });
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

            (function () {
                $scope.projects = [];
                $scope.count = 0;
                $scope.queryParams = {
                    page: 1,
                    per_page: 10
                };
                $scope.loadPage();
            }());
        });
}(angular));