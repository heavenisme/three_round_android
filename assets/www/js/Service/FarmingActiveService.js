/**
 * Created by Administrator on 2016/3/16.
 */
angular.module('starter.FarmingActiveService', [])
.service("FarmingActiveService", function($q, $http) {
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
            //获取农事活动列表
            getFarmingActiveList: function (id) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                console.log("农事活动列表----------------------：" + AC.FARMING_LIST()+"/"+id)
                $http.get(AC.FARMING_LIST()+"/"+id)
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
            //获取农事活动规则
            getWorkRule : function () {
                var deferred = $q.defer();
                var promise = deferred.promise;
                console.log("农事活动规则----------------------：" + AC.GETWORKRULE());
                $http.get(AC.GETWORKRULE())
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
            //农事活动预约
            appoint : function(data){
                var deferred = $q.defer();
                var promise = deferred.promise;
                console.log("农事活动预约----------------------：" + AC.FARMING_APPOINT()+JSON.stringify(data));
                $http.post(AC.FARMING_APPOINT(),data)
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
            //查看预约结果
            appointmentResult : function(farmWorkId){
                var deferred = $q.defer();
                var promise = deferred.promise;
                console.log("农事活动结果----------------------：" + AC.FARMING_RESULT()+"/"+farmWorkId);
                $http.get(AC.FARMING_RESULT()+"/"+farmWorkId)
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
            //查看预约结果
            appointmentCancle : function(farmWorkId){
                var deferred = $q.defer();
                var promise = deferred.promise;
                console.log("农事活动取消----------------------：" + AC.FARMING_CANCLE()+"/"+farmWorkId);
                $http.post(AC.FARMING_CANCLE()+"/"+farmWorkId)
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
