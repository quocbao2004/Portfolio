// Load Header và Footer
document.addEventListener("DOMContentLoaded", function () {
  // Load Header
  fetch("components/header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header").innerHTML = data;
    })
    .catch((error) => console.error("Error loading header:", error));

  // Load Footer
  fetch("components/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer").innerHTML = data;
    })
    .catch((error) => console.error("Error loading footer:", error));
});

const roles = [
  "Backend Developer",
  "Frontend Developer",
  "Fullstack Developer",
];
let index = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 150; // Tăng tốc độ gõ
const erasingSpeed = 100; // Tăng tốc độ xóa
const delayBetweenRoles = 2000;

const typingTextElement = document.querySelector(".typing-text");

function typeEffect() {
  const currentRole = roles[index];

  if (!isDeleting) {
    typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeEffect, delayBetweenRoles);
    } else {
      setTimeout(typeEffect, typingSpeed);
    }
  } else {
    typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      index = (index + 1) % roles.length;
      setTimeout(typeEffect, typingSpeed);
    } else {
      setTimeout(typeEffect, erasingSpeed);
    }
  }
}

document.addEventListener("DOMContentLoaded", typeEffect);
