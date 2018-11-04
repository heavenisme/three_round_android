/*物资方案*/
angular.module('starter.GoodsDesignService', [])
//-------------------------------------------
    .service("GoodsDesignService", function($q, $http) {
        return{
            /*获取物资方案 msgID*/
            getMaterialPlan: function(msgId) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                //alert(AC.GET_Material_Plan() + "/" + msgId);
                //ajax请求
                $http.get(AC.GET_Material_Plan() + "/" + msgId)
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
            /*获取物资方案*/
            getTaskProjects: function(houseId) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                $http.get(AC.GREENHOUSE_DO_SOMETHING() + "/" + houseId)
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
            /*酋长选择物资方案*/
            chooseMaterialPlan: function(projectId) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                //alert(AC.Choose_Material_Plan() + projectId);
                //ajax请求
                $http({
                    url:AC.Choose_Material_Plan(),
                    method:'POST',
                    data:{
                        "projectId":projectId

                    }, 
                    headers:{'Content-Type':'application/json;charset=UTF-8'}
                }).success(
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
        }
    });
