/**
 * Created by Administrator on 2016/3/16.
 */
angular.module('starter.TribeMarketService', [])
.service("TribeMarketService", function($q, $http, $ionicPopup, $state, $ionicLoading) {
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
            //获取部落市场列表
            getTribeMarketList: function () {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get(AC.GET_TRIBEMARKET_LIST())
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
            //获取今日指导价格
            getCroppriceList: function () {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get(AC.GET_CROPPRICE_LIST())
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
            //商家报价
            getCommodityListByKindId: function (id,shopId) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                $http.get(AC.GET_COMMODITY_LIST_BY_KINDID() + "?crop_kind_id=" + id + "&shop_id=" + shopId)
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
            //商品详情
            getCommodityInfo: function (id,shopId) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get(AC.GET_COMMODITY_INFO() + "?commodity_id=" + id + "&shop_id=" + shopId)
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
/*            //生长周期
            getGrowthCycleInfo :function(id){
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get(AC.GET_GROWTHCYCLE_INFO()+"?commodity_id="+id)
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
            },*/
             //生长周期
             getGrowthCycleInfo :function(commodityId,pageNo){
                 console.log("kankan参数是什么"+commodityId+pageNo);
             var deferred = $q.defer();
             var promise = deferred.promise;
             $http.get(AC.GET_GROWTHCYCLE_INFO() + commodityId + "/" + pageNo)
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
            //推荐商品
            gettestimonials : function(id,shopId){
                var deferred = $q.defer();
                var promise = deferred.promise;
                console.log("url:"+AC.GET_COMMEND_GOODS() + "?commodity_id=" + id + "&shop_id=" + shopId)
                $http.get(AC.GET_COMMEND_GOODS() + "?commodity_id=" + id + "&shop_id=" + shopId)
                    .success(
                        function (data, status, headers, config) {
                            console.log("推荐商品services:"+JSON.stringify(data))
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
            //购买
            buy :function(data){
                var deferred = $q.defer();
                var promise = deferred.promise;
                console.log("部落市场下单--------:"+AC.TRIBEMARKET_BUY() + JSON.stringify(data));
                $http.post(AC.TRIBEMARKET_BUY(),data)
                    .success(
                        function (data, status, headers, config) {
                            deferred.resolve(data);
                        }
                    )
                    .error(
                        function (data, status, headers, config) {
                            //alert(status)
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
            //更新订单
            buyCallBack : function(data){
                var deferred = $q.defer();
                var promise = deferred.promise;
                console.log("部落市场支付成功回调："+AC.TRIBEMARKET_BUYCALLBACK() + "/" + data.order_id+"/"+data.paid)
                $http.get(AC.TRIBEMARKET_BUYCALLBACK() + "/" + data.order_id+"/"+data.paid)
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
            //部落市场开放时间
            open : function(){
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get(AC.TRIBEMARKET_OPEN())
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
            //可选择的配送日期
            getDate : function(id){
                var deferred = $q.defer();
                var promise = deferred.promise;
                console.log("可选择的配送日期url--"+AC.TRIBEMARKET_TIME()+"/"+id)
                $http.get(AC.TRIBEMARKET_TIME()+"/"+id)
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
