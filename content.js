let skipAdInterval = null;

function skipAdsAndCloseOverlays() {
  // Try clicking "Skip" button (skippable ads)
  const skipBtn = document.querySelector('.ytp-ad-skip-button');
  if (skipBtn) {
    skipBtn.click();
    console.log("⏭️ Clicked 'Skip Ad' button");
  }

  // Close overlay banner ads
  const overlayBtn = document.querySelector('.ytp-ad-overlay-close-button');
  if (overlayBtn) {
    overlayBtn.click();
    console.log("❌ Closed overlay ad");
  }
}

function forceSkipNonSkippableAd() {
  const video = document.querySelector('video');
  const adContainer = document.querySelector('.ad-showing');

  if (adContainer && video && isFinite(video.duration) && video.duration > 0) {
    if (video.currentTime < video.duration - 0.1) {
      video.currentTime = video.duration;
      console.log("⏩ Force-seeking to end of non-skippable ad");
    }
  }
}

function monitorAdStatus() {
  const isAdPlaying = document.querySelector('.ad-showing');

  if (isAdPlaying && !skipAdInterval) {
    console.log("🎯 Ad detected, starting force-skip loop...");
    skipAdInterval = setInterval(forceSkipNonSkippableAd, 300);
  } else if (!isAdPlaying && skipAdInterval) {
    clearInterval(skipAdInterval);
    skipAdInterval = null;
    console.log("✅ Ad finished, cleared force-skip loop.");
  }
}

function startAdSkipper() {
  skipAdsAndCloseOverlays();
  monitorAdStatus();

  const observer = new MutationObserver(() => {
    skipAdsAndCloseOverlays();
    monitorAdStatus();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  setInterval(() => {
    skipAdsAndCloseOverlays();
    monitorAdStatus();
  }, 500);
}

// Ensure DOM is ready
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  startAdSkipper();
} else {
  window.addEventListener('DOMContentLoaded', startAdSkipper);
}
