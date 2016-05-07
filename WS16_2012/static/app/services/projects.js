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
                getTaskById: function (projectId, taskId) {
                    return $http({
                        method: 'GET',
                        url: 'api/projects/' + projectId + '/tasks/' + taskId
                    });
                },
                createTask: function (projectId, subject, description, priority, status, assigned) {
                    var data = {
                        subject: subject,
                        description: description,
                        priority: priority,
                        status: status
                    };

                    if (assigned) {
                        data.assigned = assigned;
                    }

                    return $http({
                        method: 'POST',
                        url: 'api/projects/' + projectId + '/tasks',
                        data: data
                    });
                },
                removeTask: function (projectId, taskId) {
                    return $http({
                        method: 'POST',
                        url: 'api/projects/' + projectId + '/tasks/' + taskId
                    });
                },
                updateTask: function (projectId, taskId, subject, description, status, priority, assigned) {
                    return $http({
                        method: 'PUT',
                        url: 'api/projects/' + projectId + '/tasks/' + taskId,
                        data: {
                            subject: subject,
                            description: description,
                            status: status,
                            priority: priority,
                            assigned: assigned
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
                },
                getAllComments: function (projectId, taskId, page, perPage) {
                    page = page || 1;
                    perPage = perPage || 10;

                    return $http({
                        method: 'GET',
                        url: 'api/projects/' + projectId + '/tasks/' + taskId + '/comments',
                        params: {
                            page: page,
                            per_page: perPage
                        }
                    });
                },
                getCommentById: function (projectId, taskId, commentId) {
                    return $http({
                        method: 'GET',
                        url: 'api/projects/' + projectId + '/tasks/' + taskId + '/comments/' + commentId
                    });
                },
                createComment: function (projectId, taskId, text) {
                    return $http({
                        method: 'POST',
                        url: 'api/projects/' + projectId + '/tasks/' + taskId + '/comments',
                        data: {
                            text: text
                        }
                    });
                },
                updateComment: function (projectId, taskId, commentId, text) {
                    return $http({
                        method: 'PUT',
                        url: 'api/projects/' + projectId + '/tasks/' + taskId + '/comments/' + commentId,
                        data: {
                            text: text
                        }
                    });
                },
                removeComment: function (projectId, taskId, commentId) {
                    return $http({
                        method: 'DELETE',
                        url: 'api/projects/' + projectId + '/tasks/' + taskId + '/comments/' + commentId
                    });
                }

            };
        });
}(angular));