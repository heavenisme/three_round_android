/**
 * 数据交互-网络服务
 */
angular.module('starter.PayService', [])
//-------------------------------------------
.service("PayService", function($q, $http) {
  var nowPayPagefrom;//当前页来自于哪里

	return{
	  setNowPayPageFrom : function(from){
        nowPayPagefrom = from;
    },
	  getNowPayPageFrom : function(){
	      return nowPayPagefrom;
	  },
		//------------------------------------------
		// 获取流水号
		getSerialNumber : function(userId){
			var deferred = $q.defer();
			var promise  = deferred.promise;

			$http.get(AC.TRADE_GET_SERIAL_NUMBER()+"?userId="+userId)
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

		//-------------------------------------------
		// 充值（已变更：二次确认）
		setAccountMoney : function(userId, serialNumber, money, platform){
			var deferred = $q.defer();
			var promise  = deferred.promise;

			console.log("充值后设置余额--------->" + AC.TRADE_SET_ACCOUNT()+"?userId=" + userId + "&serialNumber=" + serialNumber + "&money=" + money + "&platformType=" + platform)
			$http.put(AC.TRADE_SET_ACCOUNT()+"?userId=" + userId + "&serialNumber=" + serialNumber + "&money=" + money + "&platformType=" + platform)
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

		//-------------------------------------------
		// 确认完成支付动作
		setAccountComplete : function(userId, serialNumber, orderType, payType){
			var deferred = $q.defer();
			var promise  = deferred.promise;

			console.log("充值后更新履历" + AC.TRADE_COMPLETE_ACCOUNT()+"?userId="+userId+"&serialNumber="+serialNumber+"&orderType="+orderType+"&payType="+payType  )
			$http.put(AC.TRADE_COMPLETE_ACCOUNT()+"?userId="+userId+"&serialNumber="+serialNumber+"&orderType="+orderType+"&payType="+payType)
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

		//-------------------------------------------
		// 支付
		payToCompany : function(userId, orderNumber){
			var deferred = $q.defer();
			var promise  = deferred.promise;

			$http.post(AC.TRADE_COMPANY_EXPENSE()+"?userId="+userId+"&orderNumber="+orderNumber)
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

	};

})

;
