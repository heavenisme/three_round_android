angular.module('starter.GreenhouseDataController',[])
 .controller('GreenhouseDataController',function($scope,$window,$ionicPopup, $ionicLoading, $stateParams, $state, $ionicActionSheet, GreenhouseService, ShoppingCartService, UserService, OrderService, MyTribeService){

    //----------------------------------------------------
  	// 数据
  	$scope.data = {
        userId: UserService.getUserId(),
  	    goodsList: []
  	};

    $scope.data.selectIndex = -1;
  	$scope.data.selectId = "--";
    $scope.data.selectLandId = -1;
    $scope.data.selectUserId = -1;
    $scope.data.selectTransfer = 0;
  	$scope.data.selectArea = "--";
    $scope.data.expire = "--";
    $scope.data.groundprice = "--";
    $scope.data.describe;
    $scope.data.goodstype;
    $scope.data.goodsId;
    $scope.data.servicePrice = "--";
//  $scope.data.isChecked = true;

    $scope.data.orderPrice = 0.00;

    $scope.data.goodsListBuf = [];

    $scope.data.groundDescription = "购买土地设施及首年服务费";     //购买土地描述

    $scope.data.isloaded = false;

    // 大棚编号
    $scope.data.houseNo = $stateParams.data.houseno;
    //大棚名称
    $scope.data.houseName = $stateParams.data.housename;

  	$scope.data.content = {
        "greenhouseid": $stateParams.data.greenhouseid,
        "greenhousename": "",
        "area": 0,
        "groundList": []
    };

    //alert("大棚ID = " + $stateParams.data.greenhouseid);
    $ionicLoading.show({
      template: '载入中...'
    });

    GreenhouseService.getGreenhouseInfo($stateParams.data.greenhouseid)
    .success(function(data){
    	$ionicLoading.hide();
    	if(data.code == 200){
           /* alert(JSON.stringify(data));*/
    		$scope.data.content = data.data[0];
    	}
    })
    .error(function(state){
    	$ionicLoading.hide();
    });

    //控制大棚预览图显示与隐藏的标识
    $scope.switcher = function(index) {
        if(index == $scope.data.content.groundList.length - 1){
            $scope.data.isloaded = true;
        }
    }

  	//选择大棚
  	$scope.houseOneClick = function(index){
  	    if($scope.data.goodsList.length != 0 && $scope.data.content.groundList[index].id == $scope.data.goodsList[0].id){
  	        $scope.data.selectId = "--";
            $scope.data.selectLandId = -1;
            $scope.data.selectUserId = -1;
            $scope.data.selectTransfer = 0;
            $scope.data.selectArea = "--";
            $scope.data.expire = "--";
            $scope.data.groundprice = "--";
            $scope.data.describe = "";
            $scope.data.goodstype = "";
            $scope.data.goodsId = "";
            $scope.data.servicePrice = "--";
  	        $scope.data.goodsList = [];
  	    } else {
            $scope.data.selectIndex = index;
  	        $scope.data.selectId   = $scope.data.content.groundList[index].id;
            $scope.data.selectLandId = $scope.data.content.groundList[index].landId;
            $scope.data.selectUserId = $scope.data.content.groundList[index].userId;
            $scope.data.selectTransfer = $scope.data.content.groundList[index].transfer;
            $scope.data.selectArea = $scope.data.content.groundList[index].groundarea;
            $scope.data.expire     = $scope.data.content.groundList[index].expire;
            $scope.data.groundprice= $scope.data.content.groundList[index].groundprice;
            $scope.data.describe   = $scope.data.content.groundList[index].describe;
            $scope.data.goodstype  = $scope.data.content.groundList[index].goodstype;
            $scope.data.goodsId    = $scope.data.content.groundList[index].goodsid;
            $scope.data.servicePrice=$scope.data.content.groundList[index].servicePrice;
            $scope.data.goodsList = [];
            $scope.data.goodsList.push($scope.data.content.groundList[index]);
            console.log("土地市场大棚信息---------》" + JSON.stringify($scope.data))
  	    }
  	};

  		//选择大棚-转卖中的地块未选中时
      	$scope.houseOneClickforTransfer = function(index){
      	    if($scope.data.goodsList.length != 0 && $scope.data.content.groundList[index].id == $scope.data.goodsList[0].id){
      	        $scope.data.selectId = "--";
                $scope.data.selectLandId = -1;
                $scope.data.selectUserId = -1;
                $scope.data.selectTransfer = 0;
                $scope.data.selectArea = "--";
                $scope.data.expire = "--";
                $scope.data.groundprice = "--";
                $scope.data.describe = "";
                $scope.data.goodstype = "";
                $scope.data.goodsId = "";
                $scope.data.servicePrice = "--";
      	        $scope.data.goodsList = [];
      	    } else {
                $scope.data.selectIndex = index;
      	        $scope.data.selectId   = $scope.data.content.groundList[index].id;
                $scope.data.selectLandId = $scope.data.content.groundList[index].landId;
                $scope.data.selectUserId = $scope.data.content.groundList[index].userId;
                $scope.data.selectTransfer = $scope.data.content.groundList[index].transfer;
                $scope.data.selectArea = $scope.data.content.groundList[index].groundarea;
                $scope.data.expire     = $scope.data.content.groundList[index].expire;
                $scope.data.groundprice= $scope.data.content.groundList[index].groundprice;
                $scope.data.describe   = $scope.data.content.groundList[index].describe;
                $scope.data.goodstype  = $scope.data.content.groundList[index].goodstype;
                $scope.data.goodsId    = $scope.data.content.groundList[index].goodsid;
                $scope.data.servicePrice=$scope.data.content.groundList[index].servicePrice;
                $scope.data.goodsList = [];
                $scope.data.goodsList.push($scope.data.content.groundList[index]);
                console.log("土地市场大棚信息---------》" + JSON.stringify($scope.data))
      	    }
           var alertPopup = $ionicPopup.alert({
                 title: '提示',
                 template: '该地块转让中，如有意购买，<br/>请与三寰农业服务公司联系，<br/>谢谢！',
                 buttons: [{text: '知道了'}]
           });
      	};

  	$scope.addToCart = function(data){
        var isSuccess = ShoppingCartService.addToShoppingCart(UserService.getUserId(), data);
        if(isSuccess){
            $ionicPopup.alert({
                title: '提示',
                template: data.describe + '<br/>已添加到购物车',
                buttons: [{text: '知道了'}]
            });
        } else {
            $ionicPopup.alert({
                title: '提示',
                template: '您已添加过该商品',
                buttons: [{text: '知道了'}]
            });
        }
  	};

  	$scope.goToShoppingCart = function(){
  		$state.go("tab.shoppingCart");
  	}

    //---------------------------------
    $scope.confirmOrder  = function() {
        // 先清空数据
        $scope.data.goodsListBuf = [];

        // 拼装数据
        for (var i = 0; i < $scope.data.goodsList.length; i++) {
                var newBuf = {};
                var oldBuf = $scope.data.goodsList[i];

                newBuf.goodsid   = oldBuf.goodsid;
                newBuf.goodstype = '1';
                newBuf.quantity  = '1';
                newBuf.summary   = oldBuf.describe;
                newBuf.imageurl  = 'xxxxxxx';
                newBuf.goodsprice= oldBuf.groundprice + oldBuf.servicePrice;

//                alert("summary = " + newBuf.summary);

                $scope.data.goodsListBuf.push(newBuf);
        };
        //alert(JSON.stringify($scope.data.goodsListBuf));

//        var confirmPopup = $ionicPopup.confirm({
//         title: '确认订单',
//         template: '是否确认下单？',
//         buttons: [
//           { text: '取消' },
//           {
//             text: '<b>确认</b>',
//             type: 'button-positive',
//             onTap: function(e) {

                $ionicLoading.show({
                    template: '载入中...'
                });
                OrderService.addOrder(UserService.getUserId(), $scope.calcOrderPrice(), JSON.stringify($scope.data.goodsListBuf), 1)
                    .success(function(data) {
                      $ionicLoading.hide();
                      // 下单成功
                      if(data.code == 200){
                          //alert("ok");
//                          alert(JSON.stringify(data));
                          // 跳转
                          $state.go('paySelect', {'from' : 'Greenhouse', 'orderId' : data.data[0].orderid, 'orderPrice' : $scope.calcOrderPrice(), 'description' : $scope.data.groundDescription});
                          $scope.data.goodsList = [];

                          // 获取我的大棚
                          $scope.getMyGreenHouse();
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
//                        alert(JSON.stringify(data) + "");
                        $ionicLoading.hide();
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template: '网络异常',
                            buttons: [{text: '知道了'}]
                        });
                    });
//             }
//           }]
//         });
//         confirmPopup.then(function(res) {
//
//         });
    };

    //----------------------------------------------------
    // 获取属于我的大棚列表
    $scope.getMyGreenHouse = function(){

        MyTribeService.getMyGreenHouse(UserService.getUserId())
          .success(function(data)
          {
              if(data.code == 200){
                  UserService.setMyGreenHouseList(data.data);
              }
          })
          .error(function(state)
          {

          });
    };

    $scope.calcOrderPrice = function() {
        $scope.data.orderPrice = 0;
        for (var i = 0; i < $scope.data.goodsList.length; i++) {
            $scope.data.orderPrice = $scope.data.orderPrice + $scope.data.goodsList[i].groundprice + $scope.data.goodsList[i].servicePrice;
        }
        return $scope.data.orderPrice;
    };


    /*$scope.checkClick = function(){
        $scope.data.isChecked = !$scope.data.isChecked;
    };*/

    $scope.agree = function(){
        $state.go("agreeHouse",{data:{"greenhouseid": $scope.data.content.greenhouseid,"houseno":$scope.data.houseNo,"housename":$scope.data.houseName}});
    };

    $scope.getCurrGroundID = function(index) {
        var temp = "#";

        if(index >= 0 && index < 10){
            temp = temp + "00" + index;
        } else if(index >= 10){
            temp = temp + "0" + index;
        }
        return temp;
    };

    // 转卖或取消转卖
    // status: 1转让 0取消转让
    $scope.resell = function(status){
        var selectIndex = $scope.data.selectIndex;
        GreenhouseService.resell($scope.data.selectLandId, status)
            .success(function(data){
                if(data.code == 200){
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '操作成功',
                        buttons: [{text: '知道了'}]
                    });
                    $scope.data.selectTransfer = status;
                    $scope.data.content.groundList[selectIndex].transfer = status;
                }
                else{
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '' + data.message,
                        buttons: [{text: '知道了'}]
                    });
                }
            })
            .error(function(state){
                var alertPopup = $ionicPopup.alert({
                    title: '提示',
                    template: '错误码: ' + state,
                    buttons: [{text: '知道了'}]
                });
            });
    };

    //点击他人转卖中的地块，弹出联系message
    $scope.alertMessage = function(){
         var alertPopup = $ionicPopup.alert({
             title: '提示',
             template: '该地块转让中，如有意购买，<br/>请与三寰农业服务公司联系，<br/>谢谢！',
             buttons: [{text: '知道了'}]
         });
    };
});
