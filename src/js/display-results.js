import { searchBooks, searchForm } from "./book-search.js";
import { getDetails } from "./api-requests.js";
import { addRemoveFromPersonalList } from "./personal-list.js";
import { noSubjectProvided, noResults } from "./elements.js";
import closingIcon from "../assets/close_icon.png";
import noCoverAvailable from "../assets/no_cover_available.png";
export const resultsContainer = document.querySelector("#resultsContainer");

//function to display results from the research
export async function displaySearchResults() {
  try {
    const response = await searchBooks();
    console.log(response);
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
    alert("Sorry, an error occured, please try again later");
  };
}


async function displayBookResults(book) {
  //elements for the results
  const bookCard = document.createElement("div");
  const cover = document.createElement("div");
  const coverUrl = book.cover_id != null ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg?default=false` : noCoverAvailable;
  const coverImg = document.createElement("img");
  const bookText = document.createElement("div");
  const author = document.createElement("div");
  const title = document.createElement("p");
  const addToPersonalList = document.createElement("button");

  //styling and organizing elements
  cover.append(coverImg);
  bookText.append(author, title);

  coverImg.src = coverUrl;
  cover.classList.add("h-2/3", "flex", "justify-center", "justify-self-start");
  coverImg.classList.add("h-full", "rounded-lg");

  bookText.classList.add("flex", "flex-col", "items-center", "justify-start", "h-1/3");
  addToPersonalList.classList.add("absolute", "bottom-3", "right-3", "text-xs", "rounded-lg", "border-2", "bg-blue-500", "p-0.5", "text-slate-50", "hover:bg-blue-950", "hidden");

  bookCard.append(cover, bookText, addToPersonalList);
  bookCard.classList.add("flex", "flex-col", "cursor-pointer", "w-44", "p-3", "hover:shadow-xl", "rounded-lg", "hover:scale-105", "transition-all", "duration-300", "gap-2", "relative", "transition-all", "hover:bg-blue-300", "h-80");

  //details content
  const authorName = book.authors.length > 0 ? book.authors[0].name : "Unknown author";
  author.innerText = authorName;
  author.classList.add("text-wrap", "italic", "text-center");
  title.innerText = book.title;
  title.classList.add("text-center", "font-bold", "overflow-hidden");
  resultsContainer.append(bookCard);

  //for showing details
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

  //rules to show the add to list button only on hover when from pc, and alwasys when from touch devices
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


//showing details when bookCard is clicked
async function displayDetails(bookKey, author) {
  //the API for the details does not grant easy access to author and cover, we will use the one provided by the displayBookResults
  const details = await getDetails(bookKey);

  //elements for details
  const detailsContainer = document.createElement("div");
  const detailsCard = document.createElement("div");
  const detailsTitle = document.createElement("div");
  const detailsAuthor = document.createElement("div");
  const detailsDescription = document.createElement("div");
  const detailsClose = document.createElement("img");
  const detailsText = document.createElement("div");

  //layout for the details
  detailsContainer.classList.add("flex", "justify-center", "fixed", "top-0", "left-0", "items-center", "z-50", "backdrop-blur", "w-screen", "h-screen");
  detailsCard.classList.add("border-2", "border-blue-950", "sm:w-1/2", "lg:w-1/3", "max-h-[70%]", "bg-blue-100", "rounded-lg", "shadow-lg", "p-5", "justify-center", "relative");
  detailsClose.classList.add("absolute", "right-2", "top-2", "cursor-pointer", "w-4", "h-4", "z-10");
  detailsText.classList.add("flex", "flex-col");
  detailsAuthor.classList.add("italic");
  detailsTitle.classList.add("font-bold");
  detailsDescription.classList.add("overflow-auto");
  detailsClose.src = closingIcon;

  detailsText.append(detailsAuthor, detailsTitle, detailsDescription);
  detailsCard.append(detailsText, detailsClose);
  detailsContainer.append(detailsCard);
  document.body.append(detailsContainer);

  //content for the details
  detailsTitle.innerText = details.data.title;
  detailsAuthor.innerText = author;
  detailsDescription.innerText = typeof details.data.description == "object" ? details.data.description.value : details.data.description; //description key might be an object

  //manage the scrolling background
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


