// 购物车
angular.module('starter.TabShopingCartController', [])
.controller('TabShopingCartController', function($scope, $rootScope, $ionicLoading, $ionicPopup, $state, $ionicActionSheet, MyInfoService, UserService, OrderService, ShoppingCartService) {
	
	$scope.data            = {};
	$scope.data.isLogined  = UserService.isLogined();
  	$scope.data.userid     = UserService.getUserId();
  	$scope.data.orderPrice = 0.00;
	$scope.data.goodsList  = JSON.parse(ShoppingCartService.getShoppingCart(UserService.getUserId()));
    $scope.data.selectedGoodsList = [];     // 选中的商品列表

    $scope.data.goodsListBuf = [];

    //alert(JSON.stringify($scope.data.goodsList));
    
    //---------------------------------
	$scope.confirmOrder  = function() {
        // 先清空数据
        $scope.data.goodsListBuf = [];

        // 拼装数据
        for (var i = 0; i < $scope.data.selectedGoodsList.length; i++) {
            
            var goodsId = $scope.data.selectedGoodsList[i].goodsId;
            var newBuf = {};

            for (var j = 0; j < $scope.data.goodsList.length; j++) {

                var oldBuf = $scope.data.goodsList[j];

                if(oldBuf.goodsId == goodsId){
                    newBuf.goodsid   = oldBuf.goodsId;
                    newBuf.goodstype = '1';
                    newBuf.quantity  = '1';
                    newBuf.summary   = oldBuf.describe;
                    newBuf.imageurl  = 'http://www.aiqiyi.com/我的假的图片.png';
                    newBuf.goodsprice= oldBuf.groundprice;

                    $scope.data.goodsListBuf.push(newBuf);
                }
            };
        };
        //alert(JSON.stringify($scope.data.goodsListBuf));

		var confirmPopup = $ionicPopup.confirm({
		 title: '确认订单',
		 template: '是否确认下单？',
		 buttons: [
		   { text: '取消' },
		   {
			 text: '<b>确认</b>',
			 type: 'button-positive',
			 onTap: function(e) {
			 	$ionicLoading.show({
					template: '载入中...'
				});
			 	OrderService.addOrder($scope.data.userid, $scope.data.orderPrice, JSON.stringify($scope.data.goodsListBuf), 2)
    				.success(function(data) {
    				  $ionicLoading.hide();
    				  // 下单成功
    				  if(data.code == 200){
    					  //alert("ok");
    					  // 跳转
    					  $state.go('myOrder', {'from' : 'shoppingCart'});
    					  for(var i = 0; i < $scope.data.goodsListBuf.length; i++) {
    					  	$scope.removeSingleGoods($scope.data.goodsListBuf[i].goodsid);
    					  }
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
    					//alert(JSON.stringify(data) + "");
    					$ionicLoading.hide();
    					var alertPopup = $ionicPopup.alert({
    						title: '提示',
    						template: '网络异常',
    						buttons: [{text: '知道了'}]
    					});
    				});
			 }
		   }]
		 });
		 confirmPopup.then(function(res) {

         });
	};


	//---------------------------------
	// 添加选中商品
    $scope.selectGoods = function(goodsInfo) {

        for (var i = 0; i < $scope.data.selectedGoodsList.length; i++) {
			if($scope.data.selectedGoodsList[i].goodsId == goodsInfo.goodsId){
				$scope.data.selectedGoodsList.splice(i, 1);
				return;
			}
        };

        $scope.data.selectedGoodsList.push(goodsInfo);
    };

    //---------------------------------
    // 删除选中的物品
    $scope.removeSelectGoods = function(dataList) {

        for (var i = 0; i < dataList.length; i++) {
            var goodsId = dataList[i].goodsId;
            $scope.removeSingleGoods(goodsId);
        }
		$scope.data.selectedGoodsList.length = 0;
        $scope.data.goodsList  = JSON.parse(ShoppingCartService.getShoppingCart(UserService.getUserId()));
    };

	$scope.removeSingleGoods = function(goodsId) {
		ShoppingCartService.removeShoppingCart(UserService.getUserId(), goodsId);
	};

	$scope.calcOrderPrice = function() {
		$scope.data.orderPrice = 0;
		for (var i = 0; i < $scope.data.selectedGoodsList.length; i++) {
			$scope.data.orderPrice = $scope.data.orderPrice + $scope.data.selectedGoodsList[i].groundprice;
		}
		return $scope.data.orderPrice;
	};

});