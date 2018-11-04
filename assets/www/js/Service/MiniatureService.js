angular.module('starter.MiniatureService', [])

.service("MiniatureService", function($q, $http) {

	return{
		//------------------------------------------
		// 获取作物缩影数据
		plantMiniature : function(houseId, pageNo){
			var deferred = $q.defer();
			var promise = deferred.promise;

			console.log("url ==>" + AC.GET_PLANT_MINIATURE() + "/" + houseId + "/" + pageNo);
			$http.get(AC.GET_PLANT_MINIATURE() + "/" + houseId + "/" + pageNo)
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


	};
});
