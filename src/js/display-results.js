import { searchBooks, searchForm } from "./book-search.js";
import { getCover, getDetails } from "./api-requests.js";
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
  const coverUrl = //await getCover(book.cover_id);
    // seems faster with the direct url, but with console.time it seems to be the same; maybe check later
    `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg?default=false`;
  const bookCard = document.createElement("div");
  const cover = document.createElement("img");
  const author = document.createElement("div");
  const title = document.createElement("div");
  bookCard.append(cover, author, title);
  // bookCard.classList.add("flex-col", "justify-center", "cursor-pointer", "max-w-1/3", "sm:max-w-1/4", "md:max-w-1/5", "lg:max-w-1/6", "p-3", "shadow-lg", "bg-white", "rounded", "hover:scale-105", "transition-all", "duration-300");
  bookCard.classList.add("flex-col", "justify-center", "cursor-pointer", "w-1/3", "sm:w-1/4", "md:w-1/5", "lg:w-1/6", "p-3", "shadow-lg", "bg-white", "rounded", "hover:scale-105", "transition-all", "duration-300");
  cover.src = coverUrl;
  cover.classList.add("h-2/3", "object-fit");
  const authorName = book.authors[0].name;
  author.innerText = authorName;
  author.classList.add("text-wrap", "italic", "text-center");
  title.innerText = book.title;
  title.classList.add("text-wrap", "text-center");
  resultsContainer.append(bookCard);
  bookCard.addEventListener("click", () => displayDetails(book.key, authorName, coverUrl));

  //for personal list
  const addToPersonalList = document.createElement("button");
  addToPersonalList.id = "add-to-list-button"; //adding an ID give a reference for changing the text of the button when the list is cleared through the clear button
  bookCard.append(addToPersonalList);
  addToPersonalList.innerText = localStorage.hasOwnProperty(book.title) ?
    "Remove from my list" : "Add to my list";
  addToPersonalList.addEventListener("click", (e) => {
    e.stopPropagation();
    addRemoveFromPersonalList(authorName, title.innerText, addToPersonalList);
  });
}

function noSubjectProvided() {
  alert("please enter a valid subject")
};

function noResults() {
  alert("no results found");
};


async function displayDetails(bookKey, author, cover) { //the API for the details does not grant easy access to author and cover, we will use the one provided by the displayBookResults
  const details = await getDetails(bookKey);
  //layout for the details
  const detailsContainer = document.createElement("div");
  const detailsCard = document.createElement("div");
  const detailsTitle = document.createElement("div");
  const detailsAuthor = document.createElement("div");
  const detailsDescription = document.createElement("div");
  const detailsCover = document.createElement("img");
  const detailsClose = document.createElement("div");

  // const findOutMore = document.createElement("a");
  detailsContainer.classList.add("flex", "justify-center", "absolute", "top-5", "left-50", "right-0", "items-center", "z-50", "backdrop-blur", "w-screen", "h-screen");
  detailsCard.classList.add("flex-col", "debugger", "sm:w-1/2", "lg:w-1/3", "bg-white", "rounded", "shadow-lg", "p-5", "justify-center", "relative");
  detailsClose.classList.add("absolute", "right-0", "top-0", "p-5", "cursor-pointer");
  detailsCard.append(detailsCover, detailsAuthor, detailsTitle, detailsDescription, detailsClose);

  detailsContainer.append(detailsCard);
  document.body.append(detailsContainer);

  //content for the details
  detailsTitle.innerText = details.data.title;
  detailsAuthor.innerText = author;
  detailsCover.src = cover;
  console.log(details);
  detailsDescription.innerText = typeof details.data.description == "object" ? details.data.description.value : details.data.description; //description format is not always the same, might be an object
  detailsClose.innerText = "X";


  detailsContainer.addEventListener("click", (event) => {
    if (event.target === detailsContainer) {
      detailsContainer.remove();
    }
  })
  detailsClose.addEventListener("click", () => {
    detailsContainer.remove();
  })
}