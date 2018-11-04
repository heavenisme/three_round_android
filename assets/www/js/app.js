// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',

  'ngIOS9UIWebViewPatch',

  'starter.MyDirective',

  'starter.MainControllers',
  'starter.MyInfoControllers',
  'starter.PlantModelController',
  'starter.PlantModelDetailController',
  'starter.RechargeControllers',
  'starter.TabHomeController',
  'starter.TabMyController',
  'starter.TabGardenController',
  'starter.TabShopingCartController',
  'starter.SelectGreenhouseController',
  'starter.GreenhouseDataController',
  'starter.AppSetController',
  'starter.MyAccountController',
  'starter.MyVoteController',
  'starter.PlanVoteSelectController',
  'starter.TabController',
  'starter.MyBalanceController',
  'starter.MyMessageController',
  'starter.MessageDescController',
  'starter.MessageDirController',
  'starter.AboutController',
  'starter.ChiefVoteController',
  'starter.ChiefSelectModelController',
  'starter.ModelDetailExController',

  'starter.MyOrderController',
  'starter.SelectLeaderController',
  'starter.MyTribeController',

  'starter.PersonalInfoController',
  'starter.FeedBackController',
  'starter.AgreeHouseController',
  'starter.TaskListController',
  'starter.TaskDescController',
  'starter.MiniatureController',
  'starter.GoodsDesignController',
  'starter.RecoverPlanController',
  'starter.PackController',
  'starter.DeliveryWayController',
  'starter.TribeActiveController',
  'starter.HistoryActiveController',
  'starter.ActiveDescController',
  'starter.ActiveRegisterController',
  'starter.TribeMarketController',
  'starter.InsidePriceController',
    'starter.ActiveListController',
    'starter.AppointmentController',
    'starter.ActiveDetailController',
    'starter.MyShopController',
    'starter.ShopMessageController',
    'starter.ShopBgController',
    'starter.StoreOfferController',
    'starter.MarketDescController',
    'starter.SellStoreController',
    'starter.ShelfManagementController',
    'starter.ProductManagementController',
    'starter.ProductDetailController',
    'starter.PriceManagementController',
    'starter.RecoverListController',
    'starter.GoodsPriceController',
    'starter.ScanController',
    'starter.HistoryActiveDescController',

  'starter.PointControllers',
  'starter.MySelledOrderController',

  'starter.MainServices',
  'starter.PayService',
  'starter.UserService',
  'starter.GardenService',
  'starter.GreenhouseService',
  'starter.OrderService',
  'starter.ShoppingCartService',
  'starter.MyBalanceService',
  'starter.MyTribeService',
  'starter.MessageService',
  'starter.TaskService',
  'starter.MiniatureService',
  'starter.GoodsDesignService',
  'starter.RecoverService' ,
  'starter.TribeMarketService',
  'starter.TribeActiveService',
  'starter.MyShopService',
  'starter.MyOrderService',
  'starter.ScanService',
  'starter.FarmingActiveService',
  'starter.PointService'
])

