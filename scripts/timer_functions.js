chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.command === "startTimer") {
    updatePopup();
  } else if (message.command === "reset") {
    resetTimer();
  }
});

function updatePopup() {
  chrome.runtime.sendMessage({ timer: `${minutes}:${seconds}` });
}
