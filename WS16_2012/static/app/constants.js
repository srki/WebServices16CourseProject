/*global angular*/
(function (angular) {
    "use strict";
    angular.module('app.constants', [])
        .constant('PRIORITIES', ["blocker", "critical", "major", "minor", "trivial"])
        .constant('STATUSES', ["to do", "in progress", "verify", "done"])
        .constant('REPORT_TYPES',
            ['Assigned task', 'Finished tasks', 'The dynamics of creating tasks', 'The dynamics of finishing tasks', 'User activities'])
        .constant('USERNAME_REGEX', /^[A-Za-z0-9]+$/);
}(angular));
