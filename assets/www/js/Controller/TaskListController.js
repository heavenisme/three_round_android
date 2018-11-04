// TaskListController
angular.module('starter.TaskListController', [])

    //======================================================
    .controller('TaskListController', function ($scope, $stateParams, $ionicLoading, $ionicPopup, $ionicHistory, $state, TaskService, $ionicActionSheet) {

        $scope.data = {
            moredata: true,
            currPage: -1,
            /*pageNo : 0,*/
        };

        $scope.data.tasklist = [];

        // init
        $scope.init = function () {
            $scope.data.currPage += 1;
            var houseId = $stateParams.data.houseId;
            $ionicLoading.show({
                template: '载入中...'
            });
            /*$scope.data.pageNo*/
            TaskService.getTaskList(houseId, $scope.data.currPage)
                .success(function (data) {
                    $ionicLoading.hide();

                    /*alert(JSON.stringify(data));*/
                    console.log("log ==>" + JSON.stringify(data));

                    if (data.code == 200) {
                        for (var i = 0; i < data.data.length; i++) {
                            /*data.data[i].images = [
                                {
                                    "image_url": "/anywide/resource/2016/1/2/1/56ebb75eb749e2f88b02dfbe873d3b29"
                                },
                                {
                                    "image_url": "/anywide/resource/2016/1/2/1/d39eeca2707c6bc860d2dce8d270c70c"
                                },
                                {
                                    "image_url": "/anywide/resource/2016/1/2/1/06eef9df611fb0858dfe4f4124cb5eed"
                                }
                            ];*/
                            $scope.data.tasklist.push(data.data[i]);

                        }
                        if (data.data.length == 0) {
                            $scope.data.moredata = false;
                        };
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        /*$scope.data.tasklist = data.data;*/
                    } else {

                    }
                })
                .error(function (state) {
                    $ionicLoading.hide();
                    //                alert("state = " + state); //0: 连接服务器失败； 400：请求方式错误，或者参数错误； 404：找不到接口地址； 500：服务器异常
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '网络异常',
                        buttons: [{ text: '知道了' }]
                    });
                });
        };

        //-----------------------------------
        // 处理图片路径
        $scope.handlePath = function (url, isThumb) {
            console.log(converImageUrl(url, isThumb));
            return converImageUrl(url, isThumb);
        };


        //跳转到任务详情页面
        $scope.taskDescClick = function (taskId, type) {
            $state.go("taskDesc", { data: { "taskId": taskId, "taskType": type } });
        };

        //返回页面
        $scope.gotoHome = function () {
            $ionicHistory.goBack();
        };

        //分享微信朋友圈
        $scope.share = function (title, desc, url, thumb) {
            var houseId = $stateParams.data.houseId;
            $ionicActionSheet.show({
                titleText: '分享',
                cancelText: '取消',
                buttons: [
                    { text: '分享至微信朋友圈' },
                    { text: '分享给微信好友' },
                ],
                cancel: function () {
                    //alert('取消事件！');
                },
                buttonClicked: function (index) {
                    Wechat.isInstalled(function (installed) {
                        if (!installed) {
                            alert("请安装微信再使用分享功能!");
                            return;
                        }
                        var shareType = Wechat.Scene.TIMELINE;
                        switch (index) {
                            case 0:
                                //$scope.shareViaWechat(WeChat.Scene.TIMELINE, title, desc, url, thumb);
                                shareType = Wechat.Scene.TIMELINE;
                                break;
                            case 1:
                                //$scope.shareViaWechat(WeChat.Scene.SESSION, title, desc, url, thumb);
                                shareType = Wechat.Scene.SESSION;
                                break;
                            default:
                                return;
                        }
                        Wechat.share({
                            message: {
                                title: title ? title :"三寰蔬菜日记",
                                description: desc ? desc :"新鲜营养,安全卫生,质量放心,诚实守信,合法经营",
                                mediaTagName: "SANHUAN",
                                thumb: "https://o1wh05aeh.qnssl.com/image/view/app_icons/6ccbae49c6d747ec0322c2c7378e5f0a/120",
                                media: {
                                    type: Wechat.Type.WEBPAGE,   // webpage
                                    webpageUrl: url ? url :"http://182.92.219.148:8080/anywide-tribe-management/www/task/task.html?hid="+houseId    // webpage
                                    //webpageUrl: url ? url :"http://101.200.191.150:8080/anywide-tribe-management/www/task/task.html?hid="+houseId   // webpage
                                }
                            },
                            scene: shareType   // share to 
                        }, function () {
                            alert("分享成功");
                        }, function (reason) {
                            alert("分享失败: " + reason);
                        });
                    }, function (reason) {
                        alert("分享失败: " + reason);
                    });

                    return true;
                }
            });
        };

        $scope.shareViaWechat = function (scene, title, desc, url, thumb) {
            var msg = {
                title: title ? title : "三寰蔬菜日记",
                description: desc ? desc : "三寰蔬菜日记",
                url: url ? url : "http://www.dlshdairy.com/index.aspx",
                thumb: thumb ? thumb : null,
                /* media: {
                   type: Wechat.Type.WEBPAGE,
                   webpageurl: "https://www.baidu.com/"
                 }*/
            };
            Wechat.share({
                message: msg,
                scene: scene
            }, function () {
                alert("分享成功");
            }, function () {
                alert("分享失败");
            });
        };


    })
