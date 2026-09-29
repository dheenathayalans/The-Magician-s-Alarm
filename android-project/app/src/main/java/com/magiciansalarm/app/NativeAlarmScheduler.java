package com.magiciansalarm.app;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.Calendar;

public class NativeAlarmScheduler {

    private static final String TAG = "NativeAlarmScheduler";

    public static void scheduleAlarm(Context context, int id, String timeStr, String label, String soundId, boolean enabled, String daysJson) {
        if (!enabled) {
            cancelAlarm(context, id);
            return;
        }

        long triggerMillis = calculateNextTriggerMillis(timeStr, daysJson);
        saveAlarmToPrefs(context, id, timeStr, label, soundId, enabled, daysJson, triggerMillis);

        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        if (alarmManager == null) return;

        Intent intent = new Intent(context, AlarmReceiver.class);
        intent.setAction(AlarmConstants.ACTION_FIRE_ALARM);
        intent.putExtra(AlarmConstants.EXTRA_ALARM_ID, id);
        intent.putExtra(AlarmConstants.EXTRA_ALARM_LABEL, label);
        intent.putExtra(AlarmConstants.EXTRA_ALARM_TIME, timeStr);
        intent.putExtra(AlarmConstants.EXTRA_ALARM_SOUND, soundId);

        int flags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            flags |= PendingIntent.FLAG_IMMUTABLE;
        }

        PendingIntent alarmPendingIntent = PendingIntent.getBroadcast(context, id, intent, flags);

        // Intent for when user taps the alarm icon in the Android status bar / lockscreen
        Intent showIntent = new Intent(context, MainActivity.class);
        PendingIntent showPendingIntent = PendingIntent.getActivity(context, id, showIntent, flags);

