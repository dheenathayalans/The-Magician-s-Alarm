package com.magiciansalarm.app;

import android.app.Activity;
import android.app.AlarmManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.PowerManager;
import android.provider.Settings;
import android.util.Log;

import androidx.core.app.NotificationManagerCompat;

import org.json.JSONObject;

public class PermissionsHelper {

    private static final String TAG = "PermissionsHelper";

    public static JSONObject getPermissionsStatus(Context context) {
        JSONObject status = new JSONObject();
        try {
            // 1. Notifications
            boolean notifications = NotificationManagerCompat.from(context).areNotificationsEnabled();
            status.put("notifications", notifications);

            // 2. Exact Alarms (Android 12+)
            boolean exactAlarm = true;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                AlarmManager am = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
                if (am != null) {
                    exactAlarm = am.canScheduleExactAlarms();
                }
            }
            status.put("exactAlarm", exactAlarm);

            // 3. Ignore Battery Optimizations (Samsung / Android)
            boolean batteryOptimizationIgnored = false;
            PowerManager pm = (PowerManager) context.getSystemService(Context.POWER_SERVICE);
            if (pm != null && Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                batteryOptimizationIgnored = pm.isIgnoringBatteryOptimizations(context.getPackageName());
            } else {
                batteryOptimizationIgnored = true;
            }
            status.put("batteryOptimizationIgnored", batteryOptimizationIgnored);

            // 4. Draw Over Other Apps / Overlay
            boolean overlay = true;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                overlay = Settings.canDrawOverlays(context);
            }
            status.put("overlay", overlay);

            // 5. Is Samsung device?
            boolean isSamsung = Build.MANUFACTURER.equalsIgnoreCase("samsung");
            status.put("isSamsung", isSamsung);

            // All critical granted?
            boolean allGranted = notifications && exactAlarm && batteryOptimizationIgnored;
            status.put("allGranted", allGranted);

        } catch (Exception e) {
            Log.e(TAG, "Error checking permissions: " + e.getMessage());
        }
        return status;
    }

    public static void requestIgnoreBatteryOptimizations(Activity activity) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            try {
                PowerManager pm = (PowerManager) activity.getSystemService(Context.POWER_SERVICE);
                if (pm != null && !pm.isIgnoringBatteryOptimizations(activity.getPackageName())) {
                    Intent intent = new Intent(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS);
                    intent.setData(Uri.parse("package:" + activity.getPackageName()));
                    activity.startActivity(intent);
                }
            } catch (Exception e) {
                Log.e(TAG, "Error opening battery optimization request: " + e.getMessage());
                try {
                    Intent intent = new Intent(Settings.ACTION_IGNORE_BATTERY_OPTIMIZATION_SETTINGS);
                    activity.startActivity(intent);
                } catch (Exception ignored) {}
            }
        }
    }

    public static void requestExactAlarmPermission(Activity activity) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            try {
                AlarmManager am = (AlarmManager) activity.getSystemService(Context.ALARM_SERVICE);
                if (am != null && !am.canScheduleExactAlarms()) {
                    Intent intent = new Intent(Settings.ACTION_REQUEST_SCHEDULE_EXACT_ALARM);
                    intent.setData(Uri.parse("package:" + activity.getPackageName()));
                    activity.startActivity(intent);
                }
            } catch (Exception e) {
                Log.e(TAG, "Error requesting exact alarm: " + e.getMessage());
            }
        }
    }

    public static void requestOverlayPermission(Activity activity) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            try {
                if (!Settings.canDrawOverlays(activity)) {
                    Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION);
                    intent.setData(Uri.parse("package:" + activity.getPackageName()));
                    activity.startActivity(intent);
                }
            } catch (Exception e) {
                Log.e(TAG, "Error requesting overlay permission: " + e.getMessage());
            }
        }
    }

    public static void requestNotificationPermission(Activity activity) {
        try {
            Intent intent = new Intent(Settings.ACTION_APP_NOTIFICATION_SETTINGS);
            intent.putExtra(Settings.EXTRA_APP_PACKAGE, activity.getPackageName());
            activity.startActivity(intent);
        } catch (Exception e) {
            Log.e(TAG, "Error opening notification settings: " + e.getMessage());
        }
    }

    public static void openSamsungDeviceCare(Activity activity) {
        try {
            // Intent for Samsung Device Care (Battery & Sleeping apps)
            Intent intent = new Intent();
            intent.setComponent(new ComponentName("com.samsung.android.lool", "com.samsung.android.sm.ui.battery.BatteryActivity"));
            activity.startActivity(intent);
        } catch (Exception e) {
            try {
                Intent intent = new Intent();
                intent.setComponent(new ComponentName("com.samsung.android.sm", "com.samsung.android.sm.ui.battery.BatteryActivity"));
                activity.startActivity(intent);
            } catch (Exception e2) {
                // Fallback to app details
                Intent intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
                intent.setData(Uri.parse("package:" + activity.getPackageName()));
                activity.startActivity(intent);
            }
        }
    }
}
