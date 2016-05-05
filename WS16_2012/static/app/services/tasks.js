/**
 * Created by Srđan on 5.5.2016..
 */
/*global angular*/
(function (angular) {
    "use strict";

    angular.module('app.Tasks', [])
        .factory('Tasks', function ($http) {
            return {
                getAll: function (page, perPage, priorities, statuses) {
                    var params = {
                        page: page,
                        per_page: perPage
                    };

                    if (priorities && priorities.length) {
                        params.priority = priorities.toString();
                    }

                    if (statuses && statuses.length) {
                        params.status = statuses.toString();
                    }

                    return $http({
                        method: 'GET',
                        url: '/api/tasks',
                        params: params
                    });
                }
            };
        });
}(angular));