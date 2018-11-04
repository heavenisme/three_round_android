// 主-控制器
angular.module('starter.MainControllers', [])

// 控制器命名规范
// 控制器名: 驼峰命名法, 且首字母大写
// 函数名:  驼峰命名法, 首字母小写

// html命名规范
// 驼峰命名法, 首字母小写
//======================================================
// 登陆
// @scope 就这样写吧
// @LoginService 如果用到某个Service, 就写上, 其他雷同
.controller('LoginController', function($scope, $ionicLoading, $ionicHistory, $state, $ionicPopup, $ionicModal, UserService, GardenService, MyTribeService) {
  //----------------------------------------------------
  // 数据
  $scope.data = {};
  // 上次保存的用户手机号
  $scope.data.phoneNumber = UserService.getUserPhone();

  //--------------------
  // 尝试登陆
  if(UserService.getToken() != null){
        $ionicLoading.show({
            template: '请稍后...'
        });

        UserService.needLogin(UserService.getToken())
        .success(function(data)
        {
            $ionicLoading.hide();

            // 1011-未登录 1012-token无效
            if(data.code == 1011 || data.code == 1012){

            }
            // 已登录
            else if(data.code == 200){

                // 设置id token
                var userId      = data.data[0].userId;
                var accessToken = data.data[0].accessToken;
                var userRole    = data.data[0].userRole;
                // var houseId     = data.data[0].houseId;

                UserService.setUserId(userId);
                UserService.setToken(accessToken);
                UserService.setUserRole(userRole);
                // UserService.setHouseId(houseId);

                UserService.setLogined(true);

                $scope.getMyGreenHouse(function(){
                    $ionicHistory.goBack();
                });

                // 获取 更新别名、标签
                PushFSM.updateTagAndAlias(UserService);

                // 获取我的大棚
                $scope.getGreenHouse();

                // // 如果没有大棚，那么直接登陆成功
                // if(UserService.getHouseId() <= 0){
                //     $ionicHistory.goBack();
                //     return;
                // }

                // $ionicLoading.show({
                //   template: '载入中...'
                // });
                // // 种植模型是否打开
                // GardenService.modelVoteIsOpen(UserService.getHouseId())
                // .success(function(data)
                // {
                //     $ionicLoading.hide();

                //     var state = data.data[0].voteState;
                //     GardenService.setVoteState(state);

                //     $ionicHistory.goBack();
                // })
                // .error(function(state)
                // {
                //     $ionicLoading.hide();
                //     //alert("获取投票状态错误");
                // });
            }
        })
        .error(function(state){
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: '网络异常',
                buttons: [{text: '知道了'}]
            });
        });
  }

  //----------------------------------------------------
  // 获取我的大棚IDs
  $scope.getGreenHouse = function(){

    $ionicLoading.show({
        template: '载入中...'
    });

    MyTribeService.getMyGreenHouse(UserService.getUserId())
    .success(function(data)
    {
        $ionicLoading.hide();

        if(data.code == 200){
            UserService.setMyGreenHouseList(data.data);
        }
    })
    .error(function(state)
    {
        $ionicLoading.hide();
    });
  };

  //----------------------------------------------------
  // 清空
  $scope.clearText = function(index){
        alert("" + index);
      if(index == 0){
          $scope.data.phoneNumber = "";
      }
      if(index == 1){
          $scope.data.password = "";
      }
  };

  //----------------------------------------------------
  // 返回
  $scope.gotoHome = function(){
      $ionicHistory.goBack();
  };

  //----------------------------------------------------
  // 尝试登陆应用
  $scope.login = function() {
    //$state.go('tab.home');

    $ionicLoading.show({
      template: '载入中...'
    });

    // 保存用户手机号
    UserService.setUserPhone($scope.data.phoneNumber);

    // 是否需要登陆
    if(UserService.getToken() != null){
        UserService.needLogin(UserService.getToken())
        .success(function(data)
        {
            $ionicLoading.hide();
            console.log(JSON.stringify(data));
            // 1011-未登录 1012-token无效
            if(data.code == 1011 || data.code == 1012){
                UserService.setToken(null);

                $ionicLoading.show({
                  template: '载入中...'
                });

                UserService.login($scope.data.phoneNumber, $scope.data.password)
                .success(function(data) {
                    $ionicLoading.hide();

                    // 登陆成功
                    if(data.code == 200){

                        // 设置id token
                        var userId      = data.data[0].userId;
                        var accessToken = data.data[0].accessToken;
                        var userRole    = data.data[0].userRole;

                        UserService.setUserId(userId);
                        UserService.setToken(accessToken);
                        UserService.setUserRole(userRole);

                        UserService.setLogined(true);

                        $scope.getMyGreenHouse(function(){
                            $ionicHistory.goBack();
                        });

                        // 获取 更新别名、标签
                        PushFSM.updateTagAndAlias(UserService);

                        // 获取我的大棚
                        $scope.getGreenHouse();

                    }
                    else{
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template: '' + data.message,
                            buttons: [{text: '知道了'}]
                        });
                    }
                })
                .error(function(data) {
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '网络异常',
                        buttons: [{text: '知道了'}]
                    });
                })
                ;
            }
            // 已登录
            else if(data.code == 200){

                // 设置id token
                var userId      = data.data[0].userId;
                var accessToken = data.data[0].accessToken;
                var userRole    = data.data[0].userRole;

                UserService.setUserId(userId);
                UserService.setToken(accessToken);
                UserService.setUserRole(userRole);

                UserService.setLogined(true);

                $scope.getMyGreenHouse(function(){
                    $ionicHistory.goBack();
                });

                // 获取 更新别名、标签
                PushFSM.updateTagAndAlias(UserService);

                // 获取我的大棚
                $scope.getGreenHouse();
            }
        })
        .error(function(state){
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: '网络异常',
                buttons: [{text: '知道了'}]
            });
        });
    }
    else{
        UserService.login($scope.data.phoneNumber, $scope.data.password)
        .success(function(data) {
            $ionicLoading.hide();
            console.log(JSON.stringify(data));
            // 登陆成功
            if(data.code == 200){

                // 设置id token
                var userId      = data.data[0].userId;
                var accessToken = data.data[0].accessToken;
                var userRole    = data.data[0].userRole;

                UserService.setUserId(userId);
                UserService.setToken(accessToken);
                UserService.setUserRole(userRole);

                UserService.setLogined(true);

                $scope.getMyGreenHouse(function(){
                    $ionicHistory.goBack();
                });

                // 获取 更新别名、标签
                PushFSM.updateTagAndAlias(UserService);

                // 获取我的大棚
                $scope.getGreenHouse();
            }
            else{
                var alertPopup = $ionicPopup.alert({
                    title: '提示',
                    template: '' + data.message,
                    buttons: [{text: '知道了'}]
                });
            }
        })
        .error(function(data) {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: '网络异常',
                buttons: [{text: '知道了'}]
            });
        })
        ;
    }

  };

  //----------------------------------------------------
  // 获取属于我的大棚列表
  $scope.getMyGreenHouse = function(_callback){

      MyTribeService.getMyGreenHouse(UserService.getUserId())
          .success(function(data)
          {
              if(data.code == 200){
                  UserService.setMyGreenHouseList(data.data);
              }
              if(_callback) _callback();
          })
          .error(function(state)
          {
              if(_callback) _callback();
          });
  };

  //----------------------------------------------------
  // 忘记密码
  $scope.forgetPassword = function() {
    $state.go('forgetPassword');
  };
  //----------------------------------------------------
  // 注册
  $scope.register = function() {

    $state.go('register');
  };

})

