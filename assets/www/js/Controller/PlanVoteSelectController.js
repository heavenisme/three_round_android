// 种植模型控制器
angular.module('starter.PlanVoteSelectController', [])
.controller('PlanVoteSelectController', function($scope, $ionicLoading, $ionicPopup, $state, $ionicActionSheet, GardenService, MyInfoService, UserService) {

	$scope.data = {};

	$scope.data.isVoted = false;

	$scope.data.selectedIndex = -1;		// 选择的人

	$scope.data.widthType = "";
	$scope.data.sum = 0;
	/*
	{
	    "code": 200,
	    "message": "Success",
	    "data": [
	        {
	            "voteresult": [
	                {
	                    "vote_result": 1,
	                    "plan_id": "1"
	                },
	                {
	                    "vote_result": 4,
	                    "plan_id": "2"
	                },
	                {
	                    "vote_result": 0,
	                    "plan_id": "3"
	                }
	            ],
	            "sum": 6
	        }
	    ]
	}
	*/

	$scope.data.voteresult = [];

	// 获取种植模型
	GardenService.getVotingRate(UserService.getUserId(), UserService.getHouseId())
	.success(function(data)
	{
		
		if(data.code == 200){
		//  TODO
			$scope.data.voteresult = data.data[0].voteresult;
			$scope.data.sum = data.data[0].sum;
			$scope.data.isVoted = data.data[0].isVote;

			for (var i = 0 ; i < $scope.data.voteresult.length; i++) {
				$scope.data.voteresult[i].select = false;
			};
		}
	})
	.error(function(state)
	{

	});

	// 获取样式
	$scope.getStyle = function(index){
		return "width:" + $scope.data.voteresult[index].vote_result/$scope.data.sum*100 + "%;";
	};

	// 选择
	$scope.select = function(index) {
		
		if($scope.data.selectedIndex != -1){
			$scope.data.voteresult[$scope.data.selectedIndex].select = false;
		}

		$scope.data.voteresult[index].select = true;

		$scope.data.selectedIndex = index;
	};

	// 投票
	$scope.vote = function() {
		
		var selectedIndex = $scope.data.selectedIndex;
		
		if(selectedIndex == -1){
			return;
		}

		$ionicLoading.show({
	      template: '投票中...'
	    });

		GardenService.setVotingItem(UserService.getHouseId(), UserService.getUserId(), $scope.data.voteresult[selectedIndex].plan_id)
		.success(function(data){
			$ionicLoading.hide();
//			alert(JSON.stringify(data));
			if(data.code == 200){
				$scope.data.isVoted = true;
				$scope.data.voteresult[selectedIndex].vote_result++;
			}
			else{

			}
		})
		.error(function(state){
			$ionicLoading.hide();
			//alert(state);
		});
	};

})

;