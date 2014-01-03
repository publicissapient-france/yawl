'use strict';

angular.module('yawl.services.wishlists', ['yawl.services.firebaseRefs'])
    .factory('wishlistCollection', ['FireRef', function (FireRef) {
        return {
            collection: function () {
                return FireRef.wishlists();
            },

            find: function (userId, wishlistId) {
                return FireRef.wishlists(userId).$child('/' + wishlistId);
            },

            create: function (wishlist) {
                FireRef.wishlists().$add(angular.extend({ creationDate: new Date().getTime() }, wishlist));
            },

            remove: function (wishlistId) {
                FireRef.wishlists().$remove(wishlistId);
            }
        }
    }]);