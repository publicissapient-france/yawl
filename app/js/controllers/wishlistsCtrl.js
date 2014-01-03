'use strict';

angular.module('yawl.controllers.wishlists', []).
    controller('wishlistsCtrl', ['$scope', 'wishlistCollection', function ($scope, wishlistCollection) {
        var self = this;
        $scope.$on('$firebaseAuth:login', function () {
            self.getWishlistCollection();
        });

        // -- controller code here --
    }]);