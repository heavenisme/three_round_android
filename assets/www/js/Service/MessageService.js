// 消息服务
angular.module('starter.MessageService', [])

.service("MessageService", function($q, $http) {

    var _bufMessageId = "";

	return{
        //---------------------------
        // 设置MessageId
        setMessageId : function(messageId){
            return _bufMessageId = messageId;
        },
        //---------------------------
        // 获取MessageId
        getMessageId : function(){
            return _bufMessageId;
        },

		//---------------------------
		// 请求类型概述
        requestMessageSummary : function(userId){

            var deferred = $q.defer();
            var promise = deferred.promise;

            //ajax请求
            $http.get(AC.MSG_GET_SUMMARY() + "?userId=" + userId)
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

		//---------------------------
		// 请求功能消息列表
		requestMessageList : function(userId, messageType){
			var deferred = $q.defer();
            var promise = deferred.promise;

            //ajax请求
            $http.get(AC.MSG_GET_MESSAGE_LISK() + "?userId=" + userId + "&messageType=" + messageType)
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

        //---------------------------
        // 请求功能消息列表
        requestMessageInfo : function(userId, messageId){
            var deferred = $q.defer();
            var promise = deferred.promise;

            console.log(AC.MSG_GET_INFO() + "?userId=" + userId + "&messageId=" + messageId+"============================================");

            //ajax请求
            $http.get(AC.MSG_GET_INFO() + "?userId=" + userId + "&messageId=" + messageId)
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

        //---------------------------
        // 请求功能消息列表
        requestMessageDetail : function(messageId){
            var deferred = $q.defer();
            var promise = deferred.promise;
            
            console.log(AC.MSG_GET_DETAIL() + "?messageId=" + messageId);

            //ajax请求
            $http.get(AC.MSG_GET_DETAIL() + "?messageId=" + messageId)
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

        //---------------------------
        // 添加用户投票信息
        requestAddVoteRecord : function(userId, voteExplainId, voteOptionId){
            var deferred = $q.defer();
            var promise = deferred.promise;
            
            console.log(AC.ADD_VOTE_RECORD_BY_MSG() + "?userId=" + userId + "&voteExplainId=" + voteExplainId + "&voteOptionId=" + voteOptionId);

            //ajax请求
            $http.get(AC.ADD_VOTE_RECORD_BY_MSG() + "?userId=" + userId + "&voteExplainId=" + voteExplainId + "&voteOptionId=" + voteOptionId)
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

        //---------------------------
        // 酋长选择种植计划结果并更新种植计划的投票状态
        requestPlantingVote : function(houseId, voteState, planResultId){
            var deferred = $q.defer();
            var promise = deferred.promise;
            
            console.log(AC.PLANTING_VOTE_BY_MSG() + "?houseId=" + houseId + "&voteState=" + voteState + "&planResultId=" + planResultId);

            //ajax请求
            $http.get(AC.PLANTING_VOTE_BY_MSG() + "?houseId=" + houseId + "&voteState=" + voteState + "&planResultId=" + planResultId)
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

        //----------------------------
        //判断采收计划是否已经提交
        recoveryState : function(planId){
            var deferred = $q.defer();
            var promise = deferred.promise;

            //ajax请求
            console.log(AC.RECOVER_STATE() + "/" + planId + "=======================================");
            $http.get(AC.RECOVER_STATE() + "/" + planId)
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