'use strict';

angular.module('yawl.controllers.header', []).
    controller('headerCtrl', ['$rootScope', function ($rootScope) {
        this.logout = function () {
            $rootScope.$broadcast("user:logout");
        };
    }]);


angular.module('yawl').run(['$rootScope', '$location',
    function ($rootScope, $location) {
        // Tweak: Manage the case when user goes directly to "/login" and has to be redirected to "/" after sign-in
        var redirect;
        $rootScope.$on("$routeChangeStart", function (e, next) {
            if (!redirect) redirect = next.originalPath;
        });
        $rootScope.$on('$firebaseAuth:login', function () {
            if (redirect == "/login") {
                $location.replace();
                $location.path("/");
            }
        });
    }]);