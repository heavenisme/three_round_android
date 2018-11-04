angular.module('starter.PointControllers', ['ionic'])
// 积分等级
.controller('PointLevelCtrl', function($scope, $state, $ionicLoading, $ionicPopup, $ionicHistory, PointService) {

    $scope.data = {};
    $scope.data.info = {
        remaining_points: 0,//剩余积分
        level_name: '加载中...',
        level: 0,
        interval_start: 0,//下一级基础分
        total_points: 0,//累计积分
    };
    $scope.data.history = [];
    // [{
    //     point: 0,
    //     update_id: 0,
    //     create_id: 0,
    //     status: 0,
    //     project_id:0,
    //     points_type:0,
    //     user_id:0,
    //     change_reason:'积分兑换物品',
    //     record_id:5
    // }]

    // 获取用户积分信息
    PointService.getPointInfo()
        .success(function(data){
            if(data.code == 200){
                $scope.data.info = data.data[0] || {};
            }
            else {
                var alertPopup = $ionicPopup.alert({
                    title: '提示',
                    template: '服务器错误码: ' + data.code,
                    buttons: [{text: '知道了'}]
                });
            }
        })
        .error(function(state){
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: '网络异常',
                buttons: [{text: '知道了'}]
            });
        });

    // 获取积分历史
    PointService.getPointHistory()
        .success(function(data){
            if(data.code == 200){
                $scope.data.history = data.data;
            }
        })
        .error(function(state){
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: '网络异常',
                buttons: [{text: '知道了'}]
            });
        });

    //-----------------------------
    // 返回主页
    $scope.gotoHome = function(){
        $ionicHistory.goBack();
    };

    // 跳转到积分兑换
    $scope.onExchangeClick = function(){
        $state.go('pointExchangeList');
    };

    // 跳转到等级说明
    $scope.onGuideClick = function(){
        $state.go('pointLevelGuide');
    };
})

// 积分兑换
.controller('PointExchangeListCtrl', function($scope, $state, PointService, $ionicPopup){
    $scope.data = {};
    $scope.data.itemList = [];
    /*
    {
        item_id: 0,
        // item_type: 0,//类型
        item_name: '',
        remaining_number: 0,//剩余个数
        required_point: 0,//所需积分
    }
    */

    PointService.getPointItems()
        .success(function(data){
            if(data.code == 200){
                $scope.data.itemList = data.data;
            }
            else if(data.code == 500){
                var alertPopup = $ionicPopup.alert({
                    title: '提示',
                    template: data.message,
                    buttons: [{text: '知道了'}]
                });
            }
            else{
                var alertPopup = $ionicPopup.alert({
                    title: '提示',
                    template:'服务器异常',
                    buttons: [{text: '知道了'}]
                });
            }
        })
        .error(function(state){
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: '网络异常',
                buttons: [{text: '知道了'}]
            });
        });

    $scope.onPointRecordClick = function(){
        $state.go('pointRecord');
    };

    $scope.onListClick = function(item){
        $state.go('pointExchangeDetail', {data:item});
    };
})

// 积分详细/我要兑换
.controller('PointExchangeDetailCtrl', function($scope, $state, $ionicHistory, $stateParams, PointService, $ionicPopup){
    $scope.data = {};
    $scope.data.count = 1;
    $scope.data.userPoint = 0;
    $scope.data.item = $stateParams.data;

    // 获取用户积分信息(这里仅用来获取剩余积分)
    PointService.getPointInfo()
        .success(function(data){
            if(data.code == 200){
                $scope.data.userPoint = data.data[0].remaining_points || 0;
            }
        })

    // 兑换按钮点击
    $scope.onExchangeClick = function(){
        if($scope.data.count * $scope.data.item.required_point <= 0){
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: '请正确填写数量',
                buttons: [{text: '知道了'}]
            });
            return;
        }

        PointService.getPointItem($scope.data.item.item_id, $scope.data.count)
            .success(function(data){
                if(data.code == 200){
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: data.message,
                        buttons: [{text: '知道了', onTap:function(){
                            $ionicHistory.goBack();
                        }}]
                    });
                }
                else if(data.code == 500){
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: data.message,
                        buttons: [{text: '知道了'}]
                    });
                }
                else{
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '服务器错误码: ' + data.code,
                        buttons: [{text: '知道了'}]
                    });
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
})

// 我的兑换/兑换记录
.controller('PointRecordCtrl', function($scope, PointService, $ionicPopup){
    $scope.data = {};
    $scope.data.items = [];
    // {
    //     receive_status: 1,//1未领取 2已领取
    //     update_id: 0,
    //     redeem_id: 0,
    //     redeem_time: 1456666666666,
    //     create_id: 0,
    //     update_time: 0,
    //     redeem_number: 0,
    //     status: 1,
    //     item_id: 0,
    //     create_time: 0,
    //     user_id: 11,
    //     redeem_code: 'a1j2'
    // }

    PointService.getPointUserItems()
        .success(function(data){
            if(data.code == 200){
                $scope.data.items = data.data;
            }
            else{
                var alertPopup = $ionicPopup.alert({
                    title: '提示',
                    template: '服务器错误码: ' + data.code,
                    buttons: [{text: '知道了'}]
                });
            }
        })
        .error(function(state){
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: '网络异常',
                buttons: [{text: '知道了'}]
            });
        });
})

// 等级说明
.controller('PointLevelGuideCtrl', function($scope, PointService, $ionicPopup){
    $scope.data = {};
    $scope.data.levelInfo = [];
    // {
    //     level_name: "",
    //     level_id: 0,
    //     level:1,
    //     interval_end: 0,
    //     interval_start: 0,
    // }

    PointService.getPointLevel()
        .success(function(data){
            if(data.code == 200){
                $scope.data.levelInfo = data.data;
            }
            else{
                var alertPopup = $ionicPopup.alert({
                    title: '提示',
                    template: '服务器错误码: ' + data.code,
                    buttons: [{text: '知道了'}]
                });
            }
        })
        .error(function(state){
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: '网络异常',
                buttons: [{text: '知道了'}]
            });
        });
})
;
