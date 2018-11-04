angular.module('starter.GoodsDesignController', ['ionic'])
//======================================================
//物资方案
    .controller('GoodsDesignController', function($scope, $stateParams,$ionicPopup, $ionicLoading,$ionicHistory,GoodsDesignService,UserService, MyTribeService) {

        $scope.data = { };
        $scope.data.goodDesign = $scope.data.data;
        $scope.data.planId = "";
        $scope.data.isChief = false;
        $scope.data.btnState = false;


        /*获取物资方案*/
        $scope.init = function(){
            var msgId = $stateParams.data.messageId;
            //-------------
            if(msgId != null){ // 消息入口
                $ionicLoading.show({
                    template: '载入中...'
                });
                //var houseId = window.localStorage.getItem("houseId");
                //$scope.isChief(houseId);
                //alert(isVote+"-----是否酋长")
                GoodsDesignService.getMaterialPlan(msgId)
                .success(function(data){
                    $ionicLoading.hide();
                    if(data.code == 200){
                        $scope.data.goodDesign = data.data;
                        //console.log("看看物资方案内容==============》》》》》" + JSON.stringify(data));
                    }else{

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
            }// end if
            //-------------
            else{
                var houseId = $stateParams.data.houseId;
                $scope.isChief(houseId);
                GoodsDesignService.getTaskProjects(houseId)
                .success(function(data){
                    $ionicLoading.hide();
                    if(data.code == 200){
                        console.log("物资方案" + JSON.stringify(data));
                        if(data.data.length <= 0){
                            $ionicHistory.goBack();
                        }
                        $scope.data.goodDesign = data.data;
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

            
        };
        //-----------------------------
        // 返回主页
        $scope.goBack = function(){
            $ionicHistory.goBack();
        };

        //判断是否是推荐方案
        $scope.commended = function(need){
              if(need == 0){
                return;
              }else if(need == 1){
                  return "(推荐)";
              }
        };

        //判断是否是免费方案
        $scope.free = function(z){
            if(z == 0){
                return "免费";
            }else{
                return "￥" + z;
            }
        };

        //方案id
        $scope.choosePlan = function(planId) {
            $scope.data.planId = planId;
        };
        /*var serverListStr = window.localStorage.getItem("SERVER_LIST");*/
        //酋长选择物资方案
        $scope.choose = function(){
            $scope.data.btnState = true;
            var projectId = $scope.data.planId;
            $ionicLoading.show({
                template: '请稍候...'
            });
            GoodsDesignService.chooseMaterialPlan(projectId)
                .success(function(data){
//                    alert(JSON.stringify(data));
                    console.log("log==>" + JSON.stringify(data));
                    $ionicLoading.hide();
                    if(window.localStorage.taskList){
                        window.localStorage.taskList += $scope.data.goodDesign[0].ar_task_id + ",";
                    } else {
                        window.localStorage.taskList = $scope.data.goodDesign[0].ar_task_id + ",";
                    }
                    $scope.isVote = true;
                    if(data.code == 200){
                        var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '选择成功',
                        buttons: [{text: '知道了'}]
                        });
                        $ionicHistory.goBack();
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template: '选择失败',
                            buttons: [{text: '知道了'}]
                        });
                    }
                })
                .error(function(state){
                    $ionicLoading.hide();
                    //alert("state = " + state); //0: 连接服务器失败； 405：请求方式错误； 404：找不到接口地址； 500：服务器异常
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '网络异常',
                        buttons: [{text: '知道了'}]
                    });
                });
        };

        //$scope.getChooseState = function(taskId) {
        //    if(!window.localStorage.taskList){
        //        //alert("false");
        //        return false;
        //    }
        //    var taskList = window.localStorage.taskList;
        //    if(taskList.indexOf(taskId) != -1){
        //        //alert("true");
        //        return true;
        //    } else {
        //        //alert("false");
        //        return false;
        //    }
        //};
        //判断是否为酋长
        $scope.isChief = function(houseId){
            // 点击做点什么时，获取最新的大棚数据（主要为了获取当前是不是已被任命为酋长）
            $scope.getMyGreenHouse();

            var houseList = UserService.getMyGreenHouseList();
            for(var i=0; i<houseList.length; i++){
                if(houseList[i].house_id == houseId){
                    if(houseList[i].user_role == 5){
                        $scope.data.isChief = true;
                    }
                }
            }
        };
    
        //----------------------------------------------------
        // 获取属于我的大棚列表
        $scope.getMyGreenHouse = function(){
            
            MyTribeService.getMyGreenHouse(UserService.getUserId())
            .success(function(data)
             {
                if(data.code == 200){
                     UserService.setMyGreenHouseList(data.data);
                }
             })
            .error(function(state)
            {
                   
            });
        };
    });