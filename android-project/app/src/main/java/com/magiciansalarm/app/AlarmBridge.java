package com.magiciansalarm.app;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Handler;
import android.os.Looper;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.Toast;

import org.json.JSONObject;

public class AlarmBridge {

    private final Activity activity;
    private final WebView webView;
    private final Handler mainHandler;

    public AlarmBridge(Activity activity, WebView webView) {
        this.activity = activity;
        this.webView = webView;
        this.mainHandler = new Handler(Looper.getMainLooper());
    }

    @JavascriptInterface
    public boolean isNativeAndroid() {
        return true;
    }

    @JavascriptInterface
    public void setNativeAlarm(int id, String timeStr, String label, String soundId, boolean enabled, String daysJson) {
        mainHandler.post(() -> {
            NativeAlarmScheduler.scheduleAlarm(activity, id, timeStr, label, soundId, enabled, daysJson);
        });
    }

    @JavascriptInterface
    public void cancelNativeAlarm(int id) {
        mainHandler.post(() -> {
            NativeAlarmScheduler.cancelAlarm(activity, id);
        });
    }

    @JavascriptInterface
    public void testNativeAlarm(int seconds) {
        mainHandler.post(() -> {
            NativeAlarmScheduler.scheduleQuickTestAlarm(activity, seconds);
            Toast.makeText(activity, "🔔 Native alarm set in " + seconds + "s. Lock your phone now to test!", Toast.LENGTH_LONG).show();
        });
    }

    @JavascriptInterface
    public void stopNativeAlarmSound() {
        mainHandler.post(() -> {
            Intent stopIntent = new Intent(activity, AlarmService.class);
            stopIntent.setAction(AlarmConstants.ACTION_DISMISS);
            activity.startService(stopIntent);
        });
    }

    @JavascriptInterface
    public String getPermissionsStatus() {
        JSONObject status = PermissionsHelper.getPermissionsStatus(activity);
        return status.toString();
    }

    @JavascriptInterface
    public void requestBatteryOptimization() {
        mainHandler.post(() -> {
            PermissionsHelper.requestIgnoreBatteryOptimizations(activity);
        });
    }

    @JavascriptInterface
    public void requestExactAlarmPermission() {
        mainHandler.post(() -> {
            PermissionsHelper.requestExactAlarmPermission(activity);
        });
    }

    @JavascriptInterface
    public void requestOverlayPermission() {
        mainHandler.post(() -> {
            PermissionsHelper.requestOverlayPermission(activity);
        });
    }

    @JavascriptInterface
    public void requestNotificationPermission() {
        mainHandler.post(() -> {
            PermissionsHelper.requestNotificationPermission(activity);
        });
    }

    @JavascriptInterface
    public void openSamsungDeviceCare() {
        mainHandler.post(() -> {
            PermissionsHelper.openSamsungDeviceCare(activity);
        });
    }
}
