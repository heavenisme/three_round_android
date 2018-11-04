// 农事活动（我要预约）-控制器
angular.module('starter.AppointmentController', [])
//======================================================

    .controller('AppointmentController', function($scope, $state, $ionicLoading, $ionicHistory,FarmingActiveService, $ionicPopup,$stateParams,$filter) {

        //-----------------------------
        $scope.data = JSON.parse(FarmingActiveService.getLocalStorage('params'));
        console.log(JSON.stringify($scope.data) + "------本地存储的数据")
        $scope.params = {
            dateTime: null,//预约时间
            mobile:null,//联系电话
            farmWorkId:0
        }
        //初始化预约时间为活动开始时间
        $scope.params.dateTime = new Date(($filter("date")($scope.data.start, "yyyy-MM-dd HH:mm")).toString());
        // 返回主页
        $scope.gotoHome = function(){
            $ionicHistory.goBack();
        };

        //农事活动-活动详情
        $scope.goToActiveDetail = function(){
            //判断所选择日期是否在开始时间和结束时间之前&&联系方式不为空
            if(((new Date($scope.params.dateTime)).getTime()) < ($scope.data.start) || ((new Date($scope.params.dateTime)).getTime()) > ($scope.data.end)){
                var alertPopup = $ionicPopup.alert({
                    title: '农事活动时间',
                    template:$scope.data.startF + "<br/>" +"至"+"<Br/>"+$scope.data.endF,
                    buttons: [{text: '知道了'}]
                });
            }else if(!$scope.params.mobile){
                var alertPopup = $ionicPopup.alert({
                    title: '提示',
                    template:'请输入正确的联系方式',
                    buttons: [{text: '知道了'}]
                });
            }else{
                $scope.params.dateTime = $filter('date')($scope.params.dateTime,'yyyy-MM-dd');
                $scope.params.farmWorkId = $scope.data.farmingId;
                console.log(JSON.stringify($scope.params) + "-------------------------------------参数")
                FarmingActiveService.appoint($scope.params)
                    .success(function(data){
                        if(200 == data.code){
                            var alertPopup = $ionicPopup.alert({
                                title: '提示',
                                template: '预约成功',
                                buttons: [{text: '知道了',onTap:function(){
                                    $state.go('activeDetail');
                                }}]
                            });
                        }
                        if(500 == data.code){
                            var alertPopup = $ionicPopup.alert({
                                title: '提示',
                                template: data.message,
                                buttons: [{text: '知道了',onTap:function(){
                                    $ionicHistory.goBack();
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
        };

        $scope.content=[];
        //获取农事活动规则
        $scope.getWorkRules = function(){
            FarmingActiveService.getWorkRule()
                .success(function(data){
                    if(200 == data.code){
                        $scope.content = data.data;
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
    });
