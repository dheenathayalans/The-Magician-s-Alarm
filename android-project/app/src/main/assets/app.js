function runNative5SecTest() {
  if (isNativeAndroidApp()) {
    window.AndroidAlarmBridge.testNativeAlarm(5);
    showToast("🔔 5-second test alarm scheduled! Lock your phone screen NOW to watch it ring!");
  } else {
    showToast("Testing in browser... Get ready!");
    setTimeout(() => {
      triggerAlarmAlert({
        label: "⚡ Real Phone Alarm 5s Test",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }, 5000);
  }
}

// ============================================================================
// 16. INITIALIZATION ON DOM READY
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  initCosmicCanvas();
  refreshHomeView();
  startAlarmClockTicker();

  // If running inside Android APK: sync alarms and check permissions
  if (isNativeAndroidApp()) {
    const androidSec = document.getElementById('android-permissions-section');
    if (androidSec) androidSec.style.display = 'block';
    syncAlarmsToNativeAndroid();
    checkNativeAndroidPermissions();
  }

  // Unlock Web Audio on first user interaction anywhere (required by iOS / Android)
  const unlockEvents = ['touchstart', 'touchend', 'click', 'keydown'];
  const handleFirstInteraction = () => {
    audioEngine.unlockAudio();
    unlockEvents.forEach(evt => document.removeEventListener(evt, handleFirstInteraction));
  };
  unlockEvents.forEach(evt => document.addEventListener(evt, handleFirstInteraction, { passive: true }));

  // Search in library
  const searchInput = document.getElementById('library-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderToolsLibrary('All', e.target.value);
    });
  }

  // Close teaching modal on backdrop click
  const teachingModal = document.getElementById('teaching-doc-modal');
  if (teachingModal) {
    teachingModal.addEventListener('click', (e) => {
      if (e.target === teachingModal) {
        closeTeachingModal();
      }
    });
  }

  // Register service worker if supported
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(console.warn);
  }
});
