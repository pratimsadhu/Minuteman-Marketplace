function navigate(page) {
    const sections = document.querySelectorAll(".content");
    sections.forEach((section) => {
        section.style.display = "none";
    });
    document.getElementById(page).style.display = "block";
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
