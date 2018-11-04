package com.anywide.hengxun.tribe.wxapi;


import com.anywide.hengxun.tribe.HXWeChatPay;
import com.anywide.hengxun.tribe.R;
import com.tencent.mm.sdk.constants.ConstantsAPI;
import com.tencent.mm.sdk.modelbase.BaseReq;
import com.tencent.mm.sdk.modelbase.BaseResp;
import com.tencent.mm.sdk.openapi.IWXAPI;
import com.tencent.mm.sdk.openapi.IWXAPIEventHandler;
import com.tencent.mm.sdk.openapi.WXAPIFactory;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;

import net.sourceforge.simcpux.Constants;


public class WXPayEntryActivity extends Activity implements IWXAPIEventHandler{
	
	private static final String TAG = "MicroMsg.SDKSample.WXPayEntryActivity";
	
    private IWXAPI api;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_wechat_pay_result);
        
    	api = WXAPIFactory.createWXAPI(this, Constants.APP_ID);

        api.handleIntent(getIntent(), this);
    }

	@Override
	protected void onNewIntent(Intent intent) {
		super.onNewIntent(intent);
		setIntent(intent);
        api.handleIntent(intent, this);
	}

	@Override
	public void onReq(BaseReq req) {
	}

	@Override
	public void onResp(BaseResp resp) {

		if (resp.getType() == ConstantsAPI.COMMAND_PAY_BY_WX) {

			// 支付成功
			if (resp.errCode == 0){
				Toast.makeText(WXPayEntryActivity.this, "支付成功", Toast.LENGTH_LONG).show();

				HXWeChatPay.callbackContext.success("支付成功");
			}
			// 支付异常
			else if (resp.errCode == -1){
				Toast.makeText(WXPayEntryActivity.this, "支付异常 "+resp.errStr, Toast.LENGTH_LONG).show();
				HXWeChatPay.callbackContext.error("支付异常:" + resp.toString());
			}
			// 支付取消
			else if (resp.errCode == -2){
//				Toast.makeText(WXPayEntryActivity.this, "支付取消 errCode:"+resp.errStr, Toast.LENGTH_LONG).show();
				HXWeChatPay.callbackContext.error("支付取消");
			}
			// 其他异常
			else {
				Toast.makeText(WXPayEntryActivity.this, "其他异常 errCode:"+resp.errStr, Toast.LENGTH_LONG).show();
				HXWeChatPay.callbackContext.error("其他异常");
			}
			this.finish();
		}
	}
}