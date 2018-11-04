// 种植模型-控制器
angular.module('starter.PlantModelController', [])

//------------------------------------------------------
// 种植模型选择页面
.controller('PlantModelController',function($scope, $ionicPopup, $ionicLoading, $timeout, $state, $stateParams, $ionicHistory, UserService, GardenService, MessageService, MyTribeService) {

    $scope.data = {};
    $scope.data.planting = [];  // 种植模型列表
    $scope.data.content  = {};
    $scope.data.plant    = [];
    $scope.data.selectId = -1;
    $scope.data.isChief = false;

    //-----------------------------
    // init
    $scope.$on('$ionicView.loaded', function(){

        // 请求数据
        $ionicLoading.show({
            template: '请稍后...'
        });

        // 点击种点什么时，获取最新的大棚数据（主要为了获取当前是不是已被任命为酋长）
        $scope.getMyGreenHouse();

        // 判断用户在该大棚是否为酋长
        var houseList = UserService.getMyGreenHouseList();

        for(var i=0; i<houseList.length; i++){
            /*houseList[i].house_id == $stateParams.data.houseId && houseList[i].user_role == 5*/
            if(houseList[i].house_id == $stateParams.data.houseId && houseList[i].user_role == 5){
                $scope.data.isChief = true;
            }
        }

        GardenService.getPlanting(UserService.getUserId(), $stateParams.data.houseId)
        .success(
            function(data){
                $ionicLoading.hide();

                /*alert("test ==>" + JSON.stringify(data));*/

                if(data.code == 200){
                    $scope.data.planting = data.data;
                    $scope.data.content  = data.data;
                    /*-------2016/03/01 by liqian 判断是否有种植模型数据*/
                    if($scope.data.content.length == 0){
                        $scope.data.nowState = true;
                    }
//                    $scope.handleData();
                }
            }
        ).error(
            function(state){
                $ionicLoading.hide();
            }
        );
    });

    //-----------------------------
    // 处理图片地址
    /*$scope.handlePath = function(path){
        if(path == null) {
            return "";
        }
        return AC.SERVER_IP() + path;
    };*/
    $scope.handlePath = function(url,isThumb){
        console.log(converImageUrl(url, isThumb));
        return converImageUrl(url, isThumb);
    };

    //------------------------------
    // 模型被点击
    $scope.plantModelClick = function(planId){

        // TODO 服务器没有状态
        // if($scope.data.content.chief){
            $scope.data.selectId = planId;
        // }
        // else{
            // $scope.modeldetail(planId);
        // }
    };

    //-----------------------------
    // 返回主页
    $scope.goBack = function(){
        $ionicHistory.goBack();
    };

    //-----------------------------
    // 跳转到详情
    $scope.modeldetail = function(planId){
        var myData = {"planId":planId};
        $state.go("modelDetail", {data:myData});
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

    //----------------------------
    // 选择种植模型
    $scope.vote = function(){

      if($scope.data.selectId < 0 ){
          var alertPopup = $ionicPopup.alert({
              title: '提示',
              template: '请先选择种植模型',
              buttons: [{text: '知道了'}]
          });
          return;
      }
      
      var houseId = $stateParams.data.houseId;
      var voteState = "3";
      var planResultId = $scope.data.selectId;

      $ionicLoading.show({
          template: '请稍后...'
      });

      MessageService.requestPlantingVote(houseId, voteState, planResultId)
      .success(function(data)
      {
          $ionicLoading.hide();

          if(data.code == 200){
              $ionicHistory.goBack();

              var alertPopup = $ionicPopup.alert({
                  title: '提示',
                  template: '选择种植模型成功',
                  buttons: [{text: '知道了'}]
              });
          }
          else{
              var alertPopup = $ionicPopup.alert({
                  title: '提示',
                  template: data.message,
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
    };

});


