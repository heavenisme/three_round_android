/**
 * Created by Administrator on 2016/3/1.
 */
// 采收反馈（配送）-控制器
angular.module('starter.DeliveryWayController', [])
//======================================================
    .controller('DeliveryWayController', function($scope, $state, $ionicLoading,$ionicHistory,RecoverService,$ionicPopup,UserService,OrderService,$stateParams,TribeMarketService) {
        $scope.data = {};
        $scope.data.reminder = "";//温馨提示
        $scope.data.store = "";//便利店列表
        $scope.data.haveAddress  =  false;//是否有收获地址
        $scope.noSelectAddress = false;//有收获地址没有选择
        $scope.data.dRadioFlag = 1;//上一次选取的配送方式
        $scope.address = {};//收货地址
        $scope.express ={};//快递信息
        $scope.data.sumPrice = 0;//产生的总费用
        $scope.data.title = '采收计划';//title
        $scope.data.deliveryPay = 0;//配送方式产生的费用
        $scope.data.delivery_on = null;//配送时间
        //$scope.data.flag = true;//配送时间
        $scope.data.defaultDelivery_on = 0;

        $scope.params = {
            paid:0
        };
        $scope.tribeMarket = {sumPrice:0};//接收部落市场参数
        //-----------------------------
        // 返回主页
        $scope.gotoHome = function(){
            if('Recovery' == $stateParams.data.from){
              $state.go("recoverFeedback",{data:{'recoverId':$scope.params.harvest_plan_id}});
            }
            else{
              $ionicHistory.goBack();
            }
        };
        //采购计划-配送
        $scope.goToRecoverAddress = function(){
            $state.go('recoverAddress')
        }
        //添加收获地址
        $scope.goToCreateAddress = function(){
            $state.go('createAddress');
        }
        //init
        $scope.deliveryWay = function(){
            $scope.params  = RecoverService.get();
            if($stateParams.data) {
                if ('TribeMarket' == $stateParams.data.from) {
                    $scope.data.title = "购买配送";
                }
            }
            //判断是否有收获地址
            var userId = UserService.getUserId();
            RecoverService.getDeliveryAddressList(userId)
                .success(function(data){
                    if( 0 < data.length ){
                        $scope.data.haveAddress = true;
                    }
                })
                .error(function(state){
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '网络异常',
                        buttons: [{text: '知道了'}]
                    });
                });
            //获取温馨提示
            RecoverService.getDeliveryReminder()
                .success(function(data){
                    $ionicLoading.hide();
                    console.log("温馨提示-----------------------------："+JSON.stringify(data.data[0]))
                    $scope.data.reminder = data.data[0];
                })
                .error(function(state){
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '网络异常',
                        buttons: [{text: '知道了'}]
                    });
                });
            //获取便利店列表
            RecoverService.getDeliveryStoeList()
                .success(function(data){
                    $ionicLoading.hide();
                    console.log("便利店列表------------------："+JSON.stringify(data))
                    $scope.data.store = data;
                    if(0 < $scope.data.store.length){
                        $scope.data.shopName = $scope.data.store[0].shop_name;//设置默认名称
                        $scope.data.price =  $scope.data.store[0].delivery_price;//设置默认价格
                        /*if(!$scope.data.shop_id){
                            $scope.data.address_id = $scope.data.store[0].shop_id;//设置默认的便利店id
                        }
                        $scope.data.shop_id = $scope.data.store[0].shop_id;//设置默认选中*/
                    }
                })
                .error(function(state){
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '网络异常',
                        buttons: [{text: '知道了'}]
                    });
                });
            //获取可选配送日期
            if($stateParams.data.from == "TribeMarket"){
                /*TribeMarketService.setLocalStorage('commodityId',$scope.params.commodity_id);
                if(TribeMarketService.getLocalStorage('commodityId')){
                    var commodity_id = TribeMarketService.getLocalStorage('commodityId');
                    alert(commodity_id + "-----2")
                }else{
                    var commodity_id = $scope.params.commodity_id;
                    alert(commodity_id + "-----1")
                }*/
                TribeMarketService.getDate($scope.params.commodity_id)
                    .success(function(data){
                        if(data.code == 200 ){
                            $ionicLoading.hide();
                            $scope.data.deliveryTimes = data.data;
                            /*if(0 != data.data.length){
                                for(var i=0;i<data.data.length;i++){
                                    $scope.data.deliveryTimes[i].index = i;
                                    console.log($scope.data.deliveryTimes[i].index)
                                }
                            }
                            if(RecoverService.getLocalStorage('delivery')){
                                $scope.data.defaultDelivery_on = RecoverService.getLocalStorage('delivery');
                                $scope.data.delivery_on = data.data[$scope.data.defaultDelivery_on].delivery_on;
                            }else{
                                $scope.data.delivery_on = data.data[0].delivery_on;
                                $scope.data.defaultDelivery_on = 0;
                            }*/
                            console.log("可选择的配送日期--------"+JSON.stringify(data.data));
                        }
                    })
                    .error(function(state){
                        $ionicLoading.hide();
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template: '网络异常',
                            buttons: [{text: '知道了'}]
                        });
                    });
            }else{
                RecoverService.getDeliveryTime($scope.params.harvest_plan_id)
                 .success(function(data){
                     if(data.code == 200 ){
                         $ionicLoading.hide();
                         $scope.data.deliveryTimes = data.data;
                         console.log("可选择的配送日期--------"+JSON.stringify(data));
                     }
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
            //获取快递信息
            RecoverService.getExpressMsg()
                .success(function(data){
                    $ionicLoading.hide();
                    if(data.length > 0){
                        $scope.express = data[0];
                    }
                })
                .error(function(state){
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '网络异常',
                        buttons: [{text: '知道了'}]
                    });
                });
            //获取上一次选择的配送方式
            if(RecoverService.getLocalStorage("dRadioFlag")){
                $scope.data.dRadioFlag = RecoverService.getLocalStorage("dRadioFlag");
            }
            if(RecoverService.getLocalStorage('shopId')){
                $scope.data.address_id = RecoverService.getLocalStorage('shopId');//获取上次选择的便利店ID
            }
            if(2 == $scope.data.dRadioFlag){
                $scope.data.price = RecoverService.getLocalStorage('priceD') == null ? 0 : RecoverService.getLocalStorage('priceD');
                if($stateParams.data.from == "TribeMarket"){
                    $scope.data.sumPrice = parseFloat($stateParams.data.totalPrice) + parseFloat($scope.data.price);
                }else{
                    $scope.data.sumPrice = parseFloat($scope.data.price);//采收计划上一步操作未产生费用
                }
            }else{
                if($stateParams.data.from == "TribeMarket"){
                    $scope.data.sumPrice = parseFloat($stateParams.data.totalPrice);
                }else{
                    $scope.data.sumPrice = 0;
                }
            }
           //获取上一次选择的收获地址
            $scope.address = JSON.parse(RecoverService.getLocalStorage(UserService.getUserId()) || null);
            //地址不为空 未进行选择 提示选择收货地址
            if($scope.address != null){
                $scope.noSelectAddress = false;
            }else{
                $scope.noSelectAddress = true;
            }
        }
        //更换配送方式 改变参数值
        $scope.selectDeliveryWay = function(id,money){
            $scope.data.dRadioFlag = id;
            $scope.data.deliveryPay = money;
            if($stateParams.data.from == "TribeMarket"){
                $scope.data.sumPrice = parseFloat($stateParams.data.totalPrice) +  parseFloat($scope.data.deliveryPay);
            }else{
                $scope.data.sumPrice = parseFloat($scope.data.deliveryPay);
            }
            RecoverService.setLocalStorage('dRadioFlag',id);
            RecoverService.setLocalStorage('priceD',$scope.data.deliveryPay);
        }
        // 提交
        $scope.goToPayWay = function(){
            $scope.getParams();
            if( 2 == $scope.data.dRadioFlag && !$scope.params.address_id ){
              var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: '请选择便利店',
                buttons: [{text: '知道了'}]
              });
            } else if( 3 == $scope.data.dRadioFlag && !$scope.params.address_id ){
              var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: '请选择快递地址',
                buttons: [{text: '知道了'}]
              });
            } else if(!$scope.data.delivery_on){
                var alertPopup = $ionicPopup.alert({
                    title: '提示',
                    template: '请选择配送时间',
                    buttons: [{text: '知道了'}]
                });
            }
            else{
                 if($stateParams.data){
                     if('TribeMarket' ==  $stateParams.data.from){
                         $scope.confirmOrder(1);
                     }else{
                         if( 0 == $scope.data.sumPrice){
                             $scope.goSubmit($scope.params);
                         }else{
                             //-------------------------------下单----------
                             $scope.confirmOrder(2);
                         }
                     }
                 }
            }
        }
        //更换便利店
        $scope.selectShop = function(obj){
            obj = JSON.parse(obj);
            $scope.data.shopName = obj.shop_name;//便利店名称
            $scope.data.price = obj.delivery_price;//价格
            $scope.data.address_id = obj.shop_id;//配送地址id
            RecoverService.setLocalStorage('shopId',$scope.data.address_id);//选择的配送地址
        }
        //----------------------下单type:1 部落市场 2:采收计划
        $scope.confirmOrder  = function(type) {
            if(1 == type){
                // 先清空数据
                $scope.data.goodsListBuf = [];
                // 拼装数据
                var newBuf = {};
                newBuf.goodsid   = $scope.params.commodity_id;
                newBuf.goodstype = '1';
                newBuf.quantity  = '1';
                newBuf.summary   = '市场消费';
                newBuf.imageurl  = 'xxxxxxx';
                newBuf.goodsprice= $scope.data.sumPrice;
                $scope.data.goodsListBuf.push(newBuf);
                $ionicLoading.show({
                    template: '载入中...'
                });

                //非便利店配送，配送费均为0
                if(2 != $scope.data.dRadioFlag){
                    $scope.tribeMarket.delivery_cost = 0;
                }

                TribeMarketService.buy($scope.tribeMarket)
                    .success(function(data){
                        $ionicLoading.hide();
                        // 下单成功
                        if(data.code == 200){
                            var confirmPopup = $ionicPopup.confirm({
                                title: '<strong>提示</strong>',
                                template: '确定支付吗?',
                                okText: '确定',
                                cancelText: '取消'
                            });
                            // 跳转支付页面
                            confirmPopup.then(function (res) {
                                if (res) {
                                    RecoverService.set(data.data[0]);
                                    TribeMarketService.set($scope.tribeMarket.paid);
                                    $state.go('paySelect', {'from' : 'TribeMarket', 'orderId' : data.data[0].orderid, 'orderPrice' : $scope.data.sumPrice, 'description' : '市场消费'});
                                }
                            });
                        }
                    })
                    .error(function(data) {
                        $ionicLoading.hide();
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template: '网络异常',
                            buttons: [{text: '知道了'}]
                        });
                    });
            }else{
                // 先清空数据
                $scope.data.goodsListBuf = [];
                // 拼装数据
                var newBuf = {};
                newBuf.goodsid   = $scope.params.harvest_plan_id;
                newBuf.goodstype = '1';
                newBuf.quantity  = '1';
                newBuf.summary   = '采收计划消费';
                newBuf.imageurl  = 'xxxxxxx';
                newBuf.goodsprice= $scope.data.sumPrice;
                $scope.data.goodsListBuf.push(newBuf);
                $ionicLoading.show({
                    template: '载入中...'
                });
                OrderService.addOrder(UserService.getUserId(), $scope.data.sumPrice, JSON.stringify($scope.data.goodsListBuf), 3)
                    .success(function(data) {
                        $ionicLoading.hide();
                        // 下单成功
                        if(data.code == 200){
                            //传递参数
                            RecoverService.set($scope.params);
                            console.log("采收计划提交参数----->"+JSON.stringify($scope.params))
                            //提示用户将产生费用
                          var confirmPopup = $ionicPopup.confirm({
                                title: '<strong>提示</strong>',
                                template: '该采收计划将产生配送费用，确定支付吗?',
                                okText: '确定',
                                cancelText: '取消'
                            });
                            // 跳转支付页面
                           confirmPopup.then(function (res) {
                                if (res) {
                                    $state.go('paySelect', {'from' : 'DeliveryWay', 'orderId' : data.data[0].orderid, 'orderPrice' : $scope.data.sumPrice, 'description' : '采收计划消费'});
                                }
                            });
                        }
                        else{
                            var alertPopup = $ionicPopup.alert({
                                title: '提示',
                                template: '' + data.message,
                                buttons: [{text: '知道了'}]
                            });
                        }
                    })
                    .error(function(data) {
                        $ionicLoading.hide();
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template: '网络异常',
                            buttons: [{text: '知道了'}]
                        });
                    });
            }
        };
        //-------获得参数
        $scope.getParams = function(){
            if($scope.express.length >0){
                $scope.params.express_id = $scope.express.partner_id;//快递公司id
            }
            $scope.params.delivery_type = $scope.data.dRadioFlag;//配送方式
            if($stateParams.data){
                if('TribeMarket' == $stateParams.data.from){
                    var packPrice =  parseInt($scope.params.total_price);//部落市场之前产生的费用
                }else{
                    var packPrice = 0;
                }
            }
            //地址id
            if( 2 == $scope.data.dRadioFlag ){
                $scope.params.address_id = $scope.data.address_id;
            }else if( 3 == $scope.data.dRadioFlag ){
                $scope.address = JSON.parse(RecoverService.getLocalStorage(UserService.getUserId()) || null);
                if($scope.address != null){
                    $scope.params.address_id = $scope.address.address_id;
                }
            }else if( 1 == $scope.data.dRadioFlag ){
                $scope.params.address_id = 0;
            }
            //选择配送时间（必填）
            if('TribeMarket' == $stateParams.data.from){
                $scope.tribeMarket = $scope.params;
                $scope.tribeMarket.total_price =  $scope.data.sumPrice;
                $scope.tribeMarket.delivery_on = $scope.data.delivery_on;//配送时间
                $scope.tribeMarket.paid = $scope.data.paid;//是否支付过配送费用
                $scope.tribeMarket.delivery_cost = $scope.data.price;
            }
            if('Recovery' == $stateParams.data.from){
                $scope.params.delivery_on = $scope.data.delivery_on;
                $scope.params.paid = $scope.data.paid;//是否支付过配送费用
            }

        }
        //---------------- 采收计划提交------------------------------------
        $scope.goSubmit = function(){
            var params = RecoverService.get();
            //console.log(JSON.stringify(params) + "----------------------------------采收计划提交参数")
            $ionicLoading.show({
                template: '提交中，请稍候...'
            });
            RecoverService.submitRecover(params)
                .success(function(data){
                    $ionicLoading.hide();
                    if(data.flag = 1){
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template: '采收计划提交成功',
                            buttons: [{text: '知道了'}]
                        });
                    }
                    $state.go("tab.garden");
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
        //-----------------------------配送时间
        $scope.selectTime = function(obj){
            obj = JSON.parse(obj);
            $scope.data.delivery_on = obj.delivery_on;//时间
            //RecoverService.setLocalStorage('delivery',obj.index);
            //初始化paid为0,即默认标记本次不需要支付配送费。
            $scope.data.paid = 0;

            if(2 == $scope.data.dRadioFlag){
                if(0 != obj.paid){
                    $scope.data.price = 0;
                    $scope.data.paid = 0;
                }else{
                    $scope.data.price = $scope.data.store[0].delivery_price;
                    $scope.data.paid = 1;
                }
            }
            if((2 == $scope.data.dRadioFlag) && (0 == obj.paid)){
                if($stateParams.data.from == "TribeMarket"){
                    $scope.data.sumPrice = parseFloat($stateParams.data.totalPrice) + parseFloat($scope.data.price);
                }else{
                    $scope.data.sumPrice = parseFloat($scope.data.price);
                }
            }else{
                if($stateParams.data.from == "TribeMarket"){
                    $scope.data.sumPrice = parseFloat($stateParams.data.totalPrice);
                }else{
                    $scope.data.sumPrice = 0;
                }
            }
        }
    });


