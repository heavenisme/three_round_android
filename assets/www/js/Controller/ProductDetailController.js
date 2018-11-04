// 商品管理-控制器
angular.module('starter.ProductDetailController', [])
//======================================================
    .controller('ProductDetailController', function($scope, $state, $ionicLoading,$ionicHistory,MyInfoService,$ionicActionSheet,$stateParams,MyShopService,$ionicPopup) {
        $scope.data = {
            detail:{},//商品详细
            shop_id:0//店铺id
        };
        $scope.params = {
            commodity_name:"",//商品名称
            description:"",//商品描述
            commodity_id:0//商品id
        }
        //-----------------------------
        // 返回主页
        $scope.gotoHome = function(){
            $ionicHistory.goBack();
        };
        //商品管理
        $scope.goToProductManagement = function(){
            console.log("商品信息更新----："+JSON.stringify($scope.params));
            MyShopService.updateShopInfo($scope.params)
                .success(function(data){
                    if(200 == data.code){
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template: '更新成功',
                            buttons: [{text: '知道了'}]
                        });
                        $state.go('productManagement',{data:{"shop_id":$scope.data.detail.shop_id}})
                    }
                })
                .error(function(state){
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '网络异常',
                        buttons: [{text: '知道了'}]
                    });
                });
        }
        //init
        $scope.getProductDetail = function(){
            $scope.data.detail =  MyShopService.get();//获取参数
            $scope.params.commodity_name =  $scope.data.detail.commodity_name;//商品名称
            $scope.params.description =  $scope.data.detail.description;//商品描述
            $scope.params.commodity_id = $scope.data.detail.commodity_id;//商品id
           console.log("商品详情------："+JSON.stringify($scope.data.detail));
        }
    });
