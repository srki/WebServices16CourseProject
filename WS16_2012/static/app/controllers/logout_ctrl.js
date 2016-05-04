/**
 * Created by Srđan on 4.5.2016..
 */
/*global angular*/
(function (angular) {
    "use strict";

    angular.module('app.LogoutCtrl', [])
        .controller('LogoutCtrl', function ($rootScope, Auth, $location) {
            Auth.logout().then(
                function () {
                    $rootScope.display = 'login';
                    $location.path('/');
                },
                function () {
                    $rootScope.display = 'login';
                    $location.path('/');
                }
            );
        });
}(angular));