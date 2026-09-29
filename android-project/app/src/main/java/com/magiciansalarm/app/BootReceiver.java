package com.magiciansalarm.app;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

public class BootReceiver extends BroadcastReceiver {

    private static final String TAG = "BootReceiver";

    @Override
    public void onReceive(Context context, Intent intent) {
        String action = intent.getAction();
        Log.d(TAG, "Device rebooted or package replaced: " + action);

        if (Intent.ACTION_BOOT_COMPLETED.equals(action) ||
            "android.intent.action.QUICKBOOT_POWERON".equals(action) ||
            Intent.ACTION_MY_PACKAGE_REPLACED.equals(action)) {
            
            // Reschedule all active native alarms
            NativeAlarmScheduler.rescheduleAllAlarms(context);
        }
    }
}
