function navigate(page) {
    const sections = document.querySelectorAll(".content");
    sections.forEach((section) => {
        section.style.display = "none";
    });
    document.getElementById(page).style.display = "block";
    if (page === "products" || page === "services") {
        renderGoods(page);
    }
}

function switchToSignup() {
    document.getElementById("login").style.display = "none";
    document.getElementById("signup").style.display = "block";
}

function switchToLogin() {
    document.getElementById("signup").style.display = "none";
    document.getElementById("login").style.display = "block";
}
function printEmpowering(){
    const empoweringText = document.getElementById("empowering-text");
    const text = "Empowering UMass students one minute at a time";
    let index = 0;

    function typeText() {
      if (index < text.length) {
        empoweringText.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeText, 30); // Adjust the delay here (in milliseconds)
      }
    }

    // Start typing animation
    typeText();

    // After typing animation is completed, show the hidden elements
    document.addEventListener("DOMContentLoaded", function () {
      const welcomeHeader = document.querySelector(".text-4xl");
      const links = document.querySelector(".button-group");

      // Wait for typing animation to complete before showing hidden elements
      setTimeout(function () {
        welcomeHeader.classList.remove("opacity-0");
        links.style.opacity=1;
      }, text.length * 30 + 400); // Adjust the delay accordingly
    });
}
printEmpowering();
// Initialize the navigation to the home section
navigate("home");

// import { goodsDB } from "./database";
const services= [
    {
      "name": "Craig's Barbershop",
      "imageSrc": "../Images/Service1.png",
      "alt": "Service 1",
      "rating": "4.5",
      "numOfReviews": 587
    },
    {
      "name": "Josh Bell Photography",
      "imageSrc": "../Images/photography.jpg",
      "alt": "Service 2",
      "rating": "4.92",
      "numOfReviews": 53
    },
    {
      "name": "CampusEdge Personal Training",
      "imageSrc": "../Images/gym.jpg",
      "alt": "Service 3",
      "rating": "4.21",
      "numOfReviews": 23
    }
  ]

const goods = [
  {
      "name": "I-Clicker",
      "imageSrc": "../Images/iclicker.jpg",
      "alt": "Service 1",
      "price": "26$"
  },
  {
      "name": "Table Lamp",
      "imageSrc": "../Images/tablelamp.jpg",
      "alt": "Service 2",
      "price": "22$"
  },
  {
      "name": "Book Shelf",
      "imageSrc": "../Images/bookshelf.jpg",
      "alt": "Service 3",
      "price": "87$"
  }
];
function getGoods() {
  // try {
  //     const goods = await goodsDB.allDocs({ include_docs: true });
  //     return goods.rows.map(row => row.doc);
  // } catch (error) {
  //     console.error(error);
  // }

  return goods;
}


async function addGood(good) {
  try {
      const response = await goodsDB.post(good);
      return response;
  } catch (error) {
      console.error(error);
  }
}

async function updateGood(good) {
  try {
      const response = await goodsDB.put(good);
      return response;
  } catch (error) {
      console.error(error);
  }
}

async function deleteGood(good) {
  try {
      const response = await goodsDB.remove(good);
      return response;
  } catch (error) {
      console.error(error);
  }
}
function getService() {
  return services;
}

function renderGoods(prodServ) {
  var productsContainer;
  var products;
  var cardClass;

  // Determine which container and card class to use based on input
  if (prodServ === "services") {
    productsContainer = document.querySelector('.services-container');
    products = services; // Assuming services is the data for services
    cardClass = 'service-card';
  } else {
    productsContainer = document.querySelector('.products-container');
    products = getGoods(); // Assuming getGoods() retrieves the product data
    cardClass = 'product-card';
  }

  // Clear existing content in the container
  productsContainer.innerHTML = '';

  // Loop through products and create cards
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add(cardClass);


    const img = document.createElement('img');
    img.src = product.imageSrc;
    img.alt = product.alt;


    const hr = document.createElement('hr');


    const descContainer = document.createElement('div');
    descContainer.classList.add('desc-container');

    const nameElement = document.createElement('div');
    nameElement.classList.add(cardClass === 'product-card' ? 'productname' : 'companyname');
    nameElement.textContent = product.name;

    const extraInfo = document.createElement('div');
    extraInfo.classList.add(cardClass === 'product-card' ? 'price' : 'rating');
    extraInfo.textContent = cardClass === 'product-card' ? `Price: ${product.price}` : `Rating: ${product.rating}/5★ (${product.numOfReviews})`;
    extraInfo.style.fontSize = '16px';
    extraInfo.style.color = cardClass === 'product-card' ? '#883202' : '#000'; // Adjust color based on card type

    // Append elements to their respective parents
    descContainer.appendChild(nameElement);
    descContainer.appendChild(extraInfo);

    productCard.appendChild(img);
    productCard.appendChild(hr);
    productCard.appendChild(descContainer);

    productsContainer.appendChild(productCard);
  });
}
