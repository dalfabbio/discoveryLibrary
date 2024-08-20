import "./styles/style.css";
import {searchForm, searchQuery} from "./js/book-search.js";
import {displaySearchResults} from "./js/display-results.js";

searchForm.addEventListener("submit", (e)=>{
  e.preventDefault();
  resultsContainer.innerHTML = "";
  displaySearchResults();
}
);

 