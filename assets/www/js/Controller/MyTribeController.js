angular.module('starter.MyTribeController', [])
.controller('MyTribeController', function($scope, $ionicLoading, $ionicPopover, $ionicHistory, $ionicPopup, $state, $ionicActionSheet, UserService, MyTribeService, OrderService,$stateParams, GreenhouseService) {
    $scope.data = {
        title:$stateParams.data.title
    }
    $scope.tribe = {
        myGreenHouse: [],
        myGreenHouseLand: [],
        currMode: 0,
        greenHouseInfo: {},
        contacts: [],
        server: AC.SERVER_IP(),
        currSelection: {},
        currHouseId: -1,
    };

    // 返回
    $scope.gotoHome = function(){
        $ionicHistory.goBack();
    };

    $scope.test = function(data){

    };
    $scope.getHeight = function(size) {
        if(size == 1){
            return 50;
        }
        if(size == 2){
            return 105;
        }
        if(size >= 3){
            return 158;
        }
    };
    $scope.setCurrMode = function(mode) {
        $scope.tribe.currMode = mode;
        if(mode == 0) {
            $scope.getGreenHouseLand($scope.tribe.currHouseId);
            document.getElementById("dikuai0").style.color="#77BF60";
            document.getElementById("dikuai1").style.color="#838383";
        }
        if(mode == 1) {
            $scope.getGreenHouseTribe($scope.tribe.currHouseId);
            document.getElementById("dikuai0").style.color="#838383";
            document.getElementById("dikuai1").style.color="#77BF60";
        }
    };

   //-----------------------------------
    // 选择大棚
    $ionicPopover.fromTemplateUrl('select-popover.html', {
        scope: $scope
    // animation : 'slide-in-up'
    }).then(function(popover) {
        $scope.selectPopover = popover;
    });

    $scope.openSelectPopover = function($event) {
        $scope.selectPopover.show($event);
    };

    $scope.closeSelectPopover = function(item) {
        $scope.selectPopover.hide();
//        alert(JSON.stringify(item))
        $scope.tribe.currSelection = item;
        $scope.tribe.currHouseId = item.house_id;
        $scope.getGreenHouseInfo(item.house_id);
        $scope.getGreenHouseLand($scope.tribe.currHouseId);
        $scope.getGreenHouseTribe($scope.tribe.currHouseId);
    };
    $scope.$on('$destroy', function() {
        $scope.selectPopover.remove();
    });
    $scope.$on('selectPopover.hidden', function() {
        // Execute action
    });
    $scope.$on('selectPopover.removed', function() {
        // Execute action
    });

    $scope.gotoPay = function(item) {
//         跳转
        $state.go('paySelect', {'from' : 'Greenhouse', 'orderId' : item.order_number, 'orderPrice' : item.land_price + item.service_price, 'description' : '购买土地设施及首年服务费'});
    };

    //----------------------------------------------------
    // 获取属于我的大棚列表
    $scope.getMyGreenHouse = function(){

        $scope.tribe.myGreenHouse = UserService.getMyGreenHouseList();

        $scope.tribe.currSelection = $scope.tribe.myGreenHouse[0];
        $scope.tribe.currHouseId = $scope.tribe.currSelection.house_id;
        $scope.getGreenHouseInfo($scope.tribe.currHouseId);
        $scope.getGreenHouseLand($scope.tribe.currHouseId);
    };

    //----------------------------------------------------
    //  获取大棚信息
    $scope.getGreenHouseInfo = function(houseId){
        MyTribeService.getGreenHouseInfo(UserService.getUserId(), houseId)
            .success(function(data)
            {
                if(data.code == 200){
                    $scope.tribe.greenHouseInfo = data;
                }
            })
            .error(function(state){

            });
    };

    //----------------------------------------------------
    //  获取我的大棚土地信息
    $scope.getGreenHouseLand = function(houseId) {
        MyTribeService.getGreenHouseLand(UserService.getUserId(), houseId)
            .success(function(data){

                if(data.code == 200) {
                    $scope.tribe.myGreenHouseLand = data.data;
                    console.log("我的部落大棚信息---------》" + JSON.stringify($scope.tribe.myGreenHouseLand));
                }
            })
            .error(function(state){

            });
    };

    //----------------------------------------------------
    //  获取我的大棚联系人信息
    $scope.getGreenHouseTribe = function(houseId) {
        MyTribeService.getGreenHouseTribe(UserService.getUserId(), houseId)
            .success(function(data){
                if(data.code == 200) {
                    $scope.tribe.contacts = data.data;
                }
            })
            .error(function(state){

            });
    };
        // 转卖或取消转卖
        // status: 1转让 0取消转让
        $scope.resell = function(selectLandId, status, index){
            GreenhouseService.resell(selectLandId, status)
                .success(function(data){
                    if(data.code == 200){
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template: '操作成功',
                            buttons: [{text: '知道了'}]
                        });
                        //$scope.data.selectTransfer = status;
                        //console.log("信息1---------》" + JSON.stringify($scope.tribe.myGreenHouseLand[index]));
                        $scope.tribe.myGreenHouseLand[index].transfer = status;
                    }
                    else{
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template: '' + data.message,
                            buttons: [{text: '知道了'}]
                        });
                    }
                })
                .error(function(state){
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '错误码: ' + state,
                        buttons: [{text: '知道了'}]
                    });
                });
        };
})

;
