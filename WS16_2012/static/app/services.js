/*global angular*/
angular.module('app.services', [
    'app.Auth',
    'app.Projects',
    'app.Users',
    'app.Reports',
    'app.ForbiddenResponseInterceptor',
    'app.PaginationResponseInterceptor'
]);

