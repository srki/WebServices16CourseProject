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
                },
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
                },
                getAllTasks: function (id, page, perPage) {
                    page = page || 1;
                    perPage = perPage || 5;

                    return $http({
                        method: 'GET',
                        url: 'api/projects/' + id + '/tasks',
                        params: {
                            page: page,
                            per_page: perPage
                        }
                    });
                },
                createTask: function (projectId, description, priority, status) {
                    return $http({
                        method: 'POST',
                        url: 'api/projects/' + projectId + '/tasks',
                        data: {
                            description: description,
                            priority: priority,
                            status: status
                        }
                    });
                },
                removeTask: function (projectId, taskId) {
                    return $http({
                        method: 'POST',
                        url: 'api/projects/' + projectId + '/tasks/' + taskId
                    });
                },
                editTask: function (projectId, taskId, name, description, status, priority) {
                    return $http({
                        method: 'PUT',
                        url: 'api/projects/' + projectId + '/tasks/' + taskId,
                        data: {
                            name: name,
                            description: description,
                            status: status,
                            priority: priority
                        }
                    });
                },
                getTaskHistory: function (projectId, taskId, page, perPage) {
                    page = page || 1;
                    perPage = perPage || 3;

                    return $http({
                        method: 'GET',
                        url: 'api/projects/' + projectId + '/tasks/' + taskId + '/history',
                        params: {
                            page: page,
                            perPage: perPage
                        }
                    });
                }

            };
        });
}(angular));