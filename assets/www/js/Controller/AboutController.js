// 关于我们-控制器
angular.module('starter.AboutController', ['ionic'])
//======================================================
//关于我们
.controller('AboutController', function($scope, $ionicLoading, $ionicHistory, $sce, $ionicPopover, $ionicPopup, $state, $ionicActionSheet, UserService, MyInfoService) {
    //-----------------------------
    // 返回主页
    $scope.gotoHome = function(){
        $ionicHistory.goBack();
    };
    $scope.data = {};
    $scope.data.src = $sce.trustAsResourceUrl(AC.GET_ABOUT_US());
    // 判断是否为ios平台下
    $scope.ios = ionic.Platform.isIOS();
});
