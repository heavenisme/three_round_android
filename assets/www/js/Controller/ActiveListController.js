// 农事活动（活动列表）-控制器
angular.module('starter.ActiveListController', [])
//======================================================
//采收反馈（包装）
    .controller('ActiveListController', function($scope, $state, $ionicLoading,$ionicHistory,FarmingActiveService,$ionicPopup,$stateParams) {
        $scope.data = {
            list:{},//列表
            farmingId:0,
            hourseId:0//大棚id
        }
        $scope.params = {}//传递的参数
        //-----------------------------
        // 返回主页
        $scope.gotoHome = function(){
            $ionicHistory.goBack();
        };
        //农事活动-我要预约
        $scope.goToAppointment = function(id,startF,endF,startTime,endTime,workContent,point){
            $scope.params.end = endTime;
            $scope.params.start = startTime;
            $scope.params.farmingId = id;
            $scope.params.endF = endF;
            $scope.params.startF = startF;
            $scope.params.workContent = workContent;
            $scope.params.point = point;
            var confirmPopup = $ionicPopup.confirm({
                title: '<strong>预约农事</strong>',
                template: startF +"<br/>"+ "至"+"<br/>" +endF,
                okText: '确定',
                cancelText: '取消'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    //传递参数
                    FarmingActiveService.setLocalStorage('params',JSON.stringify($scope.params));
                    $state.go('appointment');
                }
            });
        }
        //init
        $scope.init = function(){
            $scope.data.hourseId = $stateParams.data.houseId;
            FarmingActiveService.set($scope.data.hourseId);
            FarmingActiveService.getFarmingActiveList($scope.data.hourseId)
                .success(function(data){
                    if(200 == data.code){
                        $scope.data.list = data;
                    }
                    console.log("农事活动："+JSON.stringify(data.data))
                })
                .error(function(state){
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '网络异常',
                        buttons: [{text: '知道了'}]
                    });
                });
        }
        //我的预约
        $scope.goMyAppoint = function(){
            $state.go('activeDetail');
        }
    });
