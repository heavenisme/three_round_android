<!--农趣活动（部落活动控制器）-->
angular.module('starter.TribeActiveController', ['ionic'])
//======================================================
//部落活动
    .controller('TribeActiveController', function($scope, $ionicLoading,$ionicHistory,$state,TribeActiveService) {
        $scope.data = {
            list:{}//列表
        }
        //-----------------------------
        // 返回主页
        $scope.gotoHome = function(){
            //$ionicHistory.goBack();
            $state.go('tab.home')
        };
        //历史活动
        $scope.historyActive = function(){
            $state.go('historyActive');
        };
        //查看活动详情
        $scope.activeDetail = function(id){
            $state.go('activeDesc',{data:{"partyId":id}});
        }
        //init
        $scope.getTribeActive = function(){
            TribeActiveService.getTribeActiveList()
                .success(function(data){
                    if(200 == data.code){
                        $scope.data.list = data.data;
                    }
                    console.log("农趣活动："+JSON.stringify(data.data))
                })
                .error(function(state){
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
