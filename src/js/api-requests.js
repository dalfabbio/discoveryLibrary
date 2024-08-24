export const axios = require("axios");
export const OL_API_KEY = "https://openlibrary.org";

//call to get the array of the books with the given subject
export const getBooks = async function (subject) {
  try {
    if (subject) {
      const response = await axios.get(`${OL_API_KEY}/subjects/${subject}.json?limit=20`); // limit=500 is the maximum number of results;
      console.log(subject);
      console.log(response);
      console.log(response.data["work_count"]);
      return response;
    } else return
  }
  catch (error) {
    console.log("an error occured from the server / API REQUEST");
  }
}


export const getCover = async function getCover(key) {
  const coverUrl = `https://covers.openlibrary.org/b/id/${key}-M.jpg?default=false`;
  const fallbackUrl = "../assets/images/no-cover.jpg";
  try {
    const response = await axios.get(coverUrl);
    if (response.status === 200) return coverUrl;
  } catch (error) {
    return fallbackUrl;
  }
}

export async function getDetails(key) {
  try {
    const detailsUrl = `https://openlibrary.org${key}.json`;
    const response = await axios.get(detailsUrl);
    console.log("getDetails: ", response)
    return response;
  } catch (e) {
    console.log("sorry, no results found due to some malfunction / API REQUEST");
  }
}