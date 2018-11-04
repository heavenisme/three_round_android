package com.anywide.hengxun.tribe;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.util.Log;
import android.util.Xml;
import android.widget.Toast;

import com.tencent.mm.sdk.modelpay.PayReq;
import com.tencent.mm.sdk.openapi.IWXAPI;
import com.tencent.mm.sdk.openapi.WXAPIFactory;

import net.sourceforge.simcpux.Constants;
import net.sourceforge.simcpux.MD5;
import net.sourceforge.simcpux.Util;

import org.apache.cordova.CallbackContext;
import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;
import org.xmlpull.v1.XmlPullParser;

import java.io.StringReader;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Random;

/**
 * Created by EiT on 2015/9/16.
 */
public class HXWeChatPay{

    // js回调
    public static CallbackContext callbackContext = null;

    PayReq req;
    IWXAPI msgApi;
    Map<String,String> resultunifiedorder;
    StringBuffer sb;

    Context context;

    int    totalFee;
    String body;
    String detail;
    String outTradeNo;
    String notifyUrl;

    public HXWeChatPay(Context _context, CallbackContext callbackContext){
        req     = new PayReq();
        sb      = new StringBuffer();
        context = _context;
        this.callbackContext = callbackContext;

        String packageSign = MD5.getMessageDigest(sb.toString().getBytes()).toUpperCase();
    }

    /**
     * 微信支付
     * @totalFee    {number} 金额       (单位/分)
     * @body        {String} 商品描述    (商品或支付单简要描述)
     * @detail      {String} 商品详情    (商品名称明细列表)
     * @outTradeNo  {String} 商户订单号   (商户系统内部的订单号,32个字符内、可包含字母)
     * @notifyUrl   {String} 通知地址    (接收微信支付异步通知回调地址)
     */
    public void pay(int totalFee, String body, String detail, String outTradeNo, String notifyUrl){

        msgApi  = WXAPIFactory.createWXAPI(context, null);
        msgApi.registerApp(Constants.APP_ID);

        this.totalFee   = totalFee;
        this.body       = body;
        this.detail     = detail;
        this.outTradeNo = outTradeNo;
        this.notifyUrl  = notifyUrl;

        // 生成prepay_id(注意是异步的哦)
        {
            GetPrepayIdTask getPrepayId = new GetPrepayIdTask();
            getPrepayId.execute();
        }
    }

    /**
     生成签名
     */
    private String genPackageSign(List<NameValuePair> params) {
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < params.size(); i++) {
            sb.append(params.get(i).getName());
            sb.append('=');
            sb.append(params.get(i).getValue());
            sb.append('&');
        }
        sb.append("key=");
        sb.append(Constants.API_KEY);

        String packageSign = MD5.getMessageDigest(sb.toString().getBytes()).toUpperCase();

