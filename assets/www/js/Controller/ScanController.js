// TaskListController
angular.module('starter.ScanController', [])

//======================================================
    .controller('ScanController', function($scope, $stateParams, $ionicLoading, $ionicPopup, $ionicHistory, $state,ScanService,$ionicModal) {

        $scope.data = {
            moredata: true,
            currPage: -1,
            flag:true//是否有数据
            /*pageNo : 0,*/
        };
        $scope.data.tasklist = null;
        // init
        $scope.init = function(){
            $scope.data.currPage += 1;
            $ionicLoading.show({
                template: '载入中...'
            });
            var deliveryId = ScanService.get();
            ScanService.getDesc(deliveryId, $scope.data.currPage)
                .success(function(data){
                    console.log(JSON.stringify(data) + "---------------------------------");
                    $ionicLoading.hide();
                    if(data.code == 200){
                        $scope.data.tasklist = data.data;
                        if (data.data.length <= 10) {
                            $scope.data.moredata = false;
                        };
                        if(data.data.length <= 0 ){
                            $scope.data.flag = true;
                        }else{
                            $scope.data.flag = false;
                        }
                        for (var i = 0; i < $scope.data.tasklist.length; i++) {
                            $scope.data.tasklist[i].index = i;
                            console.log($scope.data.tasklist[i].index);
                        };
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    }
                })
                .error(function(state){
                    $ionicLoading.hide();
//                    alert("state = " + state); //0: 连接服务器失败； 400：请求方式错误，或者参数错误； 404：找不到接口地址； 500：服务器异常
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
        //跳转到任务详情页面
       /* $scope.taskDescClick = function(taskId){
            $state.go("taskDesc", {data:{"taskId":taskId}});
        };*/
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
