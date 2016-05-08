/**
 * Created by Srđan on 7.5.2016..
 */
/*global angular*/
(function (angular) {
    "use strict";

    angular.module('app.Reports', [])
        .factory('Reports', function ($http) {
            return {
                getUserDoneReport: function (projectId, userId) {
                    return $http({
                        method: 'GET',
                        url: '/api/projects/' + projectId + '/reports/users/' + userId + '/done'
                    });
                },
                getAssignedReport: function (projectId) {
                    return $http({
                        method: 'GET',
                        url: '/api/projects/' + projectId + '/reports/assigned'
                    });
                },
                getCompletedReport: function (projectId) {
                    return $http({
                        method: 'GET',
                        url: '/api/projects/' + projectId + '/reports/completed'
                    });
                },
                getCreatedReport: function (projectId) {
                    return $http({
                        method: 'GET',
                        url: '/api/projects/' + projectId + '/reports/created'
                    });
                },
                getDoneReport: function (projectId) {
                    return $http({
                        method: 'GET',
                        url: '/api/projects/' + projectId + '/reports/done'
                    });
                }
            };
        });
}(angular));