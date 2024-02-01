// Object of categories and words
const words = {
  programming: ["php", "javascript", "Go", "r", "mysql", "python"],
  people: ["Albert Einstein", "Alexander", "Cleopatra", "Mahatma Ghandi"],
  countries: ["Egypt", "Saudi Arabia", "Palestine", "Oman", "Syria"],
};

// declare variables and select elements
const letters = "abcdefghijklmnopqrstuvwxyz",
  categorySpan = document.querySelector(".category span"),
  main = document.querySelector(".main"),
  lettersDiv = document.querySelector(".letters"),
  wordDiv = document.querySelector(".word"),
  theStand = document.querySelector(".the-stand"),
  theHang = document.querySelector(".the-hang"),
  theRope = document.querySelector(".the-rope"),
  theHead = document.querySelector(".head"),
  theBody = document.querySelector(".body"),
  theHands = document.querySelector(".hands"),
  theLegs = document.querySelector(".legs"),
  success = document.getElementById("success"),
  fail = document.getElementById("fail"),
  smallDuration = 500;
let rightAttempts = 0,
  wrongAttempts = 0,
  actualLength;

// show letters in the page
for (const c of letters) {
  let letterSpan = document.createElement("span"),
    letter = document.createTextNode(c.toUpperCase());

  letterSpan.appendChild(letter);
  lettersDiv.appendChild(letterSpan);
}

// get random category then random word
let categories = Object.keys(words),
  randomCategoryIndx = Math.floor(Math.random() * categories.length),
  randomCategoryName = categories[randomCategoryIndx],
  randomCategoryArr = words[randomCategoryName],
  randomWordIndx = Math.floor(Math.random() * randomCategoryArr.length),
  randomWord = randomCategoryArr[randomWordIndx];

// Show category in the page
categorySpan.textContent = randomCategoryName;

actualLength = randomWord.length;

// Create spans of the random word
for (let i = 0; i < randomWord.length; i++) {
  const charSpan = document.createElement("span");
  // check if there is a space in the random word
  if (randomWord[i] == " ") {
    charSpan.textContent = "-";
    actualLength--;
  }
  wordDiv.appendChild(charSpan);
}

// select letters spans and word spans
const lettersSpans = document.querySelectorAll(".letters span"),
  wordSpans = document.querySelectorAll(".word span");

// add event listener to each letter span
lettersSpans.forEach((span) => {
  span.addEventListener("click", function () {
    // get the chosen clicked letter in lower case
    const chosenLetter = span.textContent.toLowerCase();
    // check if the random word includes the chosen letter
    if (randomWord.toLowerCase().includes(chosenLetter)) {
      // if the letter exists in the random word
      // create array to save the indexes in which the letter exists in the random word
      const charIndxs = [];
      // loop over the characters of the random word
      for (let i = 0; i < randomWord.length; i++) {
        // check if the current character = chosen letter
        if (randomWord[i].toLowerCase() == chosenLetter) {
          // add the index in the array
          charIndxs.push(i);
          // increase the right attempts
          rightAttempts++;
          // add green background to the clicked letter
          span.classList.add("bg-right");
          // remove the green background after small Duration and add clicked class to the letter span
          setTimeout(() => {
            span.classList.remove("bg-right");
            span.classList.add("clicked");
          }, smallDuration);
          // play the success sound
          success.play();
        }
      }
      // loop over the indexes array to add clicked right letters to the word spans
      charIndxs.forEach((indx) => {
        wordSpans[indx].textContent = randomWord[indx];
      });
      // check if the word spans completed
      if (rightAttempts == actualLength) {
        // call finish fn and give it the message to show and the class of it
        finish("Congrats!", "right");
      }
    } else {
      // if the letter doesn't exist in the random word
      // increase the wrong attempts
      wrongAttempts++;
      // add red background to the clicked letter
      span.classList.add("bg-wrong");
      // remove the red background after small Duration and add clicked class to the letter span
      setTimeout(() => {
        span.classList.remove("bg-wrong");
        span.classList.add("clicked");
      }, smallDuration);
      // play the fail sound
      fail.play();
      // check the value of the wrong attempts
      switch (wrongAttempts) {
        case 2:
          // show the stand
          theStand.style.display = "block";
          break;
        case 3:
          // show the hang
          theHang.style.display = "block";
          break;
        case 4:
          // show the rope
          theRope.style.display = "block";
          break;
        case 5:
          // show the head
          theHead.style.display = "block";
          break;
        case 6:
          // show the body
          theBody.style.display = "block";
          break;
        case 7:
          // show the hands
          theHands.style.display = "block";
          break;
        case 8:
          // show the legs
          theLegs.style.display = "block";
          // call finish fn and give it the message to show and the class of it
          finish("Game Over!", "wrong");
          // loop over the word spans to show the missing characters after game over
          wordSpans.forEach((span, i) => {
            // check if the span is empty
            if (span.textContent == "") {
              // add the character of the random word that exists in the same index of the empty span
              span.textContent = randomWord[i];
              // add red color to the missing character
              span.classList.add("wrong");
            }
          });
      }
    }
  });
});

// finish fn that is called if game over or word spans completed
function finish(message, theClass) {
  main.textContent = message;
  main.classList.add("finish", theClass);
}
