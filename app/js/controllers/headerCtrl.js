'use strict';

angular.module('yawl.controllers.header', []).
    controller('headerCtrl', ['$rootScope', function ($rootScope) {
        this.logout = function () {
            $rootScope.$broadcast("user:logout");
        };
    }]);