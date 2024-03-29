/**
 * Created by Srđan on 4.5.2016..
 */
/*global angular*/
(function (angular) {
    "use strict";

    angular.module('app.Auth', [])
        .factory('Auth', function ($http, $rootScope) {
            return {
                login: function (username, password) {
                    return $http({
                        method: 'POST',
                        url: 'api/login',
                        data: {
                            username: username,
                            password: password
                        }
                    });
                },
                register: function (username, password) {
                    return $http({
                        method: 'POST',
                        url: 'api/register',
                        data: {
                            username: username,
                            password: password
                        }
                    });
                },
                logout: function () {
                    return $http({
                        method: 'POST',
                        url: 'api/logout'
                    });
                },
                isLogged: function () {
                    return $http({
                        method: 'GET',
                        url: 'api/login'
                    });
                },
                hasStoredCredentials: function () {
                    return $rootScope.display === 'user' || $rootScope.display === 'admin';
                },
                storeCredentials: function (display, userId) {
                    $rootScope.userId = userId;
                    $rootScope.display = display;
                }
            };
        });
}(angular));