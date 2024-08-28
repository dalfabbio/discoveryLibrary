import "./styles/style.css";
import { searchForm } from "./js/book-search.js";
import { displaySearchResults, resultsContainer } from "./js/display-results.js";
import { showLoader } from "./js/elements.js";
import { noResultsContainer } from "./js/elements.js";
import { homepageRestyle } from "./js/homepage-restyle.js";

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  homepageRestyle();
  resultsContainer.innerHTML = "";
  noResultsContainer.classList.add("hidden");
  showLoader(true);
  await displaySearchResults();
  showLoader(false);
}
);

