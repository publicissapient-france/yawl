'use strict';

angular.module('yawl.controllers.wishlist', []).
    controller('wishlistCtrl', ['$scope', '$routeParams', '$location', 'wishlistCollection', 'FireRef',
        function ($scope, $routeParams, $location, wishlistCollection, FireRef) {
            // -- controller code here --

            return $scope;
        }]);