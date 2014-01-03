'use strict';

angular.module('yawl.controllers.wishlists', []).
    controller('wishlistsCtrl', ['$scope', 'wishlistCollection', function ($scope, wishlistCollection) {

        this.getWishlistCollection = function () {
            this.list = wishlistCollection.collection();
        };

        var self = this;
        $scope.$on('$firebaseAuth:login', function () {
            self.getWishlistCollection();
        });

        this.removeWishlist = function (wishlistId) {
            wishlistCollection.remove(wishlistId);
        };

        this.createWishlist = function (wishlist) {
            wishlistCollection.create(wishlist);
        };
    }]);