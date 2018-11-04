<!--农趣活动（历史活动控制器）-->
angular.module('starter.HistoryActiveController', ['ionic'])
//======================================================
//历史活动
    .controller('HistoryActiveController', function($scope, $ionicLoading,$ionicHistory,$state,TribeActiveService) {
        //-----------------------------
        $scope.data = {
            historyList : {}
        }
        // 返回主页
        $scope.gotoHome = function(){
            $ionicHistory.goBack();
        };
        //查看活动详情
        $scope.activeDetail = function(id){
            $state.go('historyActiveDesc',{data:{"partyId":id}});
        }
        //init
        $scope.historyList = function() {
            TribeActiveService.historyActive()
                .success(function(data){
                    $ionicLoading.hide();
                    if(200 == data.code){
                       $scope.data.historyList = data.data;
                    }
                    console.log("历史活动："+JSON.stringify(data.data))
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
        // 处理图片路径
        $scope.handlePath = function(path,isThumb){
            return converImageUrl(path, isThumb);
        };
    });