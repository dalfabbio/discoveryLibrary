export const axios = require("axios");
export const OL_API_KEY = "https://openlibrary.org";

//call to get the array of the books with the given subject
export const getBooks = async function (subject) {
  try{
    if (subject){
    const response = await axios.get(`${OL_API_KEY}/subjects/${subject}.json?limit=10`); //limit=10 defines how many books to retrieve
    console.log(subject);
    console.log(response);
    console.log(response.data["work_count"]);
    return response;
  } else return
   }
   catch (error){
  console.log("an error occured from the server / API REQUEST");
}
}
