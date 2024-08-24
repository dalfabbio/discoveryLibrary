import { searchBooks, searchForm } from "./book-search.js";
import { getDetails } from "./api-requests.js";
import { addRemoveFromPersonalList } from "./personal-list.js";
export const resultsContainer = document.querySelector("#resultsContainer");

//function to display results from the research
export async function displaySearchResults() {
  try {
    const response = await searchBooks();
    if (searchForm.searchBox.value === "") {
      noSubjectProvided();
      return;
    } else if (response.data["work_count"] === 0) {
      noResults();
      return;
    }

    const booksList = response.data.works;
    booksList.forEach(element => {
      displayBookResults(element);

    })
  }
  catch (e) {
    console.log("sorry, no results found due to some malfunction / DISPLAY RESULT");
  };
}

async function displayBookResults(book) {
  const bookCard = document.createElement("div");
  const cover = document.createElement("div");
  const coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg?default=false`;
  const coverImg = document.createElement("img");
  const bookText = document.createElement("div");
  const author = document.createElement("div");
  const title = document.createElement("div");
  const addToPersonalList = document.createElement("button");

  cover.append(coverImg);
  bookText.append(author, title);
  bookText.classList.add("flex", "flex-col", "items-center", "justify-start");
  cover.classList.add("justify-self-start");
  addToPersonalList.classList.add("absolute", "bottom-3", "right-3", "text-xs", "rounded-lg", "border-2", "bg-blue-500", "p-0.5", "text-slate-50", "hover:bg-transparent", "hidden");


  bookCard.append(cover, bookText, addToPersonalList);
  bookCard.classList.add("flex", "flex-col", "cursor-pointer", "w-44", "p-3", "hover:shadow-xl", "rounded-lg", "hover:scale-105", "transition-all", "duration-300", "gap-2", "relative", "transition-all", "hover:bg-blue-300");
  coverImg.src = coverUrl;
  cover.classList.add("h-2/3", "flex", "justify-center");
  coverImg.classList.add("h-full", "rounded-lg");
  const authorName = book.authors[0].name;
  author.innerText = authorName;
  author.classList.add("text-wrap", "italic", "text-center");
  title.innerText = book.title;
  title.classList.add("text-wrap", "text-center", "font-bold");
  resultsContainer.append(bookCard);
  bookCard.addEventListener("click", () => {
    displayDetails(book.key, authorName, coverUrl);
    document.body.classList.add("overflow-hidden");
  });

  //for personal list
  addToPersonalList.id = "add-to-list-button"; //adding an ID gives a reference for changing the text of the button when the list is cleared through the clear button
  addToPersonalList.innerText = localStorage.hasOwnProperty(book.title) ?
    "Remove" : "Add";
  addToPersonalList.addEventListener("click", (e) => {
    e.stopPropagation();
    addRemoveFromPersonalList(authorName, title.innerText, addToPersonalList);
  });

  function is_touch_enabled() {
    return ('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0);
  }

  if (is_touch_enabled() && addToPersonalList.classList.contains("hidden")) {
    addToPersonalList.classList.remove("hidden");
  }

  bookCard.addEventListener("mouseover", () => {
    if (addToPersonalList.classList.contains("hidden")) {
      addToPersonalList.classList.remove("hidden");
    }
  })
  bookCard.addEventListener("mouseout", () => {
    if (!addToPersonalList.classList.contains("hidden")) {
      addToPersonalList.classList.add("hidden");
    }
  })
}

function noSubjectProvided() {
  alert("please enter a valid subject")
};

function noResults() {
  alert("no results found");
};

async function displayDetails(bookKey, author, cover) {
  //the API for the details does not grant easy access to author and cover, we will use the one provided by the displayBookResults
  const details = await getDetails(bookKey);

  //layout for the details
  const detailsContainer = document.createElement("div");
  const detailsCard = document.createElement("div");
  const detailsTitle = document.createElement("div");
  const detailsAuthor = document.createElement("div");
  const detailsDescription = document.createElement("div");
  const detailsCover = document.createElement("img");
  const detailsClose = document.createElement("div");
  const detailsText = document.createElement("div");

  detailsContainer.classList.add("flex", "justify-center", "fixed", "top-0", "left-0", "items-center", "z-50", "backdrop-blur", "w-screen", "h-screen");
  detailsCard.classList.add("flex", "sm:flex-row", "flex-nowrap", "debugger", "sm:w-1/2", "lg:w-1/3", "max-h-1/2", "bg-white", "rounded-lg", "shadow-lg", "p-5", "justify-center", "relative");
  detailsClose.classList.add("absolute", "right-0", "top-0", "p-5", "cursor-pointer");
  detailsText.classList.add("flex", "flex-col");
  // detailsCover.classList.add("max:w-1/2", "m-3", "object-contain");
  detailsAuthor.classList.add("italic");
  detailsTitle.classList.add("font-bold");
  detailsDescription.classList.add("overflow-auto");

  detailsText.append(detailsAuthor, detailsTitle, detailsDescription);
  detailsCard.append(detailsText, detailsClose);
  detailsContainer.append(detailsCard);
  document.body.append(detailsContainer);

  //content for the details
  detailsTitle.innerText = details.data.title;
  detailsAuthor.innerText = author;
  detailsCover.src = cover;
  console.log(details);
  detailsDescription.innerText = typeof details.data.description == "object" ? details.data.description.value : details.data.description; //description key might be an object
  detailsClose.innerText = "X";

  detailsContainer.addEventListener("click", (event) => {
    if (event.target === detailsContainer) {
      detailsContainer.remove();
      document.body.classList.remove("overflow-hidden");
    }
  })

  detailsClose.addEventListener("click", () => {
    detailsContainer.remove();
    document.body.classList.remove("overflow-hidden");
  })
}