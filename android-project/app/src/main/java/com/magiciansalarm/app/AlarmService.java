package com.magiciansalarm.app;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.media.AudioAttributes;
import android.media.AudioFocusRequest;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.os.IBinder;
import android.os.PowerManager;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.util.Log;

import androidx.core.app.NotificationCompat;

public class AlarmService extends Service {

    private static final String TAG = "AlarmService";
    private static final int NOTIFICATION_ID = 8888;

    private MediaPlayer mediaPlayer;
    private Vibrator vibrator;
    private PowerManager.WakeLock wakeLock;
    private AudioManager audioManager;
    private AudioFocusRequest audioFocusRequest;

    @Override
    public void onCreate() {
        super.onCreate();
        audioManager = (AudioManager) getSystemService(Context.AUDIO_SERVICE);
        vibrator = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);

        PowerManager powerManager = (PowerManager) getSystemService(Context.POWER_SERVICE);
        if (powerManager != null) {
            wakeLock = powerManager.newWakeLock(
                PowerManager.PARTIAL_WAKE_LOCK | PowerManager.ACQUIRE_CAUSES_WAKEUP,
                "MagiciansAlarm::ServiceWakeLock"
            );
            wakeLock.acquire(10 * 60 * 1000L); // 10 minutes maximum ringing timeout
        }
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (intent == null) return START_NOT_STICKY;

        String action = intent.getAction();
        if (AlarmConstants.ACTION_DISMISS.equals(action)) {
            stopAlarm();
            stopSelf();
            return START_NOT_STICKY;
        }

        int alarmId = intent.getIntExtra(AlarmConstants.EXTRA_ALARM_ID, 1);
        String label = intent.getStringExtra(AlarmConstants.EXTRA_ALARM_LABEL);
        if (label == null || label.isEmpty()) label = "Spirit's Positivity Challenge";
        String timeStr = intent.getStringExtra(AlarmConstants.EXTRA_ALARM_TIME);
        if (timeStr == null) timeStr = "Now";

        createNotificationChannel();

