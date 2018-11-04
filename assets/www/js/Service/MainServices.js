angular.module('starter.MainServices', [])

// 将网络拦截器注入
.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('NetworkInterceptor');
}])

//-------------------------------------------
// 网络拦截器
// 作为网络请求统一处理
.factory('NetworkInterceptor', ["$q", "$injector", function($q, $injector) {
  var httpInterceptor = {
    // 请求拦截
    request: function(config) {
      var ionicLoading = $injector.get('$ionicLoading');
      ionicLoading.show({
        template: '载入中...'
      });

      return config;
    },
    response: function(res) {
        var ionicLoading = $injector.get('$ionicLoading');
        ionicLoading.hide();

        // FIXME
        // var resStr = JSON.stringify(res)
        // if(resStr.indexOf("/api/v1/app") != -1){
        //   // alert(resStr)
        // }
        var webLoginTag = "<!-- 此行注释坚决不能动 app以此判断登录异常（临时方案） -->";

        console.log(JSON.stringify(res.data));

        if(res.status == 200 && typeof(res.data) == 'string' && res.data.indexOf(webLoginTag) != -1){
            var UserService = $injector.get('UserService');
            if(UserService.isLogined()){
              var state = $injector.get('$state');
              state.go("tab.my");
              UserService.logout();
            }
            return null;
        }

        return res || $q.when(res);
    },
    "responseError": function(response) {
      var ionicLoading = $injector.get('$ionicLoading');
      ionicLoading.hide();

      if(response.status == 0){//此时服务器与客户端无法通讯
        var UserService = $injector.get('UserService');
        if(UserService.isLogined()){
          var state = $injector.get('$state');
          state.go("tab.my");
          UserService.logout();
        }

        return null;
      }
      return $q.reject(response);
    }
  }
  return httpInterceptor;
}])




//-------------------------------------------
// 个人信息服务
.service("MyInfoService", function($q, $http) {
  return {
    //-------------------------------------------
    // 获取图片
    // @dataSrc 数据源 camera
    getPicture: function(dataSrc) {
      var d = $q.defer();
      var promise = d.promise;

      if (dataSrc == "camera") {
        // 相机
        navigator.camera.getPicture(onSuccess, onFail, {
          quality: 50,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.CAMERA, // 相册(去掉源==相机)
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth : 100,
          targetHeight: 100
        });
      } else {
        // 相册
        navigator.camera.getPicture(onSuccess, onFail, {
          quality: 50,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY, // 相册(去掉源==相机)
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth : 100,
          targetHeight: 100
        });
      }

      // 选择成功
      function onSuccess(imageURI) {
        //alert("imageURI = " + imageURI);
        d.resolve(imageURI);
      }

      // 选择失败
      function onFail(message) {
        //alert('Failed because: ' + message);
        d.reject(message);
      }

      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      }

      promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
      }
      return d.promise;
    },
      //---------------------------
      // 获取土地购买协议
      getBuyLandProtocol : function(userId){

          var deferred = $q.defer();
          var promise = deferred.promise;

          alert(AC.BUYLAND_AGREEMENT() + "?userId=" + userId);

          //ajax请求
          $http.get(AC.BUYLAND_AGREEMENT() + "?userId=" + userId)
          .success(
              function(data, status, headers, config) {
                  deferred.resolve(data);
              }
          )
          .error(
              function(data, status, headers, config) {
                  deferred.reject(status);
              }
          );

          promise.success = function(fn) {
              promise.then(fn);
              return promise;
          }
          promise.error = function(fn) {
              promise.then(null, fn);
              return promise;
          }
          return promise;
      }


  };

})

;
