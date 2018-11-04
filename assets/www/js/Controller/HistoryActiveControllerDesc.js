<!--农趣活动（历史活动控制器）-->
angular.module('starter.HistoryActiveDescController', ['ionic'])
//======================================================
//历史活动
    .controller('HistoryActiveDescController', function($scope, $ionicLoading,$ionicHistory,$state,TribeActiveService,$stateParams,$ionicPopup) {
        //-----------------------------
        $scope.data = {
            historyList : {},
            partyId:$stateParams.data.partyId
        }
        // 返回主页
        $scope.gotoHome = function(){
            $ionicHistory.goBack();
        };
        //init
        $scope.historyList = function() {
            console.log("--------------------活动Id:"+$scope.data.partyId);
            TribeActiveService.getTribeActiveDetail($scope.data.partyId)
                .success(function(data){
                    $ionicLoading.hide();
                    if(200 == data.code){
                       $scope.data.historyList = data.data[0].images;
                    }
                    console.log("历史活动详细："+JSON.stringify(data))
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