chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.hideBodyContent) {
    document.querySelector("body").innerHTML = `
    <style>
      .block-container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background: rgb(14, 17, 19);
      }

      .block-container h2 {
        font-size: 50px;
        color: white;
      }
    </style>
    <div class="block-container">
      <h2>Lock In - There's Still Work To Be Done</h2>
    </div>`;
  }
});
