chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.hideBodyContent) {
    document.querySelector("body").innerHTML = "LOCK IN BOY";
  }
});
