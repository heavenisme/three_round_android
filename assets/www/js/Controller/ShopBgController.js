// 店铺背景-控制器
angular.module('starter.ShopBgController', [])
//======================================================
    .controller('ShopBgController', function($scope, $state, $ionicLoading,$ionicHistory,MyInfoService,$ionicActionSheet,$stateParams,MyShopService,UserService) {
        //-----------------------------
        // 返回主页
        $scope.gotoHome = function(){
            $ionicHistory.goBack();
        };
        $scope.content={};
        //获取我的店铺信息
        $scope.getMyShop_Info = function(){
            console.log("函数走没走，看看++++++++++++++++++++》》");
            var userId = UserService.getUserId();
            console.log("函数走没走，看看++++++++++++++++++++++++++++++++++》》" + userId);
            MyShopService.getMyShopInfo(userId)
                .success(function(data){
                    console.log("店铺背景获取的店铺信息" + JSON.stringify(data));
                    if(data.code==200){
                        $scope.content = data.data[0];
                    }

                })
                .error(function(state){
                    console.log(state)
                });
        };

        $scope.uploadImg = {
            shop_id:"",
            base64:""   //上传图片
        };
        // 上传
        $scope.uploadBg = function(fileURL) {
            $ionicLoading.show({
                template: '正在上传请稍候...'
            });
            $scope.uploadImg.base64 = fileURL;
            $scope.uploadImg.shop_id = $scope.content.shop_id;
            console.log("参数获取成功===============》》》》》》》"+$scope.uploadImg.base64+"================"+$scope.uploadImg.shop_id);
            MyShopService.updateBackground($scope.uploadImg)
                .success(function (data) {
                    $ionicLoading.hide();
                    if (200 == data.code) {
                        console.log("图片上传成功yes");
                        $scope.getMyShop_Info();

                    }
                })
                .error(function (state) {
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '网络异常',
                        buttons: [{text: '知道了'}]
                    });
                });
        };
        //更换背景图片
        $scope.changeShopBg = function(){
            var hideSheet = $ionicActionSheet.show({
                buttons: [{
                    text: '拍照'
                }, {
                    text: '相册'
                }],
                titleText: '修改背景',
                cancelText: '取消',
                cancel: function() {
                    // 取消
                },
                buttonClicked: function(index) {
                    // 拍照
                    if (index == 0) {
                        MyShopService.getPicture("camera").success(function(imageURI) {
                            console.log("图片链接是什么==============》》》》》》》》》》》》"+imageURI);
                            $scope.uploadBg(imageURI);
                        });
                    }
                    // 相册
                    else if (index == 1) {
                        MyShopService.getPicture("photo").success(function(imageURI) {
                            $scope.uploadBg(imageURI);
                        });
                    }
                    return true;
                }
            });
        };
        //更换背景图片----end

        // 处理图片路径
        $scope.handlePath = function(path,file,isThumb){
            var url = path+file;
            return converImageUrl(url, isThumb);
        };

    });
