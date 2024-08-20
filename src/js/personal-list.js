const myList = document.querySelector("#my-list");
const clearList = document.querySelector("#clear-list");
clearList.addEventListener("click", () => {
  let addToListButton = document.querySelectorAll("#add-to-list-button");
  for (let i = 0; i < addToListButton.length; i++) {
    addToListButton[i].innerText = "Add to my list";
  }
  localStorage.clear();
  updatePersonalListText();
  console.log(addToListButton)
})

function updatePersonalListText() {
  let booksOfPersonalList = Object.keys(localStorage);
  if (booksOfPersonalList.length > 0) {
    myList.innerHTML = "";

    for (let key of booksOfPersonalList) {
      let element = document.createElement("li");
      element.innerText = `${localStorage[key]} - ${key}`;
      myList.append(element);
    }
  } else {
    myList.innerHTML = "your list is empty";
  }
}

updatePersonalListText();

export function addRemoveFromPersonalList(author, title, button) {
  if (localStorage.hasOwnProperty(title)) {
    localStorage.removeItem(title);
    button.innerText = "Add to my list";
  }
  else {
    localStorage.setItem(title, author);
    button.innerText = "Remove from my list";
  };
  updatePersonalListText();
}

const copyButton = document.querySelector("#copyButton");
copyButton.addEventListener("click", function () {
  const ul = document.querySelector("#my-list");
  // Estrae il testo dai figli dell'elemento <ul>
  const textToCopy = Array.from(ul.getElementsByTagName("li"))
    .map(li => li.textContent)
    .join("\n");
  navigator.clipboard.writeText(textToCopy);
  // Opzionale: notifica all'utente che il testo è stato copiato
  alert("Testo copiato negli appunti!");
});
