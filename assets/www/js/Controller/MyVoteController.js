angular.module('starter.MyVoteController', [])
.controller('MyVoteCtrl', function($scope, $ionicLoading, $ionicHistory, $ionicPopup, $state, $ionicActionSheet, GardenService, MyInfoService, UserService) {
	$scope.data = {};
	$scope.data.isActive = {};
	$scope.data.isActive.all = 'true';
	$scope.data.isActive.now = 'false';
	$scope.data.isActive.join = 'false';
	$scope.data.isActive.close = 'false';
	$scope.data.isActive.play = 'false';
	
	// 判断种植模型投票状态
	$scope.data.voteState = GardenService.getVoteState();

	$scope.data.myVoteList = [];

	// 请求我的投票数据
	{
		UserService.getMyVote(UserService.getUserId())
		.success(function(data)
		{
			if(data.code == 200){
				$scope.data.myVoteList = data.data;	
			}
		})
		.error(function(state){
			//
		});
	}

	// 返回
	$scope.gotoHome = function(){
	  $ionicHistory.goBack();
	};

	$scope.onTabClick = function(n){
		
		var alertPopup = $ionicPopup.alert({
	        title: '提示',
	        template: '功能暂未开放，敬请期待！',
	        buttons: [{text: '知道了'}]
    	});

    	return;

    	// todo
		$scope.data.isActive.all 	= 'false';
		$scope.data.isActive.now 	= 'false';
		$scope.data.isActive.join 	= 'false';
		$scope.data.isActive.close 	= 'false';
		$scope.data.isActive.play 	= 'false';
		
		if(n == 0){
			$scope.data.isActive.all 	= 'true';
		}
		if(n == 1){
			$scope.data.isActive.now 	= 'true';
		}
		if(n == 2){
			$scope.data.isActive.join 	= 'true';
		}
		if(n == 3){
			$scope.data.isActive.close 	= 'true';
		}
		if(n == 4){
			$scope.data.isActive.play 	= 'true';
		}
	};

	// 跳转到常规投票页
	$scope.goToVote = function(info){
		$state.go("selectLeader", {data:info});
	};

	// 跳转到种植模型投票页
	$scope.goToModelVote = function(){
		$state.go("planVoteSelect");
	};


})

;