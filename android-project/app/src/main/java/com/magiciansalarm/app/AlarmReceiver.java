package com.magiciansalarm.app;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.media.AudioManager;
import android.os.Build;
import android.os.PowerManager;
import android.util.Log;

import androidx.core.app.NotificationCompat;
import androidx.core.content.ContextCompat;

public class AlarmReceiver extends BroadcastReceiver {

    private static final String TAG = "AlarmReceiver";
    public static final int CALL_SNOOZE_NOTIFICATION_ID = 8890;

    /**
     * Checks if the user is actively on a phone call (cellular) or a VoIP call (WhatsApp, Zoom, Meet, Teams, etc.).
     * Does NOT require any dangerous permissions like READ_PHONE_STATE.
     */
    public static boolean isUserOnCall(Context context) {
        try {
            AudioManager audioManager = (AudioManager) context.getSystemService(Context.AUDIO_SERVICE);
            if (audioManager == null) return false;
            int mode = audioManager.getMode();
            return mode == AudioManager.MODE_IN_CALL 
                || mode == AudioManager.MODE_IN_COMMUNICATION 
                || mode == AudioManager.MODE_RINGTONE;
        } catch (Exception e) {
            Log.e(TAG, "Error checking audio call mode: " + e.getMessage());
            return false;
        }
    }

    /**
     * Posts a silent, gentle notification letting the user know the alarm was snoozed for 15 mins due to an active call.
     */
    public static void postCallSnoozeNotification(Context context, int alarmId, String label) {
        try {
            NotificationManager nm = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
            if (nm == null) return;

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                NotificationChannel channel = new NotificationChannel(
                    AlarmConstants.CHANNEL_CALL_SNOOZE_ID,
                    AlarmConstants.CHANNEL_CALL_SNOOZE_NAME,
                    NotificationManager.IMPORTANCE_DEFAULT
                );
                channel.setDescription("Gentle alerts when alarms are auto-snoozed during calls");
                channel.setSound(null, null); // completely silent so it does not beep in the user's ear during their call
                channel.enableVibration(false);
                nm.createNotificationChannel(channel);
            }

            Intent intent = new Intent(context, MainActivity.class);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);

            int pendingFlags = PendingIntent.FLAG_UPDATE_CURRENT;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                pendingFlags |= PendingIntent.FLAG_IMMUTABLE;
            }

            PendingIntent contentIntent = PendingIntent.getActivity(
                context, alarmId + 400, intent, pendingFlags
            );

            String title = "Alarm Snoozed for 15m 📞";
            String shortText = "You're on a call. We've snoozed your positivity alarm for 15 mins.";
            String longText = "You're currently on a call (network or VoIP/WhatsApp). Your positivity session ('" 
                + label + "') has been snoozed for 15 minutes and will ring once you're free.";

            NotificationCompat.Builder builder = new NotificationCompat.Builder(context, AlarmConstants.CHANNEL_CALL_SNOOZE_ID)
                .setSmallIcon(R.drawable.ic_launcher)
                .setContentTitle(title)
                .setContentText(shortText)
                .setStyle(new NotificationCompat.BigTextStyle().bigText(longText))
                .setPriority(NotificationCompat.PRIORITY_DEFAULT)
                .setCategory(NotificationCompat.CATEGORY_STATUS)
                .setAutoCancel(true)
                .setContentIntent(contentIntent);

            nm.notify(CALL_SNOOZE_NOTIFICATION_ID, builder.build());
            Log.d(TAG, "Posted Call-Snooze notification successfully.");
        } catch (Exception e) {
            Log.e(TAG, "Error posting call snooze notification: " + e.getMessage());
        }
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        Log.d(TAG, "Alarm broadcast received! Action: " + intent.getAction());

        int alarmId = intent.getIntExtra(AlarmConstants.EXTRA_ALARM_ID, 1);
        String label = intent.getStringExtra(AlarmConstants.EXTRA_ALARM_LABEL);
        if (label == null || label.isEmpty()) label = "Spirit's Positivity Challenge";

        // Step 2 Requirement: If the user is on a call (network or WhatsApp/VoIP), auto-snooze for 15 minutes!
        if (isUserOnCall(context)) {
            Log.d(TAG, "User is currently on call (network or VoIP). Snoozing alarm for 15 minutes.");
            NativeAlarmScheduler.scheduleSnoozeAlarm(context, alarmId, label, 15);
            postCallSnoozeNotification(context, alarmId, label);
            return;
        }

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
