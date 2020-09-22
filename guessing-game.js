const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let secretNumber;
let numAttempts;

const randomInRange = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

let checkGuess = (num) => {
  if (num > secretNumber) {
    console.log("Too high");
    return false;
  } else if (num < secretNumber) {
    console.log("Too low");
    return false;
  } else {
    console.log("Correct!");
    return true;
  }
};

let askGuess = () =>
  rl.question("Enter a Guess, you have  " + numAttempts + " left ", (input) => {
    if (isNaN(Number(input))) {
      console.log("That's not a number!");
      return askGuess();
    }
    let answer = checkGuess(Number(input));
    numAttempts--;
    if (!answer && numAttempts > 0) {
      askGuess();
    } else {
      if (numAttempts === 0) {
        rl.close();
        console.log("No more turns! You lose!");
      } else {
        rl.close();
        console.log("You Win!");
      }
    }
  });

let askRange = () =>
  rl.question("Enter a max number ", (input) => {
    if (isNaN(Number(input))) {
      console.log("That's not a number!");
      return askRange();
    }
    let maxNumber = input;
    console.log("*" + maxNumber + "*");
    rl.question("Enter a min number ", (input) => {
      if (isNaN(Number(input))) {
        console.log("That's not a number!");
        return askRange();
      }
      let minNumber = input;
      console.log("*" + minNumber + "*");
      secretNumber = randomInRange(Number(minNumber), Number(maxNumber));
      return askGuess();
    });
  });

let askTurnLimit = () =>
  rl.question("How many turns do you want? ", (input) => {
    if (isNaN(Number(input))) {
      console.log("That's not a number!");
      return askTurnLimit();
    }
    numAttempts = input;
    return askRange();
  });

askTurnLimit();
