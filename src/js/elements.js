const topButton = document.querySelector("#top-button");

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topButton.classList.remove("hidden");
  } else {
    topButton.classList.add("hidden");
  }
}
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0;
}

topButton.addEventListener("click", topFunction);

export function showLoader(yesNo) {
  if (yesNo) {
    const loader = document.createElement("div");
    loader.id = "loader";
    resultsContainer.append(loader)
  }
  else {
    loader.remove();
  }
}


//fallback for research
export const noResultsContainer = document.querySelector("#no-results");
export function noSubjectProvided() {
  noResultsContainer.classList.remove("hidden");
  noResultsContainer.innerText = ("please enter a valid subject");
};

export function noResults() {
  noResultsContainer.classList.remove("hidden");
  noResultsContainer.innerText = ("Sorry, no results found for your research");
};