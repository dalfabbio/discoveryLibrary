import { searchBooks, searchForm } from "./book-search.js";
import { getCover, getDetails } from "./api-requests.js";
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
  const cover = document.createElement("img");
  const author = document.createElement("div");
  const title = document.createElement("div");
  bookCard.append(cover, author, title);
  bookCard.classList.add("flex-col", "debugger", "cursor-pointer");
  const coverUrl = await getCover(book.cover_id);
  cover.src = coverUrl;
  // seems faster with the direct url, but with console.time it seems to be the same; maybe check later
  //`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg?default=false`;
  const authorName = book.authors[0].name;
  author.innerText = authorName
  title.innerText = book.title;
  resultsContainer.append(bookCard);
  bookCard.addEventListener("click", ()=> displayDetails(book.key, authorName, coverUrl));

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
  // const findOutMore = document.createElement("a");
  detailsCard.classList.add("flex-col", "debugger", "z-20", "w-1/2", "y-1/2");
  detailsCard.append(detailsCover, detailsAuthor, detailsTitle, detailsDescription);
  detailsContainer.classList.add("flex", "justify-center", "fixed", "top-0", "items-center", "z-10", "backdrop-blur-sm");
  detailsContainer.append(detailsCard);
  document.body.append(detailsContainer);
  //content for the details
  detailsTitle.innerText = details.data.title;
  detailsAuthor.innerText = author;
  detailsCover.src = cover;
  console.log(details);
  detailsDescription.innerText = (details.data.description ? details.data.description : "No description available.");
  }