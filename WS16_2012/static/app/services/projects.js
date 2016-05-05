/**
 * Created by Srđan on 5.5.2016..
 */
/*global angular*/
(function (angular) {
    "use strict";

    angular.module('app.Projects', [])
        .factory('Projects', function ($http) {
            return {
                getAll: function (page, perPage) {
                    page = page || 1;
                    perPage = perPage || 10;

                    return $http({
                        method: 'GET',
                        url: 'api/projects',
                        params: {
                            page: page,
                            per_page: perPage
                        }
                    });
                },
                getById: function (id) {
                    return $http({
                        method: 'GET',
                        url: 'api/projects/' + id
                    });
                },
                create: function (name, description) {
                    return $http({
                        method: 'POST',
                        url: 'api/projects',
                        data: {
                            name: name,
                            description: description
                        }
                    });
                },
                update: function (id, name, description) {
                    return $http({
                        method: 'PUT',
                        url: 'api/projects/' + id,
                        data: {
                            name: name,
                            description: description
                        }
                    });
                }
            };
        });
}(angular));