//======================================================
// 注册
.controller('RegisterController', function($scope, $interval, $ionicLoading, $state, $ionicPopup, $ionicHistory, UserService) {
  //----------------------------------------------------
  // 数据
  $scope.data = {};
  //验证码计时
  $scope.clock = {};
  $scope.clock.now = "获取验证码";

  // 是否可以点击发送激活码
  $scope.isDisabled = false;

  //----------------------------------------------------
  // 监控data.money数据变化
  $scope.$watch('data.phoneNumber', function(newVal, oldVal) {

      if ((""+newVal).length == 11)
      {
          $scope.isDisabled = false;
      }
      else
      {
          $scope.isDisabled = true;
      }
  });

  //----------------------------------------------------
  // 返回
  $scope.goBack = function(){
      $ionicHistory.goBack();
  };

  //----------------------------------------------------
  // 查看注册协议
  $scope.protocol = function(){
      $state.go("registerProtocol");
  };
  //----------------------------------------------------
  // 获取验证码
        $scope.active = function(){

            var phoneNumber = $scope.data.phoneNumber; // 手机号
            UserService.getActive(phoneNumber)
            .success(function(data){
                if(data.code == 200){
                    //验证码倒计时
                    var min = 120;
                    var updateClock = function(){
                        $scope.clock.now = min-- ;
                        //当倒计时时，按钮变灰 不能点击，
                        $scope.isDisabled = true;

                        //计时器停止按钮可以点击
                        if(min < 0){
                            //计时器停止
                            $scope.isDisabled = false;
                            $interval.cancel(myTimer);
                            $scope.clock.now = "获取验证码";
                        }
                    }
                    var myTimer = $interval(function(){
                        updateClock()
                    },1000);
                    updateClock();
                }
                $ionicPopup.alert({
                    title: '提示',
                    template: '' + data.message,
                    buttons: [{text: '知道了'}]
                });
            })
            .error(function(state){
                $ionicPopup.alert({
                  title: '提示',
                  template: '错误码:'+state,
                  buttons: [{text: '知道了'}]
                });
            });

        };
  //----------------------------------------------------
  // 注册
  $scope.register = function() {
    var phoneNumber = $scope.data.phoneNumber; // 手机号
    var checkNumber = $scope.data.checkNumber; // 校验码
    var password = $scope.data.password; // 密码
    var againPassword = $scope.data.againPassword; // 重复密码

    if(  phoneNumber == null
      || checkNumber == null
      || password    == null
      || againPassword == null )
    {
        $ionicPopup.alert({
            title: '提示',
            template: '请正确填写注册信息',
            buttons: [{text: '知道了'}]
        });
    }

    else if(password.length < 6 || password.length >20 || againPassword.length < 6 || againPassword.length > 20){
        var alertPopup = $ionicPopup.alert({
            title: '提示',
            template: '请输入6-20个字符',
            buttons: [{text: '知道了'}]
        });
    }
    else if(password != againPassword)
    {
        $ionicPopup.alert({
            title: '提示',
            template: '您的密码输入不一致',
            buttons: [{text: '知道了'}]
        });
    }
    else
    {
        $ionicLoading.show({
          template: '注册中...'
        });

        // 注册请求 测试验证码为3786
        UserService.register(phoneNumber, password, checkNumber)
        .success(function(data)
        {
            $ionicLoading.hide();
            if(data.code == 200){
                // 注册成功
                $ionicPopup.alert({
                    title: '提示',
                    template: '注册成功',
                    buttons: [{text: '知道了'}]
                });

                // 返回到登录页面
                $ionicHistory.goBack();
            }
            else{
              $ionicPopup.alert({
                  title: '提示',
                  template: ''+data.message,
                  buttons: [{text: '知道了'}]
              });
            }
        })
        .error(function(state)
        {
            $ionicLoading.hide();
            //alert("请求失败 " + state);
        });
    }

  };
})

