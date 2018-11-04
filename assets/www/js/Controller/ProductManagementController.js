// 商品管理-控制器
angular.module('starter.ProductManagementController', [])
//======================================================
    .controller('ProductManagementController', function($scope, $state, $ionicLoading,$ionicHistory,MyInfoService,$ionicActionSheet,MyShopService,$ionicPopup,$stateParams,UserService) {
        $scope.data = {
            list:{}//商品列表
        }
        $scope.params = {
            commodity_name :"",//商品名称
            description :"",//商品描述
            shop_id:0,//店铺id
            commodity_id :0//商品id
        }
        $scope.uploadImg = {
            base64:"",//上传图片
            commodity_id:0
        }
        //-----------------------------
        // 返回主页
        $scope.gotoHome = function(){
            $ionicHistory.goBack();
        };
        //商品详情
        $scope.goToProductDetail = function(index){
            $scope.params.commodity_id = $scope.data.list[index].commodity_id;//商品id
            $scope.params.description = $scope.data.list[index].description;//商品描述

            if($scope.data.list[index].commodity_name != null){
                $scope.params.commodity_name = $scope.data.list[index].commodity_name;//商品名称
            }else{
                $scope.params.commodity_name = $scope.data.list[index].crop_name + '【'+ $scope.data.list[index].crop_kind + '】';//商品名称
            }
            
            $scope.params.shop_id = $stateParams.data.shop_id;//店铺id
            console.log(JSON.stringify($scope.params)+"----商品详情")
            MyShopService.set($scope.params);//传递参数
            $state.go('productDetail');
        }
        // 上传
        $scope.upload = function(fileURL,id){
            $ionicLoading.show({
                template: '正在上传请稍候...'
            });
            $scope.uploadImg.base64 = fileURL;
            $scope.uploadImg.commodity_id = id;
            MyShopService.uploadImg($scope.uploadImg)
                .success(function(data){
                    $ionicLoading.hide();
                    if(200 == data.code){
                        $scope.getProduct();
                    }
                })
                .error(function(state){
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '网络异常',
                        buttons: [{text: '知道了'}]
                    });
                });
            //var options = new FileUploadOptions();
            //options.fileKey="file";
            //options.fileName="buf.jpeg";
            //options.mimeType="image/jpeg";
            ////新建FileTransfer对象
            //var ft = new FileTransfer();
            //console.log(AC.SERVER_URL()+'/MyShop/updateCommodityInfo/post' + "----------------------------------------后台url")
            ////上传文件
            //ft.upload(
            //    $scope.uploadImg,
            //    encodeURI(AC.SERVER_URL()+'/MyShop/updateCommodityInfo'),//把图片及其他参数发送到这个URL，相当于一个请求，在后台接收图片及其他参数然后处理
            //    uploadSuccess,
            //    uploadError,
            //    options);
            ////upload成功的话
            //function uploadSuccess(r) {
            //    var resp = JSON.parse(r.response);
            //    if(resp.code == 200){
            //        UserService.setImage(AC.SERVER_IP() + resp.data[0].image_path);
            //        $scope.data.image     = UserService.getImage();
            //        alert('上传成功后的地址：'+ $scope.data.image);
            //        $scope.$apply();
            //    }
            //}
            ////upload失败的话
            //function uploadError(error) {
            //    console.log(JSON.stringify(error) + "=================================================上传error")
            //}
        }
        //更换图片
        $scope.changeProductImg = function(id){
            var hideSheet = $ionicActionSheet.show({
                buttons: [{
                    text: '拍照'
                }, {
                    text: '相册'
                }],
                titleText: '更换图片',
                cancelText: '取消',
                cancel: function() {
                    // 取消
                },
                buttonClicked: function(index) {
                    // 拍照
                    if (index == 0) {
                        MyShopService.getPicture("camera").success(function(imageURI) {
                            $scope.upload(imageURI,id);
                        });
                    }
                    // 相册
                    else if (index == 1) {
                        MyShopService.getPicture("photo").success(function(imageURI) {
                            $scope.upload(imageURI,id);
                        });
                    }
                    return true;
                }
            });
        }
        //init
        $scope.getProduct = function(){
            MyShopService.getCommodity($stateParams.data.shop_id)
                .success(function(data){
                    if(200 == data.code){
                        $scope.data.list = data.data;
                    }
                    console.log("商品列表："+JSON.stringify(data.data))
                })
                .error(function(state){
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '网络异常',
                        buttons: [{text: '知道了'}]
                    });
                });
        }
        // 处理图片路径
        $scope.handlePath = function(path,file,isThumb){
            if(file){
                var url = path+file;
            }else{
                var url = path;
            }
            return converImageUrl(url, isThumb);
        };
    });
