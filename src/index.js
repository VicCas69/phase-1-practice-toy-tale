let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
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
});

function toys(){
  return fetch('http://localhost:3000/toys')
  .then(res=>res.json())
  .then(toy=> toy.forEach(t => 
    renderToys(t),
    ))
}




function renderToys(toy){
  let card = document.createElement('li');
  card.className = 'card'
  card.innerHTML = `
      
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar">
      <p>${toy.likes}</p>
      <button class="like-btn">Like</button>
      
  ` 
  card.querySelector('button').addEventListener('click',()=> {
        toy.likes+=1
        card.querySelector('p').innerText = toy.likes
        updateLikes(toy)
  })
  
  document.getElementById("toy-collection").appendChild(card)
  
}

function newToy(){
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
        Accept: "application/json"},
    body: JSON.stringify({
      "name": "document.querySelector('input#toy-name').value",
      "image": "document.querySelector('input#toy-name').value",
      "likes": 0
    })
  })
  .then(res=>res.json())
  .then(data=>console.log(data))
}

function updateLikes(toy){
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(toy)
    })
    .then(res=>res.json())
    .then(toyData => toyData)
}

document.querySelector('form').addEventListener('submit', newToy )
document.addEventListener('DOMContentLoaded', toys)




