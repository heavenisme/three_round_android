// 我的消息-控制器
angular.module('starter.MyMessageController', [])
//======================================================
// 我的消息
.controller('MyMessageController', function($scope, $ionicLoading, $ionicPopover, $ionicPopup,  $ionicHistory, $state, $stateParams, $ionicActionSheet, UserService, MyInfoService, MessageService) {

    // data 变量
    $scope.data = {};

    //----------------------------
    // init
    {
        MessageService.requestMessageSummary(UserService.getUserId())
        .success(function(data){
            if(data.code == 200){
                for(var i=0; i<data.data.length; i++){
                    switch(data.data[i].message_type){
                    case 1:     // 通知消息
                        $scope.data.tzxx = data.data[i].message_content;
                        break;
                    case 2:     // 物流助手
                        $scope.data.wlzs = data.data[i].message_content;
                        break;
                    case 3:     // 定时提醒
                        $scope.data.dstx = data.data[i].message_content;
                        break;
                    case 4:     // 农事活动
                        $scope.data.nshd = data.data[i].message_content;
                        break;
                    case 5:     // 农趣活动
                        $scope.data.nqhd = data.data[i].message_content;
                        break;
                    }
                }
            }
        })
        .error(function(state){

        });

        PushFSM.clearBadge();
    }

    //----------------------------
    // 是否需要返回按钮
    $scope.isNeedBackButton = function(){
        var from = $stateParams.data.from;

        if(from == "/tab/home"){
            return true;
        }
        else if(from == "/tab/garden"){
            return true;
        }
        else if(from == "/tab/my"){
            return true;
        }
        else if(from == "/tab/shoppingCart"){
            return true;
        }
        else{
            return false;
        }
        
        return false;
    };

    //----------------------------
    // 是否需要消息按钮
    $scope.isNeedMsgButton = function(){
        return true;
    }

    //-----------------------------
    // 返回主页
    $scope.gotoHome = function(){
        $ionicHistory.goBack();
    };

    //-----------------------------
    // 跳转
    $scope.gotoNextPage = function(type){
        var paramsBuf = {"messageType":type};

        switch(type){
        case 1:     // 通知消息
            if($scope.data.tzxx != null && $scope.data.tzxx != ""){
                $state.go("messageDesc", {data: paramsBuf});
            }
            else{
                $ionicPopup.alert({
                    title: '通知消息',
                    template: '还没有消息',
                    buttons: [{text: '知道了'}]
                });
            }
            break;
        case 2:     // 物流助手
            if($scope.data.wlzs != null && $scope.data.wlzs != ""){
            
            }
            else{
                $ionicPopup.alert({
                    title: '物流助手',
                    template: '还没有消息',
                    buttons: [{text: '知道了'}]
                });
            }

            break;
        case 3:     // 定时提醒
            if($scope.data.dstx != null && $scope.data.dstx != ""){
                $state.go("messageDesc", {data: paramsBuf});
            }
            else{
                $ionicPopup.alert({
                    title: '定时提醒',
                    template: '还没有消息',
                    buttons: [{text: '知道了'}]
                });
            }
            break;
        case 4:     // 农事活动
            if($scope.data.nshd != null && $scope.data.nshd != ""){
                $state.go("messageDesc", {data: paramsBuf});
            }
            else{
                $ionicPopup.alert({
                    title: '农事活动',
                    template: '还没有消息',
                    buttons: [{text: '知道了'}]
                });
            }
            break;
        case 5:     // 农趣活动
            if($scope.data.nqhd != null && $scope.data.nqhd != ""){
                $state.go("messageDesc", {data: paramsBuf});
            }
            else{
                $ionicPopup.alert({
                    title: '农趣活动',
                    template: '还没有消息',
                    buttons: [{text: '知道了'}]
                });
            }
            break;
        }
    }

});