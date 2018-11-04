////////////////////////////////////
// 大棚选择
////////////////////////////////////
angular.module('starter.SelectGreenhouseController', [])

    .controller('SelectGreenhouseController', function($scope,  $ionicHistory, $ionicLoading, $state, $ionicPopup, $ionicActionSheet, GreenhouseService) {
        //----------------------------------------------------
        // 数据
        $scope.data = {};

        $scope.data.zone = [];

        // 返回
        $scope.gotoHome = function(){
            $ionicHistory.goBack();
        };

        // init
        $scope.init = function(){
            $ionicLoading.show({
                template: '载入中...'
            });

            GreenhouseService.getGreenhouse()
                .success(function(data){
                    $ionicLoading.hide();
                    $scope.data.zone = data.data;
                })
                .error(function(state){
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '网络异常',
                        buttons: [{text: '知道了'}]
                    });
                });
        };

        //选择大棚
        $scope.zoneOneClick = function(index){

            var buffer = $scope.data.zone[index-1];

            if(buffer.openstate == 2){
                // todo
                var alertPopup = $ionicPopup.alert({
                    title: '提示',
                    template: '大棚暂未开放',
                    buttons: [{text: '知道了'}]
                });
            }
            else{
                  $state.go('GreenhouseData', {data:buffer});
//                if(buffer.state == "1"){
//                    $state.go('GreenhouseData', {data:buffer});
//                }else{
//                    var alertPopup = $ionicPopup.alert({
//                        title: '提示',
//                        /*template: '大棚土地已经卖出',*/
//                        template: '大棚土地已售完',
//                        buttons: [{text: '知道了'}]
//                    });
//                }
            }
        };
    });
