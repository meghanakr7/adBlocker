const blockedUrls = [
    "*://*.doubleclick.net/*",
    "*://*.googlesyndication.com/*",
    "*://*.googlevideo.com/videoplayback?*ad*",
    "*://youtube.com/api/stats/ads*",
    "*://youtube.com/pagead/*",
    "*://*.youtube.com/pagead/*"
  ];
  
  chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      console.log("🚫 Blocked:", details.url);
      return { cancel: true };
    },
    { urls: blockedUrls },
    ["blocking"]
  );

  