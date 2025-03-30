// function skipAdsAndCloseOverlays() {
//     const skipBtn = document.querySelector('.ytp-ad-skip-button');
//     if (skipBtn) {
//       skipBtn.click();
//       console.log('⏩ Skipped an ad!');
//     }
  
//     const overlayCloseBtn = document.querySelector('.ytp-ad-overlay-close-button');
//     if (overlayCloseBtn) {
//       overlayCloseBtn.click();
//       console.log('❌ Closed ad overlay!');
//     }
  
//     const adContainer = document.querySelector('.ad-showing');
//     if (adContainer) {
//       const video = document.querySelector('video');
//       if (video) {
//         const dur = video.duration;
//         if (typeof dur === 'number' && isFinite(dur)) {
//           video.currentTime = dur;
//           console.log("⏩ Skipped video ad!");
//         }
//       }
      
//     }
//   }
  
//   setInterval(skipAdsAndCloseOverlays, 500);
  

// function skipAdsAndCloseOverlays() {
//     const skipBtn = document.querySelector('.ytp-ad-skip-button');
//     if (skipBtn) {
//       skipBtn.click();
//       console.log('⏩ Skipped an ad!');
//     }
  
//     const overlayCloseBtn = document.querySelector('.ytp-ad-overlay-close-button');
//     if (overlayCloseBtn) {
//       overlayCloseBtn.click();
//       console.log('❌ Closed ad overlay!');
//     }
  
//     const adContainer = document.querySelector('.ad-showing');
//     if (adContainer) {
//       const video = document.querySelector('video');
//       if (video) {
//         const dur = video.duration;
//         if (typeof dur === 'number' && isFinite(dur)) {
//           video.currentTime = dur;
//           console.log("⏩ Skipped video ad!");
//         }
//       }
//     }
//   }
  
//   // Run repeatedly just in case (fallback)
//   setInterval(skipAdsAndCloseOverlays, 500);
  
//   // Also respond to DOM changes (instant)
//   const observer = new MutationObserver(() => {
//     skipAdsAndCloseOverlays();
//   });
  
//   observer.observe(document.body, {
//     childList: true,
//     subtree: true
//   });
  
function skipAdsAndCloseOverlays() {
    const skipBtn = document.querySelector('.ytp-ad-skip-button');
    if (skipBtn) {
      skipBtn.click();
      console.log('⏩ Skipped an ad!');
    }
  
    const overlayCloseBtn = document.querySelector('.ytp-ad-overlay-close-button');
    if (overlayCloseBtn) {
      overlayCloseBtn.click();
      console.log('❌ Closed ad overlay!');
    }
  
    const adContainer = document.querySelector('.ad-showing');
    if (adContainer) {
      const video = document.querySelector('video');
      if (video) {
        const dur = video.duration;
        if (typeof dur === 'number' && isFinite(dur)) {
          video.currentTime = dur;
          console.log("⏩ Skipped video ad!");
        }
      }
    }
  }
  
  // ✅ Delay execution until full page load
  if (document.readyState === "complete") {
    startAdSkipper();
  } else {
    window.addEventListener("load", startAdSkipper);
  }
  
  function startAdSkipper() {
    // Run immediately once
    skipAdsAndCloseOverlays();
  
    // Fallback polling
    setInterval(skipAdsAndCloseOverlays, 500);
  
    // React to DOM changes
    const observer = new MutationObserver(skipAdsAndCloseOverlays);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  