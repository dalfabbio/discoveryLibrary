import "./styles/style.css";
import { searchForm } from "./js/book-search.js";
import { displaySearchResults, resultsContainer } from "./js/display-results.js";
import { showLoader } from "./js/elements.js";

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  resultsContainer.innerHTML = "";
  showLoader(true);
  await displaySearchResults();
  showLoader(false);
}
);

