/**
 * Created by qiang on 2016/4/27.
 */
angular.module('starter.MyOrderService', [])
//-------------------------------------------
    .service("MyOrderService", function($q, $http) {

        return{
            //------------------------------------------
            // 获取所有订单
            getMyOrderAll : function(){
                var deferred = $q.defer();
                var promise = deferred.promise;

                $http.get(AC.ORDER_GETALL())
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
            //------------------------------------
            // 获取待付款订单
            getMyOrderPendingPayment : function(){
                var deferred = $q.defer();
                var promise = deferred.promise;

                $http.get(AC.ORDER_GETPENDINGPAYMENT())
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
            //------------------------------------
            // 获取待发货订单
            getMyOrderReadyToShip : function(){
                var deferred = $q.defer();
                var promise = deferred.promise;

                $http.get(AC.ORDER_GETREADYTOSHIP())
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
            //------------------------------------
            // 获取待收货订单
            getReceiptOfGoods : function(){
                var deferred = $q.defer();
                var promise = deferred.promise;

                $http.get(AC.ORDER_GETRECEIPTOFGOODS())
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

            //------------------------------------------
            //确认收货
            confirmGoods: function(orderId, sellerId) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                var url= '';
                //ajax请求
                if(sellerId == 0 ){
                    url = AC.ORDER_CONFIRMGOODSFORSELF();
                }else{
                    url = AC.ORDER_CONFIRMGOODS();
                }
                $http.post(url + orderId)
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

            //是否存在配送费
            deliveryCost: function(deliveryOn) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            //ajax请求
            $http.get(AC.DELIVERYCOST() + deliveryOn)
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


        };
    });
