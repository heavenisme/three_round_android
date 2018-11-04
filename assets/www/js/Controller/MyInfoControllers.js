// 我的-控制器
angular.module('starter.MyInfoControllers', [])
//======================================================
// 身份升级
	.controller('UpdateIdentityCtrl', function($scope, $state, $ionicLoading, $ionicHistory, UserService) {
	  //----------------------------------------------------
	  // 数据
	  $scope.data = {};

	  //判断是否为ios平台下
      //    $scope.ios = ionic.Platform.isIOS();
	  $scope.ios = (UserService.getCurrPlatform() == "ios");

	  //----------------------------------------------------
	  // 验证身份
	  $scope.updateIdentity = function() {

			// 身份升级
			var userId   = UserService.getUserId();
			var landcode = $scope.data.placeNumber;

			$ionicLoading.show({
			  template: '验证中...'
			});

			UserService.updateUser(userId, ''+landcode)
			.success(function(data){

				$ionicLoading.hide();
				if(data.code == 200){
					// 设置为耘客
					UserService.setUserRole(1);
					$ionicHistory.goBack();
				}
				else{

				}
			})
			.error(function(state){

				$ionicLoading.hide();
				// TODO worng

			});
	  };

	})

	//======================================================
	// 编辑昵称
	.controller('EditNameCtrl', function($scope, $state, $ionicLoading, $ionicHistory, UserService) {
	  //----------------------------------------------------
	  // 数据
	  $scope.data = {};
	  //----------------------------------------------------
	  // 修改昵称
	  $scope.editName = function() {
		  // TODO
		  $ionicLoading.show({
			  template: '小心的修改中...'
		  });

		  UserService.setUserName(UserService.getUserId(), $scope.data.name)
			.success(function(data) {
				$ionicLoading.hide();
				if (data.code == 200)
				{
					UserService.setNickname($scope.data.name);
					$ionicHistory.goBack();
				}
				else{
					// TODO
				}
			})
			.error(function(state){
				$ionicLoading.hide();
				// TODO
			});
	  };

	})

	//======================================================
	// 地址管理
	.controller('AddressManageCtrl', function($scope, $state, $ionicLoading, UserService, $ionicHistory,RecoverService) {
	  //----------------------------------------------------
        $scope.gotoHome = function(){
            $ionicHistory.goBack();
        };
	  // 数据
	  $scope.data = {};
	  // 地址列表
	  $scope.data.addressList = [];

	  //---------------------------------------------------
	  // 请求所有地址列表
	  $scope.requestAddresses = function(){

		  $ionicLoading.show({
			  template: '努力寻找地址...'
		  });
          var userId = UserService.getUserId();
          RecoverService.getDeliveryAddressList(userId)
              .success(function(data){
                  $ionicLoading.hide();
                  $scope.data.addressList = data;
              })
              .error(function(state){
                  $ionicLoading.hide();
                  var alertPopup = $ionicPopup.alert({
                      title: '提示',
                      template: '网络异常',
                      buttons: [{text: '知道了'}]
                  });
              });
	  };

	  //----------------------------------------------------
	  // 默认地址被点击
	  $scope.defaultAddressClick = function(id) {
		// //alert("defaultAddressClick = " + id);

		for (var i = 0; i < $scope.data.addressList.length; i++) {
		  var buf = $scope.data.addressList[i];
		  if (buf.addressId == id) {
			$scope.data.addressList[i].isDefault = 'true';
		  }
		  else{
			$scope.data.addressList[i].isDefault = 'false';
		  }
		};
	  };
        //选中地址
        $scope.data.selectAddressId = 0;
        $scope.checkThisAddress = function(obj){
            $scope.data.selectAddressId = obj.address_id;
            window.localStorage.setItem(UserService.getUserId(), JSON.stringify(obj));
        }
	  //----------------------------------------------------
	  // 编辑地址被点击
	  $scope.editAddressClick = function() {
		var buffer;
        var id = $scope.data.selectAddressId;
		for (var i = 0; i < $scope.data.addressList.length; i++) {
			var buf = $scope.data.addressList[i];
			if (buf.address_id == id) {
				buffer  = $scope.data.addressList[i];
			}
		}

		$state.go("createAddress", {data:buffer});
	  };
	  //----------------------------------------------------
	  // 删除地址被点击
	  $scope.deleteAddressClick = function(id) {

		  $ionicLoading.show({
			  template: '小心的删除中...'
		  });

		  UserService.deleteAddress(id)
		  .success(function(data){
			  $ionicLoading.hide();
			  // 删除成功
			  if(data.code == 200){
				  $scope.requestAddresses();
			  }
		  })
		  .error(function(state){
			  $ionicLoading.hide();
			  //alert("删除失败 "+state);
		  });
	  };
	  //----------------------------------------------------
	  // 新建地址
	  $scope.createAddressClick = function() {
		  $state.go("createAddress", {data:null});
	  };
	})

	//======================================================
	// 新建地址
	.controller('CreateAddressCtrl', function($scope, $state, $stateParams, $ionicLoading, $ionicHistory, UserService,RecoverService) {
	  //----------------------------------------------------
	  // 数据
	  $scope.data = {};

	  $scope.data.name = "";//收货人姓名
	  $scope.data.tel  = "";//联系电话
      $scope.data.addressDetail = "";  //详细地址
	  $scope.data.pro  = "辽宁省";//省份
	  $scope.data.city = "大连市";//市
      $scope.data.ars = "中山区";//区
	  $scope.data.address = "";
	  if ($stateParams.data != null)
	  {
		$scope.data.name    = $stateParams.data.name;
		$scope.data.tel     = parseInt($stateParams.data.phone);
		$scope.data.id      = $stateParams.data.address_id;
		$scope.data.address = $stateParams.data.address;
        var addressAry = $scope.data.address.split(' ');
        $scope.data.pro = addressAry[0];//省份
        $scope.data.city  = addressAry[1];//市
        $scope.data.ars  = addressAry[2];//区
        $scope.data.detail  = addressAry[3];//详细
		$scope.data.title = "修改地址";
	  }
	  else
	  {
		$scope.data.title = "新建地址";
	  }

	  //----------------------------------------------------
	  // 保存
	  $scope.save = function(){
          if("" == $scope.data.name){
              var alertPopup = $ionicPopup.alert({
                  title: '提示',
                  template: '姓名不能为空',
                  buttons: [{text: '知道了'}]
              });
              return;
          }else if("" == $scope.data.tel){
              var alertPopup = $ionicPopup.alert({
                  title: '提示',
                  template: '联系电话不能为空',
                  buttons: [{text: '知道了'}]
              });
              return;
          }
		  $ionicLoading.show({
			  template: '保存中，请稍后...'
		  });
          $scope.params = {};
          $scope.params.user_id = UserService.getUserId();//用户id
          $scope.params.address = "" + $scope.data.pro + " " + $scope.data.city + " " + $scope.data.ars + " " + $scope.data.detail; //地址
          $scope.params.phone = $scope.data.tel;//联系电话
          $scope.params.name = $scope.data.name;//收货人
          $scope.params.create_id = UserService.getUserId();//创建者id

		  if($scope.data.id == null)
		  {
              // 新建地址
              RecoverService.AddDeliveryAddress($scope.params)
			  .success(function(data){
				  $ionicLoading.hide();
				  if(data.flag == 1){
					  $ionicHistory.goBack();
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
		  else
		  {
			  // 修改地址
              $scope.params.address_id = $scope.data.id;
              RecoverService.editAddress($scope.params)
			  .success(function(data)
			  {
				  $ionicLoading.hide();
				  if(data.flag == 1){
					  $ionicHistory.goBack();
				  }
			  })
			  .error(function(state)
			  {
				  $ionicLoading.hide();
			  });
		  }
	  };

	})

	//======================================================
	// 账户安全
	.controller('AccountSafeCtrl', function($scope, $state) {
	  //----------------------------------------------------
	  // 数据
	  $scope.data = {};
	  //----------------------------------------------------
	  // 登陆密码点击
	  $scope.loginPasswordClick = function() {
		  $state.go('changePassword');
	  };
	  //----------------------------------------------------
	  // 手机验证点击
	  $scope.phoneNumberClick = function() {
		  //alert("low");
	  };

	})

	//======================================================
	// 修改密码
	.controller('ChangePasswordCtrl', function($scope, $state, $ionicPopup, $ionicLoading, $ionicHistory, UserService) {
	  //----------------------------------------------------
	  // 数据
	  $scope.data = {};
	  $scope.data.oldPassword;
	  $scope.data.newPassword;
	  $scope.data.newPasswordAgain;

      $scope.isDisabled = true;
        var changeState = function(){
            if($scope.data.oldPassword != "" &&  $scope.data.oldPassword.length > 0 &&
                $scope.data.newPassword != "" &&  $scope.data.newPassword.length > 0 &&
                $scope.data.newPasswordAgain != "" &&  $scope.data.newPasswordAgain.length > 0)
            {
                $scope.isDisabled = false;
            }else{
                $scope.isDisabled = true;
            }
        }
      $scope.$watch('data.oldPassword', function(newPassword, oldPassword) {
          changeState();
        });
        $scope.$watch('data.newPassword', function(newPassword, oldPassword) {
            changeState();
        });
        $scope.$watch('data.newPasswordAgain', function(newPasswordAgain, oldPasswordAgain) {
            changeState();
        });
	  // 修改密码
	  $scope.changePassword = function(){

	  	  if($scope.data.oldPassword == null){
	  	  	  var alertPopup = $ionicPopup.alert({
		          title: '提示',
		          template: '请输入您的旧密码',
		          buttons: [{text: '知道了'}]
		      });
	  	  	  return;
	  	  }
	  	  if($scope.data.newPassword == null){
	  	  	  var alertPopup = $ionicPopup.alert({
		          title: '提示',
		          template: '请输入您的新密码',
		          buttons: [{text: '知道了'}]
		      });
	  	  	  return;
	  	  }
	  	  if($scope.data.newPasswordAgain == null){
	  	  	  var alertPopup = $ionicPopup.alert({
		          title: '提示',
		          template: '请输入确认密码',
		          buttons: [{text: '知道了'}]
		      });
	  	  	  return;
	  	  }

	  	  if($scope.data.newPassword.length < 6 || $scope.data.newPassword.length > 20 || $scope.data.newPasswordAgain.length <6 || $scope.data.newPasswordAgain.length > 20){
	  	  	  var alertPopup = $ionicPopup.alert({
		          title: '提示',
		          template: '请输入6-20个字符',
		          buttons: [{text: '知道了'}]
		      });
	  	  	  return;
	  	  }

	  	  if($scope.data.newPassword != $scope.data.newPasswordAgain){
	  	  	  var alertPopup = $ionicPopup.alert({
		          title: '提示',
		          template: '两次密码输入不一致',
		          buttons: [{text: '知道了'}]
		      });
	  	  	  return;
	  	  }

	  	  var userId = UserService.getUserId();

	  	  UserService.setNewPassword(userId, $scope.data.oldPassword, $scope.data.newPassword)
	  	  .success(function(data)
	  	  {
	  	  		if(data.code == 200){
	  	  			var alertPopup = $ionicPopup.alert({
			            title: '提示',
			            template: '密码修改成功',
			            buttons: [{text: '知道了'}]
			        });
			        $scope.logout();
	  	  			return;
	  	  		}
	  	  		else{
	  	  			var alertPopup = $ionicPopup.alert({
			            title: '提示',
			            template: '' + data.message,
			            buttons: [{text: '知道了'}]
			        });
			        return;
	  	  		}
	  	  })
	  	  .error(function(state)
  	  	  {
  	  	  		var alertPopup = $ionicPopup.alert({
		            title: '提示',
		            template: '网络异常：' + state,
		            buttons: [{text: '知道了'}]
		        });
  	  	  });

	  };

	  //----------------------------------------------------
	  // 退出 注销 退回到登录页面
	  $scope.logout = function () {
	      // 跳转到登录页面
		  $state.go("tab.my");

		  UserService.logout()
			  .success(function (data) {

			  })
			  .error(function (state) {
			  });
	  };

	})

	//======================================================
	// 我的积分
	.controller('MyPointCtrl', function($scope, $state) {
	  //----------------------------------------------------
	  // 数据
	  $scope.data = {};
	  //----------------------------------------------------
	})


//======================================================
// 个人信息
.controller('MyInfoControllers', function($scope, $ionicLoading, $ionicHistory, $ionicPopup, $state, $ionicActionSheet, MyInfoService, UserService) {
  //----------------------------------------------------
  // 数据
  $scope.data = {};
  //----------------------------------------------------
  $scope.data.nickname  = UserService.getNickname();
  $scope.data.userRole  = "普通会员";
  $scope.data.hender    = UserService.getHender();
  $scope.data.age       = UserService.getAge();
  $scope.data.image     = UserService.getImage();

  // 返回
  $scope.gotoHome = function(){
      $ionicHistory.goBack();
  };

  $scope.updateUserRole = function(){
      // 身份
      if(UserService.getUserRole() == 1){
          $scope.data.userRole  = "耘客";
      }
      else if(UserService.getUserRole() == 2){
          $scope.data.userRole  = "酋长";
      }
  }



  //----------------------------------------------------
  // 打开头像上传对话框
  $scope.show = function() {
    var hideSheet = $ionicActionSheet.show({
      buttons: [{
        text: '拍照'
      }, {
        text: '相册'
      }],
      titleText: '选择头像',
      cancelText: '取消',
      cancel: function() {
        // 取消
      },
      buttonClicked: function(index) {
        // 拍照
        if (index == 0) {
          MyInfoService.getPicture("camera").success(function(imageURI) {
            alert(imageURI);
            // $scope.upload(imageURI);
          });
        }
        // 相册
        else if (index == 1) {
          MyInfoService.getPicture("photo").success(function(imageURI) {
            alert(imageURI);
            // $scope.upload(imageURI);
          });
        }

        return true;
      }
    });
  };

  //----------------------------------------------------
  // 跳转到身份升级页
  $scope.myCodeClick = function(){
      var alertPopup = $ionicPopup.alert({
          title: '提示',
          template: '功能暂未开放，敬请期待！',
          buttons: [{text: '知道了'}]
      });
  }
  //----------------------------------------------------
  // 跳转到身份升级页
  $scope.identityClick = function() {

      // 如果为农民才能升级
      if(UserService.getUserRole() == 0)
      {
          $state.go("updateIdentity");
      }
      /*else
      {
          var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: '你已经是会员啦！要不要来颗脑白金补补脑(づ￣3￣)づ╭❤～ ',
                buttons: [{text: '知道了'}]
            });
      }*/

  };

  //----------------------------------------------------
  // 跳转到修改昵称页
  $scope.nameClick = function() {
    $state.go("editName");
  };
  //----------------------------------------------------
  // 跳转到地址管理页
  $scope.addressManageClick = function() {
    /*$state.go("addressManage");*/
      var alertPopup = $ionicPopup.alert({
          title: '提示',
          template: '功能暂未开放，敬请期待！',
          buttons: [{text: '知道了'}]
      });
  };
  //----------------------------------------------------
  // 跳转我的积分页
  $scope.myPointClick = function() {
    $state.go("myPoint");
  };

});
