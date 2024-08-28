import { myListSwitch } from "./personal-list.js";

export const homepageRestyle = function () {
  myListSwitch.classList.remove("hidden");
  document.querySelector("#title").classList.remove("sm:text-6xl");
  document.querySelector("header").classList.remove("h-screen");


}

