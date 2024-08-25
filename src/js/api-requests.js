export const axios = require("axios");
export const OL_API_KEY = "https://openlibrary.org";

//call to get the array of the books with the given subject
export const getBooks = async function (subject) {
  try {
    if (subject) {
      const response = await axios.get(`${OL_API_KEY}/subjects/${subject}.json?limit=150`); // limit=150 sets the max number of results;
      return response;
    } else return
  }
  catch (error) {
    alert("Sorry, an error occured, please try again later");
  }
}


export async function getDetails(key) {
  try {
    const detailsUrl = `https://openlibrary.org${key}.json`;
    const response = await axios.get(detailsUrl);
    return response;
  } catch (e) {
    alert("Sorry, an error occured, please try again later");
  }
}