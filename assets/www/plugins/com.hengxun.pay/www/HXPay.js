cordova.define("com.hengxun.pay.HXPay", function(require, exports, module) {
/*
 *
 * www.hengxun-tech.com
 *
*/

var argscheck = require('cordova/argscheck'),
    channel = require('cordova/channel'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec'),
    cordova = require('cordova');

var payExport = {};

/**
 * 微信支付
 * @totalFee    {number} 金额       (单位/分)
 * @body        {String} 商品描述    (商品或支付单简要描述)
 * @detail      {String} 商品详情    (商品名称明细列表)
 * @outTradeNo  {String} 商户订单号   (商户系统内部的订单号,32个字符内、可包含字母)
 * @notifyUrl   {String} 通知地址    (接收微信支付异步通知回调地址)
 *
 * @success     {function(String)}  成功回调
 * @error       {function(String)}  失败回调
 */
payExport.payWeChat = function(totalFee, body, detail, outTradeNo, notifyUrl, success, error) {
//    alert("微信支付...");

    var parmas = [{
        "totalFee":totalFee,
        "body":body,
        "detail":detail,
        "outTradeNo":outTradeNo,
        "notifyUrl":notifyUrl
    }];

    exec(success, error, "HXPay", "payWeChat", parmas);
};

// 支付宝支付
payExport.payAlipay = function(msg, success, error) {
    alert("支付宝支付...");
};

// 财付通支付
payExport.payTenpay = function(msg, success, error){
    alert("财付通支付...");
};

module.exports = payExport;


});
