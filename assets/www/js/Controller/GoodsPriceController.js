/**
 * Created by qiang on 2016/4/25.
 */
// 商品价格-控制器
angular.module('starter.GoodsPriceController', [])
//======================================================
    .controller('GoodsPriceController', function($scope, $state, $ionicLoading,$ionicHistory,MyShopService,UserService,$stateParams,$ionicPopup) {
        //-----------------------------
        // 返回主页
        $scope.gotoHome = function(){
            $ionicHistory.goBack();
        };
        $scope.data={};   //接收上页参数
        $scope.data.surplus = $stateParams.data.surplus;
        $scope.data.crop_name = $stateParams.data.crop_name;
        $scope.params = {
            commodity_id : $stateParams.data.commodity_id,     //商品id
            tribe_weight : $stateParams.data.tribe_weight,    //部落市场库存量
            open_weight : $stateParams.data.open_weight,      //开放市场库存量
            tribe_price : $stateParams.data.tribe_price,     //部落市场价格
            open_price : $stateParams.data.open_price       //开放市场价格
        };
        //页面提交过程更新价格
        $scope.putGoodsPrice =  function(){

            console.log("商品价格参数大全========》》》》》" + JSON.stringify($scope.params));
            if(($scope.params.tribe_weight + $scope.params.open_weight!=$scope.data.surplus))
            {
                var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: '总剩余质量应为耘客市场和市民大集总和',
                buttons: [{text: '知道了'}]
                });
            }
            else if(($scope.params.tribe_weight > 0 || $scope.params.tribe_price > 0) && ($scope.params.tribe_weight <= 0 || $scope.params.tribe_price <= 0)){
                var alertPopup = $ionicPopup.alert({
                    title: '提示',
                    template: '请正确填写耘客市场数据',
                    buttons: [{text: '知道了'}]
                });
            }
            else if(($scope.params.open_weight > 0 || $scope.params.open_price > 0) && ($scope.params.open_weight <= 0 || $scope.params.open_price <= 0)){
                var alertPopup = $ionicPopup.alert({
                    title: '提示',
                    template: '请正确填写市民大集数据',
                    buttons: [{text: '知道了'}]
                });
            }
            else if(($scope.params.tribe_price>=100 ) || ($scope.params.open_price>=100)){
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template: '价格不能超过100元',
                            buttons: [{text: '知道了'}]
                        });
            }else{
                $scope.paramsNew = {
                    commodity_id : $scope.params.commodity_id,
                    tribe_weight : $scope.params.tribe_weight,
                    open_weight : $scope.params.open_weight,
                    tribe_price : $scope.params.tribe_price,
                    open_price : $scope.params.open_price
                };
                MyShopService.updateGoodsPrice($scope.paramsNew)
                    .success(function(data){
                        if(data.code == 200){
                            console.log("成功了商品修改成功=============================>>>>>>>>>>>>>>>>>" + JSON.stringify(data));
                        }
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template: '商品发布成功！',
                            buttons: [{text: '知道了'}]
                        });
                        $ionicHistory.goBack();
                    })
                    .error(function(state){
                        $ionicLoading.hide();
                        // TODO worng
                        console.log("失败=============================>>>>>>>>>>>>>>>>>" + state);
                    });
            }

        };
    });
