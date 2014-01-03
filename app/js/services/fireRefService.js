'use strict';

angular.module('yawl.services.firebaseRefs', ['firebase'])
    .factory('FireRef', ['$rootScope', 'FBURL', 'Firebase', '$firebase', function ($rootScope, FBURL, Firebase, $firebase) {
        return {
            wishlists: function (userId) {
                userId = userId || $rootScope.auth.user.id;
                return $firebase(new Firebase(FBURL + '/users/' + userId + '/wishlists'));
            },

            items: function (wishlistId, userId) {
                return this.wishlists(userId).$child(wishlistId).$child("items");
            }
        }
    }]);