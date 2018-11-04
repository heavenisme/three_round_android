// 农趣活动（活动详情控制器）
angular.module('starter.ActiveDescController', ['ionic'])
//======================================================
//活动详情
    .controller('ActiveDescController', function($scope, $ionicLoading,$ionicHistory,$state,$stateParams,TribeActiveService,$ionicPopup) {
        $scope.data = {
            flag:0,//是否参与过（参与过则不显示立即报名按钮）
            detail:[]//详情
        }
        //-----------------------------
        // 返回主页
        $scope.gotoHome = function(){
            $ionicHistory.goBack();
        };

        //立即报名
        $scope.signUp = function(){
             if(new Date().getTime() > $scope.data.detail.enroll_end_on){
                var alertPopup = $ionicPopup.alert({
                    title:'提示',
                    template: '很抱歉，已超过报名截止时间',
                    buttons: [{text: '知道了'}]
                });}
             else{
               $state.go('activeRegister',{data:{
                   "costAdult": $scope.data.detail.cost_adult,
                //    "costChild": $scope.data.detail.cost_child,//儿童始终免费，服务器应当传0，此处不用了
                   "costPoint": $scope.data.detail.cost_point,
                   "limitPeople": $scope.data.detail.limit_people,
                   "partyId": $scope.data.detail.party_id
               }});
             }
        }
        //init
        $scope.getDetail = function(){
            TribeActiveService.getTribeActiveDetail($stateParams.data.partyId)
                .success(function(data){
                    if(200 == data.code){
                        $scope.data.detail = data.data[0];
                        $scope.data.flag = data.data[0].partner;
                    }
                    console.log("农趣活动详情："+JSON.stringify(data.data))
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

        // 监听进入时间
        $scope.$on('$ionicView.enter', function(){
            $scope.data.flag = 0;
            $scope.data.detail = [];
            $scope.getDetail();
        });
    });
