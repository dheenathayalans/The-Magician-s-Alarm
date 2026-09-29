package com.magiciansalarm.app;

import android.app.Activity;
import android.app.KeyguardManager;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.TextView;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class AlarmActivity extends Activity {

    private int alarmId = 1;
    private String alarmLabel = "Spirit's Positivity Challenge";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Turn on screen, show over lockscreen, dismiss keyguard
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        setupLockscreenWake();

        setContentView(R.layout.activity_alarm);

        Intent intent = getIntent();
        if (intent != null) {
            alarmId = intent.getIntExtra(AlarmConstants.EXTRA_ALARM_ID, 1);
            String label = intent.getStringExtra(AlarmConstants.EXTRA_ALARM_LABEL);
            if (label != null && !label.isEmpty()) alarmLabel = label;
        }

        TextView timeDisplay = findViewById(R.id.alarm_time_display);
        TextView labelDisplay = findViewById(R.id.alarm_label_display);

        SimpleDateFormat sdf = new SimpleDateFormat("hh:mm a", Locale.getDefault());
        timeDisplay.setText(sdf.format(new Date()));
        labelDisplay.setText(alarmLabel);

        Button btnOpenSpirit = findViewById(R.id.btn_open_spirit);
        Button btnSnooze = findViewById(R.id.btn_snooze);
        Button btnBedtime = findViewById(R.id.btn_bedtime_queue);
        Button btnDismiss = findViewById(R.id.btn_dismiss);

        // 1. OPEN APP & LET SPIRIT DECIDE
        btnOpenSpirit.setOnClickListener(v -> {
            stopAlarmService();
            Intent mainIntent = new Intent(AlarmActivity.this, MainActivity.class);
            mainIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
            mainIntent.putExtra("auto_open_spirit", true);
            startActivity(mainIntent);
            finish();
        });

        // 2. SNOOZE 15 MINUTES
        btnSnooze.setOnClickListener(v -> {
            stopAlarmService();
            NativeAlarmScheduler.scheduleQuickTestAlarm(AlarmActivity.this, 15 * 60);
            finish();
        });

        // 3. DO IT TONIGHT (BEDTIME QUEUE)
        btnBedtime.setOnClickListener(v -> {
            stopAlarmService();
            Intent mainIntent = new Intent(AlarmActivity.this, MainActivity.class);
            mainIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
            mainIntent.putExtra("add_to_bedtime", true);
            startActivity(mainIntent);
            finish();
        });

        // 4. DISMISS
        btnDismiss.setOnClickListener(v -> {
            stopAlarmService();
            finish();
        });
    }

    private void setupLockscreenWake() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O_MR1) {
            setShowWhenLocked(true);
            setTurnScreenOn(true);
            KeyguardManager km = (KeyguardManager) getSystemService(Context.KEYGUARD_SERVICE);
            if (km != null) {
                km.requestDismissKeyguard(this, null);
            }
        } else {
            getWindow().addFlags(
                WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED |
                WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD |
                WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON |
                WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON
            );
        }
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    }

    private void stopAlarmService() {
        Intent stopIntent = new Intent(this, AlarmService.class);
        stopIntent.setAction(AlarmConstants.ACTION_DISMISS);
        startService(stopIntent);
    }

    @Override
    public void onBackPressed() {
        // Prevent accidental back press dismissing the sacred alarm without action
        stopAlarmService();
        super.onBackPressed();
    }
}
