const myList = document.querySelector("#my-list");
const clearList = document.querySelector("#clear-list");
const copyButton = document.querySelector("#copy-button");
const myListSwitch = document.querySelector("#my-list-switch");
const myListContainer = document.querySelector("#my-list-container");

//open and close my list
myListSwitch.addEventListener("click", (e) => {
  e.stopPropagation();
  myListContainer.classList.remove("hidden");
});
//prevents closing clicking on myLIst
myListContainer.addEventListener("click", (e) => {
  e.stopPropagation();
})
//close when clicking outside
window.addEventListener("click", (event) => {
  if (event.target !== myListContainer && !myListContainer.classList.contains("hidden")) {
    myListContainer.classList.add("hidden");
  }
})

clearList.addEventListener("click", () => {
  let addToListButton = document.querySelectorAll("#add-to-list-button");
  for (let i = 0; i < addToListButton.length; i++) {
    addToListButton[i].innerText = "Add";
  }
  localStorage.clear();
  updatePersonalListText();
  buttonVisible(clearList);
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
  buttonVisible(copyButton);
  buttonVisible(clearList);
}

updatePersonalListText();

export function addRemoveFromPersonalList(author, title, button) {
  if (localStorage.hasOwnProperty(title)) {
    localStorage.removeItem(title);
    button.innerText = "Add";
  }
  else {
    localStorage.setItem(title, author);
    button.innerText = "Remove";
  };
  updatePersonalListText();
}

//function to show or hide the copy and clear buttons
function buttonVisible(btn) {
  if (localStorage.length > 0) {
    btn.classList.remove("hidden");
  } else if (localStorage.length === 0 && !btn.classList.contains("hidden")) {
    btn.classList.add("hidden");
  }
}

copyButton.addEventListener("click", function () {
  const ul = document.querySelector("#my-list");
  // Estrae il testo dai figli dell'elemento <ul>
  const textToCopy = Array.from(ul.getElementsByTagName("li"))
    .map(li => li.textContent)
    .join("\n");
  navigator.clipboard.writeText(textToCopy);
  // Opzionale: notifica all'utente che il testo è stato copiato
  alert("List copied!");
});
