const timerBlock = document.querySelector(".timer");
const timerInput = document.querySelectorAll(".timer-input");

const startButton = document.querySelector(".start-button");
const stopButton = document.querySelector(".stop-button");
const resumeButton = document.querySelector(".resume-button");
const resetButton = document.querySelector(".reset-button");

const controlButtons = document.querySelectorAll(".control-button");

const blockWebsiteInput = document.querySelector(".block-website-input");
const blockedWebsitesContainer = document.querySelector(".websites-container");
const addBlockedWebsite = document.querySelector(".add-website");

let blockedSites;

///////////////////////////
////VALIDATE TIME INPUT////
///////////////////////////

const createValidator = (element) => {
  return () => {
    var min = parseInt(element.getAttribute("min")) || 0;
    var max = parseInt(element.getAttribute("max")) || 0;

    var value = parseInt(element.value) || min;
    element.value = value;

    if (value < min) element.value = min;
    if (value > max) element.value = max;
  };
};

const elm = document.querySelectorAll(".timer-input");
elm.forEach((el) => {
  el.onkeyup = createValidator(el);
});

/////////////////////////////
//TIMER INPUT MANIPULATION///
/////////////////////////////

const disableTimerInput = (disabled) => {
  timerInput.forEach((el) => {
    el.disabled = disabled;
  });
};

const adjustTimeDisplay = (time) => {
  const hours = Math.floor(time / 3600);
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (minutes < 10) {
    minutes = "0" + minutes.toString();
  }

  if (seconds < 10) {
    seconds = "0" + seconds.toString();
  }

  timerInput.forEach((el, index) => {
    if (index === 0) {
      el.value = hours;
    } else if (index === 1) {
      el.value = (minutes + "")[0];
    } else if (index === 2) {
      el.value = (minutes + "")[1];
    } else if (index === 3) {
      el.value = (seconds + "")[0];
    } else if (index === 4) {
      el.value = (seconds + "")[1];
    }
  });

  if (time === 0) {
    handleButtonAdjustments(["reset"]);
  }
};

const setDefaultTime = () => {
  disableTimerInput(false);
  defaultTime = 1800;
  timerInput.forEach((el, index) => {
    if (index === 1) {
      el.value = 3;
    } else {
      el.value = 0;
    }
  });
};

const handleButtonAdjustments = (buttonsToShow) => {
  controlButtons.forEach((button) => {
    button.classList.add("hide-button");
  });

  buttonsToShow.forEach((button) => {
    switch (button) {
      case "start":
        startButton.classList.remove("hide-button");
        break;
      case "stop":
        stopButton.classList.remove("hide-button");
        break;
      case "resume":
        resumeButton.classList.remove("hide-button");
        break;
      case "reset":
        resetButton.classList.remove("hide-button");
        break;
    }
  });
};

///////////////////////////
//BLOCKED SITE FUNCTIONS///
///////////////////////////

const addNewBlockedWebsite = () => {
  const websiteToBlock = blockWebsiteInput.value;
  blockedSites.push(websiteToBlock);
  addBlockedWebsiteToDOM(websiteToBlock);
  blockWebsiteInput.value = "";
};

const addBlockedWebsiteToDOM = (website) => {
  const blockedWebsiteTemplate = `
  <button class="blocked-website" data-blocked-site=${website}>
    <h3>${website}</h3>
    <div class="trash-button">
      <svg
        width="76"
        height="93"
        viewBox="0 0 76 93"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M70.3202 7.06876H49.2117V5.16C49.2117 2.31502 46.6905 0 43.5915 0H32.4089C29.3092 0 26.7876 2.31502 26.7876 5.1603V7.06906H5.67951C2.54789 7.06906 0 9.36016 0 12.1759V15.5503C0 17.6666 1.43901 19.4859 3.48291 20.2597C4.13047 31.9582 7.87807 88.5184 8.04671 91.0598C8.11899 92.1511 9.11587 93.0026 10.3214 93.0026H65.6786C66.8841 93.0026 67.8813 92.1511 67.9533 91.0598C68.1219 88.5187 71.8692 31.9582 72.5171 20.2597C74.561 19.4859 76 17.6666 76 15.5503V12.1756C76 9.35987 73.4521 7.06876 70.3202 7.06876ZM31.3456 5.1603C31.3456 4.59402 31.8225 4.13343 32.4089 4.13343H43.5915C44.1775 4.13343 44.6541 4.59402 44.6541 5.1603V7.06906H31.3459L31.3456 5.1603ZM4.55729 12.1756C4.55729 11.6389 5.06061 11.2022 5.67886 11.2022H70.3198C70.9381 11.2022 71.4414 11.6386 71.4414 12.1756V15.55C71.4414 16.087 70.9381 16.524 70.3198 16.524H5.67919C5.06094 16.524 4.55761 16.0873 4.55761 15.55L4.55729 12.1756ZM63.5314 88.8688H12.4669C11.7979 78.7576 8.72975 32.278 8.06853 20.6574H67.9295C67.2683 32.278 64.2005 78.7576 63.5314 88.8688Z"
          fill="black"
        />
        <path
          d="M37.9998 28.0852C36.7412 28.0852 35.7208 29.0105 35.7208 30.1519V82.1472C35.7208 83.2887 36.7412 84.214 37.9998 84.214C39.2584 84.214 40.2788 83.2887 40.2788 82.1472V30.1519C40.2788 29.0105 39.2584 28.0852 37.9998 28.0852Z"
          fill="black"
        />
        <path
          d="M22.6005 30.1268C22.5347 28.9872 21.4587 28.1082 20.206 28.1708C18.9493 28.2302 17.9833 29.2024 18.0491 30.3423L21.0384 82.255C21.1019 83.3581 22.1079 84.214 23.3122 84.214C23.3522 84.214 23.3926 84.2131 23.433 84.211C24.6897 84.1517 25.6556 83.1794 25.5899 82.0395L22.6005 30.1268Z"
          fill="black"
        />
        <path
          d="M55.7937 28.1708C54.5244 28.105 53.465 28.9869 53.3992 30.1268L50.4092 82.0395C50.3434 83.1795 51.3094 84.1517 52.5661 84.211C52.6068 84.2131 52.6468 84.214 52.6869 84.214C53.8908 84.214 54.8971 83.3584 54.9606 82.255L57.9506 30.3424C58.0164 29.2024 57.0508 28.2302 55.7937 28.1708Z"
          fill="black"
        />
      </svg>
    </div>
  </button>
  `;

  blockedWebsitesContainer.insertAdjacentHTML(
    "beforeend",
    blockedWebsiteTemplate
  );
};

