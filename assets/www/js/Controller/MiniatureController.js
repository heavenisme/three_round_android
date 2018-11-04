// TaskListController
angular.module('starter.MiniatureController', [])

//======================================================
.controller('MiniatureController', function($scope, $stateParams, $ionicModal, $ionicLoading, $ionicPopup, $ionicHistory, $state, MiniatureService, UserService) {

    $scope.data = {
        houseId : $stateParams.data.houseId,
        userId : UserService.getUserId(),
        curImg : 0,
        taskList : []
    };

/*    $scope.temp = {
        "code": 200,
        "message": "成功",
        "time": 1455957652024,
        "data": [
              {
                "taskId": null,
                "ar_task_id": null,
                "house_id": 1,
                "image_url": ["/resourceHOUSE/1455602490641.jpg","/resourceHOUSE/34234234123.jpg","/resourceHOUSE/1235325423.jpg"],
                "create_time": 1455602499000,
                "description": "上传",
                "data": null
              },
              {
                  "taskId": null,
                  "ar_task_id": null,
                  "house_id": 1,
                  "image_url": ["/resourceHOUSE/1455602490641.jpg","/resourceHOUSE/142341.jpg","/resourceHOUSE/534551341.jpg"],
                  "create_time": 1455602499000,
                  "description": "上传",
                  "data": null
              }
        ]
    };*/

    // init
    $scope.init = function(){
        $ionicLoading.show({
            template: '载入中...'
        });
        var houseId = $stateParams.data.houseId;
        MiniatureService.plantMiniature(houseId, 0)
            .success(function(data){
                $ionicLoading.hide();
                $scope.data.taskList = data.data;

                for (var i = 0; i < $scope.data.taskList.length; i++) {
                    $scope.data.taskList[i].index = i;
                    console.log($scope.data.taskList[i].index);
                };
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

    $scope.handlePath = function(url, isThumb){
        console.log(converImageUrl(url, isThumb));
        return converImageUrl(url, isThumb);
    };

    //跳转到任务详情页面
    $scope.taskDescClick = function(taskId){
        $state.go("taskDesc");
    };

    //返回页面
    $scope.gotoHome = function(){
        $ionicHistory.goBack();
    };


    //-----------------------------------------------
    $ionicModal.fromTemplateUrl('my-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    

    $scope.openModal = function(index, cur) {        
        $scope.data.clickImgIndex = index;
        $scope.data.curImg = cur;
        $scope.modal.show();
    };

    $scope.closeModal = function() {
        $scope.modal.hide();
    };

    //当我们用完模型时，清除它！
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });

    // 当隐藏模型时执行动作
    $scope.$on('modal.hide', function() {
        // 执行动作
    });

    // 当移动模型时执行动作
    $scope.$on('modal.removed', function() {
        // 执行动作
    });

})
