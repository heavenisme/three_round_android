// 消息详情-控制器
angular.module('starter.MessageDirController', [])
//======================================================
// 消息详情
.controller('MessageDirController', function($scope, $ionicLoading, $stateParams, $ionicPopover, $ionicPopup,  $ionicHistory, $state, $ionicActionSheet, UserService, MyInfoService, MessageService) {

	$scope.data = {};
	$scope.data.functionType = "";
	$scope.data.messageId = "";
	$scope.data.messageContent = "";
	$scope.data.isVote = "";
	$scope.data.voteState;
	$scope.data.currMsgType = $stateParams.data;
    $scope.data.choice = false;//种植模型选择状态
    $scope.data.harvest_plan_id = 0;//采收计划id
    $scope.data.recoverState = 0;// 0：去看看 1：已反馈 2：已过期

	// init
	{
		$scope.data.messageId = MessageService.getMessageId();
		MessageService.requestMessageInfo(UserService.getUserId(), $scope.data.messageId)
		.success(function(data)
		{
			/*alert(JSON.stringify(data));*/
            if(data.code == 200){
				$scope.data.functionType 	= data.data[0].function_type;
				$scope.data.messageContent 	= data.data[0].message_content;
				$scope.data.isVote 			= data.data[0].isVote;
				$scope.data.voteState 		= data.data[0].vote_state;
                if( 11 == $scope.data.functionType ){
                    $scope.data.harvest_plan_id = data.data[0].harvest_plan_id;
                    MessageService.recoveryState($scope.data.harvest_plan_id)
                         .success(function(data){
                            if(6201 == data.code){
                                $scope.data.recoverState = 1;
                            }else if(6202 == data.code){
                                $scope.data.recoverState = 2;
                            }else{
                                $scope.data.recoverState = 0;
                            }

                            console.log(JSON.stringify(data) + "------------------------消息采收计划状态")
                         })
                        .error(function(state){
                            var confirmPopup = $ionicPopup.confirm({
                                title: '提醒',
                                template: '网络异常',
                                buttons: [{text: '知道了'}]
                            });
                        });
                }
			}
			else{
				var alertPopup = $ionicPopup.alert({
	                title: '提示',
	                template: ''+data.message,
	                buttons: [{text: '知道了'}]
	            });
			}
		})
		.error(function(state)
		{
			var confirmPopup = $ionicPopup.confirm({
	          title: '提醒',
	          template: '网络异常',
	    	  buttons: [{text: '知道了'}]
	       });
		});
        //获取种植模型选择状态
        MessageService.requestMessageDetail($scope.data.messageId)
        .success(function(data)
        {
            $ionicLoading.hide();
            if(data.code == 200){
                console.log(JSON.stringify(data) +"------------------------获取种植模型选择状态")
                $scope.data.choice = data.data[0].choice;
            }
            else{
                var alertPopup = $ionicPopup.alert({
                    title: '提示',
                    template: '' + data.message,
                    buttons: [{text: '知道了'}]
                });
            }
        })
        .error(function(state)
        {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: '网络异常',
                buttons: [{text: '知道了'}]
            });
        });
	}

	$scope.goBack = function(){
		//当消息为酋长选举类型时，返回路径特殊处理。（酋长选举，菜园管理入口页面使用的是消息入口页面，返回时迁移到消息提醒页面，反复迁移，无法退出）
        if($scope.data.functionType == 1){
            $ionicHistory.goBack();
        }
        else{
            $state.go("messageDesc", {data: $scope.data.currMsgType});
        }
   	}

	// 1446627627455942167  查看酋长候选项
	// 1446047277266468585  查看种植模型候选项
	// 1446482395262405607	查看种植模型

	// 查看酋长候选项 ok
	$scope.chiefVote = function(){
//		alert("messageId : " + $scope.data.messageId);
		console.log("messageId : " + $scope.data.messageId);
		$state.go("chiefVote", {data:{"messageId":$scope.data.messageId}});
	},

	// 查看种植模型候选项 ok
	$scope.chiefSelectModel = function(){
		$state.go("chiefSelectModel", {data:{"messageId":$scope.data.messageId}});
	},

	// 查看种植模型
	$scope.modelDetailEx = function(){
		$state.go("modelDetail", {data:{"messageId":$scope.data.messageId}});
	},

    //物资方案选择
    $scope.goodsDesign = function(){
        $state.go("goodsDesign",{data:{"messageId":$scope.data.messageId}});
    },

    $scope.getChooseState = function(taskId) {
		if(!window.localStorage.taskList){
			return false;
		}
		var taskList = window.localStorage.taskList;
		if(taskList.indexOf(taskId) != -1){
			return true;
		} else {
			return false;
		}
	};
    //采收计划
    $scope.goRecoverDetail = function(){
        $state.go("recoverFeedback",{data:{'recoverId':$scope.data.harvest_plan_id}});
    }
});


