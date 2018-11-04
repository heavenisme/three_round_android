/**
 * Created by qiang on 2016/4/20.
 */
angular.module('starter.MyShopService', [])
//-------------------------------------------
    .service("MyShopService", function($q, $http) {
        var paramsData = {};
        return{
            //设置参数值
            set: function (data) {
                paramsData = data;
            },
            //获取参数值
            get: function () {
                return paramsData;
            },
            //获取到我的店铺信息
            getMyShopInfo: function(userId) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                //ajax请求
                $http.get(AC.GET_MYSHOP_INFO()+'?user_id='+ userId)
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
                };
                promise.error = function(fn) {
                    promise.then(null, fn);
                    return promise;
                };
                return promise;
            },
            //更新店铺信息
            updateShopMessage : function(data){
                var deferred = $q.defer();
                var promise = deferred.promise;
                //ajax请求
                $http.put(AC.UPDATE_SHOPMESSAGE(),data)
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
            //上架管理
            getShelf : function(shop_id) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                //ajax请求
                $http.get(AC.PUTAWAY()+'?shop_id='+ shop_id)
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
                };
                promise.error = function(fn) {
                    promise.then(null, fn);
                    return promise;
                };
                return promise;
            },
            //商品管理
            getCommodity : function(id){
                var deferred = $q.defer();
                var promise = deferred.promise;
                //ajax请求
                $http.get(AC.MYSHOP_PRODUCT_MANAGEMENT()+'?shop_id='+ id)
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
                };
                promise.error = function(fn) {
                    promise.then(null, fn);
                    return promise;
                };
                return promise;
            },
            //更新店铺信息
            updateShopInfo :function(data){
                var deferred = $q.defer();
                var promise = deferred.promise;
                //ajax请求
                $http.put(AC.UPDATE_MYSHOP_INFO(),data)
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
                };
                promise.error = function(fn) {
                    promise.then(null, fn);
                    return promise;
                };
                return promise;
            },
            //更新背景图片
            updateBackground : function(data){
                var deferred = $q.defer();
                var promise = deferred.promise;
                //ajax请求
                $http.put(AC.UPDATE_BACKGROUND(),data)
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
            //上传照片
            uploadImg : function(data){
                var deferred = $q.defer();
                var promise = deferred.promise;
                //ajax请求
                $http.put(AC.UPDATE_MYSHOP_INFO(),data)
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
                };
                promise.error = function(fn) {
                    promise.then(null, fn);
                    return promise;
                };
                return promise;
            },
            // 获取图片
            // @dataSrc 数据源 camera
            getPicture: function(dataSrc) {
                var d = $q.defer();
                var promise = d.promise;

                if (dataSrc == "camera") {
                    // 相机
                    navigator.camera.getPicture(onSuccess, onFail, {
                        quality:100,
                        destinationType: Camera.DestinationType.DATA_URL,
                        sourceType: Camera.PictureSourceType.CAMERA, // 相册(去掉源==相机)
                        allowEdit: true,
                        encodingType: Camera.EncodingType.JPEG,
                   /*     targetWidth : 100,
                        targetHeight: 100*/
                    });
                } else {
                    // 相册
                    navigator.camera.getPicture(onSuccess, onFail, {
                        quality: 100,
                        destinationType: Camera.DestinationType.DATA_URL ,
                        sourceType: Camera.PictureSourceType.PHOTOLIBRARY, // 相册(去掉源==相机)
                        allowEdit: true,
                        encodingType: Camera.EncodingType.JPEG
                    /*    targetWidth : 100,
                        targetHeight: 100*/
                    });
                }

                // 选择成功
                function onSuccess(imageData) {
                    //alert("imageURI = " + imageURI);
                    d.resolve(imageData);
                }

                // 选择失败
                function onFail(message) {
                    d.reject(message);
                }
                promise.success = function(fn) {
                    promise.then(fn);
                    return promise;
                }

                promise.error = function(fn) {
                    promise.then(null, fn);
                    return promise;
                }
                return d.promise;
            },
          //价格管理
          getPrice : function(shop_id) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            //ajax请求
            $http.get(AC.PRICEMANAGEMENT()+'?shop_id='+ shop_id)
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
            };
            promise.error = function(fn) {
              promise.then(null, fn);
              return promise;
            };
            return promise;
          },


            //商品价格
            updateGoodsPrice :function(data){
                var deferred = $q.defer();
                var promise = deferred.promise;
                //ajax请求
                $http.put(AC.UPDATE_MYSHOP_INFO(),data)
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
                };
                promise.error = function(fn) {
                    promise.then(null, fn);
                    return promise;
                };
                return promise;
            },

            //已售订单
            getSelledOrder :function(page){
                var deferred = $q.defer();
                var promise = deferred.promise;
                //ajax请求
                $http.get(AC.MY_SELLED_ORDER() + "/" + page)
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
                };
                promise.error = function(fn) {
                    promise.then(null, fn);
                    return promise;
                };
                return promise;
            },

        }
    });
