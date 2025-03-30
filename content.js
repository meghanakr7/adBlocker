let skipAdInterval = null;
function trulyClickElement(el) {
    ['mouseover', 'mousedown', 'mouseup', 'click'].forEach(type => {
      el.dispatchEvent(new MouseEvent(type, {
        bubbles: true,
        cancelable: true,
        view: window
      }));
    });
  }
  function clickSkipButton() {
    const btn = document.querySelector('.ytp-ad-skip-button');
    
    const isVisible = (
      btn &&
      btn.offsetParent !== null &&
      getComputedStyle(btn).display !== 'none' &&
      getComputedStyle(btn).visibility !== 'hidden'
    );
  
    if (isVisible) {
      trulyClickElement(btn);
      console.log("🧨 Dispatched full event sequence to skip button");
    }
  }
  
  
  
function closeOverlayAd() {
  const overlayBtn = document.querySelector('.ytp-ad-overlay-close-button');
  if (overlayBtn) {
    overlayBtn.click();
    console.log("❌ Closed overlay ad.");
  }
}

function forceSkipNonSkippableAd() {
    const adContainer = document.querySelector('.ad-showing');
    const video = document.querySelector('video');
  
    if (
      adContainer &&
      video &&
      typeof video.duration === 'number' &&
      isFinite(video.duration) &&
      video.duration > 0
    ) if (
      video &&
      typeof video.duration === "number" &&
      isFinite(video.duration) &&
      video.duration > 0
    ) {
      video.currentTime = video.duration;
      console.log("⏩ Skipped to end of video.");
    }
    
  }
  

function monitorAdStatus() {
  const isAdPlaying = document.querySelector('.ad-showing');

  if (isAdPlaying && !skipAdInterval) {
    console.log("🎯 Ad detected – starting force-skip loop");
    skipAdInterval = setInterval(forceSkipNonSkippableAd, 300);
  } else if (!isAdPlaying && skipAdInterval) {
    clearInterval(skipAdInterval);
    skipAdInterval = null;
    console.log("✅ Ad ended – cleared skip loop");
  }
}

function handleAds() {
  clickSkipButton();
  closeOverlayAd();
  monitorAdStatus();
}

function startAdSkipper() {
  handleAds();

  const observer = new MutationObserver(() => {
    handleAds();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  setInterval(handleAds, 500);
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  startAdSkipper();
} else {
  window.addEventListener('DOMContentLoaded', startAdSkipper);
}
