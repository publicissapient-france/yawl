'use strict';

angular.module('yawl.controllers.login', []).
    controller('loginCtrl', ['$rootScope', '$location', function ($rootScope, $location) {
        this.loginWith = function (provider) {
            $rootScope.auth.$login(provider);
        };

        $rootScope.$on("user:logout", function () {
            $rootScope.auth.$logout();
            $location.path('/login');
        });
    }]);
