<!--部落市场（批发价格）控制器-->
angular.module('starter.InsidePriceController', ['ionic'])
//======================================================
//部落活动
    .controller('InsidePriceController', function($scope, $ionicLoading,$ionicHistory,$state,TribeMarketService) {
        $scope.data = {
            list :{}//列表
        };
        //-----------------------------
        // 返回主页
        $scope.gotoHome = function(){
            $ionicHistory.goBack();
        };
        //init
        $scope.getCropList = function(){
            console.log('----------------------今日指导价格')
            $ionicLoading.show({
                template: '载入中...'
            });
            TribeMarketService.getCroppriceList()
                .success(function(data){
                    $ionicLoading.hide();
                    $scope.data.list = data;
                    console.log("今日指导价格列表："+JSON.stringify(data))
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
    });
