angular.module('starter.MyOrderController', [])
.controller('MyOrderController', function($scope, $ionicHistory, $ionicLoading, $ionicPopup, $ionicScrollDelegate, $state, $stateParams, $ionicActionSheet, MyInfoService,RecoverService, UserService, OrderService,MyOrderService,TribeMarketService) {$scope.data = {};

	$scope.data.isActive = {};
	$scope.data.isActive.all = 'true';
	$scope.data.isActive.now = 'false';
	$scope.data.isActive.join = 'false';
	$scope.data.isActive.close = 'false';
	$scope.data.isActive.play = 'false';

	$scope.data.currState = 0;

	$scope.orderTabClick = function(n){
		$scope.data.isActive.all = 'false';
		$scope.data.isActive.now = 'false';
		$scope.data.isActive.join = 'false';
		$scope.data.isActive.close = 'false';
		$scope.data.currState = n;
		if(n == 0){
			$scope.data.isActive.all = 'true';
		}
		if(n == 1){
			$scope.data.isActive.now = 'true';
            $scope.getMyOrderPendingPaymentList()
        }
		if(n == 2){
			$scope.data.isActive.join = 'true';
            $scope.getReadyToShipList()
		}
		if(n == 3){
			$scope.data.isActive.close = 'true';
            $scope.getReceiptOfGoodsList()
        }
	};
        $scope.isNull = false;
/*	if($stateParams.from == 'tab-my') {
		$scope.orderTabClick($stateParams.index);
	}*/
	// 返回
	$scope.gotoHome = function(){
		$state.go('tab.my');
	};
    /*获取全部订单列表--------------start*/
    $scope.content = [];
    $scope.getMyOrderAll = function(){
/*            $ionicLoading.show({
            template: '载入中...'
        });*/
        MyOrderService.getMyOrderAll()
            .success(function(data){
                $ionicLoading.hide();
                console.log("获取全部订单------------------成功"+JSON.stringify(data));
                if(data.code==200){
                    $scope.content = data.data;
                    if(data.data.length <=0){
                        $scope.isNull = true;
                    }
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
    };
	$scope.getMyOrderAll();
    /*获取全部订单列表-------------end*/
        /*获取待付款订单列表-------------- getMyOrderPendingPayment start*/
        $scope.pendingPaymentList = [];
        $scope.getMyOrderPendingPaymentList = function(){
            /*            $ionicLoading.show({
             template: '载入中...'
             });*/

            MyOrderService.getMyOrderPendingPayment()
                .success(function(data){
                    $ionicLoading.hide();
                    console.log("获取待付款订单列表------------------成功"+JSON.stringify(data))
                    if(data.code==200){
                        $scope.pendingPaymentList = data.data;
                    }
                    $ionicScrollDelegate.resize();
                })
                .error(function(data) {
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '网络异常',
                        buttons: [{text: '知道了'}]
                    });
					          $ionicScrollDelegate.resize();
                });
        };
        /*获取待付款订单列表--------------end*/
        /*获取待发货订单列表-------------- getMyOrderReadyToShip start*/
        $scope.readyToShipList = [];
        $scope.getReadyToShipList = function(){
            /* $ionicLoading.show({
             template: '载入中...'
             });*/
            MyOrderService.getMyOrderReadyToShip()
                .success(function(data){
                    $ionicLoading.hide();
                    console.log("获取待发货订单列表------------------成功"+JSON.stringify(data))
                    if(data.code==200){
                        $scope.readyToShipList = data.data;
                    }
					          $ionicScrollDelegate.resize();
                })
                .error(function(data) {
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '网络异常',
                        buttons: [{text: '知道了'}]
                    });
					$ionicScrollDelegate.resize();
                });
        };
        /*获取待发货订单列表--------------end*/
        /*获取待收货订单列表-------------- getReceiptOfGoods start*/
        $scope.receiptOfGoodsList = [];
        $scope.getReceiptOfGoodsList = function(){
             $ionicLoading.show({
             template: '载入中...'
             });
            MyOrderService.getReceiptOfGoods()
                .success(function(data){
                    $ionicLoading.hide();
                    console.log("获取待确认订单列表------------------成功"+JSON.stringify(data))
                    if(data.code==200){
                        $scope.receiptOfGoodsList = data.data;
                    }
					          $ionicScrollDelegate.resize();
                })
                .error(function(data) {
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '网络异常',
                        buttons: [{text: '知道了'}]
                    });
					          $ionicScrollDelegate.resize();
                });
            //console.log("看看标识"+$scope.data.isActive.all+$scope.data.isActive.now+$scope.data.isActive.join+$scope.data.isActive.close+$scope.data.currState);
        };
        /*获取待收货订单列表--------------end*/
        /*确认收货页面--------------start*/
            $scope.confirmOrderGoods = function(orderId, sellerId){

                /* $ionicLoading.show({
                 template: '载入中...'
                 });*/
                MyOrderService.confirmGoods(orderId, sellerId)
                    .success(function(data){
                        $ionicLoading.hide();
                        console.log("订单确认成功========="+JSON.stringify(data))
                        if(data.code==200){
                            $scope.getMyOrderAll();
                            $scope.getReceiptOfGoodsList();
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
            };
        /*确认收货页面--------------end*/

          $scope.params = {
              order_id:0
          };
        $scope.tribeMarket={};
        console.log(JSON.stringify(TribeMarketService.get($scope.tribeMarket)));
        //去支付选择也paySelect页面
        $scope.goPayOrder = function(orderId, orderNumber, orderPrice, deliveryCost, deliveryOn, delivery_type){
            console.log(orderId+"=="+orderPrice+"=="+deliveryCost+"=="+deliveryOn);
            /*判断是否有配送费------start*/
/*          $scope.deliveryCostYes(deliveryOn);
            $scope.deliveryCostYes = function(deliveryOn){
                console.log("函数走没有"+orderId+"=="+orderPrice+"=="+deliveryCost+"=="+deliveryOn);*/
                MyOrderService.deliveryCost(deliveryOn)
                    .success(function(data){
                        $ionicLoading.hide();
                        console.log("获取配送费------------------成功"+deliveryOn+JSON.stringify(data));
                        if(data.code==200){
                            $scope.isDeliverCode = data.data[0];
                            console.log("看看是1还是0===================》》》》》》》》》" + $scope.isDeliverCode);
                            if($scope.isDeliverCode==1 && delivery_type == 2){
                                var alertPopup = $ionicPopup.alert({
                                    title: '<strong>提示</strong>',
                                    template: '今天已支付过配送费，总价中已不含配送费',
                                    buttons: [{text: '知道了'}]
                                });
                                $scope.params.order_id = orderId;
                                orderPrice = orderPrice - deliveryCost;
                                /*是否付过配送费--start 2016.5.16*/
                                $scope.tribeMarket.paid = 0;
                                TribeMarketService.set($scope.tribeMarket.paid);
                                console.log("第一次判断tribeMarket.pid的值"+ $scope.tribeMarket.paid );
                                /*是否付过配送费---end*/
                                RecoverService.set($scope.params);
                                $state.go('paySelect', {'from' : 'TribeMarket', 'orderId' : orderNumber, 'orderPrice' : orderPrice, 'description' : '市场消费','typePage':1});
                                console.log("这是已经付过配送费的" + orderId+"==========="+orderPrice);
                            }else{
                                $scope.params.order_id = orderId;
                                RecoverService.set($scope.params);
                                /*是否付过配送费--start  2016.5.16*/
                                $scope.tribeMarket.paid = 1;
                                TribeMarketService.set($scope.tribeMarket.paid);
                                console.log("第另外一次判断tribeMarket.pid的值"+ $scope.tribeMarket.paid );
                                /*是否付过配送费---end*/
                                $state.go('paySelect', {'from' : 'TribeMarket', 'orderId' : orderNumber, 'orderPrice' : orderPrice, 'description' : '市场消费','typePage':1});
                                console.log("这是没有付过配送费的" + orderId+"==========="+orderPrice);
                            }
                        }else{
                            console.log("code 是多少"+data.code);
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
            };
            /*判断是否有配送费------end*/






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
