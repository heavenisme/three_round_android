// TaskDescController
angular.module('starter.TaskDescController', [])

//======================================================

.controller('TaskDescController', function($scope, $ionicHistory, $ionicPopup, $stateParams, $ionicLoading, TaskService,$ionicModal,$ionicSlideBoxDelegate) {

    $scope.data = {};
    $scope.data.isActive = {};
    $scope.data.isActive.all = 'true';
    $scope.data.isActive.now = 'false';
    $scope.data.isActive.join = 'false';

    $scope.data.currState = 0;

     $scope.data.taskDesc = "";
     $scope.data.workDesc = "";
     $scope.data.photoDesc = "";
        $scope.data.clickImgIndex = 0;

    $scope.taskDescClick = function(n){

        $scope.data.isActive.all = 'false';
        $scope.data.isActive.now = 'false';
        $scope.data.isActive.join = 'false';

        $scope.data.currState = n;

        if(n == 0){
            $scope.data.isActive.all = 'true';
        }
        if(n == 1){
            $scope.data.isActive.now = 'true';
        }
        if(n == 2){
            $scope.data.isActive.join = 'true';
        }

    };

    // 作业任务信息详情
    $scope.taskInfoDetails = function(){
        var taskId = $stateParams.data.taskId;
        var taskType = $stateParams.data.taskType;
        $ionicLoading.show({
            template: '载入中...'
        });

        TaskService.taskInfoDetails(taskId,taskType)
            .success(function(data){
                $ionicLoading.hide();
                /*alert(JSON.stringify(data));*/
                console.log("aaaaeaaaaa"+JSON.stringify(data));
                if(data.code == 200){
                    $scope.data.taskDesc = data.data[0];
                } else {

                }
            })
            .error(function(state){
                $ionicLoading.hide();
//                alert("state1 = " + state);
                var alertPopup = $ionicPopup.alert({
                    title: '提示',
                    template: '网络异常',
                    buttons: [{text: '知道了'}]
                });
            });
    };
    //-----------------------------------
    // 处理图片路径
    $scope.handlePath = function(url,isThumb){
        console.log(converImageUrl(url, isThumb));
        return converImageUrl(url, isThumb);
    };
    // 作业任务图片详情
    $scope.taskImages = function(){
        var taskId = $stateParams.data.taskId;
        var taskType = $stateParams.data.taskType;
        $ionicLoading.show({
            template: '载入中...'
        });

        TaskService.taskImages(taskId,taskType)
            .success(function(data){
                $ionicLoading.hide();
                /*alert("ertyuio" + JSON.stringify(data));*/
                console.log("ertyuio" + JSON.stringify(data));
                $scope.data.photoDesc = data.data; /*[
                    {
                        "image_url": "/anywide/resource/2016/1/2/1/56ebb75eb749e2f88b02dfbe873d3b29"
                    },
                    {
                        "image_url": "/anywide/resource/2016/1/2/1/d39eeca2707c6bc860d2dce8d270c70c"
                    },
                    {
                        "image_url": "/anywide/resource/2016/1/2/1/06eef9df611fb0858dfe4f4124cb5eed"
                    }
                ];*///data.data
                console.log(data.photoDesc);
            })
            .error(function(state){
                $ionicLoading.hide();
//                alert("state2 = " + state);
                var alertPopup = $ionicPopup.alert({
                    title: '提示',
                    template: '网络异常',
                    buttons: [{text: '知道了'}]
                });
            });
    };

    // 作业任务物资详情
    $scope.taskMaterials = function(){
        var taskId = $stateParams.data.taskId;
        var taskType = $stateParams.data.taskType;
        $ionicLoading.show({
            template: '载入中...'
        });
        if(2 == taskType){
          $scope.data.workDesc = [];
        }else{
          TaskService.taskMaterials(taskId)
            .success(function(data){
              $ionicLoading.hide();
              /*alert("1222322" + JSON.stringify(data));
               console.log("1222322" + JSON.stringify(data));*/
              if(data.code == 200){

                $scope.data.workDesc = data.data;

              } else {

              }
            })
            .error(function(state){
              $ionicLoading.hide();
//              alert("state3 = " + state);
              var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: '网络异常',
                buttons: [{text: '知道了'}]
              });
            });
        }
    };

/*

$scope.currState = 0;

$scope.taskDescClick = function(n){

    $scope.currState = n;
}
*/
$ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
}).then(function(modal) {
    $scope.modal = modal;
});

$scope.myActiveSlide = 0;
$scope.openModal = function(index) {
    $scope.myActiveSlide = index;
    $scope.modal.show();
};

//监听大图滑动事件，动态改变当前显示的大图index
$scope.slideHasChanged = function(index){
    $scope.myActiveSlide = index;
}
$scope.closeModal = function() {
    $scope.modal.hide();
};
$scope.handlePath = function(url, isThumb){
    return converImageUrl(url, isThumb);
};
$scope.gotoHome = function(){
  $ionicHistory.goBack();
};

})