//======================================================
// 注册协议
.controller('RegisterProtocolController', function($scope, $interval, $sce, $ionicLoading, $state, $ionicPopup, $ionicHistory, UserService) {

    $scope.data = {};
    $scope.data.src = $sce.trustAsResourceUrl(AC.LOGIN_AGREEMENT());

    $scope.goBack = function(){
        $ionicHistory.goBack();
    }
})

//======================================================
// 忘记密码
.controller('ForgetPasswordController', function($scope, $ionicLoading, $ionicHistory, $ionicPopup, $state, UserService,$interval) {
  //----------------------------------------------------
  // 数据
  $scope.data = {};
  //验证码计时
  $scope.clock = {};
  $scope.clock.now = "获取验证码";


  // 是否可以点击发送激活码
  $scope.isDisabledActiveCode = false;

  // 是否可以点击找回密码
  $scope.isDisabledfindPwd = true;

  //----------------------------------------------------
  // 监控data.money数据变化
  $scope.$watch('data.phoneNumber', function(newVal, oldVal) {

      if (newVal != "" && parseInt(newVal) > 0)
      {
          $scope.isDisabledActiveCode = false;
      }
      else
      {
          $scope.isDisabledActiveCode = true;
      }
  });

  //----------------------------------------------------
  // 返回
  $scope.goBack = function(){
    $ionicHistory.goBack();
  }

  //----------------------------------------------------
  // 找回密码
  $scope.findPassword = function() {
    var phoneNumber = $scope.data.phoneNumber; // 手机号
    var checkNumber =  $scope.data.checkNumber;

    // 校验
    UserService.checkVerify(phoneNumber, checkNumber)
    .success(function(data){
//        alert("success===>" + JSON.stringify(data));
        if(data.code == 200){
            var keyBuf = data.data[0].key;

            $state.go('forgetPasswordForChange', {"data":{"key":keyBuf, "mobile":phoneNumber}});
        }
        else{
          $ionicPopup.alert({
            title: '提示',
            template: ''+data.message,
            buttons: [{text: '知道了'}]
          });
        }
    })
    .error(function(state){
//        alert("error===>" + state);
          $ionicPopup.alert({
              title: '提示',
              template: '网络异常',
              buttons: [{text: '知道了'}]
          });
    });

  };
  //----------------------------------------------------
  // 发送验证码
  $scope.active = function(){
      var phoneNumber = $scope.data.phoneNumber; // 手机号

      $scope.isDisabledfindPwd = false;

      UserService.getForgetVerify(phoneNumber)
      .success(function(data){

          if(data.code == 200){
            $ionicPopup.alert({
              title: '提示',
              template: '验证码已发送',
              buttons: [{text: '知道了'}]
            });
            var element = document.getElementById("phoneNumber");
            element.disabled = true;
              //验证码倒计时
              var min = 120;
              var updateClock = function(){
                  $scope.clock.now = min-- ;
                  //当倒计时时，按钮变灰 不能点击，
                  $scope.isDisabledActiveCode = true;

                  //计时器停止按钮可以点击
                  if(min < 0){
                      //计时器停止
                      $scope.isDisabledActiveCode = false;
                      $interval.cancel(myTimer);
                      $scope.clock.now = "获取验证码";
                  }
              }
              var myTimer = $interval(function(){
                  updateClock()
              },1000);

              updateClock();
          }
          else{
            $ionicPopup.alert({
              title: '提示',
              template: ''+data.message,
              buttons: [{text: '知道了'}]
            });
          }
      })
      .error(function(state){

          $ionicPopup.alert({
            title: '提示',
            template: '网络异常' + state,
            buttons: [{text: '知道了'}]
          });
      });

  };

})

