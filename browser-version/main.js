import * as math from "./math.js";

document.addEventListener("DOMContentLoaded", (event) => {
  const guess = document.getElementById("user-guess");
  const minNum = document.getElementById("min-number");
  const maxNum = document.getElementById("max-number");

  const newGameButton = document.getElementById("new-game");
  const rangeSubmitButton = document.getElementById("submit-range");
  const guessSubmitButton = document.getElementById("guess-button");

  const displayResponse = document.getElementById("display-response");
  const displayRange = document.getElementById("display-range");
  const displayTurnsLeft = document.getElementById("display-turns-left");

  let secretNumber;
  let turnsLeft = 5;

  document.addEventListener("input", (event) => {
    if (minNum.value !== "" && maxNum.value !== "") {
      rangeSubmitButton.disabled = false;
    }
  });

  rangeSubmitButton.addEventListener("click", (event) => {
    secretNumber = math.randomInRange(
      Number(minNum.value),
      Number(maxNum.value)
    );
    console.log(secretNumber);
    displayRange.innerHTML = `Min: ${minNum.value} Max:${maxNum.value}`;
    rangeSubmitButton.disabled = true;

    displayTurnsLeft.innerHTML = `Turns Left: ${turnsLeft}`;
    guessSubmitButton.disabled = false;
    newGameButton.disabled = false;
  });

  guessSubmitButton.addEventListener("click", (event) => {
    if (turnsLeft) {
      let currentGuess = math.checkGuess(Number(guess.value), secretNumber);
      turnsLeft--;
      switch (currentGuess) {
        case 2:
          displayResponse.innerHTML = "too high!!!!";
          break;
        case 1:
          displayResponse.innerHTML = "too low....";
          break;
        case 0:
          displayResponse.innerHTML = "juuuuust right";
          break;
      }
      displayTurnsLeft.innerHTML = `Turns Left: ${turnsLeft}`;
      guess.value = "";
    } else {
      guessSubmitButton.disabled = true;
      displayResponse.innerHTML = "You fail! Try harder next time 😝";
    }
  });

  newGameButton.addEventListener("click", (event) => {
    minNum.value = "";
    maxNum.value = "";
    guess.value = "";
    displayResponse.innerHTML = "";
    displayRange.innerHTML = "";
    displayTurnsLeft.innerHTML = "";
  });
});
