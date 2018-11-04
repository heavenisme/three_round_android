angular.module('starter.PointService', [])

.service("PointService", function($q, $http) {
    return {
        //------------------------------------------
		// 用户积分信息
		getPointInfo : function(){
			var deferred = $q.defer();
			var promise  = deferred.promise;

			$http.get(AC.POINT_INFO())
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
		// 用户积分变更历史
		getPointHistory : function(){
			var deferred = $q.defer();
			var promise  = deferred.promise;

			$http.get(AC.POINT_HISTORY())
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
		// 积分兑换物品列表
		getPointItems : function(){
			var deferred = $q.defer();
			var promise  = deferred.promise;

			$http.get(AC.POINT_ITEMS())
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
		// 用户积分兑换历史
		getPointUserItems : function(){
			var deferred = $q.defer();
			var promise  = deferred.promise;

			$http.get(AC.POINT_USER_ITEMS())
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
		// 申请兑换积分物品
		getPointItem : function(item_id, redeem_number){
			var deferred = $q.defer();
			var promise  = deferred.promise;

			$http.post(AC.POINT_ITEM(), {item_id: item_id, redeem_number: redeem_number})
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
		// 积分等级信息
		getPointLevel : function(){
			var deferred = $q.defer();
			var promise  = deferred.promise;

			$http.get(AC.POINT_LEVEL())
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