.controller('ForgetPasswordForChangeController', function($scope, $ionicLoading, $ionicHistory, $stateParams, $ionicPopup, $state, UserService) {

    $scope.data = {};

        /*档文本框都输入时，按钮变亮*/
    $scope.data.newPassword;
    $scope.data.newPasswordAgain;

    $scope.isDisabled = true;

        var changeState = function(){
            if($scope.data.newPassword != "" &&  $scope.data.newPassword.length > 0 &&
                $scope.data.newPasswordAgain != "" &&  $scope.data.newPasswordAgain.length > 0)
            {
                $scope.isDisabled = false;
            }else{
                $scope.isDisabled = true;
            }
        }
        $scope.$watch('data.newPassword', function(newPassword, oldPassword) {
            changeState();
        });
        $scope.$watch('data.newPasswordAgain', function(newPassword, oldPassword) {
            changeState();
        });
    //----------------------------------------------------
    // 返回
    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

    $scope.change = function(){

        var key    = $stateParams.data.key;
        var mobile = $stateParams.data.mobile;

        if($scope.data.newPassword == null){
          $ionicPopup.alert({
            title: '提示',
            template: '输入格式有误',
            buttons: [{text: '知道了'}]
          });
          return;
        }
        if($scope.data.newPassword.length < 6 || $scope.data.newPassword.length > 20 || $scope.data.newPasswordAgain.length <6 || $scope.data.newPasswordAgain.length > 20){
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: '请输入6-20个字符',
                buttons: [{text: '知道了'}]
            });
            return;
        }
        if($scope.data.newPassword != $scope.data.newPasswordAgain){
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: '两次密码输入不一致',
                buttons: [{text: '知道了'}]
            });
            return;
        }
        UserService.changePassword(mobile, $scope.data.newPassword, key)
        .success(function(data){
            if(data.code == 200){
                $ionicPopup.alert({
                  title: '提示',
                  template: "修改成功，请重新登陆",
                  buttons: [{text: '知道了'}]
                });
                $ionicHistory.goBack(-2);
            }
            else{
              $ionicPopup.alert({
                title: '提示',
                template: data.message,
                buttons: [{text: '知道了'}]
              });
            }
        })
        .error(function(state){
            $ionicPopup.alert({
              title: '提示',
              template: '网络异常',
              buttons: [{text: '知道了'}]
            });
        });

    }
});
