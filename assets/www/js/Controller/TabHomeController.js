// 主页-控制器
angular.module('starter.TabHomeController', [])

.controller('TabHomeController', function($scope, $ionicPopup, $ionicLoading, $state, $ionicActionSheet, UserService, MyInfoService,$ionicHistory,TribeMarketService,MyTribeService) {
	//----------------------------------------------------
	// 数据
	$scope.data = {};
	$scope.data.isLandowner = false;

	//判断是否为ios平台下
//	$scope.ios = ionic.Platform.isIOS();
	$scope.ios = (UserService.getCurrPlatform() == "ios");

	//购买土地
	$scope.selectZoneClick = function(){
		var isLogined = UserService.isLogined();

            if(isLogined){
                $state.go('SelectGreenhouse');
            }
            else{
                $state.go("login");
            }
        };
        //您的菜地
        $scope.gotoGarden = function(){
            var isLogined = UserService.isLogined();

            if(isLogined){
                $state.go('tab.garden');
            }
            else{
                $state.go("login");
            }
        };
        //一起玩吧
        $scope.gotoPlay = function() {
            var isLogined = UserService.isLogined();

            if(isLogined){
                $state.go('tribeActive');
            }
            else{
                $state.go("login");
            }
            /*var alertPopup = $ionicPopup.alert({
             title: '提示',
             template: '功能暂未开放，敬请期待！',
             buttons: [{text: '知道了'}]
             });*/
        };
        //市民市场
        $scope.gotoMarket = function() {
            var isLogined = UserService.isLogined();
            if(isLogined){
              TribeMarketService.open()
                .success(function(data){
                    var nowTime = new Date().getTime();
                    if(200 == data.code){
                        if((nowTime < data.data[6]) || (nowTime > data.data[7])){
                            var alertPopup = $ionicPopup.alert({
                                title: '市民大集开放时间',
                                template: data.data[2]+"<br/>至<br/>"+data.data[3],
                                buttons: [{text: '知道了'}]
                            });
                        }else{
                            $state.go('tribeMarket', {data:{title:"市民大集"}});
                        }
                        console.log("当前系统时间："+nowTime);
                        console.log("开放市场开放时间："+JSON.stringify(data.data));
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
            else{
                $state.go("login");
            }

        };

        //部落交换
        $scope.exchangeTribal = function(){
            var isLogined = UserService.isLogined();
            if(isLogined){
                var myGreenHouseList = UserService.getMyGreenHouseList();
                for(var i=0; i<myGreenHouseList.length; i++){
                    if(myGreenHouseList[i].user_role != -1){
                        $scope.data.isLandowner = true;
                    }
                }
                if(myGreenHouseList.length == 0 || !$scope.data.isLandowner) {
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '亲，您还不是耘客<br/>请先购买土地哦~',
                        buttons: [{text: '知道了'}]
                    });
                } else {
                    TribeMarketService.open()
                        .success(function(data){
                            var nowTime = new Date().getTime();
                            if(200 == data.code){
                                if((nowTime < data.data[4]) || (nowTime > data.data[5])){
                                    var alertPopup = $ionicPopup.alert({
                                        title: '耘客市场开放时间',
                                        template: data.data[0]+"<br/>至<br/>"+data.data[1],
                                        buttons: [{text: '知道了'}]
                                    });
                                }else{
                                    $state.go('tribeMarket', {data:{title:"耘客市场"}});
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
                        });
                }
            }
            else{
                $state.go("login");
            }
            /*var alertPopup = $ionicPopup.alert({
             title: '提示',
             template: '功能暂未开放，敬请期待！',
             buttons: [{text: '知道了'}]
             });*/

        };


        //彩蛋效果
        /**
         * 根据是否开启彩蛋
         */
        var eggCount = 0;
        $scope.egg = function(){
            if(AC._CHANGE_IP == 1){
                if(++eggCount == 30){
                    eggCount = 0;
                    // 打开开发模式
                    $scope.data.isDev = true;
                    //跳转页面
                    $state.go("tappage");
                }
            }
        };


	$scope.changeIP = function(){
		if( $scope.data.ip == undefined){
			alert("请输入Ip");
		}else{
			window.localStorage.setItem("SERVER_IP", $scope.data.ip);
            alert("修改成功,请重新打开应用");
		}
	};

	$scope.setDefIp = function(){
		window.localStorage.removeItem("SERVER_IP");
		alert("恢复成功,请重新打开应用");
	}
	//返回主页
	 $scope.gotoHome = function(){
		$ionicHistory.goBack();
	};
});
