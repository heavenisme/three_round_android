/**
 * Created by Administrator on 2016/3/16.
 */
angular.module('starter.TribeActiveService', [])
.service("TribeActiveService", function($q, $http) {
        var paramsData = {};
        return {
            //设置参数值
            set: function (data) {
                paramsData = data;
            },
            //获取参数值
            get: function () {
                return paramsData;
            },
            ////本地存储
            setLocalStorage: function (key, val) {
                window.localStorage.setItem(key, val);
            },
            //获取本地存储
            getLocalStorage: function (key) {
                return window.localStorage.getItem(key);
            },
            //移除本地存储
            reomveLocalStorage: function (key) {
                window.localStorage.removeItem(key);
            },
            //获取农趣活动列表
            getTribeActiveList: function () {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get(AC.GET_TRIBEACTIVE_LIST())
                    .success(function (data, status, headers, config) {
                        deferred.resolve(data);
                    })
                    .error(function (data, status, headers, config) {
                        deferred.reject(status);
                    });

                promise.success = function (fn) {
                    promise.then(fn);
                    return promise;
                }
                promise.error = function (fn) {
                    promise.then(null, fn);
                    return promise;
                }
                return promise;
            },
            //农趣活动详情
            getTribeActiveDetail : function(party_id){
                var deferred = $q.defer();
                var promise = deferred.promise;
                console.log("获取农趣详情url:"+AC.TRIBEACTIVE_DETAIL()+"?party_id="+party_id)
                $http.get(AC.TRIBEACTIVE_DETAIL()+"?party_id="+party_id)
                    .success(function (data, status, headers, config) {
                        deferred.resolve(data);
                    })
                    .error(function (data, status, headers, config) {
                        deferred.reject(status);
                    });

                promise.success = function (fn) {
                    promise.then(fn);
                    return promise;
                }
                promise.error = function (fn) {
                    promise.then(null, fn);
                    return promise;
                }
                return promise;
            },
           //报名
            activeRegister : function(data){
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post(AC.ACTIVE_REGISTER(),data)
                    .success(
                        function (data, status, headers, config) {
                            deferred.resolve(data);
                        }
                    )
                    .error(
                        function (data, status, headers, config) {
                            deferred.reject(status);
                        }
                    );

                promise.success = function (fn) {
                    promise.then(fn);
                    return promise;
                }
                promise.error = function (fn) {
                    promise.then(null, fn);
                    return promise;
                }
                return promise;
            },
         //历史活动
            historyActive : function(){
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get(AC.ACTIVE_HISTORY())
                    .success(
                    function (data, status, headers, config) {
                        deferred.resolve(data);
                    }
                )
                    .error(
                    function (data, status, headers, config) {
                        deferred.reject(status);
                    }
                );

                promise.success = function (fn) {
                    promise.then(fn);
                    return promise;
                }
                promise.error = function (fn) {
                    promise.then(null, fn);
                    return promise;
                }
                return promise;
            }
        }
    })