        // Full Screen Intent to wake up and display AlarmActivity directly over lock screen
        Intent alarmActivityIntent = new Intent(this, AlarmActivity.class);
        alarmActivityIntent.putExtra(AlarmConstants.EXTRA_ALARM_ID, alarmId);
        alarmActivityIntent.putExtra(AlarmConstants.EXTRA_ALARM_LABEL, label);
        alarmActivityIntent.putExtra(AlarmConstants.EXTRA_ALARM_TIME, timeStr);
        alarmActivityIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_REORDER_TO_FRONT);

        int pendingFlags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            pendingFlags |= PendingIntent.FLAG_IMMUTABLE;
        }

        PendingIntent fullScreenPendingIntent = PendingIntent.getActivity(
            this, alarmId, alarmActivityIntent, pendingFlags
        );

        // Action: Open Spirit's Ceremony
        Intent openAppIntent = new Intent(this, MainActivity.class);
        openAppIntent.setAction(AlarmConstants.ACTION_OPEN_SPIRIT);
        openAppIntent.putExtra("auto_open_spirit", true);
        PendingIntent openAppPendingIntent = PendingIntent.getActivity(
            this, alarmId + 100, openAppIntent, pendingFlags
        );

        // Action: Dismiss
        Intent dismissIntent = new Intent(this, AlarmService.class);
        dismissIntent.setAction(AlarmConstants.ACTION_DISMISS);
        PendingIntent dismissPendingIntent = PendingIntent.getService(
            this, alarmId + 200, dismissIntent, pendingFlags
        );

        // Build Alarm Notification
        Notification notification = new NotificationCompat.Builder(this, AlarmConstants.CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_launcher)
            .setContentTitle("🔔 " + label)
            .setContentText("Time for your 5-minute positivity practice. Tap to begin!")
            .setPriority(NotificationCompat.PRIORITY_MAX)
            .setCategory(NotificationCompat.CATEGORY_ALARM)
            .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
            .setOngoing(true)
            .setAutoCancel(false)
            .setFullScreenIntent(fullScreenPendingIntent, true)
            .setContentIntent(fullScreenPendingIntent)
            .addAction(R.drawable.ic_launcher, "✨ Open Practice", openAppPendingIntent)
            .addAction(android.R.drawable.ic_menu_close_clear_cancel, "✕ Dismiss", dismissPendingIntent)
            .build();

        startForeground(NOTIFICATION_ID, notification);

        // Launch AlarmActivity immediately
        try {
            startActivity(alarmActivityIntent);
        } catch (Exception e) {
            Log.e(TAG, "Direct startActivity error (falling back to full screen intent): " + e.getMessage());
        }

        // Play looping alarm sound (rings even in Silent / Vibrate mode)
        startAlarmAudioAndVibration();

        return START_STICKY;
    }

    private void startAlarmAudioAndVibration() {
        try {
            // Request AudioFocus on USAGE_ALARM so it takes priority
            AudioAttributes audioAttributes = new AudioAttributes.Builder()
                .setUsage(AudioAttributes.USAGE_ALARM)
                .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                .build();

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && audioManager != null) {
                audioFocusRequest = new AudioFocusRequest.Builder(AudioManager.AUDIOFOCUS_GAIN_TRANSIENT_MAY_DUCK)
                    .setAudioAttributes(audioAttributes)
                    .setOnAudioFocusChangeListener(focusChange -> {
                        // Keep playing! Do not allow other apps to silence this sacred alarm.
                        if (mediaPlayer != null && !mediaPlayer.isPlaying()) {
                            try { mediaPlayer.start(); } catch (Exception ignored) {}
                        }
                    })
                    .build();
                audioManager.requestAudioFocus(audioFocusRequest);
            }

            // Get default alarm sound, or notification/ringtone fallback
            Uri alarmUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_ALARM);
            if (alarmUri == null) {
                alarmUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_RINGTONE);
            }
            if (alarmUri == null) {
                alarmUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
            }

            if (mediaPlayer == null) {
                mediaPlayer = new MediaPlayer();
            } else {
                mediaPlayer.reset();
            }

            mediaPlayer.setDataSource(this, alarmUri);
            mediaPlayer.setAudioAttributes(audioAttributes);
            mediaPlayer.setLooping(true); // Loop until user dismisses!
            mediaPlayer.prepare();
            mediaPlayer.start();
            Log.d(TAG, "Alarm sound started playing on USAGE_ALARM (Audible in silent mode).");

        } catch (Exception e) {
            Log.e(TAG, "Error playing alarm sound: " + e.getMessage());
        }

        // Loop vibration
        try {
            if (vibrator != null && vibrator.hasVibrator()) {
                long[] pattern = { 0, 800, 400, 800, 400, 1000 };
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    AudioAttributes vibAttrs = new AudioAttributes.Builder()
                        .setUsage(AudioAttributes.USAGE_ALARM)
                        .build();
                    vibrator.vibrate(VibrationEffect.createWaveform(pattern, 0), vibAttrs);
                } else {
                    vibrator.vibrate(pattern, 0);
                }
            }
        } catch (Exception e) {
            Log.e(TAG, "Error triggering vibration: " + e.getMessage());
        }
    }

    private void stopAlarm() {
        if (mediaPlayer != null) {
            try {
                if (mediaPlayer.isPlaying()) mediaPlayer.stop();
                mediaPlayer.release();
            } catch (Exception ignored) {}
            mediaPlayer = null;
        }

        if (vibrator != null) {
            try { vibrator.cancel(); } catch (Exception ignored) {}
        }

        if (audioManager != null && audioFocusRequest != null && Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            try { audioManager.abandonAudioFocusRequest(audioFocusRequest); } catch (Exception ignored) {}
        }

        if (wakeLock != null && wakeLock.isHeld()) {
            try { wakeLock.release(); } catch (Exception ignored) {}
            wakeLock = null;
        }

        stopForeground(true);
        Log.d(TAG, "AlarmService stopped successfully.");
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationManager nm = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
            if (nm != null) {
                NotificationChannel channel = new NotificationChannel(
                    AlarmConstants.CHANNEL_ID,
                    AlarmConstants.CHANNEL_NAME,
                    NotificationManager.IMPORTANCE_HIGH
                );
                channel.setDescription("Critical notifications that wake the screen for daily 5-minute practices");
                channel.setLockscreenVisibility(Notification.VISIBILITY_PUBLIC);
                channel.enableVibration(true);
                channel.setBypassDnd(true);
                
                AudioAttributes audioAttributes = new AudioAttributes.Builder()
                    .setUsage(AudioAttributes.USAGE_ALARM)
                    .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                    .build();
                channel.setSound(RingtoneManager.getDefaultUri(RingtoneManager.TYPE_ALARM), audioAttributes);

                nm.createNotificationChannel(channel);
            }
        }
    }

    @Override
    public void onDestroy() {
        stopAlarm();
        super.onDestroy();
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
