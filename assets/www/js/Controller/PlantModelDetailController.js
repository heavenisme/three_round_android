// 种植模型详细-控制器
angular.module('starter.PlantModelDetailController', [])

//------------------------------------------------------
// 种植模型详细
.controller('PlantModelDetailController', function($scope, $ionicPopup, $ionicHistory, $ionicScrollDelegate, $ionicLoading, $stateParams, UserService, GardenService, MessageService) {

    $scope.data = {};

    $scope.data.planId = $stateParams.data.planId;  // 模型ID
    $scope.data.planting = [];

    var objData = new Array();

    var planting = {};

    $scope.openIndex = -1;

    $scope.clickItem = function(index) {

        if($scope.openIndex != index){
            $scope.openIndex = index;
        } else {
            $scope.openIndex = -1;
        }
        $ionicScrollDelegate.resize();//重新计算宽度和高度的方法
    };

    // 用户角色
    $scope.data.userRole = UserService.getUserRole();

    //-----------------------------
    // 返回
    $scope.goBack = function(){
        $ionicHistory.goBack();
    };
    // 处理图片路径
    $scope.handlePath = function(path){

        return converImageUrl(path, true);
    };

    /**
     *   解析数据成obj对象: 如下
     *   obj.id
     *   obj.name
     *   obj.percent
     *   obj.start
     *   obj.end
     *   obj.kind
     */
    $scope.time = function(){

    }
    $scope.resolve = function(){

        for (var i = 0; i < planting.data.length; i++) {

            for (var j = 0; j < planting.data[i].planting_cycle.length; j++) {

                var obj = {};

                obj.id      = planting.data[i].crop_id;
                obj.name    = planting.data[i].crop_name;
                obj.image   = planting.data[i].crop_image;
                obj.percent = planting.data[i].planting_percent;
                obj.start   = planting.data[i].planting_cycle[j].start_date;
                obj.end     = planting.data[i].planting_cycle[j].end_date;
                obj.kind    = planting.data[i].planting_cycle[j].planting_kind;

                // 状态 -1：未开始  0：正在开始  1：过去
                // TODO: 作业计划使用此功能
                obj.state   = 1;

                // 拼接别名
                var year = obj.start.substr(0, 4);
                var mon  = parseInt(obj.start.substr(5, 2));
                var day  = parseInt(obj.start.substr(8, 2));

                if(mon == 0){
                    mon = parseInt(obj.start.substr(6, 1));
                }

                obj.startAlias = year + "年" + mon + "月";

                if (day <= 10) {
                  obj.startAlias = obj.startAlias + "上旬";
                }
                else if(day > 20){
                  obj.startAlias = obj.startAlias + "下旬";
                }
                else{
                  obj.startAlias = obj.startAlias + "中旬";
                }

                objData.push(obj);

            }
            $scope.data.planting = objData;
        }

        //$scope.sort();
    }

    /**
     * 通过开始时间排序
     */
    $scope.sort = function(){

        for (var w = 0; w < objData.length;     w++)
        for (var i = 0; i < objData.length - 1; i++) {

            if(objData[i].start < objData[i + 1].start){
                // 交换位置
                var buf = objData[i];
                objData[i]     = objData[i + 1];
                objData[i + 1] = buf;
            }
        }

        $scope.data.planting = objData;

        // 重置滚动区域大小
        $ionicScrollDelegate.resize();
    }

    //---------------------------
    // 判断一段日期，在当前系统日期下是否正在进行
    // @return 未开始:-1 已完成:1 进行中:0
    $scope.isInProgress = function(beginDate, endDate, periodName){
        /*alert("begin = " + beginDate + ", end = " + endDate + ", period = " + periodName);*/
        // 拼接别名
        var beginYear = parseInt(beginDate.substr(0, 4));
        var beginMon  = parseInt(beginDate.substr(5, 2));
        var beginDay  = parseInt(beginDate.substr(8, 2));

        if(beginMon == 0){
            beginMon = parseInt(beginDate.substr(6, 1));
        }

        var endYear = parseInt(endDate.substr(0, 4));
        var endMon  = parseInt(endDate.substr(5, 2));
        var endDay  = parseInt(endDate.substr(8, 2));

        if(endMon == 0){
            endMon = parseInt(endDate.substr(6, 1));
        }

        var myDate = new Date();

        var myYear = parseInt(myDate.getFullYear());
        var myMon  = parseInt(myDate.getMonth())+ 1;
        var myDay  = parseInt(myDate.getDate());

        var begin = beginYear*10000 + beginMon*100 + beginDay;
        var end   = endYear*10000   + endMon*100   + endDay;
        var my    = myYear*10000    + myMon*100    + myDay;


        // 未开始
        if(my < begin){
            return -1;
        }
        // 已完成
        else if(end < my){
            return 1;
        }
        // 进行中
        else{
            alert("进行中：" + periodName);
            $scope.data.currPeriod = periodName;
            return 0;
        }
    }

    //---------------------------
    // 请求种植模型详细
    $scope.requestPlaningDetail = function(){

        $ionicLoading.show({
            template: '请稍等...'
        });

        var messageId = $stateParams.data.messageId;

        if(messageId != null && messageId.length > 0) {
            MessageService.requestMessageDetail(messageId)
                .success(function(data)
                {
                    $ionicLoading.hide();
                    /*alert(JSON.stringify(data));*/
                    if(data.code == 200){
                        $scope.data.planting = data.data;

//                        $scope.resolve();
                    }
                })
                .error(function(state)
                {
                    $ionicLoading.hide();
                });
        } else {
            // 请求种植模型
            /*alert("userId" + UserService.getUserId());
            alert("planId" + $scope.data.planId);*/
            GardenService.getPlantingDetail(UserService.getUserId(), $scope.data.planId)
            .success(function(data)
            {
                /*alert(JSON.stringify(data));*/
                $ionicLoading.hide();

                if(data.code == 200){
                    //planting = data;
                    $scope.data.planting = data.data;

                    //$scope.resolve();
                    /*alert(JSON.stringify(data));*/
                }
                else{
                    alert("??????")
                }
            })
            .error(function(state)
            {
                $ionicLoading.hide();
                alert("error " + state);
            });
        }

    };

});
