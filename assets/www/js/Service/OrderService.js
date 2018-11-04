angular.module('starter.OrderService', [])
//-------------------------------------------
.service("OrderService", function($q, $http) {
	var _state = -1;
	//------------------------------------------
	// 下订单
	return{
		getState: function(){
			return _state;
		},
		setState: function(state){
			_state = state;
		},

		addOrder: function(userId, orderPrice, goodsList, orderType) {
			var deferred = $q.defer();
			var promise = deferred.promise;
//			 alert("=====>" + AC.ORDER_ADD()+"?userId=" + userId + "&orderPrice=" + orderPrice + "&goodsList=" + goodsList + "&orderType=" + orderType);
			//ajax请求
            var url = encodeURI(AC.ORDER_ADD()+"?userId=" + userId + "&orderPrice=" + orderPrice + "&goodsList=" + goodsList + "&orderType=" + orderType);
			$http.post(url)
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

		getOrderList: function(userId) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			// alert(AC.ORDER_GET_LIST()+"?userId=" + userId);
			console.log("====>" + AC.ORDER_GET_LIST()+"?userId=" + userId);
			//ajax请求
			$http.get(AC.ORDER_GET_LIST()+"?userId=" + userId)
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

		getSerialNumber: function(userId) {
			var deferred = $q.defer();
			var promise = deferred.promise;
//			alert(AC.GET_SERIAL_NUMBER()+"?userId=" + userId);
			console.log("====>" + AC.GET_SERIAL_NUMBER()+"?userId=" + userId);
			//ajax请求
			$http.get(AC.GET_SERIAL_NUMBER()+"?userId=" + userId)
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

		payoff: function(serialNumber, userId, orderId, amount, description, payType, orderType) {
			var deferred = $q.defer();
			var promise = deferred.promise;

			// alert(PAY + "?serialNumber=" + serialNumber + "&userId=" + userId + "&orderid=" + orderId + "&amount=" + amount + "&description=" + description + "&paytype=" + payType);
            console.log("====>" + AC.PAY() + "?serialNumber=" + serialNumber + "&userId=" + userId + "&orderid=" + orderId + "&amount=" + amount + "&description=" + description + "&paytype=" + payType+ "&orderType=" + orderType);
			//ajax请求
			$http.post(AC.PAY() + "?serialNumber=" + serialNumber + "&userId=" + userId + "&orderid=" + orderId + "&amount=" + amount + "&description=" + description + "&paytype=" + payType + "&orderType=" + orderType)
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

		payComplete: function(userId, serialNumber, orderType, payType) {
			var deferred = $q.defer();
			var promise = deferred.promise;

//			 alert(AC.TRADE_PAY_COMPLETE() + "?userId=" + userId + "&serialNumber=" + serialNumber);
			console.log("====>" + AC.TRADE_PAY_COMPLETE() + "?userId=" + userId + "&serialNumber=" + serialNumber);
			//ajax请求
			$http.put(AC.TRADE_PAY_COMPLETE() + "?userId=" + userId + "&serialNumber=" + serialNumber + "&orderType=" + orderType + "&payType=" + payType)
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

		updateOrderStatus: function(userId, orderId, newState) {
			var deferred = $q.defer();
			var promise = deferred.promise;

			// alert(AC.UPDATE_ORDER_STATUS() + "?userId=" + userId + "&orderid=" + orderId + "&newstate=" + newState);
			console.log("====>" + AC.UPDATE_ORDER_STATUS() + "?userId=" + userId + "&orderid=" + orderId + "&newstate=" + newState);
			//ajax请求
			$http.put(AC.UPDATE_ORDER_STATUS() + "?userId=" + userId + "&orderid=" + orderId + "&newstate=" + newState)
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

		// 二维码-确认收货
		confirmPackage: function(packageCode) {
			var deferred = $q.defer();
			var promise = deferred.promise;

			console.log("====>" + AC.SCAN_CONFIRMGOODS() + "/" + packageCode);
			//ajax请求
			$http.post(AC.SCAN_CONFIRMGOODS() + "/" + packageCode)
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
	}
});
