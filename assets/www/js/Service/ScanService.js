angular.module('starter.ScanService', [])

.service("ScanService", function($q, $http) {
    var paramsData = {};
	return{
		//------------------------------------------
        //设置参数值
        set : function(data) {
            paramsData = data;
        },
        //获取参数值
        get : function() {
            return paramsData;
        },
        //本地存储
		setLocalStorage : function(key,val) {
		   window.localStorage.setItem(key,val);
		},
		//获取本地存储
		getLocalStorage : function(key) {
			return window.localStorage.getItem(key);
		},
		//移除本地存储
		reomveLocalStorage : function(key){
			window.localStorage.removeItem(key);
		},
		// 获取作物信息
		getDesc : function(deliveryId, pageNo){
			var deferred = $q.defer();
			var promise = deferred.promise;
			console.log("二维码获取作物详细url ==>" +AC.SCAN_LIST() + "/" + deliveryId + "/" + pageNo);
			$http.get(AC.SCAN_LIST() + "/" + deliveryId + "/" + pageNo)
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
