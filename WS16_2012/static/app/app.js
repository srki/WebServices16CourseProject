/*global angular*/
(function (angular) {
    "use strict";
    angular.module('app', ['app.controllers', 'app.services', 'app.directives', 'app.constants', 'ngRoute', 'ui.bootstrap'])
        .config(function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                    redirectTo: '/login'
                })
                .when('/login', {
                    templateUrl: 'static/partials/login.html',
                    controller: 'LoginCtrl'
                })
                .otherwise('/login');
            $locationProvider.html5Mode(true);
        })
        .run(function ($rootScope) {
            $rootScope.user = null;
            $rootScope.display = 'login';
        });
}(angular));