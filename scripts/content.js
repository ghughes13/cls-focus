console.log("CONTENT SCRIPT RUNNING");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request, sender, sendResponse);
  if (request.hideBodyContent) {
    document.querySelector("body").innerHTML = "LOCK IN BOY";
  }
  if (request.greeting === "hello") sendResponse({ farewell: "goodbye" });
});
