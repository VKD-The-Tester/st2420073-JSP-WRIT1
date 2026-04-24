let players = JSON.parse(localStorage.getItem("players")) || [];
let playerCount = (JSON.parse(localStorage.getItem("players")) || []).length;
let playersAnswers = [];
let currentPlayer = 0;
let currentPoints = 0;
let counter = 60;
let timeInterval = null;
let selectedOption = null;

const setupQuestions = () => {
  let questions = [];

  const chosenCategory = JSON.parse(localStorage.getItem("chosenCategory"));
  if (chosenCategory === "HTML") {
    const HTMLQuestions = JSON.parse(localStorage.getItem("HTMLQuestions"));
    questions = [...HTMLQuestions];
  }

  if (chosenCategory === "CSS") {
    const CSSQuestions = JSON.parse(localStorage.getItem("CSSQuestions"));
    questions = [...CSSQuestions];
  }

  if (chosenCategory === "JS") {
    const JSQuestions = JSON.parse(localStorage.getItem("JSQuestions"));
    questions = [...JSQuestions];
  }

  if (chosenCategory === "Mixed") {
    const mixedQuestions = JSON.parse(localStorage.getItem("mixedQuestions"));
    questions = [...mixedQuestions];
  }

  return questions;
};

let questions = setupQuestions();
let currentQuestion = {};

const startQuestion = () => {
  if (!questions || questions.length === 0) {
    window.location.href = "../game-end/end.html";
    return;
  }
  currentQuestion = pullQuestion(questions);
  startTimer();
};

const pullQuestion = (questions) => {
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions.splice(randomIndex, 1)[0];
};

const startTimer = () => {
  clearInterval(timeInterval);

  counter = 60;
  const timer = document.getElementById("timer");
  timer.textContent = counter;

  timerInterval = setInterval(() => {
    counter--;
    timer.textContent = counter;

    if (counter <= 0) {
      clearInterval(timerInterval);
      nextPlayer();
    }
  });
};

const initGameEvents = () => {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-option");
    if (btn) {
      selectedOption = btn.textContent.trim();
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.closest("#btn-submit")) {
      if (selectedOption) {
        playersAnswers[currentPlayer] = selectedOption;
        nextPlayer();
      }
    }
  });
};

const nextPlayer = () => {
  // Reset the previous player's selected option.
  selectedOption = null;

  // Increment the variable to represent the current player.
  currentPlayer++;

  // This code block should check the answers, award the points and reset the players' answer array for the new round.
  if (currentPlayer > playerCount) {
  }

  // Pull the data object about the current player from the JSON file that stored in the local storage.
  const selectedPlayer = players[currentPlayer];

  // Access the element that will display the data relating to the current player.
  const playerDetails = document.getElementById("current-player");

  // Use a string template to properly format the values from player details object
  playerDetails.textContent = `Player ${selectedPlayer.number}: ${selectedPlayer.nickname}`;

  // Start a new question
  startQuestion();
};
