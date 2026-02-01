const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");
const message = document.querySelector(".message");
const heading = document.getElementById("question-heading");

yesButton.addEventListener("click", () => {
  message.style.display = "block";
  heading.style.display = "none";
});

// Playful move for the "No" button
noButton.addEventListener("mouseover", () => {
  const x = Math.random() * 200 - 100;
  const y = Math.random() * 200 - 100;
  noButton.style.transform = `translate(${x}px, ${y}px)`;
});
