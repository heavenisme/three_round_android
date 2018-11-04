/**
 * 数据交互-网络服务
 */
angular.module('starter.ShoppingCartService', [])
//-------------------------------------------
.service("ShoppingCartService", function($q, $http) {

    return{
        //------------------------------------------
    	// 获取订单号
//        getShoppingCart : function(userId) {
//            var deferred = $q.defer();
//            var promise  = deferred.promise;
//
//            $http.get(AC.SHOPPING_CART_GOODS()+"?userId="+userId)
//                .success(
//                    function(data, status, headers, config) {
//                        deferred.resolve(data);
//                    }
//                )
//                .error(
//                    function(data, status, headers, config) {
//                        deferred.reject(status);
//                    }
//                );
//
//            promise.success = function(fn) {
//                promise.then(fn);
//                return promise;
//            }
//            promise.error = function(fn) {
//                promise.then(null, fn);
//                return promise;
//            }
//            return promise;
//        },

        addToShoppingCart : function(userId, data) {
//            //alert(JSON.stringify(data));
            var json = window.localStorage.getItem("goodsList" + userId);
            var goodsList = eval(json);
            if(goodsList == null){
                goodsList = [];
            }
            //alert("goodsList: " + JSON.stringify(goodsList));
            if(JSON.stringify(goodsList).indexOf(data.goodsId) != -1) {
//                //alert("您已添加过该商品");
                return false;
            } else {
                var groundInfo = {"goodsId" : data.goodsId, "area:" : data.selectArea, "expire" : data.expire, "describe" : data.describe, "groundprice" : data.groundprice, "goodstype" : data.goodstype}
                goodsList.push(groundInfo);
                window.localStorage.setItem("goodsList" + userId, JSON.stringify(goodsList));
                return true;
            }
        },

        getShoppingCart : function(userId) {
            var goodsList = window.localStorage.getItem("goodsList" + userId);
//            //alert(JSON.stringify(goodsList));
            return goodsList;
        },

        //-------------------
        // 删除购物车内某个商品
        removeShoppingCart : function(userId, goodsId) {
            var goodsList = JSON.parse(window.localStorage.getItem("goodsList" + userId));

            for (var i = 0; i < goodsList.length; i++) {
                if(goodsList[i].goodsId == goodsId){
                    goodsList.splice(i, 1);
                    // 这里应该return， 不然数据多了会爆炸，因为测试过程不周，所以先这样写
                    // return;
                }
            };
            window.localStorage.setItem("goodsList" + userId, JSON.stringify(goodsList));
        },
    }
});