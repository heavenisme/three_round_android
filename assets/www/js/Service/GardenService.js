angular.module('starter.GardenService', [])

.service("GardenService", function($q, $http) {

	var _voteState = 1;
    var paramsData = {};
	return{
		// 投票状态
		getVoteState : function(){
			return _voteState;
		},
		setVoteState : function(voteState){
			_voteState = voteState;
		},
        //设置参数值
        set : function(data) {
            paramsData = data;
        },
        //获取参数值
        get : function() {
            return paramsData;
        },
		//------------------------------------------
		// 获取所有种植模型列表
		getPlanting : function(userId, houseId){
			var deferred = $q.defer();
			var promise  = deferred.promise;

			$http.get(AC.GARDEN_GET_PLANTING()+"/"+userId+"?houseId="+houseId)
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
		// 获取所有种植模型列表
		getPlantingDetail : function(userId, planId){
			var deferred = $q.defer();
			var promise  = deferred.promise;

			$http.get(AC.GARDEN_GET_PLANTING_DETAIL()+"?planId="+planId+"&userId="+userId)
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
		// 发起投票
		startModelVote : function(houseId){
			var deferred = $q.defer();
			var promise  = deferred.promise;

			$http.get(AC.GREENHOUSE_START_VOTE()+"?houseId="+houseId+"&state=2")
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
		// 是否已经发起投票
		modelVoteIsOpen : function(houseId){
			var deferred = $q.defer();
			var promise  = deferred.promise;

			$http.get(AC.GREENHOUSE_VOTE_ISOPEN()+"?houseId="+houseId)
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
		// 获取种植模型投票信息
		getVotingRate : function(userId, houseId){
			var deferred = $q.defer();
			var promise  = deferred.promise;

			$http.get(AC.GREENHOUSE_VOTING_RATE()+"?userId=" + userId + "&houseId="+houseId)
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
		// 耘客投票选择大棚的种植计划
		setVotingItem : function(houseId, userId, planChoiceId){
			var deferred = $q.defer();
			var promise  = deferred.promise;

			$http.get(AC.GREENHOUSE_SET_VOTING_ITEM()+"?houseId="+houseId+"&userId="+userId+"&planChoiceId="+planChoiceId)
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
		// 获取菜园图片
		getGardenImage : function(userId, houseId){
			var deferred = $q.defer();
			var promise  = deferred.promise;

			$http.get(AC.GARDEN_GET_IMAGE()+"/"+userId+"?houseId="+houseId)
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
		// 获取当前种植模型选择状态
		getGardenSelPlanting : function(houseId){
			var deferred = $q.defer();
			var promise  = deferred.promise;

			$http.get(AC.GARDEN_GET_SELPLANTING()+"?houseId="+houseId)
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
		// 获取当前种植模型选择状态
		getGardenActiveModel : function(userId, houseId){
			var deferred = $q.defer();
			var promise  = deferred.promise;

			$http.get(AC.GARDEN_GET_ACTIVE_MODEL()+"?userId=" + userId + "&houseId="+houseId)
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
         // 获取当前大棚酋长选举消息
         getChiefMsg : function(userId, houseId, messageType, functionType){
             var deferred = $q.defer();
             var promise  = deferred.promise;
         
             $http.get(AC.GET_CHIEF_VOTE_MSG()+"?userId=" + userId + "&houseId="+houseId + "&messageType=" + messageType + "&functionType=" + functionType)
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