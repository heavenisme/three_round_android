package com.anywide.hengxun.tribe;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.Log;

import java.util.Timer;
import java.util.TimerTask;


/**
 * A login screen that offers login via email/password.
 */
public class WelcomeActivity extends Activity{

    private Handler handler;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_welcome);

        handler = new Handler(){
            public void handleMessage(Message msg) {
                if(msg.what == 1){
                    // 跳转到MainActivity
                    Intent intent = new Intent();
                    intent.setClass(WelcomeActivity.this, MainActivity.class);

                    Log.e("开始启动Activity >>> " + System.currentTimeMillis(), "");
                    startActivity(intent);
                }
            }
        };

        TimerTask task = new TimerTask(){
            public void run() {
                Message message = new Message();
                message.what = 1;
                handler.dispatchMessage(message);
             }
        };

        Timer timer = new Timer(true);
        timer.schedule(task, 2000);         //延时2000ms后执行

    }
}