///////////////////////////
//////EVENT HANDLERS///////
///////////////////////////

//Start timer on button click
startButton.addEventListener("click", () => {
  const time = [];

  timerInput.forEach((input) => {
    time.push(input.value);
  });

  chrome.runtime.sendMessage({ command: "startTimer", time });

  startButton.classList.add("hide-button");
  stopButton.classList.remove("hide-button");
  resetButton.classList.remove("hide-button");
});

//Add website when user presses enter
blockWebsiteInput.addEventListener("keyup", (e) => {
  if (blockWebsiteInput.value === "") return;
  if (e.key === "Enter" || e.keyCode === 13) {
    addNewBlockedWebsite();

    chrome.runtime.sendMessage({ command: "updateBlockedSites", blockedSites });
  }
});

//Add website when user presses add button
addBlockedWebsite.addEventListener("click", () => {
  if (blockWebsiteInput.value === "") return;

  addBlockedWebsiteToDOM(blockWebsiteInput.value);
  chrome.runtime.sendMessage({ command: "updateBlockedSites", blockedSites });
});

//Removes specific blocked website based on which el is clicked
blockedWebsitesContainer.addEventListener("click", (e) => {
  const clickTarget = e.target;
  console.log(clickTarget);
  if (clickTarget.tagName === "BUTTON") {
    const targetSite = clickTarget.getAttribute("data-blocked-site");
    console.log(targetSite);
    blockedSites = blockedSites.filter((site) => {
      console.log(site, targetSite);
      return site !== targetSite;
    });
    console.log(blockedSites);
    clickTarget.remove();
    chrome.runtime.sendMessage({ command: "updateBlockedSites", blockedSites });
  }
});

//Resume Timer
resumeButton.addEventListener("click", () => {
  chrome.runtime.sendMessage({ command: "startTimer" });

  resumeButton.classList.add("hide-button");
  stopButton.classList.remove("hide-button");
});

//Pauses/Stops timer
stopButton.addEventListener("click", () => {
  chrome.runtime.sendMessage({ command: "stopTimer" });

  resumeButton.classList.remove("hide-button");
  resetButton.classList.remove("hide-button");
  stopButton.classList.add("hide-button");
});

//Resets timer
resetButton.addEventListener("click", () => {
  chrome.runtime.sendMessage({ command: "resetTimer" });

  startButton.classList.remove("hide-button");
  resumeButton.classList.add("hide-button");
  resetButton.classList.add("hide-button");
  stopButton.classList.add("hide-button");
});

chrome.runtime.sendMessage({ command: "getInitialState" });

//Receive Messages from service_worker
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.function === "adjustInputAbility_true") {
    disableTimerInput(true);
  } else if (message.function === "setDefaultTime") {
    setDefaultTime();
  } else if (message.function === "adjustTimeDisplay") {
    adjustTimeDisplay(message.time);
  } else if (message.function === "setInitialState") {
    console.log(message.state);
    disableTimerInput(message.state.disableTimeInput);

    blockedSites = message.state.blockedSites;
    blockedSites.forEach((site) => {
      addBlockedWebsiteToDOM(site);
    });

    adjustTimeDisplay(message.state.defaultTime);

    handleButtonAdjustments(message.state.shownButtons);
  }
});
