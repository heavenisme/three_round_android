// 店铺信息-控制器
angular.module('starter.ShopMessageController', [])
//======================================================
    .controller('ShopMessageController', function($scope, $state, $ionicLoading,$ionicHistory,MyShopService,UserService,$ionicPopup) {
        //-----------------------------
        $scope.container = [];
        // 返回主页
        $scope.gotoHome = function(){
            $ionicHistory.goBack();
        };
        //店铺设置
        $scope.goToShopBg = function(){
            $state.go('shopBg');
           // console.log("shop_message里的"+shop_id);
        };

        //获取我的店铺信息
        $scope.getMyShop_Info = function(){
            console.log("函数走没走，看看++++++++++++++++++++》》");
            var userId = UserService.getUserId();
            console.log("函数走没走，看看++++++++++++++++++++++++++++++++++》》" + userId);
            MyShopService.getMyShopInfo(userId)
                .success(function(data){
                    console.log("第一次连看看行不行+》》》》》》》》》》》》》》》》》》》》》》》" + JSON.stringify(data));
                    if(data.code==200){
                        $scope.container = data.data;
                        console.log("获取一个店铺名称++++++++++++++++++》》》》》》"+JSON.stringify($scope.container[0].shop_name));
                        $scope.number = $scope.container[0].shop_id;
                    }
                })
                .error(function(state){
                    console.log(state)
                });
        };
        console.log("是不是我想要的=============》》》》》"+$scope.number);
        //更新店铺信息
        //所需的参数
        $scope.Params = {
            shop_id: "",
            shop_name: "",
            phone: "",
            shop_description: "",
            base64:""
        };
        $scope.updateShopInfo = function(){
            console.log("函数走没走，看看++++++++++++++++++++>>>>>>>>>>>>>>>>>>>>>>>>>》》走了！");
            $scope.Params.shop_name = $scope.container[0].shop_name;                        //店铺名称
            $scope.Params.shop_id = $scope.number;                                          //店铺id
            $scope.Params.phone = $scope.container[0].phone;                                //电话
            $scope.Params.shop_description = $scope.container[0].shop_description;           //店铺描述
            $scope.Params.base64 = "";

            var re = /^1\d{10}$/;
            if (!re.test($scope.Params.phone)) {
                var alertPopup = $ionicPopup.alert({
                    title: '提示',
                    template: '电话号码错误',
                    buttons: [{text: '知道了'}]
                });
            }else{
                console.log(JSON.stringify($scope.Params)+"----===============>>>>>>>>>>>>>>>>>>>>>>>>提交参数！！");
                $ionicLoading.show({
                    template: '正在提交...'
                });
                MyShopService.updateShopMessage($scope.Params)
                    .success(function(data){
                        $ionicLoading.hide();
                        if(data.code == 200){
                            console.log("成功了吗=============================>>>>>>>>>>>>>>>>>" + JSON.stringify(data));
                            $ionicHistory.goBack();
                            console.log("参数传了没，看看++++++++++++++++++++>>>>>>>>>>>>>>>>>>>>>>>>>》》走了！")
                        }
                    })
                    .error(function(state){
                        $ionicLoading.hide();
                        // TODO worng
                        console.log("失败=============================>>>>>>>>>>>>>>>>>" + state);

                    });
            }
        };
    });
