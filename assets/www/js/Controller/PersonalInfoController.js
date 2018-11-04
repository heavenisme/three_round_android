angular.module('starter.PersonalInfoController', [])
    .controller('PersonalInfoController', function($scope,$ionicHistory, $ionicLoading, $ionicPopup, $state, $ionicActionSheet, MyInfoService, UserService) {

        $scope.data = {};
        //在输入框中输入文字后 保存变色
        $scope.isDisabled = false;

        $scope.data.nickname = UserService.getNickname();
        $scope.data.bufSignature = UserService.getSignature();

        //-----------------------------
        // 返回主页
        $scope.gotoHome = function(){
            $ionicHistory.goBack();
        };
//        //监听昵称文本框
//        $scope.$watch('data.nickname', function(newNickName, oldNickName) {
//
//            if (newNickName != "" &&  newNickName.length > 0)
//            {
//                $scope.isDisabled = false;
//            }
//            else
//            {
//                $scope.isDisabled = true;
//            }
//        });
        //监听个性签名文本框
        $scope.$watch('data.bufSignature', function(newSignature, oldSignature) {
                $scope.isDisabled = false;
        });
        /*保存个人资料*/
        $scope.saveClick = function(){
            if($scope.data.nickname == "") {
                $scope.data.nickname = "都市小菜农";
            }
            if($scope.data.bufSignature == "") {
                $scope.data.bufSignature = "空空如也，还没有签名~";
            }
            /*昵称*/
            UserService.setUserName(UserService.getUserId(), $scope.data.nickname)
                .success(function(data){
                    if(data.code == 200){
                        UserService.setNickname($scope.data.nickname);
                        /*alert("setNickname save ok");*/

                        /*签名*/
                        UserService.setUserSignature(UserService.getUserId(), $scope.data.bufSignature)
                            .success(function(data){
                                if(data.code == 200){
                                    UserService.setSignature($scope.data.bufSignature);
                                    /*alert("setSignature save ok");*/
                                    $ionicHistory.goBack();
                                }
                                else{
                                    var alertPopup = $ionicPopup.alert({
                                        title: '提示',
                                        template: '' + data.message,
                                        buttons: [{text: '知道了'}]
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
                    else{
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template: '' + data.message,
                            buttons: [{text: '知道了'}]
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
    });