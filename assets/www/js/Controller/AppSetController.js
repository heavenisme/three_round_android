angular.module('starter.AppSetController', [])
    .controller('AppSetController', function ($scope, $ionicLoading, $ionicHistory, $ionicPopup, $state, $ionicActionSheet, MyInfoService, UserService) {

        $scope.data = {
            couldUpdate : false,
            currVersion : "",
        };

        //判断是否为ios平台下
        //    $scope.ios = ionic.Platform.isIOS();
        $scope.ios = (UserService.getCurrPlatform() == "ios");

        // 返回
        $scope.gotoHome = function () {
            $ionicHistory.goBack();
        };

        //----------------------------------------------------
        // 跳转到消息设置页
        $scope.settingClick = function () {
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: '功能暂未开放，敬请期待！',
                buttons: [{text: '知道了'}]
            });
            //$state.go("setting");

        };

        //----------------------------------------------------
        // 跳转到账户与安全页
        $scope.accountSafeClick = function () {
            $state.go("accountSafe");
        };

        //----------------------------------------------------
        // 检查更新
        $scope.checkVersion = function () {

            if (ionic.Platform.isIOS() || ionic.Platform.isIPad()) {
                UserService.getUpGrade()
                    .success(function(data)
                    {
//                      alert(JSON.stringify(data));

                       var header = "http://";
                       var header1 = "https://";

                       if(data.code == 200){
                           var http = data.data[0].upgrade.substr(0, header.length);
                           var https = data.data[0].upgrade.substr(0, header1.length);

                           if (http == header || https == header1) {

                               CheckVersion.checkUpdate(
                                    data.data[0].version_number,
                                    data.data[0].upgrade,
                                    "true",
                                    function(message) {
                                        
                                    },
                                    function(message) {
//                                      alert(message);
                                    }
                                );
                             } else {
                             var alertPopup = $ionicPopup.alert({
                                    title: '提示',
                                    template: '没有新版本，再等等吧~',
                                    buttons: [{text: '知道了'}]
                                });
                             }
                       }
                    })
                    .error(function(state)
                    {
                    });
            } else {
                $ionicLoading.show({
                    template: '<ion-spinner icon="bubbles" class="spinner-balanced"></ion-spinner>',
                    duration: 5000
                });
                CheckVersion.checkUpdate("checkVersion",
                    function(message) {
                        if(message == 'success'){
                            $ionicLoading.hide();
                        }
                    },
                    function(message) {
//                        alert(message);
                    });
            }

        };

        //----------------------------------------------------
        // 跳转关于会耕部落页
        $scope.getVersion = function() {
            CheckVersion.getVersion(
                function(message) {
//                    alert("version = " + message);
                    $scope.data.currVersion = "V" + message;
                },
                function(message) {
                    alert(message);
                });
        }

        //----------------------------------------------------
        // 跳转关于会耕部落页
        $scope.aboutClick = function () {
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: '功能暂未开放，敬请期待！',
                buttons: [{text: '知道了'}]
            });
            //$state.go("about");
        };
        //----------------------------------------------------
        // 退出 注销
        $scope.logout = function () {
            $state.go("tab.my");
//            PushFSM.stopPush();
            UserService.logout()
                .success(function (data) {
                    // 跳转到我的页面
                })
                .error(function (state) {
                });
            
        };

    })

;