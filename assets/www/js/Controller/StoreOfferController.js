<!--部落市場（商家报价控制器）-->
angular.module('starter.StoreOfferController', ['ionic'])
//======================================================
//活动详情
    .controller('StoreOfferController', function($scope, $ionicLoading,$ionicHistory,$state,$stateParams,TribeMarketService) {
        $scope.data = {
            list:{},//商家报价列表,
            paramas:{
                id:0,//
                shop_id:0
            }
        }
        //-----------------------------
        // 返回主页
        $scope.gotoHome = function(){
            $ionicHistory.goBack();
        };
        //跳转到商品详情页面
        $scope.marketDesc = function(id,shopId){
            $scope.data.paramas.id = id;
            $scope.data.paramas.shop_id = shopId;
            TribeMarketService.set($scope.data.paramas);//设置商品id
            $state.go('marketDesc');
        };
        //init
        $scope.getList = function(){
            var id = TribeMarketService.getLocalStorage('crop_kind_id');//获取品种id
            var shopid = TribeMarketService.getLocalStorage('shop_id');//获取品种id

            TribeMarketService.getCommodityListByKindId(id,shopid)
                .success(function(data){
                    $ionicLoading.hide();
                    if(data.code == 200){
                        $scope.data.list = data.data;
                    }
                    else{
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template: data.message,
                            buttons: [{text: '知道了'}]
                        });
                    }
                    console.log("商家报价列表："+JSON.stringify(data))
                })
                .error(function(state){
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '网络异常',
                        buttons: [{text: '知道了'}]
                    });
                });
        }
        // 处理图片路径
        $scope.handlePath = function(path,file,isThumb){
            if(file){
                var url = path+file;
            }else{
                var url = path;
            }
            return converImageUrl(url, isThumb);
        };
    });
