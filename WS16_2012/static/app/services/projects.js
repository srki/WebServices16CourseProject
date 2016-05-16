/**
 * Created by Srđan on 5.5.2016..
 */
/*global angular*/
(function (angular) {
    "use strict";

    angular.module('app.Projects', [])
        .factory('Projects', function ($http) {
            return {
                getAllParticipants: function (id, page, perPage) {
                    page = page || 1;
                    perPage = perPage || 10;

                    return $http({
                        method: 'GET',
                        url: 'api/projects/' + id + '/participants',
                        params: {
                            page: page,
                            per_page: perPage
                        }
                    });
                },
                getParticipantsByPattern: function (id, pattern, count) {
                    count = count || 10;

                    return $http({
                        method: 'GET',
                        url: 'api/projects/' + id + '/participants',
                        params: {
                            pattern: pattern,
                            count: count
                        }
                    });
                },
                addParticipant: function (projectId, participantId) {
                    return $http({
                        method: 'POST',
                        url: 'api/projects/' + projectId + '/participants/append',
                        data: {
                            userId: participantId
                        }
                    });
                },
                removeParticipant: function (projectId, participantId) {
                    return $http({
                        method: 'POST',
                        url: 'api/projects/' + projectId + '/participants/remove',
                        data: {
                            userId: participantId
                        }
                    });
                }
            };
        });
}(angular));