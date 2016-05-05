/**
 * Created by Srđan on 5.5.2016..
 */
/*global angular*/
(function (angular) {
    "use strict";

    angular.module('app.DashboardCtrl', [])
        .controller('DashboardCtrl', function ($scope, $location, Auth) {
            var init = function () {
                if (!Auth.hasStoredCredentials()) {
                    $location.path("/login");
                }
            };

            init();
        });
}(angular));