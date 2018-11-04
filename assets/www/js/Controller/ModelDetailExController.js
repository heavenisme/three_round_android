// 种植模型详情EX-控制器
angular.module('starter.ModelDetailExController', [])
//======================================================
.controller('ModelDetailExController', function($scope, $ionicLoading, $stateParams, $ionicPopover, $ionicPopup,  $ionicHistory, $state, $ionicActionSheet, UserService, MyInfoService, MessageService) {

    $scope.data = {};
    
    $scope.data.planId = $stateParams.data.planId;  // 模型ID

    $scope.data.planting = [];


    var objData = new Array();

    var planting = {};

    // 用户角色
    $scope.data.userRole = UserService.getUserRole();

    //-----------------------------
    // 返回
    $scope.goBack = function(){
        $ionicHistory.goBack();
    };
    // 处理图片路径
    $scope.handlePath = function(path){
        return AC.SERVER_IP() + path;

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
        }

        $scope.sort();
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
    // 请求种植模型详细
    $scope.requestPlaningDetail = function(){

        $ionicLoading.show({
            template: '请稍等...'
        });

        var messageId = $stateParams.data.messageId;

        MessageService.requestMessageDetail(messageId)
        .success(function(data)
        {
            $ionicLoading.hide();
            /*alert(JSON.stringify(data));*/
            if(data.code == 200){
                planting = data;

                $scope.resolve();
            }
        })
        .error(function(state)
        {
            $ionicLoading.hide();
        });

    };
	
});


