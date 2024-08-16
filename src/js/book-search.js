import {getBooks} from "./api-requests.js";

export const searchForm = document.querySelector("#search");

export const searchBooks = async function searchBooks() {
    const searchValue = searchForm.searchBox.value.toLowerCase().trim(); //delete spaces at both ends and lowercase 
    const searchQuery =searchValue.replaceAll(" ", "_"); // replace spaces by _ to match the url of the API request
    console.log(searchQuery);

    const books = await getBooks(searchQuery);
    return books;
}
