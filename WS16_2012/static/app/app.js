/*global angular*/
(function (angular) {
    "use strict";
    angular.module('app', ['app.controllers', 'app.services', 'app.directives', 'app.constants',
            'ngRoute', 'ngAnimate', 'ngResource',
            'ui.bootstrap', 'oi.select'])
        .config(function ($routeProvider, $locationProvider, $httpProvider) {
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
                .when('/projects/:id', {
                    templateUrl: 'static/partials/project.html',
                    controller: 'ProjectCtrl'
                })
                .when('/projects/:projectId/tasks/:taskId', {
                    templateUrl: 'static/partials/task.html',
                    controller: 'TaskCtrl'
                })
                .when('/projects/:projectId/reports', {
                    templateUrl: 'static/partials/reports.html',
                    controller: 'ReportsCtrl'
                })
                .otherwise('/');
            $locationProvider.html5Mode(true);

            $httpProvider.interceptors.push('ForbiddenResponseInterceptor');
            $httpProvider.interceptors.push('PaginationResponseInterceptor');
        })
        .filter('capitalize', function () {
            return function (input) {
                return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
            };
        })
        .run(function (Auth) {
            Auth.isLogged().then(function (response) {
                Auth.storeCredentials(response.data.role, response.data.id);
            });
            Auth.storeCredentials('login', null);
        });
}(angular));