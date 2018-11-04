// 通知提醒-控制器
angular.module('starter.MessageDescController', [])
//======================================================
// 通知提醒
.controller('MessageDescController', function($scope, $stateParams, $ionicLoading, $ionicPopover, $ionicPopup, $state, $ionicHistory, $ionicActionSheet, UserService, MyInfoService, MessageService) {
    
	$scope.data = {
		messageList : [],
		currMsgType : ""
	};

	// init
	$scope.$on('$ionicView.loaded', function(){
		var parmas = $stateParams.data;

		var userId 		= UserService.getUserId();
		$scope.data.currMsgType = parmas.messageType;
		$ionicLoading.show({
           template: '载入中...'
        });

		MessageService.requestMessageList(userId, $scope.data.currMsgType)
		.success(function(data){
			$ionicLoading.hide();
			if(data.code == 200){
//			alert(JSON.stringify(data));
				$scope.data.messageList = data.data;
                console.log(JSON.stringify(data) + "--------------------------------消息列表")
			}

		})
		.error(function(state){
			$ionicLoading.hide();
		});
	});

	$scope.goBack = function(){
		$ionicHistory.goBack();
	}

    $scope.messageDir = function(messageId){
//        alert(messageId + "--消息id")
    	MessageService.setMessageId(messageId);
        $state.go("messageDir", {data:{"messageId":messageId,"messageType":$scope.data.currMsgType}});
    }

});