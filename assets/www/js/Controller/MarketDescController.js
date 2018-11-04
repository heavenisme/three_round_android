<!--部落市场（商品详情）控制器-->
angular.module('starter.MarketDescController', ['ionic'])
//======================================================
//部落活动

    .controller('MarketDescController', function($scope, $ionicLoading,$ionicHistory,$state,$stateParams,TribeMarketService,$ionicPopup,UserService,RecoverService,$ionicModal) {

        //-----------------------------
        // 返回主页
        $scope.gotoHome = function(){
            $ionicHistory.goBack();
        };

        $scope.data = {
            list:{},//商品详细
            growth:{},//生长周期,
            params:{},//参数,
            commendGoods:{},//推荐商品
            buyNum:1,//购买数量
            nowBuyWeight:1,//当前购买数量
            sumPrice : 0,//支付金额
            currPage : 0, //当前页面，后面是否还有页面
            moredata : true //是否加载页面

        };

        $scope.params = {
            id:0,//商品id
            shop_id:0//商铺id
        };
        $scope.nextPageParams = {
            seller_id:0,//商铺id
            commodity_id:0,//商品id
            commodity_name:"",//商品名称
            commodity_number:0,//商品数量
            commodity_price:0,//商品单价
            total_price:0,//订单总额
            create_id:1//购买会员id
        }//传递给下一个页面的参数
        $scope.data.isActive = {};
        $scope.data.isActive.all = 'true';
        $scope.data.isActive.now = 'false';
        $scope.data.isActive.join = 'false';
        $scope.data.currState = 0;
        $scope.data.orderList = {};
        if($stateParams.from == 'shoppingCart') {
            $scope.data.isActive.all = 'false';
            $scope.data.isActive.now = 'true';
            $scope.data.isActive.join = 'false';
        }
        $scope.marketDesc = function(n){
            $scope.data.isActive.all = 'false';
            $scope.data.isActive.now = 'false';
            $scope.data.isActive.join = 'false';
            $scope.data.currState = n;
            if(n == 0){
                $scope.data.isActive.all = 'true';
            }
            if(n == 1){
                $scope.data.isActive.now = 'true';
                $scope.growth();
            }
            if(n == 2){
                $scope.data.isActive.join = 'true';
                $scope.commendGoods()
            }
        };
        //商品详细
        $scope.getProductInfo = function(){
            $scope.data.params = TribeMarketService.get();//获得参数
            $ionicLoading.show({
                template: '载入中...'
            });
            TribeMarketService.getCommodityInfo($scope.data.params.id,$scope.data.params.shop_id)
                .success(function(data){
                    $ionicLoading.hide();
                    if(200 == data.code){
                        $scope.data.list = data.data[0];
                    }
                    else{
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template: data.message,
                            buttons: [{text: '知道了'}]
                        });
                    }
                    console.log("商品详细："+JSON.stringify(data))
                })
                .error(function(state){
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '获取商品详细失败',
                        buttons: [{text: '知道了'}]
                    });
                });
        };
        //查看生长周期
