// 我的-控制器
angular.module('starter.TabMyController', [])
.controller('TabMyController', function($scope, $ionicLoading, $ionicPopup, $state, $ionicActionSheet, $ionicPopover, OrderService, MyInfoService, UserService,ScanService,MyTribeService, PointService) {

    $scope.data = {};
    $scope.data.isLogined = UserService.isLogined();
    $scope.data.userRole  = UserService.getUserRole();
    $scope.data.isLandowner = false;
    $scope.data.isHaveGreenHouse = false;

    if(UserService.getMyGreenHouseList() && UserService.getMyGreenHouseList().length > 0){
         var tempList = UserService.getMyGreenHouseList();
         for(var i=0; i<tempList.length; i++){
             if(tempList[i].user_role != -1){
                 $scope.data.isLandowner = true;
             }
         }
         if ($scope.data.isLandowner){
            $scope.data.isHaveGreenHouse = true;
         }
    }

    // TODO
    $scope.data.nickname  = UserService.getNickname();
    $scope.data.image     = UserService.getImage();
    $scope.data.signature = UserService.getSignature();

    $scope.data.isSignon = true;

    $scope.data.bufName = $scope.data.nickname;
    $scope.data.bufSignature = $scope.data.signature;

    //判断是否为ios平台下
//    $scope.ios = ionic.Platform.isIOS();
    $scope.ios = (UserService.getCurrPlatform() == "ios");

    // 如果已经登录
    // 请求个人信息
    if($scope.data.isLogined)
    {
        if($scope.data.nickname == null){
            UserService.getUserInfo(UserService.getUserId()).success(function(data)
            {
             // alert(JSON.stringify(data));

                if(data.code == 200){
                    $scope.data.nickname  = data.data[0].nick_name;
                    $scope.data.image     = AC.SERVER_IP() + data.data[0].header_image;
                    $scope.data.signature = data.data[0].signature;

                    UserService.setNickname(data.data[0].nick_name);
                    UserService.setImage(AC.SERVER_IP() + data.data[0].header_image);
                    UserService.setSignature(data.data[0].signature);

                    console.log(UserService.getImage());
    //                alert(UserService.getImage());
                }
            });
        }

        // 获取签到状态
        UserService.getSignonInfo().success(function(data){
            if(data.code == 200 && data.data[0] == false){
                $scope.data.isSignon = false;
            }
        });

        // 获取等级
        PointService.getPointInfo().success(function(data){
            if(data.code == 200){
                $scope.data.pointInfo = data.data[0] || {};
            }
        });
    }

    // 登陆
    $scope.login = function() {
        $state.go("login");
    };
    //----------------------------------------------------
    // 签到
    $scope.onSignonClick = function(){
        UserService.signon()
            .success(function(data){
                if(data.code == 200){
                    $scope.data.isSignon = true;
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '签到成功',
                        buttons: [{text: '知道了'}]
                    });
                }
                else{
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: data.message,
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
    };
    //----------------------------------------------------
    // 跳转到个人资料页
    $scope.myInfoClick = function() {
        if(!$scope.data.isLogined){
            $state.go("login");
        }
        else{
            $state.go("myInfo");
        }
    };
    //---------------------------------------------------
      // 上传
      $scope.upload = function(fileURL){
        console.log(AC.SERVER_URL()+'/user/header/post?userId='+UserService.getUserId()+"=====================================test======")
        var options = new FileUploadOptions();
        options.fileKey="file";
        options.fileName="buf.jpeg";
        options.mimeType="image/jpeg";

        //新建FileTransfer对象
        var ft = new FileTransfer();

        //上传文件
        ft.upload(
            fileURL,
            encodeURI(AC.SERVER_URL()+'/user/header/post?userId='+UserService.getUserId()),//把图片及其他参数发送到这个URL，相当于一个请求，在后台接收图片及其他参数然后处理
            uploadSuccess,
            uploadError,
            options);

        //upload成功的话
        function uploadSuccess(r) {
            var resp = JSON.parse(r.response);
            if(resp.code == 200){

                UserService.setImage(AC.SERVER_IP() + resp.data[0].image_path);
                $scope.data.image     = UserService.getImage();

                $scope.$apply();
            }
        }
        //upload失败的话
        function uploadError(error) {
        }
      }
    //----------------------------------------------------
    // 点击头像修改头像
    $scope.uploadHeader = function($event){
        $event.stopPropagation();

        var hideSheet = $ionicActionSheet.show({
          buttons: [{
            text: '拍照'
          }, {
            text: '相册'
          }],
          titleText: '选择头像',
          cancelText: '取消',
          cancel: function() {
            // 取消
          },
          buttonClicked: function(index) {
            // 拍照
            if (index == 0) {
              MyInfoService.getPicture("camera").success(function(imageURI) {
                $scope.upload(imageURI);
              });
            }
            // 相册
            else if (index == 1) {
              MyInfoService.getPicture("photo").success(function(imageURI) {
                $scope.upload(imageURI);
              });
            }
            return true;
          }
        });
    }
  //----------------------------------------------------
  // 点击昵称个性签名跳转到个人资料页
    $scope.showPopup = function($event) {
        $event.stopPropagation();
        if(!$scope.data.isLogined){
            $state.go("login");
        }
        else{
            $state.go("personalInfo");
        }


        /*var myPopup = $ionicPopup.show({
            template: '<br> <input type="text" ng-model="data.bufName">',
            title: '请输入您的昵称',
            scope: $scope,
            buttons: [
                { text: '取消' },
                {
                    text: '<b>保存</b>',
                    type: 'button-positive',
                    onTap: function(e) {

                        if($scope.data.bufName == null){
                            return;
                        }

                        UserService.setUserName(UserService.getUserId(), $scope.data.bufName)
                        .success(function(data){
                            if(data.code == 200){
                                $scope.data.nickname = $scope.data.bufName;
                                UserService.setNickname($scope.data.bufName);
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
                }
           ]
        });*/
    };
    //----------------------------------------------------
    // 跳转到我的订单页
    $scope.myOrderClick = function(index) {
    if(!$scope.data.isLogined){
        $state.go("login");
    }
    else{
        $state.go("myOrder", {'from': 'tab-my', 'index' : index});
    }
    };


    //----------------------------------------------------
    // 跳转我的钱包页
    $scope.myAccountClick = function() {
    if(!$scope.data.isLogined){
        $state.go("login");
    }
    else{
        $state.go("myAccount");
    }
    };
    //----------------------------------------------------
    // 跳转我的大棚页
    $scope.myGreenhouseClick = function() {
        if(!$scope.data.isLogined){
            $state.go("login");
        }
        else{
            var myGreenHouseList = UserService.getMyGreenHouseList();
       	 //    alert(JSON.stringify(myGreenHouseList));
        //	    alert("length = "+myGreenHouseList.length);
            if(myGreenHouseList.length == 0) {
                $state.go("noTribe",{data:{'title':'我的部落'}});
            } else {
                $state.go("myTribe",{data:{'title':'我的部落'}});
            }
        }
    };
    //----------------------------------------------------
    // 跳转我的投票页
    /*$scope.myVoteClick = function() {
        if(!$scope.data.isLogined){
            $state.go("login");
        }
        else{
            $state.go("myVote");
        }
    };*/
    //----------------------------------------------------
    // 跳转我的消息页
    $scope.myMessageClick = function() {
        if(!$scope.data.isLogined){
            $state.go("login");
        }
        else{
            $state.go("myMessage");
        }
    };
    //----------------------------------------------------
    // 跳转我的店铺页
    $scope.myShopClick = function() {
    if(!$scope.data.isLogined){
      $state.go("login");
    }
    else{
        var myGreenHouseList = UserService.getMyGreenHouseList();
        for(var i=0; i<myGreenHouseList.length; i++){
            if(myGreenHouseList[i].user_role != -1){
                $scope.data.isLandowner = true;
            }
        }
        if(myGreenHouseList.length == 0 || !$scope.data.isLandowner ) {
            $state.go("noTribe",{data:{'title':'我的店铺'}});
        } else {
            $state.go("myshop");
        }
    }
    //$state.go("myShop");
    };
    //----------------------------------------------------
    // 跳转应用设置页
    $scope.appSetClick = function() {
        if(!$scope.data.isLogined){
          $state.go("login");
        }
        else{
            $state.go("appSet");
        }
    };

    //----------------------------------------------------
    // 跳转帮助与反馈页
    $scope.helpClick = function() {
    if(!$scope.data.isLogined){
      $state.go("login");
    }
    else{
      /*$state.go("feedback");*/
      var alertPopup = $ionicPopup.alert({
        title: '提示',
        template: '功能暂未开放，敬请期待！',
        buttons: [{text: '知道了'}]
      });
    }
    };

    //----------------------------------------------------
    // 积分等级
    $scope.pointLevelClick = function(){
        if(!$scope.data.isLogined){
            $state.go("login");
        }
        else{
            $state.go("pointLevel");
        }
    };

    //----------------------------------------------------
    // 跳转关于我们页
    $scope.aboutClick = function() {
        if(!$scope.data.isLogined){
            $state.go("login");
        }
        else{
            $state.go("aboutOur");
        }
    };
     //扫描二维码查看作物
    $scope.scanBarcode = function(){
        if(!$scope.data.isLogined){
            $state.go("login");
        }else{
            $ionicLoading.show({
               template: '正在加载...'
            });
            atme.plugins.barcodeScanner.scan(
                function (result) {
                    $ionicLoading.hide();
                    if(-1 != result.text.indexOf('m') && -1 != result.text.indexOf('k') ){
                        var obj = JSON.parse(result.text);
                        if(obj.m == 'h'){//作物履历
                            var deliveryId = obj.k;
                            if(deliveryId){
                                ScanService.set(deliveryId);
                                $state.go('scan');
                            }
                        }
                        else if(obj.m == "r"){//确认收货
                            OrderService.confirmPackage(obj.k)
                                .success(function(data){
                                    if(data.code == 200){
                                        var alertPopup = $ionicPopup.alert({
                                            title: '提示',
                                            template: '确认收货成功',
                                            buttons: [{text: '知道了'}]
                                         });
                                    }
                                    else {
                                        var alertPopup = $ionicPopup.alert({
                                            title: '提示',
                                            template: data.message,
                                            buttons: [{text: '知道了'}]
                                         });
                                    }
                                })
                                .error(function(state){
                                    var alertPopup = $ionicPopup.alert({
                                        title: '提示',
                                        template: '错误码: ' + state,
                                        buttons: [{text: '知道了'}]
                                     });
                                });
                        }
                    }else if(1 == result.cancelled){
                        $state.go('tab.my');
                    }else{
                          var alertPopup = $ionicPopup.alert({
                              title: '提示',
                              template: '二维码不正确，请确认！',
                              buttons: [{text: '知道了'}]
                           });
                    }
                },
                function (error) {
                    console.log("Scanning failed: " + error);
                }
            );
        }
    }
});
