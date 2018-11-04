// 菜园管理-控制器
angular.module('starter.TabGardenController', [])

//======================================================
// 菜园管理
.controller('TabGardenController', function($scope, $ionicSlideBoxDelegate, $ionicLoading, $ionicPopover, $ionicPopup, $state, $ionicActionSheet, UserService, GardenService,MiniatureService, MessageService,GoodsDesignService, MyInfoService,TaskService,MessageService,$stateParams,RecoverService,FarmingActiveService) {

    $scope.data = {};
    $scope.data.lastSelectPic = 0;
    $scope.data.picList = [];
    $scope.data.isInit  = false;         // 网络是否加完完成
    $scope.data.title   = "菜园管理";     // title ▼
    $scope.data.nowState = -1;           // 当前种植模型状态
    $scope.data.nowGoodsDesignState = false;  // 当前做点什么状态
    $scope.data.nowTaskState = false; //当前做了什么状态
    $scope.data.nowChiefState = false;   //当前酋长选举状态
    $scope.data.nowMiniatureState = false;//当前作物缩影状态
    $scope.data.nowRecoverState = false;//当前采收计划状态
    $scope.data.nowFarmingActiveState = false;//当前农事活动状态

    //判断是否为ios平台下
    $scope.ios = (UserService.getCurrPlatform() == "ios");

    //判断当前用户有没有大棚大棚土地
    $scope.getState = function(houseCount){
        if(houseCount == 0){
            return false;
        }else{
            return true;
        }
    };

    //大图轮播
    $scope.slideHasChanged = function(index){
        $scope.picClick(index);
    }

    // 彩蛋
    $scope.data.eggCount = 0;
    // 当前的大棚
    $scope.data.nowSelectHouseId = -1;

    // 我的大棚列表
    $scope.data.greenHouseList = [];

    //-----------------------------------
    // 菜单项按下状态
    $scope.onTouch = function(index) {
        var text = document.getElementById("text" + index);
        text.style.color = "#30B1FF";
        var img = document.getElementById("img" + index);
        switch(index){
            case 1:
                img.src = "img/plant-what-pressed.png";
                break;
            case 2:
                img.src = "img/planted-what-pressed.png";
                break;
            case 3:
                img.src = "img/do-what-pressed.png";
                break;
            case 4:
                img.src = "img/did-what-pressed.png";
                break;
            case 5:
                img.src = "img/vote-chief-pressed.png";
                break;
            case 6:
                img.src = "img/choose-plant-mini.png";
                break;
        }

    };

    //-----------------------------------
    // 菜单项放开状态
    $scope.onRelease = function(index) {
        var text = document.getElementById("text" + index);
        text.style.color = "#FFFFFF";
        var img = document.getElementById("img" + index);
        switch(index){
            case 1:
                img.src = "img/plant-what.png";
                break;
            case 2:
                img.src = "img/planted-what.png";
                break;
            case 3:
                img.src = "img/do-what.png";
                break;
            case 4:
                img.src = "img/did-what.png";
                break;
            case 5:
                img.src = "img/vote-chief.png";
                break;
            case 6:
                img.src = "img/plant-mini.png";
                break;
        }

    };

    //-----------------------------------
    // 向大棚请求缩略图
    $scope.getGardenImage = function(){
        // 如果未登录或大棚ID没有
        if($scope.data.nowSelectHouseId == -1 || UserService.getUserId() == null)
            return;

        $ionicLoading.show({
            template: '请稍后...'
        });

        GardenService.getGardenImage(UserService.getUserId(), $scope.data.nowSelectHouseId)
        .success(function(data)
        {
            $ionicLoading.hide();
            $scope.data.isInit = true;
            if(data.code == 200){
                if(data.data == ""){
                    $scope.data.picList = data.data;
                }else{
                    $scope.data.picList = data.data;
                }
                $ionicSlideBoxDelegate.update();//刷新页面
            }
        })
        .error(function(state)
        {
            $ionicLoading.hide();
            $scope.data.isInit = true;
        });
    };

    //-----------------------------------
    // 处理图片路径
    $scope.handlePath = function(path, isThumb){
        return converImageUrl(path, isThumb);
    };

    //-----------------------------------
    // 获取状态
    $scope.getGardenState = function(houseId){

        $scope.data.nowState = -1;

        $ionicLoading.show({
            template: '请稍后...'
        });
        GardenService.getGardenSelPlanting(houseId)
        .success(function(data){
            $ionicLoading.hide();
            if(data.code == 200){
              $scope.data.nowState = data.data[0];
            }
            else{
              $scope.data.nowState = -1;
            }
        })
        .error(function(state){
            $ionicLoading.hide();
        });
    };

   //获取做点什么是否显示 （根据是否有物资方案）
   $scope.getGoodsDesignState = function(houseId){
       $scope.data.nowGoodsDesignState = false;
       //if($scope.isHaveNewMessage){
       //    var userId 		= UserService.getUserId();
       //    $scope.data.currMsgType = type;
       //    //获取最新一条消息
       //    MessageService.requestMessageList(userId, $scope.data.currMsgType)
       //        .success(function(data){
       //            if(data.code == 200) {
       //                console.log("------------------------------------------->"+JSON.stringify(data));
       //               var message = data.data[0];
       //                //function_type == 9 为物资方案消息
       //               if(message.function_type == 9){
       //                     //message.houseId 获取当前消息对应的大棚id
       //                    var  nowHouseId = 35;
       //                   if(houseId == nowHouseId){
       //                       $scope.data.nowGoodsDesignState = true;
       //                   }
       //               }
       //            }
       //        })
       //        .error(function(state){
       //            $ionicLoading.hide();
       //        });
       //}
           GoodsDesignService.getTaskProjects(houseId)
               .success(function(data){
                   $ionicLoading.hide();
                   if(data.code == 200){
                       //data.data.length > 0 && data.data.is_chosen
                       if(data.data.length > 0) {
                           $scope.data.nowGoodsDesignState = true;
                       }
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

   //获取做了什么是否显示  （根据是否存在历史作业计划）
    $scope.getTaskState = function(houseId){
        $scope.data.nowTaskState = false;
        TaskService.getTaskList(houseId,0)
            .success(function(data){
                $ionicLoading.hide();
                if(data.code == 200){
                    if (data.data.length > 0) {
                        $scope.data.nowTaskState = true;
                    }
                }
            })
            //.error(function(state){
            //    $ionicLoading.hide();
            //    var alertPopup = $ionicPopup.alert({
            //        title: '提示',
            //        template: '网络异常',
            //        buttons: [{text: '知道了'}]
            //    });
            //});
    }
    //获取作物缩影状态（根据有无作物缩影）
    $scope.getMiniatureState = function(houseId){
        $scope.data.nowMiniatureState = false;
        MiniatureService.plantMiniature(houseId, 0)
            .success(function(data){
                $ionicLoading.hide();
                $scope.data.taskList = data.data;
                if($scope.data.taskList.length != 0){
                    $scope.data.nowMiniatureState = true;
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
    //获取农事活动状态（根据有无采收计划）
    $scope.getFarmingActiveState= function(houseId){

        $scope.data.nowFarmingActiveState = false;
        FarmingActiveService.getFarmingActiveList(houseId)
            .success(function(data){
                if(200 == data.code){
                   if(data.data.length != 0 ){
                       $scope.data.nowFarmingActiveState = true;
                   }
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
   //获取采收计划状态（根据有无采收计划）
    $scope.getRecoverState= function(houseId){
     $scope.data.nowRecoverState = false;
     RecoverService.recoverList(houseId)
        .success(function(data){
            if(data.length != 0){
                $scope.data.nowRecoverState = true;
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
   //获取酋长选举状态
    $scope.getChiefState = function(houseId){
        $scope.data.nowChiefState = false;
        GardenService.getChiefMsg(UserService.getUserId(), $scope.data.nowSelectHouseId, 1, 1)
            .success(function(data){
                
                $ionicLoading.hide();
                if(data.code == 200){
                    if(data.data[0].vote_state == 2){
                        $scope.data.nowChiefState = true;
                    }
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
                $ionicLoading.hide();

                var alertPopup = $ionicPopup.alert({
                    title: '提示',
                    template: '网络异常',
                    buttons: [{text: '知道了'}]
                });
            });
    }
    $scope.$on('$ionicView.enter', function(){

        var ghs = UserService.getMyGreenHouseList();

        $scope.data.greenHouseList = [];

        for(var i = 0; i < ghs.length; i++)
        {
            if(ghs[i].user_role != -1)
            {
                 $scope.data.greenHouseList.push(ghs[i]);
            }
        }

        //-----------------------------------
        // init 如果有大棚 那么设置一个默认大棚
        if($scope.data.greenHouseList.length > 0){

            if($scope.data.nowSelectHouseId == -1){
                $scope.data.nowSelectHouseId = $scope.data.greenHouseList[0].house_id;
                $scope.data.title = $scope.data.greenHouseList[0].house_name+ " ▼";
            }
            else{
                var isInHouse = false;
                for(var i = 0; i < ghs.length; i++)
                {
                    if(ghs[i].house_id == $scope.data.nowSelectHouseId)
                    {
                        isInHouse = true;
                        break;
                    }
                }

                if(!isInHouse){
                    $scope.data.nowSelectHouseId = $scope.data.greenHouseList[0].house_id;
                    $scope.data.title = $scope.data.greenHouseList[0].house_name + " ▼";
                }
            }

            $scope.getGardenImage();

            $scope.getGardenState($scope.data.nowSelectHouseId);
            $scope.getMiniatureState($scope.data.nowSelectHouseId); // add by wilhan.tian
            $scope.getGoodsDesignState($scope.data.nowSelectHouseId);
            $scope.getTaskState($scope.data.nowSelectHouseId);
            $scope.getChiefState($scope.data.nowSelectHouseId);
            $scope.getMiniatureState($scope.data.nowSelectHouseId);
            $scope.getRecoverState($scope.data.nowSelectHouseId);
            $scope.getFarmingActiveState($scope.data.nowSelectHouseId);
        }
        else{
          $scope.data.isInit = true;
        }
    });

    $scope.getHeight = function(size) {
        if(size == 1){
            return 50;
        }
        if(size == 2){
            return 105;
        }
        if(size >= 3){
            return 158;
        }
    };

    //-----------------------------------
    // 缩略图点击
    $scope.picClick = function(index) {
        $scope.animateX(index);//调用效果
        if($scope.data.lastSelectPic == index)
        {
            return;
        }
        $scope.data.lastSelectPic = index;
        $scope.myActiveSlide = index;
    };

    //-----------------------------------
    // 彩蛋
    $scope.eggClick = function(){
        $scope.data.eggCount++;

        if($scope.data.eggCount == 10){
            $scope.data.eggCount = 0;
            var alertPopup = $ionicPopup.alert({
                title: 'HXT-WHT',
                template: '逗你玩的你也信',
                buttons: [{text: '滚蛋'}]
            });
        }
    }


    // ???
    $scope.modelClick = function(){
        if(UserService.isLogined()){

            if(UserService.getUserRole() != "酋长" && UserService.getUserRole() != "耘客"){
                var alertPopup = $ionicPopup.alert({
                    title: '提示',
                    template: '您没有权限使用此功能，请升级身份~',
                    buttons: [{text: '知道了'}]
                });
            }
            else if(UserService.getHouseId() <= 0){
                var alertPopup = $ionicPopup.alert({
                    title: '提示',
                    template: '请先购买土地',
                    buttons: [{text: '知道了'}]
                });
            }
            else{
                $state.go('modelChoose');
            }
        }
        else{
            $state.go('login');
        }

    };

    $scope.changePlanClick = function(){
        var alertPopup = $ionicPopup.alert({
            title: '提示',
            template: '功能暂未开放，敬请期待！',
            buttons: [{text: '知道了'}]
        });
    };

    $scope.getPlanClick = function(){
        if(UserService.isLogined()){
            //$state.go('GreenhouseData');
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: '功能暂未开放，敬请期待！',
                buttons: [{text: '知道了'}]
            });
        }
        else{
            $state.go('login');
        }
    };

    $scope.taskPlanClick = function(){
        if(UserService.isLogined()){
             //$state.go('operationalPlan');
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: '功能暂未开放，敬请期待！',
                buttons: [{text: '知道了'}]
            });
        }
        else{
            $state.go('login');
        }
    };

    $scope.destoryPlanClick = function(){
        if(UserService.isLogined()){
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: '功能暂未开放，敬请期待！',
                buttons: [{text: '知道了'}]
            });
            //alert("destoryPlanClick");
        }
        else{
            $state.go('login');
        }
    };

    //-----------------------------------
    // 更多
    $ionicPopover.fromTemplateUrl('my-popover.html', {
        scope: $scope
        // animation : 'slide-in-up'
    }).then(function(popover) {
        $scope.popover = popover;
    });

    $scope.openPopover = function($event) {
        $scope.popover.show($event);
        /*if($scope.data.nowState != 1){
            $scope.popover.show($event);
        }else{
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: '暂无种植模型！',
                buttons: [{text: '知道了'}]
            });
        }*/

    };
    $scope.closePopover = function() {
        $scope.popover.hide();
    };
    $scope.$on('$destroy', function() {
        $scope.popover.remove();
    });
    $scope.$on('popover.hidden', function() {
        // Execute action
    });
    $scope.$on('popover.removed', function() {
        // Execute action
    });

    // 跳转到种植历史页
    $scope.gotoHistory = function(){
//        var params = {"houseid": };
        // TODO
        $state.go('taskList',{data:{"houseId":$scope.data.nowSelectHouseId}});
        $scope.popover.hide();
    };

    //做点什么
    $scope.goingToDo = function(){
        // $state.go('taskDesc');
        $state.go('goodsDesign',{data:{"houseId":$scope.data.nowSelectHouseId}});
        $scope.popover.hide();
    }

    //种点什么
    $scope.goingToPlant = function(){
        if($scope.data.nowState == 2) {
            var params = {"houseId":$scope.data.nowSelectHouseId};
            $state.go("modelChoose", {data : params});
        } else {
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: '非种植模型选择阶段',
                buttons: [{text: '知道了'}]
            });
        }
        $scope.popover.hide();
    }

    // 跳转到种植模型页
    $scope.gotoModel = function(){
        if($scope.data.nowSelectHouseId == -1){
          return;
        }
        $scope.popover.hide();
//    // 1.未开始
//    if($scope.data.nowState == 1){
//        var alertPopup = $ionicPopup.alert({
//              title: '提示',
//              template: '还没有选择种植模型',
//              buttons: [{text: '知道了'}]
//        });
//    }
//    // 2.进行中
//    else if($scope.data.nowState == 2){
//        var params = {"houseId":$scope.data.nowSelectHouseId};
//        $state.go("modelChoose", {data : params});
//    }

        // 3.已结束
        if($scope.data.nowState == 3){

            $ionicLoading.show({
                template: '请稍后...'
            });

            GardenService.getGardenActiveModel(UserService.getUserId(), $scope.data.nowSelectHouseId)
            .success(function(data){

                $ionicLoading.hide();
                if(data.code == 200){
                    var myData = {"planId":data.data[0].active};
                    $state.go("modelDetail", {data:myData});
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
                $ionicLoading.hide();

                var alertPopup = $ionicPopup.alert({
                      title: '提示',
                      template: '网络异常',
                      buttons: [{text: '知道了'}]
                });
            });
        } else {
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: '种植模型还没有确定哦~',
                buttons: [{text: '知道了'}]
            });
        }

    };

    // 酋长选举
    $scope.voteChief = function(){
        $ionicLoading.show({
            template: '请稍后...'
        });
        $scope.popover.hide();

        GardenService.getChiefMsg(UserService.getUserId(), $scope.data.nowSelectHouseId, 1, 1)
            .success(function(data){
                 $ionicLoading.hide();

                 if(data.code == 200){
                     //alert(JSON.stringify(data));
                     //alert(data.data[0].message_id);
                     //if(data.data[0].vote_state == 1 || data.data[0].vote_state == 3){
                     //    var alertPopup = $ionicPopup.alert({
                     //        title: '提示',
                     //        template: '非酋长选举阶段',
                     //        buttons: [{text: '知道了'}]
                     //    });
                     //}
//                     if(data.data[0].vote_state == 3){
//                         var alertPopup = $ionicPopup.alert({
//                             title: '提示',
//                             template: '酋长已经选完了，你没机会了~',
//                             buttons: [{text: '知道了'}]
//                         });
//                     }
                     if(data.data[0].vote_state == 2){
                         MessageService.setMessageId(data.data[0].message_id);
                         var myData = {"messageId":data.data[0].message_id, "messageType":1};
                         $state.go("messageDir", {data: myData});
                     }
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
               $ionicLoading.hide();

               var alertPopup = $ionicPopup.alert({
                  title: '提示',
                  template: '网络异常',
                  buttons: [{text: '知道了'}]
                  });
               });
    };

    //作物缩影
        $scope.cropShadow = function(){
            $state.go('plantMiniature', {data:{"houseId":$scope.data.nowSelectHouseId}});
            $scope.popover.hide();
        };
     //---------------------------------------------------------------------------------------------------------------------------------------------------------------
 //采收计划
    $scope.recover = function(){
        GardenService.set($scope.data.nowSelectHouseId);//设置参数
        $state.go('recoverList');
        $scope.popover.hide();
	};
	//农事活动
    $scope.farming = function(){
        $state.go("activeList",{data:{"houseId":$scope.data.nowSelectHouseId}});
        $scope.popover.hide();
    }

    //-----------------------------------
    // 选择大棚
    $ionicPopover.fromTemplateUrl('select-popover.html', {
        scope: $scope
//         animation : 'slide-in-up'
    }).then(function(popover) {
        $scope.selectPopover = popover;
    });

    // 大棚改变
    $scope.selectGardenHouse = function(houseId, houseNo,houseName) {
        // 改变当前选择
        $scope.data.nowSelectHouseId = houseId;

        // 改变标题
        $scope.data.title = houseName + " ▼";
        // 关闭选择框
        $scope.closeSelectPopover();
        // 向服务器请求缩略图
        $scope.getGardenImage();
        // 向服务器请求种植模型状态
        $scope.getGardenState(houseId);
        //获取做点什么状态
        $scope.getGoodsDesignState($scope.data.nowSelectHouseId,1);
        //获取做了什么状态
        $scope.getTaskState($scope.data.nowSelectHouseId);
        //获取酋长选举状态
        $scope.getChiefState($scope.data.nowSelectHouseId);
        //获取作物缩影状态
        $scope.getMiniatureState($scope.data.nowSelectHouseId);
	    //获取采收计划状态
        $scope.getRecoverState($scope.data.nowSelectHouseId);
        //获取农事活动状态
        $scope.getFarmingActiveState($scope.data.nowSelectHouseId);
    };

    $scope.openSelectPopover = function($event) {
        if($scope.data.greenHouseList.length == 0) {
            return ;
        }
        $scope.selectPopover.show($event);
    };
    $scope.closeSelectPopover = function() {
        $scope.selectPopover.hide();
    };
    $scope.$on('$destroy', function() {
        $scope.selectPopover.remove();
    });
    $scope.$on('selectPopover.hidden', function() {
        // Execute action
    });
    $scope.$on('selectPopover.removed', function() {
        // Execute action
    });

    //效果
    $scope.animateX =function(index_img){
        var obj = document.getElementById('sroll-img');
        var objImg = document.getElementById('picImg');
        var wImg = objImg.clientWidth;
        var num = parseInt(index_img)- 1;
        if(index_img == 0){
            obj.style.marginLeft =  '0px';
        }else{
            obj.style.marginLeft = -num * wImg + 'px';
        }
    }
});
