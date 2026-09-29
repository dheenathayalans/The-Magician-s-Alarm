package com.magiciansalarm.app;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.PowerManager;
import android.util.Log;

import androidx.core.content.ContextCompat;

public class AlarmReceiver extends BroadcastReceiver {

    private static final String TAG = "AlarmReceiver";

    @Override
    public void onReceive(Context context, Intent intent) {
        Log.d(TAG, "Alarm broadcast received! Action: " + intent.getAction());

        // Acquire a wake lock to keep the device CPU running until the service takes over
        PowerManager powerManager = (PowerManager) context.getSystemService(Context.POWER_SERVICE);
        PowerManager.WakeLock wakeLock = null;
        if (powerManager != null) {
            wakeLock = powerManager.newWakeLock(
                PowerManager.PARTIAL_WAKE_LOCK | PowerManager.ACQUIRE_CAUSES_WAKEUP,
                "MagiciansAlarm::AlarmWakeLock"
            );
            wakeLock.acquire(60 * 1000L); // 60 seconds safety timeout
        }

        Intent serviceIntent = new Intent(context, AlarmService.class);
        serviceIntent.putExtras(intent);
        
        try {
            ContextCompat.startForegroundService(context, serviceIntent);
        } catch (Exception e) {
            Log.e(TAG, "Failed to start AlarmService: " + e.getMessage());
        }

        if (wakeLock != null && wakeLock.isHeld()) {
            try {
                wakeLock.release();
            } catch (Exception ignored) {}
        }
    }
}
