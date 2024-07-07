import {searchBooks, searchForm} from "./book-search.js";
export const resultsContainer = document.querySelector("#resultsContainer");

//function to display results from the research
export async function displaySearchResults() {
 try{
  const response = await searchBooks();
  if (searchForm.searchBox.value === "") {
    noSubjectProvided();
    return;
  } else if (response.data["work_count"] === 0){
    noResults();
    return;
  }
  
  const booksList = response.data.works;
  booksList.forEach(element => {
    displayBookResults(element);
  })
} 
catch(e) {
   console.log("sorry, no results found due to some malfunction / DISPLAY RESULT");
};
}

function displayBookResults(book){
  const bookCard = document.createElement("div");
  //const cover = document.createElement("div");
  const author = document.createElement("div");
  const title = document.createElement("div");
  bookCard.append(author, title);
  bookCard.classList.add("flex-col", "debugger");
  author.innerText = book.authors[0].name;
  title.innerText = book.title;
  resultsContainer.append(bookCard);

}

function noSubjectProvided(){
  alert ("please enter a valid subject")
};

function noResults(){
  alert ("no results found");
};