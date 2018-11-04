angular.module('starter.MyBalanceService', [])
//-------------------------------------------
.service("MyBalanceService", function($q, $http) {

    return{
        getMyBalance: function(userId) {
            var deferred = $q.defer();
            var promise = deferred.promise;
//             alert("=====>" + AC.TRADE_GET_ACCOUNT()+"/" + userId);
            //ajax请求
            $http.get(AC.TRADE_GET_ACCOUNT() + "/" + userId)
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

        getTransactionRecords: function(userId, pageNow, pageSize) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            //ajax请求
            $http.get(AC.TRADE_GET_ACCOUNT_RECORD() + "?userId=" + userId + "&pageNow=" + pageNow + "&pageSize=" + pageSize)
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