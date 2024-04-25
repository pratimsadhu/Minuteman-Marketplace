const db = new PouchDB('users');
/**
 * Function to toggle between sections and render goods/services.
 * @param {string} page - The ID of the section to navigate to.
 */
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

/**
* Function to switch to the signup section.
*/
function switchToSignup() {
  document.getElementById("login").style.display = "none";
  document.getElementById("signup").style.display = "block";
}

/**
* Function to switch to the login section.
*/
function switchToLogin() {
  document.getElementById("signup").style.display = "none";
  document.getElementById("login").style.display = "block";
}

/**
* Function to print empowering text and reveal hidden elements after typing animation.
*/
function printEmpowering() {
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
          links.style.opacity = 1;
      }, text.length * 30 + 400); // Adjust the delay accordingly
  });
}
printEmpowering();

/**
* Function to get goods data.
* @returns {Array} An array containing goods data.
*/
function getGoods() {
  return goods;
}

/**
* Function to render goods or services.
* @param {string} prodServ - Indicates whether to render goods or services.
*/
function renderGoods(prodServ) {
  let productsContainer;
  let products;
  const cardClass = prodServ === "services" ? 'service-card' : 'product-card';

  // Determine which container and card class to use based on input
  if (prodServ === "services") {
      productsContainer = document.querySelector('.services-container');
      products = services;
  } else {
      productsContainer = document.querySelector('.products-container');
      products = getGoods();
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

/**
* Function to check if the username exists in the database.
* @param {string} username - The username to check.
* @returns {Object|null} The user object if found, otherwise null.
*/
async function checkUsername(username) {
  try {
      const response = await db.get(username);
      return response;
  } catch (error) {
      if (error.status === 404) {
          return null; // Username not found
      } else {
          throw error; // Other error
      }
  }
}

/**
* Function to handle user login.
*/
function loginScript() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  checkUsername(username)
      .then(user => {
          if (user && user.password === password) {
              alert('Login successful');
              // Redirect or perform other actions after successful login
          } else {
              alert('Invalid username or password');
          }
      })
      .catch(error => {
          console.error('Error:', error);
          alert('An error occurred while logging in');
      });
}

/**
* Function to handle user signup.
*/
function signupScript() {
  const newUsername = document.getElementById('newUsername').value;
  const newPassword = document.getElementById('newPassword').value;

  // Check if the username already exists
  checkUsername(newUsername)
      .then(existingUser => {
          if (existingUser) {
              alert('Username already exists. Please choose a different one.');
          } else {
              // If username does not exist, create a new user document
              return db.put({
                  _id: newUsername,
                  password: newPassword
              });
          }
      })
      .then(() => {
          alert('Signup successful');
          // Redirect or perform other actions after successful signup
      })
      .catch(error => {
          console.error('Error:', error);
          alert('An error occurred while signing up');
      });
}
