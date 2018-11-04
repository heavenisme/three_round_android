angular.module('starter.UserService', [])
//-------------------------------------------
.service("UserService", function($q, $http) {
	var _isLogined = false;	// 是否登陆过

	var _userId;			// 用户ID
	//var _token = null;				// Token
	var _houseId;		// 大棚ID  <0 == 没有大棚

	var _nickname;			// 昵称
	var _userRole;			// 身份
	var _hender;			// 性别
	var _age;				// 年龄
	var _image;				// 头像
	var _signature;			// 签名
    var _advice;           //用户反馈内容

	var _myGreenHouseList = [];	// 拥有哪些大棚的土地

	return {
		// 是否登陆过
		isLogined: function(){
			return _isLogined;
		},
		setLogined: function(isLogin){
			_isLogined = isLogin;
		},

		// 用户ID
		setUserId: function(userId){
			_userId = userId;
		},
		getUserId: function(){
			return _userId;
		},

		// 手机号
		setUserPhone: function(userPhone){
			window.localStorage.setItem("userPhone", userPhone);
		},
		getUserPhone: function(){
			return window.localStorage.getItem("userPhone");
		},

		// Token
		setToken: function(token){
			//_token = token;
			window.localStorage.setItem("token", token);
		},
		getToken:  function(){
			//return _token;
			return window.localStorage.getItem("token");
		},

        //用户反馈内容
        setAdvice : function(advice){
            _advice = advice;
        },
        getAdvice : function(){
            return _advice;
        },

		// 用户信息
		setNickname : function(nickname){
			_nickname = nickname;
		},
		getNickname : function(){
			return _nickname;
		},
		setUserRole : function(userRole){
			_userRole = userRole;
		},
		getUserRole : function(){
			return _userRole;
		},
		setHender : function(hender){
			_hender = hender;
		},
		getHender : function(){
			return _hender;
		},
		setAge : function(age){
			_age = age;
		},
		getAge : function(){
			return _age;
		},
		setImage : function(image){
			_image = image;
		},
		getImage : function(){
			return _image;
		},
		setSignature : function(signature){
			_signature = signature;
		},
		getSignature : function(){
			return _signature;
		},
		setHouseId : function(houseId){
			_houseId = houseId;
		},
		getHouseId : function(houseId){
			return _houseId;
		},
		setMyGreenHouseList : function(data){
			_myGreenHouseList = data;
		},
		getMyGreenHouseList : function(){
			return _myGreenHouseList;
		},
		//------------------------------------------
		// 获取当前平台
		getCurrPlatform: function() {
			var platform = "unknown";
			if(ionic.Platform.isIOS())
				platform = "ios";
			if(ionic.Platform.isAndroid())
				platform = "android";
			return platform;
		},
		//------------------------------------------
		// 过去服务器列表
		getServerUrl: function() {
			var deferred = $q.defer();
			var promise = deferred.promise;

			console.log(AC.GET_SERVER_URL());

			//ajax请求
			$http.get(AC.GET_SERVER_URL())
				.success(
					function(data, status, headers, config) {
						deferred.resolve(data);
					}
				)
				.error(
					function(data, status, headers, config) {
						deferred.reject(status);
						console.log(JSON.stringify(config));
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
		},
		//------------------------------------------
		// 测试服务器
		testServer: function(url) {
			var deferred = $q.defer();
			var promise = deferred.promise;

			console.log(url);

			//ajax请求
			$http.get(url)
				.success(
					function(data, status, headers, config) {
						alert("success");
						deferred.resolve(data);
					}
				)
				.error(
					function(data, status, headers, config) {
						alert("error");
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
		},
		//------------------------------------------
		// 登陆
		login: function(phoneNumber, password) {

			var deferred = $q.defer();
			var promise = deferred.promise;

			//ajax请求
			$http.get(AC.USER_LOGIN(), {params: {'mobile': ''+phoneNumber, 'password': ''+password, 'anywide': '611fb0858dfe4f41'}})
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
		},
		//------------------------------------------
		// 是否需要登陆
		needLogin: function(token) {
			var deferred = $q.defer();
			var promise = deferred.promise;

			//ajax请求
			$http.get(AC.USER_NEED_LOGIN()+"?token="+token)
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
		},
		//------------------------------------------
		// 注销
		logout: function() {
			var deferred = $q.defer();
			var promise = deferred.promise;

			_isLogined = false;
			// 清除token
            window.localStorage.setItem("token", null);
            _nickname 	= null;
            _image 		= null;
            _signature 	= null;
            _myGreenHouseList = [];

            // 停止推送
            // PushFSM.stopPush();

			//ajax请求
			$http.get(AC.USER_LOGOUT())
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
		},
		//------------------------------------------
		// 修改密码
		setNewPassword: function(userId, oldPassword, newPassword) {
			var deferred = $q.defer();
			var promise = deferred.promise;

			//ajax请求
			$http.put(AC.USER_NEW_PASSWORD()+"?userId="+userId+"&password="+oldPassword+"&newPassword="+newPassword)
				.success(
					function(data, status, headers, config) {
						deferred.resolve(data);
					}
				)
				.error(
					function(data, status, headers, config) {
						deferred.reject(status);
						console.log(JSON.stringify(config));
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
		},
		//------------------------------------------
		// 忘记密码，获取验证码
		getForgetVerify: function(mobile) {
			var deferred = $q.defer();
			var promise = deferred.promise;

			console.log(AC.USER_GET_VERIFY()+"?mobile="+mobile);

			//ajax请求
			$http.get(AC.USER_GET_VERIFY()+"?mobile="+mobile)
				.success(
					function(data, status, headers, config) {
						deferred.resolve(data);
					}
				)
				.error(
					function(data, status, headers, config) {
						deferred.reject(status);
						console.log(JSON.stringify(config));
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
		},
		//------------------------------------------
		// 忘记密码手机号和验证码校验
		checkVerify: function(mobile, validCode) {
			var deferred = $q.defer();
			var promise = deferred.promise;

			console.log(AC.USER_CHECK_VERIFY()+"?mobile="+mobile+"&validCode="+validCode);

			//ajax请求
			$http.get(AC.USER_CHECK_VERIFY()+"?mobile="+mobile+"&validCode="+validCode)
				.success(
					function(data, status, headers, config) {
						deferred.resolve(data);
					}
				)
				.error(
					function(data, status, headers, config) {
						deferred.reject(status);
						console.log(JSON.stringify(config));
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
		},
		//------------------------------------------
		// 忘记密码修改密码
		changePassword: function(mobile, newPassword, key) {
			var deferred = $q.defer();
			var promise = deferred.promise;

			console.log(AC.USER_CHANGE_PASSWORD()+"?mobile="+mobile+"&newPassword="+newPassword+"&key="+key);

			//ajax请求
			$http.put(AC.USER_CHANGE_PASSWORD()+"?mobile="+mobile+"&newPassword="+newPassword+"&key="+key)
				.success(
					function(data, status, headers, config) {
						deferred.resolve(data);
					}
				)
				.error(
					function(data, status, headers, config) {
						deferred.reject(status);
						console.log(JSON.stringify(config));
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
		},
		//------------------------------------------
		// 获取TAG AC.USER_GET_TAGS()
		getUserTags: function(userId) {
			var deferred = $q.defer();
			var promise = deferred.promise;

			//ajax请求
			$http.get(AC.USER_GET_TAGS()+"/"+userId)
				.success(
					function(data, status, headers, config) {
						deferred.resolve(data);
					}
				)
				.error(
					function(data, status, headers, config) {
						deferred.reject(status);
						console.log(JSON.stringify(config));
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
		},
		//------------------------------------------
		// 注册  activeCode=3786
		register: function(mobile, password, activeCode) {
			var deferred = $q.defer();
			var promise = deferred.promise;

			//ajax请求
			$http.post(AC.USER_REGISTER()+"?mobile="+mobile+"&password="+password+"&activeCode="+activeCode)
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
		},
		//------------------------------------------
		// 上传头像
		setUserImage : function(userId, image, extension){
			var deferred = $q.defer();
			var promise = deferred.promise;

			// console.log(AC.USER_SET_IMAGE()+"?userId="+userId+"&image="+image+"&extension="+extension);

			//ajax请求
			// $http.put(AC.USER_SET_IMAGE()+"?userId="+userId+"&image="+image+"&extension="+extension)
			$http.post(AC.USER_SET_IMAGE(), {params: {'image': ''+image, 'extension': ''+extension}})
				.success(
					function(data, status, headers, config) {
						deferred.resolve(data);
						console.log(JSON.stringify(headers));
						console.log(JSON.stringify(config));
					}
				)
				.error(
					function(data, status, headers, config) {
						deferred.reject(status);
						console.log(JSON.stringify(headers));
						console.log(JSON.stringify(config));
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
		},
		//------------------------------------------
		// 获取注册手机验证码
		getActive: function(mobile) {
			var deferred = $q.defer();
			var promise = deferred.promise;

			//ajax请求
			$http.get(AC.USER_GET_ACTIVE()+"?mobile="+mobile)
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
		},

		//-----------------------------------------
		// 获取地址列表
		//getAddresses : function(userId){
		//	var deferred = $q.defer();
		//	var promise = deferred.promise;
        //
		//	//ajax请求
		//	$http.get(AC.USER_GET_ADDRESSES() + "/" + userId)
		//		.success(
		//			function(data, status, headers, config) {
		//				deferred.resolve(data);
		//			}
		//		)
		//		.error(
		//			function(data, status, headers, config) {
		//				deferred.reject(status);
		//			}
		//		);
        //
		//	promise.success = function(fn) {
		//		promise.then(fn);
		//		return promise;
		//	}
		//	promise.error = function(fn) {
		//		promise.then(null, fn);
		//		return promise;
		//	}
		//	return promise;
		//},

		//-----------------------------------------
		// 获取用户信息
		getUserInfo : function(userId){
			var deferred = $q.defer();
			var promise = deferred.promise;

			//ajax请求
			$http.get(AC.USER_GET_INFO() + "/" + userId)
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
		},
		//------------------------------------------
		// 签到
		signon: function() {
			var deferred = $q.defer();
			var promise = deferred.promise;
			//ajax请求
			$http.post(AC.USER_SIGNON())
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
		},
		//------------------------------------------
		// 签到信息
		getSignonInfo: function() {
			var deferred = $q.defer();
			var promise = deferred.promise;
			//ajax请求
			$http.get(AC.USER_SIGNON_INFO())
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
		},
		//----------------------------------------
		// 创建地址
		//createAddress : function(userId, name, tel, address){
		//	var deferred = $q.defer();
		//	var promise = deferred.promise;
		//
		//	//ajax请求
		//	$http.post(AC.USER_ADD_ADDRESS()+"?addressId="+userId+"&name="+name+"&tel="+tel+"&address="+address)
		//		.success(
		//			function(data, status, headers, config) {
		//				deferred.resolve(data);
		//			}
		//		)
		//		.error(
		//			function(data, status, headers, config) {
		//				deferred.reject(status);
		//			}
		//		);
        //
		//	promise.success = function(fn) {
		//		promise.then(fn);
		//		return promise;
		//	}
		//	promise.error = function(fn) {
		//		promise.then(null, fn);
		//		return promise;
		//	}
		//	return promise;
		//},
		//----------------------------------------
		// 删除地址
		deleteAddress : function(addressId){
			var deferred = $q.defer();
			var promise = deferred.promise;

			//ajax请求
			$http.delete(AC.USER_DELETE_ADDRESS()+"?addressId="+addressId)
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
		},
		//----------------------------------------
		// 修改地址
		//setAddress : function(addressId, name, tel, address){
		//	var deferred = $q.defer();
		//	var promise = deferred.promise;
        //
		//	//ajax请求
		//	$http.put(AC.R()+"?addressId="+addressId+"&name="+name+"&tel="+tel+"&address="+address)
		//		.success(
		//			function(data, status, headers, config) {
		//				deferred.resolve(data);
		//			}
		//		)
		//		.error(
		//			function(data, status, headers, config) {
		//				deferred.reject(status);
		//			}
		//		);
        //
		//	promise.success = function(fn) {
		//		promise.then(fn);
		//		return promise;
		//	}
		//	promise.error = function(fn) {
		//		promise.then(null, fn);
		//		return promise;
		//	}
		//	return promise;
		//},
		//------------------------------------------
		// 用户身份升级
		updateUser : function(userId, landcode){
			var deferred = $q.defer();
			var promise = deferred.promise;

			//ajax请求
			$http.put(AC.USER_UPDATE()+"?userId="+userId+"&landCode="+landcode)
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
		},
		//------------------------------------------
		// 修改昵称
		setUserName : function(userId, nickName){
			var deferred = $q.defer();
			var promise = deferred.promise;

			if(nickName == null) {
				nickName = "都市小菜农";
			}

			//ajax请求
			$http.put(AC.USER_SET_NAME()+"?userId="+userId+"&nickName="+nickName)
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
		},
		//------------------------------------------
		// 设置签名
		setUserSignature : function(userId, signature){
			var deferred = $q.defer();
			var promise = deferred.promise;

			//ajax请求
			$http.put(AC.USER_SET_SIGNATURE()+"?userId="+userId+"&signature="+signature)
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
		},
		//------------------------------------------
		// 获取我的投票
		getMyVote : function(userId){
			var deferred = $q.defer();
			var promise = deferred.promise;

			//ajax请求
			$http.get(AC.USER_GET_VOTE()+"?userId="+userId)
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
		},
		//------------------------------------------
		// 投票
		setMyVote : function(userId, voteExplainId, voteOptionId){
			var deferred = $q.defer();
			var promise = deferred.promise;

			//ajax请求
			$http.get(AC.USER_SET_VOTE()+"?userId="+userId+"&voteExplainId="+voteExplainId+"&voteOptionId="+voteOptionId)
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
		},
        //------------------------------------------
        //ios升级
        getUpGrade : function(){
            var deferred = $q.defer();
            var promise = deferred.promise;

            //ajax请求
            $http.get(AC.UPGRADE())
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
});
