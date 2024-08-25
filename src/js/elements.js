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