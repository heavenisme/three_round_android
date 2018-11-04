// 农事活动（活动详情）-控制器
angular.module('starter.ActiveDetailController', [])
//======================================================
    .controller('ActiveDetailController', function($scope, $state, $ionicLoading,$ionicHistory,$ionicPopup,$stateParams,FarmingActiveService,$location) {
        $scope.data = {
            list : null,
            farmWorkId:0,
            flag:false//是否预约过
        }
        var houseId = FarmingActiveService.get();
        //-----------------------------
        // 返回主页
        $scope.gotoHome = function(){
            $ionicHistory.goBack();
        };
        //init
        $scope.appointment = function(){
            FarmingActiveService.appointmentResult(0)
                .success(function(data){
                    if(200 == data.code){
                        if(0 < data.data.length){
                            $scope.data.flag = true;
                            $scope.data.list = data.data[0];
                            $scope.data.farmWorkId = data.data[0].workPartnerId;
                            if(!$scope.data.farmWorkId){
                                $scope.data.flag = false;
                            }
                            console.log(JSON.stringify(data) + "------------------------------- 预约结果" +  $scope.data.farmWorkId)
                        }else{
                            $scope.data.flag = false;
                        }
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
        //取消预约
        $scope.cancelReservation = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: '<strong>提示</strong>',
                template: '真的要取消预约吗?',
                okText: '确定',
                cancelText: '取消'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    FarmingActiveService.appointmentCancle($scope.data.farmWorkId)
                        .success(function(data){
                            if(200 == data.code){
                                var alertPopup = $ionicPopup.alert({
                                    title: '提示',
                                    template: '取消成功',
                                    buttons: [{text: '知道了',onTap:function(){
                                        $state.go('activeList',{data:{"houseId":houseId}});
                                    }}]
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
                else {

                }
            });
        }
    });
