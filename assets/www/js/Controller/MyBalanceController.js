angular.module('starter.MyBalanceController', [])
.controller('MyBalanceController', function($scope, $ionicLoading, $ionicHistory, $ionicPopup, $state, $ionicActionSheet, MyBalanceService, UserService) {

    $scope.data = {
        userAmount: "-",
        transactionRecords : [],
        moredata: true,
        currPage: 0,
        perPageSize: 10,
    };
    //判断是否为ios平台下
    $scope.ios = (UserService.getCurrPlatform() == "ios");

    // 返回
    $scope.gotoHome = function(){
        $ionicHistory.goBack();
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

    //----------------------------------------------------
    //  获取交易记录
    $scope.getTransactionRecords = function(){
        MyBalanceService.getTransactionRecords(UserService.getUserId(), pageNum, $scope.data.perPageSize)
            .success(function(data){

                if(data.code == 200) {
                    $scope.data.transactionRecords.concat(data.data);
                }
            })
            .error(function(state){

            });
    };

    $scope.loadMore = function(){
        $scope.data.currPage += 1;

        MyBalanceService.getTransactionRecords(UserService.getUserId(), $scope.data.currPage, $scope.data.perPageSize)
            .success(function(data){

//                alert(JSON.stringify(data));

                if(data.code == 200) {
                    for(var i = 0; i < data.data.length; i++){
                        $scope.data.transactionRecords.push(data.data[i]);
                    }
                    if (data.data.length == 0) {
                        $scope.data.moredata = false;
                    };
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }
            })
            .error(function(state){

            });
    };

    /*提现功能*/
    $scope.tixian = function(){
        var alertPopup = $ionicPopup.alert({
            title: '提示',
            template: '功能暂未开放，敬请期待！',
            buttons: [{text: '知道了'}]
        })
    }


})

;