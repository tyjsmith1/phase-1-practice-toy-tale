let addToy = false;
const toyCollectionDiv = document.getElementById("toy-collection")
const url = "http://localhost:3000/toys"
const toyForm = document.querySelector(".add-toy-form")
const inputTextFormName = document.getElementById("input-text-name")
const inputTextFormImg = document.getElementById("input-text-image")

const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
  }
});

function renderToys(toy) {

  const newCard = document.createElement("div") // toy div card
  const newCardHead = document.createElement("h2") // toy name
  const newCardImg = document.createElement("img") // toy image
  const newCardLikes = document.createElement("p") //toy likes
  const newCardButton = document.createElement("button") //button

  newCard.classList.add("card")
  newCardImg.classList.add("toy-avatar")
  newCardButton.classList.add("like-btn")

  newCardHead.innerText = toy.name
  newCardImg.src = toy.image
  newCardLikes.innerText = toy.likes
  newCardButton.innerText = "Like ❤️"
  
  toyCollectionDiv.appendChild(newCard)
  newCard.appendChild(newCardHead)
  newCard.appendChild(newCardImg)
  newCard.appendChild(newCardLikes)
  newCard.appendChild(newCardButton)
}
function fetcher() {
fetch(url)
.then(response => response.json())
.then(data => {
  data.forEach( (toy) =>
    renderToys(toy) 
  )
})
}
fetcher()

toyForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const newToyName = inputTextFormName.value
  const newToyImg = inputTextFormImg.value

  const newToyArray = {
    "name": newToyName,
    "image": newToyImg,
    "likes": 0
  }

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newToyArray)
  })
  .then(response => response.json())
  .then(data => {
    renderToys(data)
  })

  toyForm.reset()
})