//<!--农趣活动（立即报名控制器）-->
angular.module('starter.ActiveRegisterController', ['ionic'])
//======================================================
//立即报名
    .controller('ActiveRegisterController', function($scope, $ionicLoading,$ionicHistory,$state,$stateParams,$ionicPopup,TribeActiveService,UserService,OrderService,PointService) {
        $scope.data = {
            price:0,//支付金额
            point:0,//支付积分
            people:"",//报名人
            contact:"",//联系方式
            number_adult:0,//参加人数（成人）
            number_child:0,//参加人数（儿童）
            number_adult_point:0,//积分参加人数(成人)
            isMoneyChecked: false,//现金报名
            isPointChecked: true,//积分报名
        };

        $scope.params = {
            party_id:0,//活动id
            people:"",//报名人
            contact:0,//电话
            number_adult:0,//成人数量
            number_child:0,//小孩数量
            number_point:0,//积分报名人数
        };//包名需要的参数

        $scope.info = $stateParams.data;//从上一页传进来的参数

        // init
        {
            PointService.getPointInfo()
                .success(function(data){
                    if(data.code == 200){
                        $scope.data.userPoint = data.data[0].remaining_points || 0;
                        $scope.data.contact = data.data[0].accountName;
                        $scope.data.people = data.data[0].userName;
                    }
                })
        }

        // 返回主页
        $scope.gotoHome = function(){
            $state.go('activeDesc',{data:{"partyId":$scope.info.partyId}});
        };

        //确认报名
        $scope.confirm = function(){
            $scope.getParams();
            console.log(JSON.stringify($scope.params) + "---------------------------------确认报名 的参数");

            var text = null;
            if(!isPhoneNumber($scope.data.contact) || $scope.data.contact == "")
                text = "请正确填写手机号码";
            else if($scope.data.people == "")
                text = "请正确填写联系人";
            else if($scope.data.isMoneyChecked && !isPosNumber($scope.data.number_adult))
                text = "请正确填写现金报名人数";
            else if($scope.data.isPointChecked && !isPosNumber($scope.data.number_adult_point))
                text = "请正确填写积分报名人数";
            else if(parseInt($scope.info.limitPeople) > 0 && parseInt($scope.info.limitPeople) < parseInt($scope.data.number_adult) + parseInt($scope.data.number_point))
                text = "参加人数超出范围";
            else if($scope.params.number_adult + $scope.params.number_point <= 0)
                text = "请正确填写报名人数";
            else if($scope.data.isPointChecked && $scope.data.point > $scope.data.userPoint)
                text = "剩余积分不足";
            if(text){
                var alertPopup = $ionicPopup.alert({
                    title: '提示',
                    template: text,
                    buttons: [{text: '知道了'}]
                });
            }
            else {
                if(parseInt($scope.data.price) == 0)
                    $scope.submit();
                else
                    $scope.confirmOrder();
            }
        };

        // 监听数值改变
        $scope.changeNum = function(){
            $scope.data.price = ($scope.data.number_adult * $scope.info.costAdult); /*+ ($scope.data.number_child * $scope.info.costChild*///支付金额
            $scope.data.point = ($scope.data.number_adult_point * $scope.info.costPoint);

            if(!$scope.data.isMoneyChecked) $scope.data.price = 0;
            if(!$scope.data.isPointChecked) $scope.data.point = 0;
        };

        //获取报名参数
        $scope.getParams = function(){
            $scope.params.party_id = $scope.info.partyId;//ID
            $scope.params.contact = $scope.data.contact;//联系方式
            $scope.params.people = $scope.data.people;//人名
            $scope.params.number_adult = $scope.data.number_adult || 0;//现金成人数
            $scope.params.number_point = $scope.data.number_adult_point || 0;//积分成人数
            $scope.params.number_child = $scope.data.number_child || 0;//儿童数量

            $scope.params.number_adult = $scope.data.isMoneyChecked ? $scope.params.number_adult : 0;////现金成人数
            $scope.params.number_point = $scope.data.isPointChecked ? $scope.params.number_point : 0;////积分成人数
        }

        //报名
        $scope.submit = function(){
            TribeActiveService.activeRegister($scope.params)
             .success(function(data){
                 $ionicLoading.hide();
                 if(200 == data.code){
                     var alertPopup = $ionicPopup.alert({
                     title: '提示',
                     template: '预约成功',
                     buttons: [{text: '知道了',onTap:function(e){
                         $state.go('tribeActive');
                      }}]
                     });
                  }
                 else if(3303 == data.code){
                      var alertPopup = $ionicPopup.alert({
                         title: '提示',
                         template: '报名人数已满',
                         buttons: [{text: '知道了',onTap:function(e){
                                   $state.go('activeDesc',{data:{"partyId":$scope.info.partyId}});
                                   }}]
                         });
                  }
                  else{
                      var alertPopup = $ionicPopup.alert({
                      title: '提示',
                      template: '' + data.message,
                      buttons: [{text: '知道了'}]
                      });
                  }
                 console.log("预约："+JSON.stringify(data))
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

        //-----------下单
        $scope.confirmOrder  = function() {
            // 先清空数据
            $scope.data.goodsListBuf = [];
            // 拼装数据
            var newBuf = {};
            newBuf.goodsid   =$scope.info.partyId;
            newBuf.goodstype = '1';
            newBuf.quantity  = '1';
            newBuf.summary   = '农趣活动报名';
            newBuf.imageurl  = 'xxxxxxx';
            newBuf.goodsprice= $scope.data.price;
            $scope.data.goodsListBuf.push(newBuf);
            $ionicLoading.show({
                template: '载入中...'
            });
            OrderService.addOrder(UserService.getUserId(), $scope.data.price, JSON.stringify($scope.data.goodsListBuf), 4)
                .success(function(data) {
                    $ionicLoading.hide();
                    // 下单成功
                    if(data.code == 200){
                        //提示用户将产生费用
                        var confirmPopup = $ionicPopup.confirm({
                            title: '<strong>提示</strong>',
                            template: '确定支付吗?',
                            okText: '确定',
                            cancelText: '取消'
                        });
                        // 跳转支付页面
                        confirmPopup.then(function (res) {
                            if (res) {
                                TribeActiveService.set($scope.params);
                                $state.go('paySelect', {'from' : 'TribeActive', 'orderId' : data.data[0].orderid, 'orderPrice' : $scope.data.price, 'description' : '农趣活动报名'});
                            }
                        });
                    }
                    else{
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template: '' + data.message,
                            buttons: [{text: '知道了'}]
                        });
                    }
                })
                .error(function(data) {
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '网络异常',
                        buttons: [{text: '知道了'}]
                    });
                });
        };
    });
