// 我的店铺-控制器
angular.module('starter.MyShopController', [])
//======================================================
    .controller('MyShopController', function($scope, $state, $ionicLoading,$ionicHistory,MyShopService,UserService, $stateParams) {
        //-----------------------------
        //店铺信息容器
        $scope.container = [];
        // 返回主页
        $scope.gotoHome = function(){
            $ionicHistory.goBack();
        };
        //店铺信息
        $scope.goToShopMessage = function(){
            $state.go('shopMessage')
        };
        //上架管理
        $scope.goToShelfManagement = function(shop_id){
            $state.go('shelfManagement',{data:{"shop_id":shop_id}})

        };
        //商品管理
        $scope.goToProductManagement = function(shop_id){
            $state.go('productManagement',{data:{"shop_id":shop_id}})
        };
        //价格管理
        $scope.goToPriceManagement = function(shop_id){
            $state.go('priceManagement',{data:{"shop_id":shop_id}});
        };

        //获取我的店铺信息
        $scope.getMyShop_Info = function(){
            /*做个载入中。。。。。。加个延迟*/
            $ionicLoading.show({
                template: '载入中...'
            });
            var userId = UserService.getUserId();
            MyShopService.getMyShopInfo(userId)
                .success(function(data){
                    $ionicLoading.hide();
                    if(data.code==200){
                        $scope.container = data.data;
                    }
                })
                .error(function(state){
                    $ionicLoading.hide();
                    console.log(state)
                });
        };

        $scope.goToMySelledOrder = function(){
            $state.go('mySelledOrder');
        };
    });
