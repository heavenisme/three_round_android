// TabController
angular.module('starter.TabController', [])

//======================================================
// 忘记密码
.controller('TabController', function($scope, $ionicLoading, $state, UserService,TribeMarketService,$ionicPopup) {
  //----------------------------------------------------
  // 数据
  $scope.data = {};
  
  // 跳转到菜园管理
  $scope.garden = function(){
      var isLogined = UserService.isLogined();

      if(isLogined){
        $state.go("tab.garden");
      }else{
        $state.go("login");
      }
  };
  
  // 跳转的购物车
  $scope.shoppingCart = function(){
  		var isLogined = UserService.isLogined();
        if(isLogined){
            $state.go('tribeMarket');
/*            TribeMarketService.open()
                .success(function(data){
                    var nowTime = new Date().getTime();
                    if(200 == data.code){
                        if((nowTime < data.data[4]) || (nowTime > data.data[5])){
                            var alertPopup = $ionicPopup.alert({
                                title: '部落市场开放时间',
                                template: data.data[0]+"<br/>至<br/>"+data.data[1],
                                buttons: [{text: '知道了'}]
                            });
                        }else{
                            $state.go('tribeMarket');
                        }
                        console.log("当前系统时间："+nowTime);
                        console.log("部落市场开放时间："+JSON.stringify(data.data));
                    }
                })
                .error(function(state){
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '网络异常',
                        buttons: [{text: '知道了'}]
                    });
                });*/
  		}else{
  			$state.go("login");
  		}
  };

})

;