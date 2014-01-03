'use strict';

angular.module('yawl.controllers.wishlist', []).
    controller('wishlistCtrl', ['$scope', '$routeParams', '$location', 'wishlistCollection', 'FireRef', '$firebase',
        function ($scope, $routeParams, $location, wishlistCollection, FireRef, $firebase) {
            $scope.wishlist = {};
            $scope.$locationUrl = $location.absUrl();

            $scope.ownerId = $routeParams["ownerId"];
            var wishlistId = $routeParams["wishlistId"];

            var wishlist = wishlistCollection.find($scope.ownerId, wishlistId);
            wishlist.$bind($scope, 'wishlist');

            $scope.addNewItem = function (item) {
                if (!$scope.wishlist.items) $scope.wishlist.items = {};
                $scope.wishlist.items[new Date().getTime()] = angular.extend({reserved: ""}, item);
            };

            $scope.removeItem = function (itemId) {
                delete $scope.wishlist.items[itemId];
            };

            $scope.reserveItem = function (itemId) {
                var itemToReserve = FireRef.items(wishlistId, $scope.ownerId).$child(itemId).$child("reserved");
                itemToReserve.$set($scope.auth.user.id);
            };

            $scope.releaseItem = function (itemId) {
                var itemToReserve = FireRef.items(wishlistId, $scope.ownerId).$child(itemId).$child("reserved");
                itemToReserve.$set("");
            };

            $scope.isReservedByMe = function (item) {
                return $scope.auth.user && item.reserved == $scope.auth.user.id;
            };

            return $scope;
        }]);