.run(function($ionicPlatform, $state, $ionicPopup, $ionicHistory, $ionicLoading, $rootScope, $location, UserService, MyTribeService, PayService) {
  $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
      }

//      alert("platform: " + UserService.getCurrPlatform());

      // 初始化通知状态机
      PushFSM.init($state, $rootScope, MyTribeService, UserService);

      // 恢复推送
      PushFSM.resumePush();

      // 设置默认通知默认状态
      PushFSM.setDefaultState("myMessage");

      // 注册一个状态
      PushFSM.registState("1001", "login");

      // 设置多用户注销处理
      PushFSM.setLogoutTypeAndHandler(9, function(alert){

          if(!UserService.isLogined()){
              return;
          }

          var alertPopup = $ionicPopup.alert({
              title: '提示',
              template: "" + alert,
              buttons: [{text: '知道了', onTap: function(e){
                 $state.go("login");
              }}]
          });

          UserService.logout()
          .success(function (data) {
          })
          .error(function (state) {
          });
      });
       //获取服务器地址
       var url = window.localStorage.getItem("SERVER_IP");
       if(url != null && AC._CHANGE_IP == 1){
           AC.set_NEW_SERVER_IP(url);
           AC.set_NEW_SERVER_URL(url);
       }



      // 服务器是否好用
      var isServerOk = false;

      //--------------------
      // 获取服务器列表
      $ionicLoading.show({
          template: '获取服务器列表...'
      });
      //--------------------
      UserService.getServerUrl()
      .success(function(data)
      {
          $ionicLoading.hide();

          isServerOk = true;

          if(data.code == 200){
              var urlList = [];
              for (var i = 0; i < data.data.length; i++) {
                  urlList.push(data.data[i].server_address);
              }

              // 保存urlList
              window.localStorage.setItem("SERVER_LIST", JSON.stringify(urlList));
          }
      })
      .error(function(state)
      {
           $ionicLoading.hide();

           var serverListStr = window.localStorage.getItem("SERVER_LIST");

           // 如果没有，走默认的
            if(serverListStr == null){
              serverListStr = JSON.stringify(CA.getDefaultServerList());
            }

           var serverList    = JSON.parse(serverListStr);

           for (var i = 0; i < serverList.length; i++) {

                $ionicLoading.show({
                    template: '尝试连接到服务器...'
                });

                UserService.testServer(serverList[i])
                .success(function(data)
                {
                    $ionicLoading.hide();

                    if(!isServerOk){
                      AC.set_SERVER_URL(data.url);
                    }
                })
                .error(function(data)
                {
                    $ionicLoading.hide();

                    if(data.state == 0){
                        // alert("这个服务器不好用");
                    }
                    else{
                        if(!isServerOk){
                          AC.set_SERVER_URL(data.url);
                          isServerOk = true;
                        }
                    }
                });
            };
      });

      //--------------------
      // ios升级
      if (ionic.Platform.isIOS() || ionic.Platform.isIPad()){
            UserService.getUpGrade()
                  .success(function(data)
                  {
                      /*alert(JSON.stringify(data));*/

                       var header = "http://";
                       var header1 = "https://"

                       if(data.code == 200){
                           var http = data.data[0].upgrade.substr(0, header.length);
                           var https = data.data[0].upgrade.substr(0, header1.length);

                           if (http == header || https == header1) {

                               CheckVersion.checkUpdate(
                                    data.data[0].version_number,
                                    data.data[0].upgrade,
                                    function(message) {

                                    },
                                    function(message) {
//                                        alert(message);
                                    }
                                );
                           }
                       }
                  })
                  .error(function(state)
                  {
                  });
      }

      //--------------------
      // 尝试登陆
      if(UserService.getToken() != null){
            $ionicLoading.show({
                template: '尝试自动登录中...'
            });

//            alert("app==>Token = " + UserService.getToken());
            UserService.needLogin(UserService.getToken())
            .success(function(data)
            {
                $ionicLoading.hide();
//                alert("app ==>data:" + JSON.stringify(data));
                // 1011-未登录 1012-token无效
                if(data.code == 1011 || data.code == 1012){
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

                    // 获取 更新别名、标签
                    PushFSM.updateTagAndAlias(UserService);

                    // 获取大棚列表
                    {
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
                    }

                  }
              })
              .error(function(state){
                  $ionicLoading.hide();
              });
        }

    });

    // 配置消息按钮
    $rootScope.goToMsg = function(){
        // 传递给我的消息页 我从哪里来.....啊~啊~ 我滴朋友...友...
        $state.go("myMessage", {data:{"from":$location.path()}});

        // 设置为没有新的消息
        $rootScope.isHaveNewMessage = false;
    }

    // 是否登录
    $rootScope.rootIsLogined = function(){
        return UserService.isLogined();
    }

    // 是否有新的消息
    $rootScope.isHaveNewMessage = false;


    // 注册返回按钮动作
    $ionicPlatform.registerBackButtonAction(function (e) {
        e.preventDefault();
        function showConfirm() {
          var confirmPopup = $ionicPopup.confirm({
            title: '<strong>退出应用</strong>',
            template: '你确定要退出应用吗?',
            okText: '退出',
            cancelText: '取消'
          });

          confirmPopup.then(function (res) {
            if (res) {
              ionic.Platform.exitApp();
            }
            else {
              // Don't close
            }
          });
        }

        if ($location.path().indexOf('/tab/') != -1) {
            showConfirm();
        } else if($location.path().indexOf('/tribeMarket') != -1){
            $state.go('tab.home');
        } else if($location.path().indexOf('/tribeActive') != -1){
            $state.go('tab.home');
        } else if($location.path().indexOf('/myOrder') != -1){
            $state.go('tab.my');
        } else if($location.path().indexOf('/paySelect') != -1 && PayService.getNowPayPageFrom() == "TribeMarket"){
            // 什么也不做
        } else if ($ionicHistory.backView()) {
            $ionicHistory.goBack();
        } else {
            showConfirm();
        }

        return false;
    }, 101);

})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {

  // 设置tab栏在下方
  $ionicConfigProvider.platform.android.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');

  // 设置标题栏文字居中
  $ionicConfigProvider.platform.android.navBar.alignTitle('center');

  //设置iOS下返回时不显示父Title名称
  $ionicConfigProvider.backButton.text('');
  $ionicConfigProvider.backButton.previousTitleText(false);

  // 配置网络请求
  $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; UTF-8';
  $httpProvider.defaults.timeout = 5000;

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // 登陆页
  .state('login', {
    url: '/login',
    cache: false,
    templateUrl: 'templates/login.html',
    controller: 'LoginController'
  })

  // 注册页
  .state('register', {
    url: '/register',
    cache: false,
    templateUrl: 'templates/register.html',
    controller: 'RegisterController'
  })

  // 注册协议
  .state('registerProtocol', {
    url: '/registerProtocol',
    cache: true,
    templateUrl: 'templates/registerProtocol.html',
    controller: 'RegisterProtocolController'
  })

  // 忘记密码页
  .state('forgetPassword', {
    url: '/forgetPassword',
    cache: false,
    templateUrl: 'templates/forgetPassword.html',
    controller: 'ForgetPasswordController'
  })

  // 忘记密码 修改
  .state('forgetPasswordForChange', {
    url: '/forgetPasswordForChange',
    cache: false,
    templateUrl: 'templates/forgetPasswordForChange.html',
    controller: 'ForgetPasswordForChangeController',
    params: {'data': null}  // 参数 key:1sad1sad23
  })


  //--------------------------------------------
  // 个人信息页
  .state('myInfo', {
    url: '/myInfo',
    cache: false,
    templateUrl: 'templates/my/myInfo.html',
    controller: 'MyInfoControllers'
  })

  // 应用设置页
  .state('appSet', {
    url: '/appSet',
    cache: false,
    templateUrl: 'templates/my/appSet.html',
    controller: 'AppSetController'
  })

  // 消息设置页
  .state('setting', {
    url: '/setting',
    cache: false,
    templateUrl: 'templates/my/setting.html',
    controller: ''
  })

  // 关于会耕部落页
  .state('about', {
    url: '/about',
    cache: false,
    templateUrl: 'templates/my/about.html',
    controller: ''
  })

  // 我的资产页
  .state('myAccount', {
    url: '/myAccount',
    cache: false,
    templateUrl: 'templates/my/myAccount.html',
    controller: 'MyAccountController'
  })

  // 我的订单页
  .state('myOrder', {
    url: '/myOrder',
    cache: false,
    templateUrl: 'templates/my/myOrder.html',
    controller: 'MyOrderController',
    params: {'from': null, 'orderId': null, 'orderPrice': 0.00, 'description': null}  // 参数
  })

  // 我的投票页(已废弃)
  .state('myVote', {
    url: '/myVote',
    cache: false,
    templateUrl: 'templates/my/myVote.html',
    controller: 'MyVoteCtrl'
  })

  // 参与投票页
  .state('selectLeader', {
    url: '/selectLeader',
    cache: false,
    templateUrl: 'templates/my/selectLeader.html',
    controller: 'SelectLeaderController',
    params: {'data': null}  // 参数
  })

  // 参与种植模型投票页
  .state('planVoteSelect', {
    url: '/planVoteSelect',
    cache: false,
    templateUrl: 'templates/my/planVoteSelect.html',
    controller: 'PlanVoteSelectController'
  })

  // 升级身份页
  .state('updateIdentity', {
    url: '/updateIdentity',
    cache: false,
    templateUrl: 'templates/my/updateIdentity.html',
    controller: 'UpdateIdentityCtrl'
  })


  // 编辑昵称页
  .state('editName', {
    url: '/editName',
    cache: false,
    templateUrl: 'templates/my/editName.html',
    controller: 'EditNameCtrl'
  })

  // 编辑个人资料
  .state('personalInfo', {
    url: '/personalInfo',
    cache: false,
    templateUrl: 'templates/my/personalInfo.html',
    controller: 'PersonalInfoController'
    })
  // 管理地址页
  .state('addressManage', {
    url: '/addressManage',
    cache: false,
    templateUrl: 'templates/my/addressManage.html',
    controller: 'AddressManageCtrl'
  })

  // 新建地址页
  .state('createAddress', {
    url: '/createAddress',
    cache: false,
    templateUrl: 'templates/my/createAddress.html',
    controller: 'CreateAddressCtrl',
    params: {'data': null}  // 参数
  })

  // 账户安全页
  .state('accountSafe', {
    url: '/accountSafe',
    cache: true,
    templateUrl: 'templates/my/accountSafe.html',
    controller: 'AccountSafeCtrl'
  })

  // 修改密码页
  .state('changePassword', {
    url: '/changePassword',
    cache: false,
    templateUrl: 'templates/my/changePassword.html',
    controller: 'ChangePasswordCtrl'
  })

  // 我的积分页
  .state('myPoint', {
    url: '/myPoint',
    cache: false,
    templateUrl: 'templates/my/myPoint.html',
    controller: 'MyPointCtrl'
  })

  // 我的积分等级
  .state('pointLevel', {
    url: '/pointLevel',
    cache: false,
    templateUrl: 'templates/point/pointLevel.html',
    controller: 'PointLevelCtrl'
      })

  // 积分兑换
  .state('pointExchangeList', {
    url: '/pointExchangeList',
    cache: false,
    templateUrl: 'templates/point/pointExchangeList.html',
    controller: 'PointExchangeListCtrl'
  })

  // 我要兑换
  .state('pointExchangeDetail', {
    url: '/pointExchangeDetail',
    cache: false,
    templateUrl: 'templates/point/pointExchangeDetail.html',
    controller: 'PointExchangeDetailCtrl',
    params: {'data': null}
  })

  // 兑换记录
  .state('pointRecord', {
    url: '/pointRecord',
    cache: false,
    templateUrl: 'templates/point/pointRecord.html',
    controller: 'PointRecordCtrl'
  })

  // 等级说明
  .state('pointLevelGuide', {
    url: '/pointLevelGuide',
    cache: false,
    templateUrl: 'templates/point/pointLevelGuide.html',
    controller: 'PointLevelGuideCtrl'
  })

  // 我的余额页
  .state('myBalance', {
    url: '/myBalance',
    cache: false,
    templateUrl: 'templates/my/myBalance.html',
    controller: 'MyBalanceController'
  })

  // 测试页
  .state('test', {
    url: '/test',
    cache: true,
    templateUrl: 'templates/my/test.html',
    controller: 'testOtherCtrl'
  })

  //-----------------------------------------------
  // TAB主页
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/home/tabs.html',
    controller:  'TabController'
  })

  // 主页
  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/home/tab-home.html',
        controller:  'TabHomeController',
        params: {'data': null}
      }
    }
  })

  // 菜园管理页
  .state('tab.garden', {
      url: '/garden',
      cache: false,
      views: {
        'tab-garden': {
          templateUrl: 'templates/home/tab-garden.html',
          controller: 'TabGardenController',
          params: {'data': null}
        }
      }
    })

  // 购物车页
  .state('tab.shoppingCart', {
    url: '/shoppingCart',
    cache: false,
    views: {
      'tab-shoppingCart': {
        templateUrl: 'templates/home/tab-shoppingCart.html',
        controller: 'TabShopingCartController'
      }
    }
  })

  // 我的部落页
  .state('tab.my', {
    url: '/my',
    cache: false,
    views: {
      'tab-my': {
        templateUrl: 'templates/home/tab-my.html',
        controller:'TabMyController',
        params: {'data': null}
      }
    }
  })

  //作业计划
  .state('operationalPlan', {
    url: '/operationalPlan',
     templateUrl: 'templates/garden/operationalPlan.html'
  })

  //种植模型页
  /*.state('implantModel', {
    url: '/implantModel',
    templateUrl: 'templates/garden/implantModel.html'
  })*/

  //种植模型选择页
  .state('modelChoose', {
      url: '/modelChoose',
      cache: false,
      templateUrl: 'templates/garden/modelChoose1.html',
      controller:'PlantModelController',
      params: {'data': null}  // 参数 houseId:1
  })

  //种植模型查看
  .state('modelDetail', {
      url: '/modelDetail',
      cache: false,
      templateUrl: 'templates/garden/modelDetail.html',
      controller: 'PlantModelDetailController',
      params: {'data': null}  // 参数
    })

  // 种植模型查看 消息入口
  /*.state('modelDetailEx', {
      url: '/modelDetailEx',
      cache: false,
      templateUrl: 'templates/garden/modelDetailEx.html',
      controller: 'ModelDetailExController',
      params: {'data': null}  // 参数
  })*/

  //充值选择页面
  .state('paySelect', {
    url: '/paySelect',
    cache: false,
    templateUrl: 'templates/garden/paySelect.html',
    controller:'PayCtrl',
    params: {'from': null, 'orderId': null, 'orderPrice': 0.00, 'description': null,'typePage':null}  // 参数
  })

  .state('payMode', {
    url: '/payMode',
    cache: false,
    templateUrl: 'templates/garden/payMode.html',
    controller:'PayCtrl'
  })

  //微信充值页面
  .state('payPage', {
    url: '/payPage',
    cache: false,
    templateUrl: 'templates/garden/payPage.html',
    controller:'SelectMoneyCtrl'
  })

  //土地市场页面
  .state('SelectGreenhouse', {
    url: '/SelectGreenhouse',
    templateUrl: 'templates/greenhouse/SelectGreenhouse.html',
    cache: false,
    controller:'SelectGreenhouseController'
  })

  // 大棚资料
  .state('GreenhouseData', {
      url: '/GreenhouseData',
      templateUrl: 'templates/greenhouse/GreenhouseData1.html',
      controller:'GreenhouseDataController',
      cache: false,
      params: {'data': null}  // 参数
  })

  // 我的消息
  .state('myMessage', {
      url: '/myMessage',
      templateUrl: 'templates/my/myMessage.html',
      controller:'MyMessageController',
      cache: false,
      params: {'data': null}  // 参数
  })

  // 我的部落
  .state('myTribe',{
      url: 'myTribe',
      templateUrl: 'templates/greenhouse/myTribe1.html',
      controller: 'MyTribeController',
      cache: false,
          params: {'data': null}        // 参数
  })

  // 没有大棚的部落
  .state('noTribe',{
      url: 'noTribe',
      templateUrl: 'templates/greenhouse/noTribe.html',
      controller: 'MyTribeController',
      cache: false,
      params: {'data': null}        // 参数
  })

  // 通知提醒
  .state('messageDesc', {
      url: '/messageDesc',
      templateUrl: 'templates/my/messageDesc.html',
      controller:'MessageDescController',
      cache: false,
      params: {'data': null}        // 参数
  })

  // 消息详情
  .state('messageDir', {
      url: '/messageDir',
      templateUrl: 'templates/my/messageDir.html',
      controller:'MessageDirController',
      cache: false,
      params: {'data': null}        // 参数
  })

  // 酋长选举
  // 这个是新的，之前的废弃掉
  .state('chiefVote', {
      url: '/chiefVote',
      templateUrl: 'templates/my/chiefVote.html',
      controller:'ChiefVoteController',
      cache: false,
      params: {'data': null}        // 参数 messageId:""
  })

  // 酋长选择种植模型-消息入口
  .state('chiefSelectModel', {
      url: '/chiefSelectModel',
      templateUrl: 'templates/my/chiefSelectModel.html',
      controller:'ChiefSelectModelController',
      cache: false,
      params: {'data': null}        // 参数 messageId:""
  })

   // 帮助与反馈
   .state('feedback', {
      url: '/feedback',
      templateUrl: 'templates/my/feedback.html',
      controller:'FeedBackController',
      cache: false
   })

  // 关于我们
  .state('aboutOur', {
      url: '/aboutOur',
      templateUrl: 'templates/my/aboutOur.html',
      controller:'AboutController',
      cache: false
  })

  // 土地购买协议
  .state('agreeHouse', {
      url: '/agreeHouse',
      templateUrl: 'templates/greenhouse/agreeHouse.html',
      controller:'AgreeHouseController',
      cache: false,
      params: {'data': null}
  })


    //作业任务页面
    .state('taskList',{
        url:'/taskList',
        templateUrl:'templates/garden/taskList.html',
        controller:'TaskListController',
        cache:false,
        params: {'data': null}
    })

  //物资方案
  .state('goodsDesign',{
      url:'/goodsDesign',
      templateUrl:'templates/my/goodsDesign.html',
      controller:'GoodsDesignController',
      cache:false,
      params: {'data': null}
  })


    //作业任务详情页面
    .state('taskDesc',{
        url:'/taskDesc',
        templateUrl:'templates/garden/taskDesc.html',
        controller: 'TaskDescController',
        cache: false,
        params: {'data': null}
    })

    //作物缩影
    .state('plantMiniature',{
        url:'/plantMiniature',
        templateUrl:'templates/garden/plantMiniature.html',
        controller: 'MiniatureController',
        cache: false,
        params: {'data': null}
    })

    //彩蛋页面
     .state('tappage',{
        url:'/tappage',
        templateUrl:'templates/home/tappage.html',
        controller: 'TabHomeController',
        cache: false,
        params: {'data': null}
    })

    //采收计划页面
    .state('recoverFeedback',{
        url:'/recoverFeedback',
        templateUrl:'templates/recovery/recoverFeedback.html',
        controller: 'RecoverPlanController',
        cache: false,
        params: {'data': null}
    })

    //采收反馈（包装）
    .state('pack',{
        url:'/pack',
        templateUrl:'templates/recovery/pack.html',
        controller: 'PackController',
        cache: false,
        params: {'data': null}
    })

      //采收反馈（配送）
      .state('deliveryWay',{
          url:'/deliveryWay',
          templateUrl:'templates/recovery/deliveryWay.html',
          controller:'DeliveryWayController',
          cache: false,
          params: {'data': null}
      })

      //采收反馈（收货地址）
      .state('recoverAddress',{
          url:'/recoverAddress',
          templateUrl:'templates/recovery/recoverAddress.html',
          controller:'AddressManageCtrl',
          cache: false
      })
      //采收列表
      .state('recoverList',{
          url:'/recoverList',
          templateUrl:'templates/recovery/recoverList.html',
          controller:'RecoverListController',
          cache: false
      })
      //农趣活动（部落活动）
      .state('tribeActive',{
          url:'/tribeActive',
          templateUrl:'templates/funactive/tribeActive.html',
          controller:'TribeActiveController',
          cache: false,
          params: {'data': null}
      })
      //农趣活动（活动详情）
      .state('activeDesc',{
          url:'/activeDesc',
          templateUrl:'templates/funactive/activeDesc.html',
          controller:'ActiveDescController',
          cache: false,
          params: {'data': null}
      })
      //农趣活动（历史活动）
      .state('historyActive',{
          url:'/historyActive',
          templateUrl:'templates/funactive/historyActive.html',
          controller:'HistoryActiveController',
          cache: false
      })
      //农趣活动（立即报名）
      .state('activeRegister',{
          url:'/activeRegister',
          templateUrl:'templates/funactive/activeRegister.html',
          controller:'ActiveRegisterController',
          cache: false,
          params: {'data': null}
      })
      //部落市场
      .state('tribeMarket',{
          url:'/tribeMarket',
          templateUrl:'templates/tribemarket/tribeMarket.html',
          controller:'TribeMarketController',
          params: {'data': null},
          cache: false
      })
      //部落市场（批发价格）
      .state('insidePrice',{
          url:'/insidePrice',
          templateUrl:'templates/tribemarket/insidePrice.html',
          controller:'InsidePriceController',
          cache: false
      })

    //农事活动（活动列表）
    .state('activeList',{
        url:'/activeList',
        templateUrl:'templates/farmingactivities/activeList.html',
        controller:'ActiveListController',
        cache: false,
        params: {'data': null}
    })

    //农事活动（我要预约）
    .state('appointment',{
        url:'/appointment',
        templateUrl:'templates/farmingactivities/appointment.html',
        controller:'AppointmentController',
        cache: false,
        params: {'data': null}
    })

    //农事活动（活动详情）
    .state('activeDetail',{
        url:'/activeDetail',
        templateUrl:'templates/farmingactivities/activeDetail.html',
        controller:'ActiveDetailController',
        cache: false,
        params: {'data': null}
    })
    //部落市场（商家报价）
    .state('storeOffer',{
        url:'/storeOffer',
        templateUrl:'templates/tribemarket/storeOffer.html',
        controller:'StoreOfferController',
        cache: false
      })

    //我的店铺
   .state('myshop',{
       url:'/myshop',
       templateUrl:'templates/myshop/myshop.html',
       controller:'MyShopController',
       cache: false,
       params: {'data': null}
   })

     //店铺信息
      .state('shopMessage',{
          url:'/shopMessage',
          templateUrl:'templates/myshop/shopMessage.html',
          controller:'ShopMessageController',
          cache: false,
          params: {'data': null}
      })

      //店铺背景
      .state('shopBg',{
          url:'/shopBg',
          templateUrl:'templates/myshop/shopBg.html',
          controller:'ShopBgController',
          cache: false,
          params: {'data': null}
      })

     //上架管理
      .state('shelfManagement',{
          url:'/shelfManagement',
          templateUrl:'templates/myshop/shelfManagement.html',
          controller:'ShelfManagementController',
          cache: false,
          params: {'data': null}
      })

      //商品管理
      .state('productManagement',{
          url:'/productManagement',
          templateUrl:'templates/myshop/productManagement.html',
          controller:'ProductManagementController',
          cache: false,
          params: {'data': null}
      })

      .state('mySelledOrder',{
          url:'/mySelledOrder',
          templateUrl:'templates/myshop/mySelledOrder.html',
          controller:'MySelledOrderController',
          cache: false,
          params: {'data': null}
      })

      //商品详情
      .state('productDetail',{
          url:'/productDetail',
          templateUrl:'templates/myshop/productDetail.html',
          controller:'ProductDetailController',
          cache: false,
          params: {'data': null}
      })

      //价格管理priceManagement
      .state('priceManagement',{
          url:'/priceManagement',
          templateUrl:'templates/myshop/priceManagement.html',
          controller:'PriceManagementController',
          cache: false,
          params: {'data': null}
      })

      //部落市场（商家报价）
      .state('marketDesc',{
          url:'/marketDesc',
          templateUrl:'templates/tribemarket/marketDesc.html',
          controller:'MarketDescController',
          cache: false,
          params: {'data': null}
      })
      //部落市场（卖家店铺）
      .state('sellStore',{
          url:'/sellStore',
          templateUrl:'templates/tribemarket/sellStore.html',
          controller:'SellStoreController',
          cache: false,
          params: {'data': null}
      })
      //商品价格
      .state('goods_price',{
          url:'/goods_price',
          templateUrl:'templates/myshop/goods_price.html',
          controller:'GoodsPriceController',
          cache: false,
          params: {'data': null}
      })
      //二维码
      .state('scan',{
          url:'/scan',
          templateUrl:'templates/garden/scan.html',
          controller:'ScanController',
          cache: false,
          params: {'data': null}
      })
      //历史活动详细
      .state('historyActiveDesc',{
          url:'/historyActiveDesc',
          templateUrl:'templates/funactive/historyActiveDesc.html',
          controller:'HistoryActiveDescController',
          cache: false,
          params: {'data': null}
      })

  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/login');
  $urlRouterProvider.otherwise('/tab/home');

  //$urlRouterProvider.otherwise('/GreenhouseData');
});
