// 酋长投票
angular.module('starter.ChiefVoteController', [])
.controller('ChiefVoteController', function($scope, $ionicLoading, $ionicHistory, $stateParams, $ionicPopup, $state, $ionicActionSheet, MyInfoService, UserService, MessageService) {

	$scope.data = {};

	$scope.data.selectIndex = -1;		// 选择的人

	$scope.data.content = {};

	$scope.data.currMsgType;

	// init
	{
		var messageId = $stateParams.data.messageId;

		$scope.data.currMsgType = $stateParams.data.messageType;

		MessageService.requestMessageDetail(messageId)
		.success(function(data)
		{
			if(data.code == 200){
				$scope.data.content = data.data[0];
			}
		})
		.error(function(state)
		{
			
		});
	}

	//----------------------------
	// 选择
	$scope.select = function(index){
		$scope.data.selectIndex = index;
	}

	//----------------------------
	// 投票
	$scope.vote = function(){

		if($scope.data.selectIndex < 0 ){
			return;
		}

		var userId = UserService.getUserId();
		var voteExplainId = $scope.data.content.voteExplainId;
		var voteOptionId = $scope.data.content.voteOptionContent[$scope.data.selectIndex].voteOptionId;

		$ionicLoading.show({
            template: '请稍后...'
        });

		MessageService.requestAddVoteRecord(userId, voteExplainId, voteOptionId)
		.success(function(data)
		{
			$ionicLoading.hide();
			if(data.code == 200){
				//var alertPopup = $ionicPopup.alert({
				//	title: '提示',
				//	template: '投票成功',
				//	buttons: [{text: '知道了'}]
				//});
				$ionicHistory.goBack(-2);
			}
			else{
				var alertPopup = $ionicPopup.alert({
					title: '提示',
					template: '投票失败',
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

})

;