        return packageSign;
    }

    // 应用签名
    private String genAppSign(List<NameValuePair> params) {
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < params.size(); i++) {
            sb.append(params.get(i).getName());
            sb.append('=');
            sb.append(params.get(i).getValue());
            sb.append('&');
        }
        sb.append("key=");
        sb.append(Constants.API_KEY);

        this.sb.append("sign str\n" + sb.toString() + "\n\n");
        String appSign = MD5.getMessageDigest(sb.toString().getBytes()).toUpperCase();
        Log.e("orion", appSign);

        return appSign;
    }

    // XML转换
    private String toXml(List<NameValuePair> params) {
        StringBuilder sb = new StringBuilder();
        sb.append("<xml>");
        for (int i = 0; i < params.size(); i++) {
            sb.append("<"+params.get(i).getName()+">");


            sb.append(params.get(i).getValue());
            sb.append("</"+params.get(i).getName()+">");
        }
        sb.append("</xml>");

        Log.e("orion",sb.toString());

        // 参数有中文要这样写啊！很关键啊！疼讯坑爹啊！
        // 这是经常发生的坑爹问题，Demo里都木有啊！文档更木有啊！！！
        try {
            return new String(sb.toString().getBytes(), "ISO8859-1");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }

    // 异步任务
    // 生成prepay_id
    private class GetPrepayIdTask extends AsyncTask<Void, Void, Map<String,String>> {

        private ProgressDialog dialog;

        @Override
        protected void onPreExecute() {
//            dialog = ProgressDialog.show(context, "提示", "获取prepayid...");
        }

        @Override
        protected void onPostExecute(Map<String,String> result) {
            if (dialog != null) {
                dialog.dismiss();
            }
            sb.append("prepay_id\n"+result.get("prepay_id")+"\n\n");

            resultunifiedorder = result;

            // 调试用 直接打印返回值
            String str = result.toString();
//            Toast.makeText(context, ">>> " + str, Toast.LENGTH_LONG).show();

            // 生成prepay_id成功
            if(result != null && result.get("return_code").equals("SUCCESS")){

                // TODO
                // 生成签名参数
                genPayReq();

                // 调起微信支付
                sendPayReq();
            }
            else
           {
                // TODO 获取失败操作
            }
        }

        @Override
        protected void onCancelled() {
            super.onCancelled();
        }

        @Override
        protected Map<String,String>  doInBackground(Void... params) {

            String url = String.format("https://api.mch.weixin.qq.com/pay/unifiedorder");
            String entity = genProductArgs();

            byte[] buf = Util.httpPost(url, entity);

            String content = new String(buf);

            Map<String,String> xml = decodeXml(content);

            return xml;
        }
    }

    // 解析XML
    public Map<String,String> decodeXml(String content) {

        try {
            Map<String, String> xml = new HashMap<String, String>();
            XmlPullParser parser = Xml.newPullParser();
            parser.setInput(new StringReader(content));
            int event = parser.getEventType();
            while (event != XmlPullParser.END_DOCUMENT) {

                String nodeName=parser.getName();
                switch (event) {
                    case XmlPullParser.START_DOCUMENT:

                        break;
                    case XmlPullParser.START_TAG:

                        if("xml".equals(nodeName)==false){
                            //实例化student对象
                            xml.put(nodeName,parser.nextText());
                        }
                        break;
                    case XmlPullParser.END_TAG:
                        break;
                }
                event = parser.next();
            }

            return xml;
        } catch (Exception e) {
            Log.e("orion",e.toString());
        }
        return null;

    }

    // 随机数
    private String genNonceStr() {
        Random random = new Random();
        return MD5.getMessageDigest(String.valueOf(random.nextInt(10000)).getBytes());
    }

    // 时间戳
    private long genTimeStamp() {
        return System.currentTimeMillis() / 1000;
    }

    // 货物ID
    private String genOutTradNo() {
        Random random = new Random();
        // return MD5.getMessageDigest(String.valueOf(random.nextInt(10000)).getBytes());
        return MD5.getMessageDigest(this.outTradeNo.getBytes());
    }

    // 准备参数
    private String genProductArgs() {
        StringBuffer xml = new StringBuffer();

        try {
            String	nonceStr = genNonceStr();

            xml.append("</xml>");
            List<NameValuePair> packageParams = new LinkedList<NameValuePair>();
            packageParams.add(new BasicNameValuePair("appid", Constants.APP_ID));
            packageParams.add(new BasicNameValuePair("body", body));
            packageParams.add(new BasicNameValuePair("mch_id", Constants.MCH_ID));
            packageParams.add(new BasicNameValuePair("nonce_str", nonceStr));
            packageParams.add(new BasicNameValuePair("notify_url", "http://121.40.35.3/test"));
            packageParams.add(new BasicNameValuePair("out_trade_no",genOutTradNo()));
            packageParams.add(new BasicNameValuePair("spbill_create_ip","127.0.0.1"));
            packageParams.add(new BasicNameValuePair("total_fee", "" + totalFee));
            packageParams.add(new BasicNameValuePair("trade_type", "APP"));

            String sign = genPackageSign(packageParams);
            packageParams.add(new BasicNameValuePair("sign", sign));

            String xmlstring = toXml(packageParams);

            return xmlstring;

        } catch (Exception e) {
            return null;
        }
    }

    // 生成签名参数
    private void genPayReq() {

        req.appId        = Constants.APP_ID;
        req.partnerId    = Constants.MCH_ID;
        req.prepayId     = resultunifiedorder.get("prepay_id");
        req.packageValue = "Sign=WXPay";
        req.nonceStr     = genNonceStr();
        req.timeStamp    = String.valueOf(genTimeStamp());

        List<NameValuePair> signParams = new LinkedList<NameValuePair>();
        signParams.add(new BasicNameValuePair("appid", req.appId));
        signParams.add(new BasicNameValuePair("noncestr", req.nonceStr));
        signParams.add(new BasicNameValuePair("package", req.packageValue));
        signParams.add(new BasicNameValuePair("partnerid", req.partnerId));
        signParams.add(new BasicNameValuePair("prepayid", req.prepayId));
        signParams.add(new BasicNameValuePair("timestamp", req.timeStamp));

        req.sign = genAppSign(signParams);

        sb.append("sign\n"+req.sign+"\n\n");

        Log.e("orion", signParams.toString());
    }

    // 调起微信支付
    private void sendPayReq() {
        msgApi.registerApp(Constants.APP_ID);
        msgApi.sendReq(req);
    }

}