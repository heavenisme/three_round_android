package com.hengxun.update;

import android.app.Activity;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.util.Log;
import android.widget.Toast;

import com.umeng.update.UmengUpdateAgent;
import com.umeng.update.UmengUpdateListener;
import com.umeng.update.UpdateResponse;
import com.umeng.update.UpdateStatus;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaArgs;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by zdx on 15/11/12.
 * 检查更新插件
 */
public class CheckVersion extends CordovaPlugin {

    private Activity activity;

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {

        activity = this.cordova.getActivity();
        JSONObject obj = args.getJSONObject(0);

        if (action.equals("checkVersion")) {
            UmengUpdateAgent.setDeltaUpdate(false); //关闭增量更新
            UmengUpdateAgent.setUpdateAutoPopup(false);
            UmengUpdateAgent.setUpdateListener(new UmengUpdateListener() {
                @Override
                public void onUpdateReturned(int updateStatus, UpdateResponse updateInfo) {
                    switch (updateStatus) {
                        case UpdateStatus.Yes: // has update
                            UmengUpdateAgent.showUpdateDialog(activity, updateInfo);
                            break;
                        case UpdateStatus.No: // has no update
                            Toast.makeText(activity, "当前已是最新版本", Toast.LENGTH_SHORT).show();
                            break;
                        case UpdateStatus.NoneWifi: // none wifi
                            Toast.makeText(activity, "没有wifi连接， 只在wifi下更新", Toast.LENGTH_SHORT).show();
                            break;
                        case UpdateStatus.Timeout: // time out
                            Toast.makeText(activity, "超时", Toast.LENGTH_SHORT).show();
                            break;
                    }
                }
            });
            UmengUpdateAgent.forceUpdate(activity);

//            Intent intent = activity.getIntent();
//            if (intent.hasExtra(Intent.EXTRA_TEXT)) {
                callbackContext.success("success");
//            } else {
//                callbackContext.error("");
//            }
            return true;
        } else if(action.equals("getVersion")) {
            String version = getVersionName();
            callbackContext.success(version);
        } else {
            callbackContext.error("error");
        }
        return false;
    }

    private String getVersionName() {
        // 获取packagemanager的实例
        PackageManager packageManager = activity.getPackageManager();
        // getPackageName()是你当前类的包名，0代表是获取版本信息
        PackageInfo packInfo = null;
        try {
            packInfo = packageManager.getPackageInfo(activity.getPackageName(),0);
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }
        String version = packInfo.versionName;
        return version;
    }


}
