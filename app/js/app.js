'use strict';

// Application dependencies
angular.module('yawl', [
    'ngRoute',
    'firebase',
    'yawl.controllers.header',
    'yawl.controllers.login',
    'yawl.controllers.wishlists',
    'yawl.controllers.wishlist',
    'yawl.services.firebaseRefs',
    'yawl.services.wishlists'
]);

// Routes
angular.module('yawl').config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {templateUrl: 'partials/login.tpl.html'});
    $routeProvider.when('/', {templateUrl: 'partials/wishlists.tpl.html', authRequired: true});
    $routeProvider.when('/wl/:ownerId/:wishlistId', {templateUrl: 'partials/wishlist.tpl.html', authRequired: true});
    $routeProvider.when('/about', {templateUrl: 'partials/about.tpl.html', authRequired: true});
    $routeProvider.otherwise({redirectTo: '/'});
}]);

// Firebase URL
angular.module('yawl').constant('FBURL', 'https://yawl.firebaseio.com');

// Authentication
angular.module('yawl').run(['$rootScope', '$firebaseAuth', 'FBURL', 'Firebase', '$location',
    function ($rootScope, $firebaseAuth, FBURL, Firebase, $location) {
        $rootScope.signin = "NA";

        // Tweak: Manage the case when user goes directly to "/login" and has to be redirected to "/" after sign-in
        var redirect;
        $rootScope.$on("$routeChangeStart", function (e, next) {
            if (!redirect) redirect = next.originalPath;
        });
        $rootScope.$on('$firebaseAuth:login', function () {
            if (redirect == "/login") {
                $location.replace();
                $location.path("/");
                redirect = undefined;
            }
        });

        $rootScope.auth = $firebaseAuth(new Firebase(FBURL), { path: '/login',
            callback: function () {
                $rootScope.signin = "DONE";
            }
        });

    }]);
