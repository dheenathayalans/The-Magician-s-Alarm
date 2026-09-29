package com.magiciansalarm.app;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {

    private WebView webView;
    private AlarmBridge alarmBridge;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

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
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        handleIntentExtras(intent);
    }

    private void handleIntentExtras(Intent intent) {
        if (intent == null || webView == null) return;

        boolean openSpirit = intent.getBooleanExtra("auto_open_spirit", false);
        boolean addToBedtime = intent.getBooleanExtra("add_to_bedtime", false);

        if (openSpirit) {
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
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
