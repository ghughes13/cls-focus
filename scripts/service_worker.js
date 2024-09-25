chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.command === "startTimer") {
    console.log(message);
    startTimer(message.time);
  } else if (message.command === "resetTimer") {
    stopTimer();
    resetTimer();
  } else if (message.command === "stopTimer") {
    stopTimer();
  } else if (message.command === "updateBlockedSites") {
    blockedSites = message.blockedSites;
    console.log(blockedSites);
  } else if (message.command === "getBlockedSites") {
    try {
      chrome.runtime.sendMessage({ blockedSites });
    } catch (e) {}
  }
});

let defaultTime = 1800;
let timer;
let blockedSites = ["youtube.com", "facebook.com", "reddit.com"];
let blockingEnabled = false;

///////////////////////////
//BLOCKED SITE FUNCTIONS///
///////////////////////////

const handleSiteBlocking = (url) => {
  console.log(url);
  if (blockingEnabled & (typeof url === "string")) {
    blockedSites.forEach((site) => {
      if (url.includes(site)) {
        document.querySelector("body").innerHTML = "";
      }
    });
  } else {
    return;
  }
};

////////////////////////
//TIMER FUNCTIONALITY///
////////////////////////

const startTimer = (time = defaultTime) => {
  try {
    chrome.runtime.sendMessage({ function: "adjustInputAbility_true" });
  } catch (e) {}
  blockingEnabled = true;
  if (time?.length) {
    let totalSeconds = 0;
    const minutesPerHour = 60;
    const secondsPerMinute = 60;

    totalSeconds += time[0] * minutesPerHour * secondsPerMinute;
    totalSeconds += parseInt(time[1] + "" + time[2]) * secondsPerMinute;
    totalSeconds += parseInt(time[3] + "" + time[4]);

    defaultTime = totalSeconds;
  }

  timer = setInterval(runTimer, 1000);
};

const runTimer = () => {
  if (defaultTime === 0) {
    stopTimer();
    blockingEnabled = false;
    return;
  } else {
    defaultTime = defaultTime - 1;
    try {
      chrome.runtime.sendMessage({
        function: "adjustTimeDisplay",
        time: defaultTime,
      });
    } catch (e) {
      return;
    }
  }
};

const stopTimer = () => {
  clearInterval(timer);
  blockingEnabled = false;
};

const resetTimer = () => {
  clearInterval(timer);
  blockingEnabled = false;

  try {
    chrome.runtime.sendMessage({ function: "setDefaultTime" });
  } catch (e) {}
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    if (!tab.url.includes("chrome://")) {
      sendMessageToContentScript("Hello from the service worker!", tab.url);

      // const tab = chrome.tabs.query({ active: true, lastFocusedWindow: true });
      // const response = chrome.tabs.sendMessage(tab.id, { greeting: "hello" });
      // // do something with response here, not outside the function
      // console.log(response);
    }
  }
});

function sendMessageToContentScript(message, url) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      let activeTabId = tabs[0].id;
      //Can probably refactor this to fix an issue that will probably occur
      if (blockingEnabled & (typeof url === "string")) {
        blockedSites.forEach((site) => {
          if (url.includes(site)) {
            chrome.tabs.sendMessage(activeTabId, { hideBodyContent: true });
          }
        });
      } else {
        return;
      }
    }
  });
}
