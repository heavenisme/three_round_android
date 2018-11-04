// 采收反馈（包装）-控制器
angular.module('starter.PackController', [])
//======================================================
//采收反馈（包装）
    .controller('PackController', function($scope, $state, $ionicLoading,$ionicHistory,RecoverService,$stateParams, $ionicPopup) {
        $scope.data = {};
        $scope.data.recoverWay = "";//包装方式
        $scope.data.reminder = "";//温馨提示
        $scope.data.RadioFlag = -1;//默认选取的包装方式
        $scope.data.pack = false;
        $scope.data.title = "采收计划反馈";
        //$scope.data.tribeParams  = {};//接收部落市场参数
        //采收计划提交参数
        $scope.params = {
            price:0
        };
        //部落市场提交参数
        $scope.tribeMarket = {
            seller_id:0,//商铺id
            commodity_id:0,//商品id
            commodity_name:"",//商品名称
            commodity_number:0,//商品数量
            commodity_price:0,//商品单价
            total_price:0,//订单总额
            package_id:0,//包装方式id
            create_id:1//购买会员id
        };
        //-----------------------------
        // 返回主页
        $scope.gotoHome = function(){
            $ionicHistory.goBack();
        };
        //获取包装方式
        $scope.getPack = function(){
            if($stateParams.data){
                if('TribeMarket' == $stateParams.data.from){
                    $scope.data.title = "市场交易";
                    $scope.tribeMarket = $stateParams.data.params;//部落市场参数
                }
            }
            $ionicLoading.show({
                template: '载入中...'
            });
            //获取包装方式
            RecoverService.getPackWays()
            .success(function(data){
                $ionicLoading.hide();
                $scope.data.recoverWay = data;
                $scope.data.reminder =  data[0].reminder;
            })
            .error(function(state){
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                    title: '提示',
                    template: '网络异常',
                    buttons: [{text: '知道了'}]
                });
            });

            //获取本地缓存
            if(RecoverService.getLocalStorage("radioFlag")){
                $scope.data.RadioFlag = RecoverService.getLocalStorage("radioFlag");
            }
            $scope.params = RecoverService.get();//获取上一个页面传递过来的参数
            $scope.params.package_id = $scope.data.RadioFlag;//包装方式
            if(RecoverService.getLocalStorage("price")){
                $scope.params.price = RecoverService.getLocalStorage("price");//包装费用
            }
        }
        //缓存到本地
        $scope.selectPackWay = function(id,price){
            RecoverService.setLocalStorage("radioFlag",id);
            $scope.params.package_id = id;
            RecoverService.setLocalStorage('price',price);
            $scope.params.price = price;
        }
        //采购计划-配送
        $scope.pack = {};
        $scope.next = function(){
            if($stateParams.data) {
                if ('TribeMarket' == $stateParams.data.from) {
                    $scope.tribeMarket.package_id = $scope.params.package_id;//包装方式
                    if(RecoverService.getLocalStorage('totalPrice')){
                        $scope.tribeMarket.total_price = parseInt(RecoverService.getLocalStorage('totalPrice')) + parseInt($scope.params.price);//总额
                    }
                    console.log(JSON.stringify($scope.tribeMarket) + "----------------------部落市场包装方式应该传的参数")
                    RecoverService.set($scope.tribeMarket);//设置参数
                    $state.go('deliveryWay',{data:{from:'TribeMarket'}})
                } else {
                    RecoverService.set($scope.params);//设置参数
                    //到配送方式
                    RecoverService.getPackWays()
                        .success(function (data) {
                            $ionicLoading.hide();
                            $scope.data.recoverWay = data;
                            $scope.data.reminder = data[0].reminder;
                        })
                        .error(function (state) {
                            $ionicLoading.hide();
                            var alertPopup = $ionicPopup.alert({
                                title: '提示',
                                template: '网络异常',
                                buttons: [{text: '知道了'}]
                            });
                        });
                    $state.go('deliveryWay',{data:{from:'Recovery'}})
                }
            }

        }
        //获取部落市场参数
        /*$scope.getParam = function(){
            $scope.data.tribeParams = $stateParams.data.params;//部落市场参数
            $scope.tribeMarket.total_price = parseInt($scope.data.tribeParams.total_price) + parseInt($scope.params.price);//总额
            $scope.tribeMarket.package_id = $scope.params.package_id;//包装方式
            $scope.tribeMarket.seller_id =  $scope.data.tribeParams.seller_id_id;
            $scope.tribeMarket.commodity_id =  $scope.data.tribeParams.commodity_id;
            $scope.tribeMarket.commodity_name =  $scope.data.tribeParams.commodity_name;
            $scope.tribeMarket.commodity_number =  $scope.data.tribeParams.commodity_number;
            $scope.tribeMarket.commodity_price =  $scope.data.tribeParams.commodity_price;
            $scope.tribeMarket.create_id =  $scope.data.tribeParams.create_id;

        }*/
    });
