// 商品管理-控制器
angular.module('starter.PriceManagementController', [])
//======================================================
    .controller('PriceManagementController', function($scope, $state, $ionicLoading,$ionicHistory,$stateParams,MyShopService,MyInfoService,$ionicActionSheet) {
        //-----------------------------
        // 返回主页
        $scope.gotoHome = function(){
            $ionicHistory.goBack();
        };

        $scope.data = {};
        $scope.content = [];

        //得到价格信息
        $scope.getPriceInfo = function(){

            var shop_id = $stateParams.data.shop_id;
            console.log("hehehehe===="+shop_id)
            MyShopService.getPrice(shop_id)
                .success(function(data){
                    console.log("正确数据===============》》》》》》》》》》"+JSON.stringify(data));
                    if(data.code==200){
                        $scope.content = data.data;
                    }
                })
                .error(function(state){
                    console.log("错误数据================》》》》》》》》》》"+state)
                })


        }


    });
