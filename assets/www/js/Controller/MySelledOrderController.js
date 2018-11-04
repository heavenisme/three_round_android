// 我的店铺-控制器
angular.module('starter.MySelledOrderController', [])
//======================================================
.controller('MySelledOrderController', function($scope, $state, $ionicLoading, $ionicHistory, MyShopService, UserService, $stateParams) {
    $scope.content = [];
    $scope.page = 0;
    $scope.haveMore = true;

    $scope.getSelledOrder = function(){
        MyShopService.getSelledOrder($scope.page)
            .success(function(data){
                if(data && data.code == 200 && data.data){
                    if(data.data.length > 0){
                        $scope.content = $scope.content.concat(data.data);
                        $scope.page++;
                    }
                    else{
                        $scope.haveMore = false;
                    }
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
            })
            .error(function(status){
              $scope.$broadcast('scroll.infiniteScrollComplete');
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

    $scope.infinite = function(){
        $scope.getSelledOrder();
    }
});
