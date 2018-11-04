angular.module('starter.MyAccountController', [])
.controller('MyAccountController', function($scope, $ionicLoading, $ionicHistory, $ionicPopup, $state, $ionicActionSheet, MyInfoService, UserService, MyBalanceService) {

    $scope.data = {
        userAmount: "-"
    };

    //判断是否为ios平台下
    $scope.ios = (UserService.getCurrPlatform() == "ios");

    // 返回
    $scope.gotoHome = function(){
        $ionicHistory.goBack();
    };


    //----------------------------------------------------
    // 跳转到余额页
    $scope.myBalanceClick = function() {
        $state.go("myBalance");
    };
    //----------------------------------------------------
    // 跳转到积分页
    $scope.myPointClick = function() {
        var alertPopup = $ionicPopup.alert({
            title: '提示',
            template: '功能暂未开放，敬请期待！',
            buttons: [{text: '知道了'}]
        });
        //$state.go("myPoint");
    };
    //----------------------------------------------------
    // 跳转到充值页
    $scope.msgClick = function() {
        $state.go("paySelect", {'from' : 'MyAccount'});
    };

    //----------------------------------------------------
    // 获取账户余额
    $scope.getBalance = function(){
        MyBalanceService.getMyBalance(UserService.getUserId())
            .success(function(data)
            {
//                alert(JSON.stringify(data));

                if(data.code == 200){
                    $scope.data.userAmount = data.data[0].user_amount;
                }
            })
            .error(function(state)
            {

            });
    };

})

;