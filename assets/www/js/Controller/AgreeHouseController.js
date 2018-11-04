// 土地购买协议-控制器
angular.module('starter.AgreeHouseController', [])
//======================================================
.controller('AgreeHouseController', function($scope, $ionicHistory, $sce, UserService,$state,$stateParams) {

	$scope.data = {};
	// $scope.data.src = AC.BUYLAND_AGREEMENT() + "?userId=" + UserService.getUserId();
	$scope.data.src = $sce.trustAsResourceUrl(AC.BUYLAND_AGREEMENT() + "?userId=" + UserService.getUserId());
//	$scope.data.src = $sce.trustAsResourceUrl(AC.GET_ABOUT_US());
    //返回
    $scope.goBack = function(){
        $state.go('GreenhouseData',{data:{"greenhouseid": $stateParams.data.greenhouseid,"houseno":$stateParams.data.houseno,"housename":$stateParams.data.housename}})
    }

}

);
