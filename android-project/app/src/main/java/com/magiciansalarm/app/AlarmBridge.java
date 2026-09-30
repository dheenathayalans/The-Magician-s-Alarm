    @JavascriptInterface
    public void openTimePicker(int alarmIndex, String currentTime) {
        mainHandler.post(() -> {
            int initialHour = 8;
            int initialMinute = 0;
            try {
                if (currentTime != null && currentTime.contains(":")) {
                    String[] parts = currentTime.split(":");
                    initialHour = Integer.parseInt(parts[0].trim());
                    initialMinute = Integer.parseInt(parts[1].trim());
                }
            } catch (Exception ignored) {}

            android.app.TimePickerDialog dialog = new android.app.TimePickerDialog(
                activity,
                (view, selectedHour, selectedMinute) -> {
                    // Fix Samsung / Android keypad bug: force clearFocus so typed minutes are committed
                    if (view != null) {
                        view.clearFocus();
                        int h = android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M ? view.getHour() : view.getCurrentHour();
                        int m = android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M ? view.getMinute() : view.getCurrentMinute();
                        selectedHour = h;
                        selectedMinute = m;
                    }
                    String timeFormatted = String.format(java.util.Locale.US, "%02d:%02d", selectedHour, selectedMinute);
                    webView.evaluateJavascript(
                        String.format(java.util.Locale.US, "if (window.onNativeTimePicked) { window.onNativeTimePicked(%d, '%s'); }", alarmIndex, timeFormatted),
                        null
                    );
                },
                initialHour,
                initialMinute,
                false
            );

            dialog.setTitle("Set Practice Reminder Time");

            // Explicitly clear focus when OK is clicked so software keyboard input is committed
            dialog.setButton(android.content.DialogInterface.BUTTON_POSITIVE, "OK", (d, which) -> {
                android.view.View focused = dialog.getCurrentFocus();
                if (focused != null) {
                    focused.clearFocus();
                }
                dialog.onClick(d, which);
            });

            dialog.show();
        });
    }
