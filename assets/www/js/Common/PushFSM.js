/************************************************************************** 
* Copyright (c) 2015, hengxun-tech, All rights reserved. 
* Date     : 2015/10/30
* Author   : 田伟汉 
* Email    : wilhan.tian@gmail.com 
* Depict   : 通知状态机
*            高度解耦，有木有？！哇哈哈哈啊！
**************************************************************************/

//------------------------------
// 通知状态机类
var PushFSM = {

    // 注册状态表
    _registStates : {},

    // 默认状态
    _defaultState : "",

    // 注销类型(默认为9)
    _logoutType : 9,
    _logoutHandler : function(alert){},
}

//------------------------------
// 初始化状态机
// 监听事件
// 跳转相应页面
PushFSM.init = function ($state, $rootScope, MyTribeService, UserService){

    // 极光推送
    window.plugins.jPushPlugin.init();
    PushFSM.resumePush();

    // 清空角标
    // window.plugins.jPushPlugin.resetBadge();
    // window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);

	// 打开通知监听
	document.addEventListener(
        "jpush.openNotification",
        function(){

            if(device.platform == "Android"){
                var extrasContent = window.plugins.jPushPlugin.openNotification.extras["cn.jpush.android.EXTRA"];

                var type = extrasContent.typeId;
                var messageId = extrasContent.messageId;

                PushFSM._handle(type, messageId, $state);

            }else{
                var type = event.typeId;
                var messageId = event.messageId;

                if(type == PushFSM._logoutType){
                    PushFSM._logoutHandler(event.aps.alert);
                }
                else{
                    PushFSM._handle(type, messageId, $state);
                }
            }

            $rootScope.isHaveNewMessage = false;
        },
        false
    );

	// 设置别名监听
    document.addEventListener(
        "jpush.setTagsWithAlias",
        function(event){
            
        },
        false
    );


    // 设置程序内监听
    document.addEventListener(
        "jpush.receiveNotification", 
        function(event){

            $rootScope.$apply();
            //--------------------
            if(device.platform == "Android"){
                var extrasContent = window.plugins.jPushPlugin.receiveNotification.extras["cn.jpush.android.EXTRA"];

                var type          = extrasContent.typeId;
                var messageId     = extrasContent.messageId;
                
                if(type == PushFSM._logoutType){
                    PushFSM._logoutHandler(window.plugins.jPushPlugin.receiveNotification.alert);
                    $rootScope.isHaveNewMessage = false;
                } else {
                    $rootScope.isHaveNewMessage = true;
                }

            }else{
                var type      = event.typeId;
                var messageId = event.messageId;

                if(type == PushFSM._logoutType){
                    PushFSM._logoutHandler(event.aps.alert);
                    $rootScope.isHaveNewMessage = false;
                } else {
                    $rootScope.isHaveNewMessage = true;
                }
            }
            
            //--------------------
            // 更新大棚数据
            MyTribeService.getMyGreenHouse(UserService.getUserId())
            .success(function(data)
            {
                if(data.code == 200){
                    UserService.setMyGreenHouseList(data.data);
                }
            })
            .error(function(state)
            {
            });

        }, false);
}

//------------------------------
// 清空角标
PushFSM.clearBadge = function(){
    // 清空角标
    window.plugins.jPushPlugin.resetBadge();
    window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
}

//------------------------------
// 停止通知服务
PushFSM.stopPush = function(){
    window.plugins.jPushPlugin.stopPush();
}

//------------------------------
// 恢复通知服务
PushFSM.resumePush = function(){

    window.plugins.jPushPlugin.isPushStopped(function(data)
    {
        if(data > 0) // 已经停止
        {
            window.plugins.jPushPlugin.resumePush();
        }
        else         // 开启中
        {
            // alert("开启中");
        }
    });
}

//------------------------------
// 更新别名与Tag
PushFSM.updateTagAndAlias = function(UserService){

    UserService.getUserTags(UserService.getUserId())
    .success(function(data){

        if(data.code == 200){
            
            var alias = data.data[0].alias;
            var tags  = data.data[0].tags;

            if(tags == null || tags == "" || tags.length == 0){
                tags = [];
            }

            var token = UserService.getToken();
            
            if(token != null){
                token = token.replace(/\-/g,"");
                tags.push(token);
            }

            window.plugins.jPushPlugin.setTagsWithAlias(tags, alias);
        }
    })
    .error(function(state){
    });
}

//------------------------------
// 注册一个状态
// 如果对一个type多次注册 将会顶替掉之前的state
PushFSM.registState = function(type, state){
    if(    type  == null 
        || state == null
        || type  == ""
        || state == ""){

        return;
    }

    PushFSM._registStates[type] = state;
}

//------------------------------
// 获取所有状态
// @return {类型: 页面名}
PushFSM.getStates = function(){
    return PushFSM._registStates;
}

//------------------------------
// 设置默认状态
// 如果设置为空，则不进行跳转
PushFSM.setDefaultState = function(state){
    PushFSM._defaultState = state; 
}

//------------------------------
// 获取默认状态
PushFSM.getDefaultState = function(){
    return PushFSM._defaultState;
}

//------------------------------
// 设置注销类型 和 相关处理
// handler : function(){}
PushFSM.setLogoutTypeAndHandler = function(type, handler){
    PushFSM._logoutType    = type;
    PushFSM._logoutHandler = handler;
}

//------------------------------
// 接收状态 -> 分发状态 -> 传递参数 -> 目标页面
PushFSM._handle = function(type, messageId, $state){

    var state = PushFSM._registStates[type];

    if(state == null || state == ""){
        // 跳转到默认状态
        if(PushFSM._defaultState != null && PushFSM._defaultState != ""){
            $state.go(PushFSM._defaultState, {data:{"from":"/tab/home"}});
        }
    }
    else{
        // TODO 传参
        $state.go(state);
    }
}


