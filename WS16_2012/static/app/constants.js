/*global angular*/
(function (angular) {
    "use strict";
    angular.module('app.constants', [])
        .constant('PRIORITIES', ["Blocker", "Critical", "Major", "Minor", "Trivial"])
        .constant('STATUSES', ["To Do", "In Progress", "Verify", "Done"])
        .constant('USERNAME_REGEX', /^[A-Za-z0-9]+$/);
}(angular));
