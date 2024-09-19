const timerBlock = document.querySelector(".timer");
const timerInput = document.querySelector(".timer-input");
const firstButton = document.querySelector(".first-button");
const secondButton = document.querySelector(".second-button");
const blockWebsiteInput = document.querySelector(".block-website-input");
const blockedWebsitesContainer = document.querySelector(".websites-container");

const sitesToBlock = ["youtube.com", "facebook.com", "reddit.com"];

let defaultTime = 30;

const startTimer = () => {
  console.log(timerInput.value);
};

const addNewBlockedWebsite = () => {
  const websiteToBlock = blockWebsiteInput.value;
  sitesToBlock.push(websiteToBlock);
  addBlockedWebsiteToDOM(websiteToBlock);
};

const addBlockedWebsiteToDOM = (website) => {
  const blockedWebsiteTemplate = `
  <div class="blocked-website ${website}">
    <h2>${website}</h2>
    <button class="trash-button">
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
    </button>
  </div>
  `;

  blockedWebsitesContainer.insertAdjacentHTML(
    "beforeend",
    blockedWebsiteTemplate
  );
};

firstButton.addEventListener("click", () => {
  startTimer();
});

blockWebsiteInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter" || e.keyCode === 13) {
    addNewBlockedWebsite();
  }
});

sitesToBlock.forEach((site) => {
  addBlockedWebsiteToDOM(site);
});
