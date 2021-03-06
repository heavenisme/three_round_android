/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.anywide.hengxun.tribe;

import android.os.Bundle;
import android.preference.PreferenceManager;
import android.util.Log;
import android.widget.Toast;

import com.umeng.update.UmengUpdateAgent;

import org.apache.cordova.CordovaActivity;

import cn.jpush.android.api.JPushInterface;


public class MainActivity extends CordovaActivity
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        UmengUpdateAgent.setDeltaUpdate(false); //关闭增量更新
        UmengUpdateAgent.setUpdateOnlyWifi(false);
//        UmengUpdateAgent.setUpdateCheckConfig(false);
        UmengUpdateAgent.update(this);

//        Toast.makeText(MainActivity.this, "aaaaaa", Toast.LENGTH_SHORT).show();
        Log.e("Acticity启动 >>> " + System.currentTimeMillis(), "");
        // Set by <content src="index.html" /> in config.xml
        loadUrl(launchUrl);
        Log.e("Acticity 载入资源完成 >>> " + System.currentTimeMillis(), "");

    }

    @Override
    protected void onResume(){
        super.onResume();
        JPushInterface.onResume(this);
    }

    @Override
    protected void onPause(){
        super.onPause();
        JPushInterface.onPause(this);
    }

}
