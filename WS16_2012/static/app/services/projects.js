/**
 * Created by Srđan on 5.5.2016..
 */
/*global angular*/
(function (angular) {
    "use strict";

    angular.module('app.Projects', [])
        .factory('Projects', function ($http) {
            return {
                getAll: function (page, perPage, priority, status) {
                    page = page || 0;
                    perPage = perPage || 10;

                    return $http({
                        method: 'GET',
                        url: 'api/projects',
                        params: {
                            page: page,
                            per_page: perPage,
                            priority: priority,
                            status: status
                        }
                    });
                },
                getById: function (id) {
                    return $http({
                        method: 'GET',
                        url: 'api/projects/' + id
                    });
                },
                create: function () {

                },
                update: function () {

                }
            };
        });
}(angular));