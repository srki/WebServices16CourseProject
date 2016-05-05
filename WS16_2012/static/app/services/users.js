/**
 * Created by Srđan on 5.5.2016..
 */
/*global angular*/
(function (angular) {
    "use strict";

    angular.module('app.Users', [])
        .factory('Users', function ($http) {
            return {
                getByPattern: function (pattern, count) {
                    count = count || 10;
                    return $http({
                        method: 'GET',
                        url: '/api/users',
                        data: {
                            pattern: pattern,
                            count: count
                        }
                    });
                }
            };
        });
}(angular));