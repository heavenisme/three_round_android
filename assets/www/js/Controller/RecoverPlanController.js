// 采收计划-控制器
angular.module('starter.RecoverPlanController', [])
//======================================================
//采收计划
    .controller('RecoverPlanController', function($scope, $state, $ionicLoading,$ionicHistory,$stateParams,$ionicPopup,RecoverService,UserService,MessageService) {
        $scope.data = {};
        $scope.data.recoverDesc = "";
        $scope.data.chkRetention = true;//是否选中自留
        $scope.data.chkTransaction = true;//是否选中交易
        $scope.data.haveRetention = false;//是否有自留
        $scope.data.retention = 0;//自留
        $scope.data.transaction = 0;//交易


        //需要传递的参数
        $scope.params = {};//当前页面需要传递的参数集
        $scope.params.handle_type = {};//处理方式
        $scope.recover_retention = {};//自留
        $scope.recover_transition = {};//交易
        $scope.recover_Array = new Array();//定义数组
        //-----------------------------
        // 返回主页
        $scope.gotoHome = function(){
            $ionicHistory.goBack();
        };
        //获取采收计划详情
        $scope.recoverDetail = function(){
                var recoverId = $stateParams.data.recoverId;
                $scope.params.harvest_plan_id = recoverId;//采收计划id
                $ionicLoading.show({
                    template: '载入中...'
                });
                //调用方法获得详情
                $scope.getDetail(recoverId);

                //获取上一次选取的采收方式
                if(window.localStorage.getItem('chkRetention')){
                    $scope.data.chkRetention  = window.localStorage.getItem('chkRetention');
                }
                if(window.localStorage.getItem('chkTransaction')){
                    $scope.data.chkTransaction  = window.localStorage.getItem('chkTransaction');
                }
        }
        //调用接口获得采收计划详情
        $scope.getDetail = function(recoverId){
            RecoverService.recoverInfoDetails(recoverId)
                .success(function (data) {
                    $ionicLoading.hide();
                    console.log(JSON.stringify(data) + "--------采收计划详情")
                    $scope.data.recoverDesc = data;

                    $scope.data.transaction = $scope.data.recoverDesc.harvest_weight || 0;
                })
                .error(function (state) {
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '网络异常',
                        buttons: [{text: '知道了'}]
                    });
                });
        }
        //切换采收方式时改变对应的参数
        $scope.selectWay = function(id){
            if(2 == id){
                if($scope.data.chkRetention){
                    $scope.data.chkRetention = false;
                }else{
                    $scope.data.chkRetention = true;
                }
            }
            if(1 == id){
                if($scope.data.chkTransaction){
                    $scope.data.chkTransaction = false;
                }else {
                    $scope.data.chkTransaction = true;
                }
            }
        }
        //点击下一步操作按钮
        $scope.next = function(){
            var sum = $scope.data.retention + $scope.data.transaction;
//            if(0 < $scope.data.retention && 0 <$scope.data.transaction){
//                sum = $scope.data.retention + $scope.data.transaction;//获取自留和交易总数
//            }else if(0 < $scope.data.retention){
//                sum = $scope.data.retention;
//            }
            //获取参数
            $scope.getParams();
            //判断用户输入的采收量与总采收量是否相等
            if(parseInt($scope.data.recoverDesc.harvest_weight) != sum){
                var alertPopup = $ionicPopup.alert({
                    title: '提示',
                    template: '总采收数量不正确！',
                    buttons: [{text: '知道了'}]
                });
            }else{
                RecoverService.set($scope.params);
                $state.go('deliveryWay',{data:{'from':'Recovery'}});
            }

        }
        //只有交易 点击提交按钮
        $scope.submit = function(){
                if ($scope.data.transaction != parseInt($scope.data.recoverDesc.harvest_weight)){
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '总采收数量不正确！',
                        buttons: [{text: '知道了'}]
                    });
                }else{
                    //获取参数
                    $scope.getParams();
                    $scope.goSubmit($scope.params);
                }
        }
        //判断是否有自留
        $scope.change = function(val, isSelf){
            if(isSelf){//自留改变
                var retentionVal = val + 0;
                if( 0 < retentionVal ){
                    $scope.data.haveRetention = true;//显示下一步
                }else{
                    $scope.data.haveRetention = false;//显示提交
                }

                $scope.data.transaction = (($scope.data.recoverDesc.harvest_weight || 0) - $scope.data.retention) || 0;
            }
            else{//交易改变
                $scope.data.retention = (($scope.data.recoverDesc.harvest_weight || 0) - $scope.data.transaction) || 0;
            }
        }
        //交易提交
        $scope.goSubmit = function(params){
            RecoverService.submitRecover(params)
                .success(function(data){
                    $ionicLoading.hide();
                    if(data.flag = 1){
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template: '采收计划提交成功',
                            buttons: [{text: '知道了',onTap:function(e){
                                $state.go("tab.garden");
                            }}]
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
        }
        //获得参数
        $scope.getParams = function(){
            if($scope.data.chkRetention){
                $scope.recover_retention.type = 2;
                $scope.recover_retention.weight = $scope.data.retention;
                $scope.recover_Array.push($scope.recover_retention);//自留放入数组
                //本地存储
               RecoverService.setLocalStorage('chkRetention',true);
            }else{
                //删除本地存储
                RecoverService.reomveLocalStorage('chkRetention');
            }
            if($scope.data.chkTransaction){
                $scope.recover_transition.type = 1;
                $scope.recover_transition.weight = $scope.data.transaction;
                $scope.recover_Array.push($scope.recover_transition);//交易放入数组
                //本地存储
               RecoverService.setLocalStorage('chkTransaction',true);
            }else{
                //删除本地存储
                RecoverService.reomveLocalStorage('chkTransaction');
            }
            $scope.params.handle_type = $scope.recover_Array;//放入将要传递的参数中
            $scope.params.user_id = UserService.getUserId();//耘客id
            $scope.params.create_id = UserService.getUserId();//耘客id
        }
    });
