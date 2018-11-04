angular.module('starter.MyTribeService', [])
//-------------------------------------------
.service("MyTribeService", function($q, $http) {

    return{
        getMyGreenHouse: function(userId) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            //ajax请求
            $http.get(AC.GET_MY_GREENHOUSE() + "/" + userId)
                .success(
                    function(data, status, headers, config) {
                        deferred.resolve(data);
                    }
                )
                .error(
                    function(data, status, headers, config) {
                        deferred.reject(status);
                    }
                );

            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        },

        getGreenHouseInfo: function(userId, houseId) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            //ajax请求
            $http.get(AC.GET_GREENHOUSE_INFO() + "?userId=" + userId + "&houseId=" + houseId)
                .success(
                    function(data, status, headers, config) {
                        deferred.resolve(data);
                    }
                )
                .error(
                    function(data, status, headers, config) {
                        deferred.reject(status);
                    }
                );

            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        },

        getGreenHouseLand: function(userId, houseId) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            //ajax请求
            $http.get(AC.GET_GREENHOUSE_LAND() + "?userId=" + userId + "&houseId=" + houseId)
                .success(
                    function(data, status, headers, config) {
                        deferred.resolve(data);
                    }
                )
                .error(
                    function(data, status, headers, config) {
                        deferred.reject(status);
                    }
                );

            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        },

        getGreenHouseTribe: function(userId, houseId) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            
            //ajax请求
            $http.get(AC.GET_GREENHOUSE_TRIBE() + "?userId=" + userId + "&houseId=" + houseId)
                .success(
                    function(data, status, headers, config) {
                        deferred.resolve(data);
                    }
                )
                .error(
                    function(data, status, headers, config) {
                        deferred.reject(status);
                    }
                );

            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;

        },
    }
});