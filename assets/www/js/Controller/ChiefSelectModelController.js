// 种植模型-控制器
angular.module('starter.ChiefSelectModelController', [])

//------------------------------------------------------
// 种植模型选择页面
.controller('ChiefSelectModelController',function($scope, $ionicPopup, $ionicLoading, $ionicHistory, $timeout, $state, $stateParams, $ionicHistory, UserService, GardenService, MessageService) {

    $scope.data = {};
    $scope.data.content  = {};
    $scope.data.selectId = -1;

    $scope.data.plant = [];

    // init
    $scope.$on('$ionicView.loaded', function(){
        var messageId = $stateParams.data.messageId;

        $ionicLoading.show({
            template: '请稍后...'
        });

        /*alert(messageId);*/

        MessageService.requestMessageDetail(messageId)
        .success(function(data)
        {
//            alert(JSON.stringify(data));
            $ionicLoading.hide();
            if(data.code == 200){
                $scope.data.content = data.data[0];
//                $scope.handleData();
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
    });

    //-----------------------------
    // 处理数据
    $scope.handleData = function(){

        var plantingPlan = $scope.data.content.plantingPlan;
        var argBuf = [];

        for(var i=0; i<plantingPlan.length; i++){
            argBuf.push(plantingPlan[i]);
            if((i+1)%3 == 0){
                $scope.data.plant.push(argBuf);
                argBuf = [];
            }
            else if(i+1 == plantingPlan.length){
                $scope.data.plant.push(argBuf);
            }
        }
    };

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

     //返回
    $scope.goBack = function(){
        $ionicHistory.goBack();
    };

    //-----------------------------
    // 显示选择对话框
    $scope.showConfirm = function() {

       var confirmPopup = $ionicPopup.confirm({
         title: '种植模型确认',
         template: '注意，您将发起投票。',
    	   button: '确认'
       });
       confirmPopup.then(function(res) {
           if(res) {
               var houseId = UserService.getHouseId();
               GardenService.startModelVote(houseId)
               .success(function(data)
               {
                  //alert("" + data.message);
               })
               .error(function(state){
                  //alert("" + state);
               });
           } else {
      	       //alert("no iok");
           }
        });
    };

    //-----------------------------
    // 跳转到详情
    $scope.modeldetail = function(planId){
        var myData = {"planId":planId};
        $state.go("modelDetail", {data:myData});
    };

    //------------------------------
    // 选择种植模型
    $scope.plantModelClick = function(planId){
        if($scope.data.content.chief){
            $scope.data.selectId = planId;
        }
        else{
            $scope.modeldetail(planId);
        }
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

      var houseId = $scope.data.content.houseId;
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
          }
          else{
              var alertPopup = $ionicPopup.alert({
                  title: '提示',
                  template: '选择种植模型失败',
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
