//采收计划列表
angular.module('starter.RecoverListController', [])
.controller('RecoverListController', function($scope, $state, $ionicLoading,$ionicHistory,$stateParams,$ionicPopup,RecoverService,GardenService,MessageService) {

    $scope.data = {
        recoverList : ""
    };
    //-----------------------------
    // 返回主页
    $scope.gotoHome = function(){
        $ionicHistory.goBack();
    };
    //获取采收计划列表
    $scope.recoverList = function(){
        var houseId = GardenService.get();//获取参数
        $ionicLoading.show({
            template: '载入中...'
        });
        RecoverService.recoverList(houseId)
            .success(function(data){
                $ionicLoading.hide();
                $scope.data.recoverList = data;
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
    //跳转详情
    $scope.gotoDetail = function(recoverId){
        $state.go('recoverFeedback', {data:{"recoverId":recoverId}});
    }
});
