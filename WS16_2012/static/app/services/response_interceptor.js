/**
 * Created by Srđan on 16.5.2016..
 */

/*global angular*/
(function (angular) {
    "use strict";

    angular.module('app.ResponseInterceptor', [])
        .factory('ResponseInterceptor', function responseObserver($q, $location) {
            return {
                'responseError': function (errorResponse) {
                    if (errorResponse.status === 403) {
                        var path = $location.path();
                        if (path !== '/login' && path !== '/register') {
                            $location.search('redirectTo', path);
                        }

                        $location.path('/logout');
                    }

                    return $q.reject(errorResponse);
                }
            };
        });
}(angular));