/*        $scope.growth = function(){
            TribeMarketService.getGrowthCycleInfo(1,0)
                .success(function(data){
                    if(200 == data.code){
                        $scope.growthArr = data.data;
                        console.log("新写的都是些什么玩应儿=================》》》》》》》" + JSON.stringify(data));
                    }
                    console.log("生长周期："+JSON.stringify(data.data))
                })
                .error(function(state){
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '获取生长周期失败',
                        buttons: [{text: '知道了'}]
                    });
                });
        };*/
        $scope.growth = function(){
            $scope.data.params = TribeMarketService.get();//获得参数
            var commodityId = $scope.data.params.id;
            TribeMarketService.getGrowthCycleInfo(commodityId,$scope.data.currPage)
                .success(function(data){
                    if(data.code == 200 ){
                        if (data.data.length > 0) {
                            $scope.growthArr = data.data;
                            for (var i = 0; i < $scope.growthArr.length; i++) {
                                $scope.growthArr[i].index = i;
                                console.log($scope.growthArr[i].index);
                            }
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        }
                        if(data.data.length <= 10){
                            $scope.data.moredata = false;
                        }
                    }
                    console.log("生长周期："+JSON.stringify(data.data))
                })
                .error(function(state){
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '获取生长周期失败',
                        buttons: [{text: '知道了'}]
                    });
                });
        };
        //查看更多生长周期 $scope.data.params.id
        $scope.moreLoad = function(){
            //alert($scope.data.moredata);
            $scope.data.params = TribeMarketService.get();//获得参数
            var commodityId = $scope.data.params.id;
            $scope.data.currPage ++;
            //console.log("为什么不能获取到==============="+ commodityId + "+++++++++++++++"+  $scope.data.currPage);
            TribeMarketService.getGrowthCycleInfo(commodityId,$scope.data.currPage)
                .success(function(data){
                    if(data.code == 200){
                        for (var i = 0; i < $scope.growthArr.length; i++) {
                            $scope.growthArr[i].index = i;
                            console.log($scope.growthArr[i].index);
                        };
                        //上拉加载更多=================
                        for(var j = 0; j < data.data.length; j++){

                            $scope.growthArr.push(data.data[j]);

                        }
                        if (data.data.length > 0) {
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                            console.log("看看数据长度"+$scope.growthArr.length);
                        } else {
                            $scope.data.moredata = false;
                        }
                    }
                    console.log("生长周期："+JSON.stringify(data.data))
                })
                .error(function(state){
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '获取生长周期失败',
                        buttons: [{text: '知道了'}]
                    });
                });
        };
        //查看推荐商品
        $scope.commendGoods = function(){
            TribeMarketService.gettestimonials($scope.data.params.id, $scope.data.params.shop_id)
                .success(function(data){
                    if(200 == data.code){
                        $scope.data.commendGoods = data.data;
                    }
                    else{
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template: data.message,
                            buttons: [{text: '知道了'}]
                        });
                    }
                    console.log("推荐商品："+JSON.stringify(data.data))
                })
                .error(function(state){
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '获取推荐商品失败',
                        buttons: [{text: '知道了'}]
                    });
                });
        };
        //跳转到卖家店铺
        $scope.sellStore = function(){
            $state.go('sellStore',{data:{"id":$scope.data.params.id, "shopId":$scope.data.params.shop_id}});
        };
        //增加购买数量
        $scope.addNum = function(){
            if(($scope.data.list.weight) == ($scope.data.buyNum)){
                var alertPopup = $ionicPopup.alert({
                    title: '提示',
                    template: '库存不足，无法继续购买',
                    buttons: [{text: '知道了'}]
                });
                return;
            }else{
                $scope.data.buyNum += 1;
                $scope.data.nowBuyWeight =  $scope.data.buyNum;
            }
        }
        //减少购买数量
        $scope.cutNum = function(){
            if(1 == $scope.data.buyNum){
                $scope.data.buyNum = 1;
                return;
            }else{
                $scope.data.buyNum  =  $scope.data.buyNum - 1;
                $scope.data.nowBuyWeight =  $scope.data.buyNum;
            }
        }
        //立即购买
        $scope.buyNow = function(){
            //$scope.data.sumPrice = $scope.data.buyNum * $scope.data.list.price;//消费总额
            $scope.getParams();
            console.log(JSON.stringify($scope.nextPageParams)+"------------------------------------立即购买参数")

            // 订单价格检查
            if($scope.nextPageParams.total_price == null || $scope.nextPageParams.total_price < 0.0001){
                var alertPopup = $ionicPopup.alert({
                    title: '提示',
                    template: '商品金额异常',
                    buttons: [{text: '知道了'}]
                });
                return;
            }

            //-------------------------------下单----------
            RecoverService.set($scope.nextPageParams);
            $state.go('deliveryWay',{data:{"from":'TribeMarket',"totalPrice":$scope.nextPageParams.total_price}});
            //$scope.confirmOrder();
        }
        //----------------------下单
       /* $scope.confirmOrder  = function() {
            // 先清空数据
            $scope.data.goodsListBuf = [];
            // 拼装数据
            var newBuf = {};
            newBuf.goodsid   = $scope.data.list.commodity_id;
            newBuf.goodstype = '1';
            newBuf.quantity  = '1';
            newBuf.summary   = '部落市场消费';
            newBuf.imageurl  = 'xxxxxxx';
            newBuf.goodsprice= $scope.data.sumPrice;
            $scope.data.goodsListBuf.push(newBuf);
            $ionicLoading.show({
                template: '载入中...'
            });
            console.log(UserService.getUserId()+"----"+$scope.data.sumPrice+"------"+ JSON.stringify($scope.data.goodsListBuf));
            OrderService.addOrder(UserService.getUserId(), $scope.data.sumPrice, JSON.stringify($scope.data.goodsListBuf), 3)
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
                                $state.go('paySelect', {'from' : 'TribeMarket', 'orderId' : data.data[0].orderid, 'orderPrice' : $scope.data.sumPrice, 'description' : '市场消费'});
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
        };*/
        // 处理图片路径
        $scope.handlePath = function(path,file,isThumb){
            if(file){
                var url = path+file;
            }else{
                var url = path;
            }
            console.log("==========------------" + url);
            return converImageUrl(url, isThumb);

        };
        //点击推荐商品
        $scope.marketInfo = function(id,shopId){
            $scope.params.id = id;
            $scope.params.shop_id = shopId;
            TribeMarketService.set($scope.params);//设置商品id
            $scope.getProductInfo();
        };
        //获取参数
        $scope.getParams = function(){
            $scope.nextPageParams.seller_id = $scope.data.params.shop_id;//商铺id
            $scope.nextPageParams.commodity_id = $scope.data.list.commodity_id;//商品id
            if($scope.data.list.commodity_name){
                $scope.nextPageParams.commodity_name = $scope.data.list.commodity_name;//商品名称
            }else{
                $scope.nextPageParams.commodity_name = '【'+ $scope.data.list.crop_kind + '】' + $scope.data.list.crop_name
            }

            $scope.nextPageParams.commodity_number = $scope.data.buyNum;//商品数量
            $scope.nextPageParams.commodity_price = $scope.data.list.price;//商品单价
            $scope.nextPageParams.total_price = $scope.data.buyNum * $scope.data.list.price;//订单总额
            TribeMarketService.setLocalStorage('totalPrice',$scope.nextPageParams.total_price);//价格进行本地存储
            $scope.nextPageParams.create_id = UserService.getUserId();//购买会员id
        };

        //--------------------
        $ionicModal.fromTemplateUrl('my-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        //打开模板
        $scope.openModal = function(index, cur) {
            $scope.data.clickImgIndex = index;
            $scope.data.curImg = cur;
            $scope.modal.show();
            //alert($scope.data.clickImgIndex);
        };
        //关闭模板
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
    });
