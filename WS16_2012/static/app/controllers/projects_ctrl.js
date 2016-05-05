/**
 * Created by Srđan on 5.5.2016..
 */
/*global angular*/
(function (angular) {
    "use strict";

    angular.module('app.ProjectsCtrl', [])
        .controller('ProjectsCtrl', function ($scope, $location, Auth, $uibModal) {
            var init = function () {
                if (!Auth.hasStoredCredentials()) {
                    $location.path("/login");
                }
            };

            $scope.create = function () {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'static/partials/project_modal.html',
                    controller: 'ProjectModalCtrl'
                }).result.then(function (refresh) {
                    if (refresh) {

                    }
                });
            };

            init();
        });
}(angular));