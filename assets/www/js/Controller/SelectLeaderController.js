angular.module('starter.SelectLeaderController', [])
.controller('SelectLeaderController', function($scope, $ionicLoading, $stateParams, $ionicPopup, $state, $ionicActionSheet, MyInfoService, UserService) {

	$scope.data = {};

	$scope.data.selectedIndex = -1;		// 选择的人

	//optionId

	$scope.data.userData = [
		{"userId":"10001", "name":"用户1", "vote":"8票(46%)", "select":false},
		{"userId":"10002", "name":"用户2", "vote":"8票(46%)", "select":false},
		{"userId":"10003", "name":"用户3", "vote":"8票(46%)", "select":false},
		{"userId":"10004", "name":"用户4", "vote":"8票(46%)", "select":false},
	];

	// 投票信息
	$scope.data.voteInfo = $stateParams.data;
	for (var i = 0; i < $scope.data.voteInfo.voteWaitSumResultList.length; i++) {
		$scope.data.voteInfo.voteWaitSumResultList[i].select = false;
	};

	$scope.data.isVoted = $scope.data.voteInfo.optionId != 0;

	// 选择
	$scope.select = function(index) {
		
		if($scope.data.selectedIndex != -1){
			$scope.data.voteInfo.voteWaitSumResultList[$scope.data.selectedIndex].select = false;
		}

		$scope.data.voteInfo.voteWaitSumResultList[index].select = true;

		$scope.data.selectedIndex = index;
	};

	// 获取样式
	$scope.getStyle = function(index){
		// //alert("" + $scope.data.voteInfo.voteWaitSumResultList[index].voteNumber);
		// //alert("" + $scope.data.voteInfo.voteSum);
		return "width:" + $scope.data.voteInfo.voteWaitSumResultList[index].voteNumber/$scope.data.voteInfo.voteSum*100 + "%;";
	};

	// 投票
	$scope.vote = function() {

		if($scope.data.selectedIndex == -1){
			return;
		}

		var voteOptionId = $scope.data.voteInfo.voteWaitSumResultList[$scope.data.selectedIndex].voteOptionId;
		var voteExplainId = $scope.data.voteInfo.voteWaitSumResultList[$scope.data.selectedIndex].voteExplainId;
		
		$ionicLoading.show({
            template: '请稍后...'
        });

		UserService.setMyVote(UserService.getUserId(), voteExplainId, voteOptionId)
		.success(function(data)
		{
			$ionicLoading.hide();

			if(data.code == 200){
				$scope.data.isVoted = true;	
				$scope.data.voteInfo.voteWaitSumResultList[$scope.data.selectedIndex].voteNumber++;
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


})

;