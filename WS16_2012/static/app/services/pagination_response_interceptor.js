/**
 * Created by Srđan on 16.5.2016..
 */

/*global angular*/
(function (angular) {
    "use strict";

    angular.module('app.PaginationResponseInterceptor', [])
        .factory('PaginationResponseInterceptor', function responseObserver() {
            return {
                'response': function (response) {
                    if (response.data.hasOwnProperty('count') && response.data.hasOwnProperty('items')) {
                        response.headers().count = response.data.count;
                        response.data = response.data.items;
                    }
                    return response;
                }
            };
        });
}(angular));