// <!--部落市场控制器-->
angular.module('starter.TribeMarketController', ['ionic'])
//======================================================
//部落活动
    .controller('TribeMarketController', function($scope, $ionicLoading,$stateParams, $ionicHistory,$state,TribeMarketService,UserService,$ionicPlatform,$ionicPopup,$location) {
        $scope.data = {
            list :{},//列表，
            priceList :{},//今日批发价格
            time:null,//计时器名称
            title: "",//标题
            params: $stateParams.data,
        };

        //-----------------------------
        // 返回主页
        $scope.gotoHome = function(){
            $state.go('tab.home');
        };
        //判断是否为ios平台下
        $scope.ios = (UserService.getCurrPlatform() == "ios");

        //跳转到批发价格页面
        $scope.insidePrice = function(){
            $state.go('insidePrice');
        };
        //跳转到商家报价页面
        $scope.storeOffer = function(id,shopId){
            TribeMarketService.setLocalStorage('crop_kind_id',id);////传递品种id
            TribeMarketService.setLocalStorage('shop_id',shopId);////传递店铺id
            $state.go('storeOffer');
        }
        //页面初始化
        $scope.init = function(){
            if($stateParams.data){
                $scope.data.params = $stateParams.data;
            }

            $ionicLoading.show({
                template: '载入中...'
            });
            TribeMarketService.getTribeMarketList()
                .success(function(data){
                    $ionicLoading.hide();
                    $scope.data.list = data;
                    console.log("部落市场列表："+JSON.stringify(data))
                })
                .error(function(state){
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '网络异常',
                        buttons: [{text: '知道了'}]
                    });
                });
            //今日批发价格
            TribeMarketService.getCroppriceList()
                .success(function(data){
                    $ionicLoading.hide();
                    $scope.data.priceList = data;
                    // $scope.scrollFont();
                    console.log("今日指导价格列表："+JSON.stringify(data))
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

        // 监听进入时间
        $scope.$on('$ionicView.afterEnter', function(){
            $scope.init();
        });

        // 监听页面离开
        $scope.$on('$ionicView.leave', function() {
            if($scope.data.time){
                clearInterval($scope.data.time);
            }
        });

        // 处理图片路径
        $scope.handlePath = function(path,file,isThumb){
            if(file){
                var url = path+file;
            }else{
                var url = path;
            }
            return converImageUrl(url, isThumb);
        };
        //
        $scope.scrollFont = function(){
            if($scope.data.time){
                clearInterval($scope.data.time);
            }
            $scope.data.time = setInterval(scroll,3000);
        }
        // 页面进入后马上设置滚动
        $scope.scrollFont();

        function scroll (){
            if($scope.data.priceList == null || $scope.data.priceList.length <= 0){
                return;
            }
            var box = document.getElementById('content');
            var pObj = box.getElementsByTagName('p');
            var nowObj = pObj[0];
            pObj[0].remove();
            box.appendChild(nowObj);
        }
        // // 注册返回按钮动作
        // $ionicPlatform.registerBackButtonAction(function (e) {
        //     e.preventDefault();
        //     function showConfirm() {
        //         var confirmPopup = $ionicPopup.confirm({
        //             title: '<strong>退出应用</strong>',
        //             template: '你确定要退出应用吗?',
        //             okText: '退出',
        //             cancelText: '取消'
        //         });
        //
        //         confirmPopup.then(function (res) {
        //             if (res) {
        //                 ionic.Platform.exitApp();
        //             }
        //             else {
        //                 // Don't close
        //             }
        //         });
        //     }
        //     if ($location.path().indexOf('/tab/') != -1) {
        //         showConfirm();
        //     }else if($location.path().indexOf('/tribeMarket') != -1){
        //         $state.go('tab.home');
        //     }else if($location.path().indexOf('/tribeActive') != -1){
        //         $state.go('tab.home');
        //     } else if ($ionicHistory.backView()) {
        //         $ionicHistory.goBack();
        //     } else {
        //         showConfirm();
        //     }
        //     return false;
        // }, 101);
    });
