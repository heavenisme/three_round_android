<!--部落市场（卖家店铺）控制器-->
angular.module('starter.SellStoreController', ['ionic'])
//======================================================
//部落活动
    .controller('SellStoreController', function($scope, $ionicLoading,$ionicHistory,$state,TribeMarketService,$ionicPopup,$stateParams) {
        $scope.data = {
            params:{}//接收传递的参数
        }
        $scope.params = {
            id:0,//商品id
            shop_id:0//店铺id
        }
        //-----------------------------
        // 返回主页
        $scope.gotoHome = function(){
            $ionicHistory.goBack();
        };
        //init
        $scope.getShopMsg = function(){
            //获取店铺信息时调用，传商品id=0，目的：web区分是获取推荐商品还是获取卖家信息
            TribeMarketService.gettestimonials(0, $stateParams.data.shopId)
                .success(function(data){
                    if(200 == data.code){
                        $scope.data.commendGoods = data.data;
                    }
                    else{
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template: data.message,
                            buttons: [{text: '知道了'}]
                        });
                    }
                    console.log("店铺信息："+JSON.stringify(data))
                })
                .error(function(state){
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '获取推荐商品失败',
                        buttons: [{text: '知道了'}]
                    });
                });
        };
        // 处理图片路径
        $scope.handlePath = function(path,isThumb){
            return converImageUrl(path, isThumb);
        };
        //跳转商品详情
        $scope.marketInfo = function(id,shopId){
            $scope.params.id = id;
            $scope.params.shop_id = shopId;
            TribeMarketService.set($scope.params);//设置商品id
            $state.go('marketDesc');
        };
    });
