angular.module('starter.TaskService', [])

.service("TaskService", function($q, $http) {

	return{
		//------------------------------------------
		// 获取作业任务列表
		getTaskList : function(houseId, pageNo){
			var deferred = $q.defer();
			var promise = deferred.promise;

			if(pageNo == 0){
				window.localStorage.setItem("TaskService_getTaskList_time", Date.now());
			}

			var now = window.localStorage.getItem("TaskService_getTaskList_time");

			console.log("url ==>" + AC.GET_TASK_LIST() + "?houseId=" + houseId + "&pageNo=" + pageNo);
			$http.get(AC.GET_TASK_LIST() + "/" + houseId + "/" + pageNo + "/" + now)
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
		// 获取作业任务信息详细
		taskInfoDetails : function(taskId,type){
			var deferred = $q.defer();
			var promise = deferred.promise;

      console.log("获取作业任务详细--->"+AC.GET_TASK_INFO_DETAILS() + "/"+ taskId+"/"+type)
			$http.get(AC.GET_TASK_INFO_DETAILS() + "/"+ taskId+"/"+type)
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
		// 获取作业任务图片详情
		taskImages : function(taskId,type){
			var deferred = $q.defer();
			var promise = deferred.promise;

      console.log("获取作业任务图片详情--->"+AC.GET_TASK_IMAGES() + "/"+ taskId+"/"+type)

      $http.get(AC.GET_TASK_IMAGES() + "/"+ taskId+"/"+type)
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
		// 获取作业任务物资详情
		taskMaterials : function(taskId){
			var deferred = $q.defer();
			var promise = deferred.promise;

      console.log("获取作业任务物资详情--->"+AC.GET_TASK_MATERIALS() + "/"+ taskId)

      $http.get(AC.GET_TASK_MATERIALS() + "/"+ taskId)
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
        //下订单
        order : function(data){
            var deferred = $q.defer();
            var promise = deferred.promise;

            $http.get(AC.TRIBEMARKET_ORDER(),data)
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
});
