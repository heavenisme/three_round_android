package com.hengxun.pay;

import android.app.Activity;

import com.anywide.hengxun.tribe.HXWeChatPay;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by EiT on 2015/9/16.
 * 恒迅·支付插件
 */
public class HXPay extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {

        Activity activity = this.cordova.getActivity();
        JSONObject obj = args.getJSONObject(0);
        /**
         * 微信支付
         * @appid       {String} 公众账号ID  (例:"wx8888888888888888")
         * @mchId       {String} 商户号      (例:"1900000109")
         * @totalFee    {number} 金额       (单位/分)
         * @body        {String} 商品描述    (商品或支付单简要描述)
         * @detail      {String} 商品详情    (商品名称明细列表)
         * @outTradeNo  {String} 商户订单号   (商户系统内部的订单号,32个字符内、可包含字母)
         * @notifyUrl   {String} 通知地址    (接收微信支付异步通知回调地址)
         */
        if (obj != null){

            // 微信支付
            if (action.equals("payWeChat")) {
                /*
                Toast.makeText(activity, "totalFee:"   + obj.getInt("totalFee"),  Toast.LENGTH_SHORT).show();
                Toast.makeText(activity, "body:"       + obj.getString("body"),   Toast.LENGTH_SHORT).show();
                Toast.makeText(activity, "detail:"     + obj.getString("detail"), Toast.LENGTH_SHORT).show();
                Toast.makeText(activity, "outTradeNo:" + obj.getString("outTradeNo"), Toast.LENGTH_SHORT).show();
                Toast.makeText(activity, "notifyUrl:"  + obj.getString("notifyUrl"),  Toast.LENGTH_SHORT).show();
                */

                HXWeChatPay hxWeChat = new HXWeChatPay(activity, callbackContext);
                hxWeChat.pay(
                    obj.getInt("totalFee"),
                    obj.getString("body"),
                    obj.getString("detail"),
                    obj.getString("outTradeNo"),
                    obj.getString("notifyUrl")
                );
            }

            //callbackContext.success("ok 输出成功-" + action);
            return true;

        } else{
            callbackContext.error("error");
        }

        return false;
    }

    public void say(){

    }

}
