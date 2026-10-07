package com.magiciansalarm.app;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import java.util.Locale;

public class MainActivity extends Activity {

    private static MainActivity instance;
    private WebView webView;
    private AlarmBridge alarmBridge;

    public static MainActivity getInstance() {
        return instance;
    }

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        instance = this;

        // Immersive dark status bar & full screen support
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            getWindow().setStatusBarColor(0xFF0B0D19);
            getWindow().setNavigationBarColor(0xFF070913);
        }

        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.webview);
        WebSettings settings = webView.getSettings();

        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);

        alarmBridge = new AlarmBridge(this, webView);
        webView.addJavascriptInterface(alarmBridge, "AndroidAlarmBridge");

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                syncMissedBedtimeQueue();
                handleIntentExtras(getIntent());
            }
        });
        webView.setWebChromeClient(new WebChromeClient());
        webView.setLayerType(View.LAYER_TYPE_HARDWARE, null);

        // Load bundled offline assets
        webView.loadUrl("file:///android_asset/index.html");

        // Reschedule alarms in case of system update
        NativeAlarmScheduler.rescheduleAllAlarms(this);
    }

    @Override
    protected void onResume() {
        super.onResume();
        syncMissedBedtimeQueue();
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        syncMissedBedtimeQueue();
        handleIntentExtras(intent);
    }

    public void onMissedAlarmAdded(int count) {
        runOnUiThread(() -> {
            if (webView != null) {
                webView.evaluateJavascript(
                    String.format(Locale.US, "if (typeof addMissedSessionToBedtimeQueue === 'function') { addMissedSessionToBedtimeQueue(%d); }", count),
                    null
                );
            }
        });
    }

    private void syncMissedBedtimeQueue() {
        try {
            SharedPreferences prefs = getSharedPreferences(AlarmConstants.PREFS_NAME, Context.MODE_PRIVATE);
            int queued = prefs.getInt(AlarmConstants.KEY_BEDTIME_QUEUE, 0);
            if (queued > 0) {
                prefs.edit().putInt(AlarmConstants.KEY_BEDTIME_QUEUE, 0).apply();
                onMissedAlarmAdded(queued);
            }
        } catch (Exception ignored) {}
    }

    private void handleIntentExtras(Intent intent) {
        if (intent == null || webView == null) return;

        boolean openSpirit = intent.getBooleanExtra("auto_open_spirit", false);
        boolean addToBedtime = intent.getBooleanExtra("add_to_bedtime", false);
        boolean fromMissed = intent.getBooleanExtra("from_missed_notification", false);

        if (fromMissed) {
            webView.postDelayed(() -> {
                webView.evaluateJavascript("if (typeof showMissedSessionNotice === 'function') { showMissedSessionNotice(); }", null);
            }, 600);
        } else if (openSpirit) {
            webView.postDelayed(() -> {
                webView.evaluateJavascript("if (typeof openSpiritCeremonyModal === 'function') { openSpiritCeremonyModal(); }", null);
            }, 500);
        } else if (addToBedtime) {
            webView.postDelayed(() -> {
                webView.evaluateJavascript("if (typeof postponeToTonight === 'function') { postponeToTonight(); }", null);
            }, 500);
        }
    }

    @Override
    protected void onDestroy() {
        if (instance == this) instance = null;
        super.onDestroy();
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