        try {
            // setAlarmClock is the gold standard on Android - wakes up Samsung One UI and Doze mode!
            AlarmManager.AlarmClockInfo clockInfo = new AlarmManager.AlarmClockInfo(triggerMillis, showPendingIntent);
            alarmManager.setAlarmClock(clockInfo, alarmPendingIntent);
            Log.d(TAG, "Native Alarm " + id + " scheduled successfully for: " + triggerMillis + " (" + timeStr + ")");
        } catch (SecurityException se) {
            Log.e(TAG, "SecurityException while scheduling exact alarm: " + se.getMessage());
            // Fallback for devices restricting exact alarms
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                alarmManager.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, triggerMillis, alarmPendingIntent);
            } else {
                alarmManager.set(AlarmManager.RTC_WAKEUP, triggerMillis, alarmPendingIntent);
            }
        }
    }

    public static void scheduleQuickTestAlarm(Context context, int seconds) {
        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        if (alarmManager == null) return;

        long triggerMillis = System.currentTimeMillis() + (seconds * 1000L);

        Intent intent = new Intent(context, AlarmReceiver.class);
        intent.setAction(AlarmConstants.ACTION_FIRE_ALARM);
        intent.putExtra(AlarmConstants.EXTRA_ALARM_ID, 9999);
        intent.putExtra(AlarmConstants.EXTRA_ALARM_LABEL, "⚡ Test Real Phone Alarm");
        intent.putExtra(AlarmConstants.EXTRA_ALARM_TIME, "Now");
        intent.putExtra(AlarmConstants.EXTRA_ALARM_SOUND, "singing_bowl");

        int flags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            flags |= PendingIntent.FLAG_IMMUTABLE;
        }

        PendingIntent alarmPendingIntent = PendingIntent.getBroadcast(context, 9999, intent, flags);
        Intent showIntent = new Intent(context, MainActivity.class);
        PendingIntent showPendingIntent = PendingIntent.getActivity(context, 9999, showIntent, flags);

        try {
            AlarmManager.AlarmClockInfo clockInfo = new AlarmManager.AlarmClockInfo(triggerMillis, showPendingIntent);
            alarmManager.setAlarmClock(clockInfo, alarmPendingIntent);
            Log.d(TAG, "Quick test alarm scheduled in " + seconds + " seconds.");
        } catch (Exception e) {
            Log.e(TAG, "Failed to schedule test alarm: " + e.getMessage());
        }
    }

    public static void cancelAlarm(Context context, int id) {
        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        if (alarmManager == null) return;

        Intent intent = new Intent(context, AlarmReceiver.class);
        int flags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            flags |= PendingIntent.FLAG_IMMUTABLE;
        }

        PendingIntent pendingIntent = PendingIntent.getBroadcast(context, id, intent, flags);
        alarmManager.cancel(pendingIntent);
        removeAlarmFromPrefs(context, id);
        Log.d(TAG, "Alarm " + id + " cancelled.");
    }

    public static void rescheduleAllAlarms(Context context) {
        SharedPreferences prefs = context.getSharedPreferences(AlarmConstants.PREFS_NAME, Context.MODE_PRIVATE);
        String alarmsJson = prefs.getString(AlarmConstants.KEY_SAVED_ALARMS, "[]");
        try {
            JSONArray arr = new JSONArray(alarmsJson);
            for (int i = 0; i < arr.length(); i++) {
                JSONObject obj = arr.getJSONObject(i);
                int id = obj.getInt("id");
                String timeStr = obj.getString("time");
                String label = obj.optString("label", "Positivity Practice");
                String soundId = obj.optString("soundId", "singing_bowl");
                boolean enabled = obj.optBoolean("enabled", true);
                String daysJson = obj.optString("daysJson", "[]");
                if (enabled) {
                    scheduleAlarm(context, id, timeStr, label, soundId, true, daysJson);
                }
            }
        } catch (Exception e) {
            Log.e(TAG, "Error rescheduling alarms: " + e.getMessage());
        }
    }

    public static long calculateNextTriggerMillis(String timeStr, String daysJson) {
        String[] parts = timeStr.split(":");
        int hour = Integer.parseInt(parts[0].trim());
        int minute = Integer.parseInt(parts[1].trim());

        Calendar now = Calendar.getInstance();
        Calendar target = Calendar.getInstance();
        target.set(Calendar.HOUR_OF_DAY, hour);
        target.set(Calendar.MINUTE, minute);
        target.set(Calendar.SECOND, 0);
        target.set(Calendar.MILLISECOND, 0);

        if (target.before(now) || target.equals(now)) {
            target.add(Calendar.DAY_OF_YEAR, 1);
        }

        return target.getTimeInMillis();
    }

    private static void saveAlarmToPrefs(Context context, int id, String timeStr, String label, String soundId, boolean enabled, String daysJson, long triggerMillis) {
        try {
            SharedPreferences prefs = context.getSharedPreferences(AlarmConstants.PREFS_NAME, Context.MODE_PRIVATE);
            String existing = prefs.getString(AlarmConstants.KEY_SAVED_ALARMS, "[]");
            JSONArray arr = new JSONArray(existing);
            JSONArray updated = new JSONArray();

            for (int i = 0; i < arr.length(); i++) {
                JSONObject item = arr.getJSONObject(i);
                if (item.getInt("id") != id) {
                    updated.put(item);
                }
            }

            JSONObject current = new JSONObject();
            current.put("id", id);
            current.put("time", timeStr);
            current.put("label", label);
            current.put("soundId", soundId);
            current.put("enabled", enabled);
            current.put("daysJson", daysJson);
            current.put("triggerMillis", triggerMillis);
            updated.put(current);

            prefs.edit().putString(AlarmConstants.KEY_SAVED_ALARMS, updated.toString()).apply();
        } catch (Exception e) {
            Log.e(TAG, "Error saving alarm to prefs: " + e.getMessage());
        }
    }

    private static void removeAlarmFromPrefs(Context context, int id) {
        try {
            SharedPreferences prefs = context.getSharedPreferences(AlarmConstants.PREFS_NAME, Context.MODE_PRIVATE);
            String existing = prefs.getString(AlarmConstants.KEY_SAVED_ALARMS, "[]");
            JSONArray arr = new JSONArray(existing);
            JSONArray updated = new JSONArray();

            for (int i = 0; i < arr.length(); i++) {
                JSONObject item = arr.getJSONObject(i);
                if (item.getInt("id") != id) {
                    updated.put(item);
                }
            }
            prefs.edit().putString(AlarmConstants.KEY_SAVED_ALARMS, updated.toString()).apply();
        } catch (Exception e) {
            Log.e(TAG, "Error removing alarm from prefs: " + e.getMessage());
        }
    }
}
