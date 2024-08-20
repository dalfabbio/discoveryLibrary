const myList = document.querySelector("#my-list-container");
// myList.innerHTML = JSON.stringify(localStorage, null, 2);
// export const addToPersonalList = document.createElement("button");
// addToPersonalList.innerHTML = "add to my list";
if (localStorage.length > 0) {
  for (key in localStorage) {
    myList.innerHTML = "your list is empty";

  }
} else {
  const emptyList = document.createElement("p");
  emptyList.innerHTML = "your list is empty";
  myList.append(emptyList);
}

export function updatePersonalList(author, title, button) {
  if (localStorage.hasOwnProperty(title)) {
    localStorage.removeItem(title);
    button.innerText = "Add to my list";
  }
  else {
    localStorage.setItem(title, author);
    button.innerText = "Remove from my list";
  };
  myList.innerHTML = JSON.stringify(localStorage, null, 2);
}


