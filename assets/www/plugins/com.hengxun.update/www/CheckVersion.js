cordova.define("com.hengxun.update.CheckVersion", function(require, exports, module) {

var exec = require('cordova/exec'),
    cordova = require('cordova');

var CheckVersion = {
};

// 检查更新
CheckVersion.checkUpdate = function(currVersion, success, error) {      //第一个参数为备用参数，暂未使用

    var params = [{
        "currVersion":currVersion
    }];

    exec(success, error, "CheckVersion", "checkVersion", params);
};

CheckVersion.getVersion = function(success, error) {

    var params = [{
        "test":"test"
    }];

    exec(success, error, "CheckVersion", "getVersion", params);
}

module.exports = CheckVersion;

});