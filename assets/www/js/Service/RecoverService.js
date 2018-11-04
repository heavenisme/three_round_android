/**
 * Created by Administrator on 2016/3/16.
 */
angular.module('starter.RecoverService', [])
.service("RecoverService", function($q, $http) {
        var paramsData = {};
        return{
            //设置参数值
            set : function(data) {
                paramsData = data;
            },
            //获取参数值
            get : function() {
                return paramsData;
            },
            //本地存储
            setLocalStorage : function(key,val) {
               window.localStorage.setItem(key,val);
            },
            //获取本地存储
            getLocalStorage : function(key) {
                return window.localStorage.getItem(key);
            },
            //移除本地存储
            reomveLocalStorage : function(key){
                window.localStorage.removeItem(key);
            },
            //获取采收计划列表
            recoverList : function(houseId){
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get(AC.GET_RECOVER_LIST() + "?house_id="+ houseId)
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
            // 获取采收计划信息详细
            recoverInfoDetails : function(recoverId){
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get(AC.GET_RECOVER_INFO_DETAILS() + "?harvest_plan_id="+ recoverId)
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
            // 获取包装方式
           getPackWays : function(){
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get(AC.GET_RECOVER_PACK_WAY())
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
            // 获取配送方式温馨提示
            getDeliveryReminder : function(){
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get(AC.GET_RECOVER_DELIVERY_REMINDER())
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
           //获取配送方式便利店列表
            getDeliveryStoeList : function(){
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get(AC.GET_RECOVER_DELIVERY_STORE_LIST())
                    .success(
                    function(data, status, headers, config) {
                        deferred.resolve(data.data);
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
            //获取配送地址列表
            getDeliveryAddressList : function(userId){
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get(AC.GET_RECOVER_DELIVERY_ADDRESS_LIST() + '?user_id='+ userId)
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
            //新建收货地址
            AddDeliveryAddress : function(data){
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post(AC.ADD_DELIVERY_ADDRESS(),data)
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
            //编辑收货地址
            editAddress : function(data){
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.put(AC.UPDATE_ADDRESS(),data)
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
            //提交
            submitRecover : function(data){
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post(AC.SUBMIT_RECOVER(),data)
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
            //快递信息
            getExpressMsg : function(){
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get(AC.RECOVER_DELIVERY_EXPRESS())
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
            //可选配送时间
            getDeliveryTime : function(id){
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get(AC.DELIVERY_TIME()+"/"+id)
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
            }
        }
})
