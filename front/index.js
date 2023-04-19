const main = document.querySelector("main");
const xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:9001/pizzas");
xhr.setRequestHeader("Content-Type", "application/json");

xhr.onerror = function () {
  const card = document.createElement("div");
  const error = document.createElement("p");
  error.textContent = "There was an error connecting to the server";
  card.appendChild(error);
  card.style.display = "flex";
  card.style.justifyContent = "center";
  card.style.marginTop = "50px";
  main.append(card);
};

xhr.onload = () => {
  if (xhr.status === 200) {
    const pizzas = JSON.parse(xhr.responseText);
    pizzas.forEach((pizza) => {
      // create the elements
      const card = document.createElement("div");
      const image = document.createElement("img");
      const cardContent = document.createElement("div");
      const title = document.createElement("h3");
      const description = document.createElement("p");
      const price = document.createElement("p");

      // set the content and attributes
      image.src = pizza.image;
      image.alt = pizza.name;
      title.textContent = pizza.name;
      description.textContent = pizza.description;
      price.textContent = `R$ ${pizza.price.toFixed(2)}`;

      // add classes to the elements
      card.classList.add("card");
      cardContent.classList.add("card-content");
      title.classList.add("card-title");
      description.classList.add("card-description");
      price.classList.add("card-price");

      // append the elements to the card
      card.appendChild(image);
      card.appendChild(cardContent);
      cardContent.appendChild(title);
      cardContent.appendChild(description);
      cardContent.appendChild(price);

      // append the card to the main element
      main.appendChild(card);
    });
  } else {
    console.error(`Error: ${xhr.status}`);
  }
};
xhr.send();
