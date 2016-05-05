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
                .when('/register', {
                    templateUrl: 'static/partials/register.html',
                    controller: 'RegisterCtrl'
                })
                .when('/logout', {
                    template: '',
                    controller: 'LogoutCtrl'
                })
                .when('/dashboard', {
                    templateUrl: 'static/partials/dashboard.html',
                    controller: 'DashboardCtrl'
                })
                .when('/projects', {
                    templateUrl: 'static/partials/projects.html',
                    controller: 'ProjectsCtrl'
                })
                .otherwise('/');
            $locationProvider.html5Mode(true);
        })
        .run(function ($rootScope) {
            $rootScope.user = null;
            $rootScope.display = 'login';
        });
}(angular));