/*global angular*/
(function (angular) {
    "use strict";
    angular.module('app.constants', [])
        .constant('PRIORITIES', ["blocker", "critical", "major", "minor", "trivial"])
        .constant('STATUSES', ["to do", "in progress", "verify", "done"])
        .constant('USERNAME_REGEX', /^[A-Za-z0-9]+$/);
}(angular));
