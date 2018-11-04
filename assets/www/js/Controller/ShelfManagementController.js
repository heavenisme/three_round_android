// 上架管理-控制器
angular.module('starter.ShelfManagementController', [])
//======================================================
    .controller('ShelfManagementController', function($scope, $state, $ionicLoading, $ionicHistory, MyShopService, $stateParams) {
        //-----------------------------
        $scope.data={};
        $scope.content = [];    //空数组接收后台返回数据
        // 返回主页
        $scope.gotoHome = function(){
            $ionicHistory.goBack();
        };
        // 处理图片路径
        $scope.handlePath = function(path,file,isThumb){
            if(file){
                var url = path+file;
            }else{
                var url = path;
            }
            return converImageUrl(url, isThumb);
        };
        //得到上架商品信息
        $scope.getShelfInfo = function(){

            var shop_id = $stateParams.data.shop_id;
            console.log("店铺id，有没有获取到================》》》》》》》》》》》》" + shop_id);

            MyShopService.getShelf(shop_id)
                .success(function(data){
                    console.log("成功没有==============》》》》成功了"+JSON.stringify(data));
                    $scope.content = data.data;

                })
                .error(function(state){
                    console.log(state)
                })
        };
        //商品价格
        $scope.goGoodsPrice = function(commodity_id,tribe_weight,open_weight,tribe_price,open_price,surplus,crop_name){
            $state.go("goods_price",{data:{"commodity_id":commodity_id,"tribe_weight":tribe_weight,"open_weight":open_weight,

                "tribe_price":tribe_price,"open_price":open_price,"surplus":surplus,"crop_name":crop_name}});

            console.log("我的参数传的对不对是不是不"+commodity_id+tribe_weight+open_weight+tribe_price+open_price);           //120050
        };

    });
