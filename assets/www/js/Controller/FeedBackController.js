/*帮助与反馈 控制器*/
angular.module('starter.FeedBackController', [])
    .controller('FeedBackController', function ($scope, $ionicLoading, $ionicHistory, $ionicPopup, $state, $ionicActionSheet, MyInfoService, UserService) {

        $scope.data = {};
        $scope.data.advice = UserService.getAdvice();
        // 返回
        $scope.gotoHome = function () {
            $ionicHistory.goBack();
        };

        //点击按钮触发
        $scope.check = function(){

        }


        //点击提交
        $scope.commit = function(){

        }
    })

;