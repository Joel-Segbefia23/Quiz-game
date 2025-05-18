const quizData = [
    {
        question: "What does DOM stand for?",
        options: [
            "Document Order Model",
            "Document Object Model",
            "Data Object Method",
            "Direct Object Management"
        ],
        correct: 1
    },
    {
        question: "Which method selects by ID?",
        options: [
          "getElementById()",
          "querySelectorAll()",
          "getElement()",
          "getElementsByClassName()"
        ],
        correct: 0
      },
      {
        question: "Which event fires on input change?",
        options: ["click", "submit", "change", "keydown"],
        correct: 2
      }
  ];

  let questions = [...quizData].sort(() => Math.random() - 0.5);
  let currentQuestion = 0;
  let score = 0;
  let timer;
  let timeLeft;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const timerEl = document.getElementById("timer");
const resultsEl = document.getElementById("results");



function loadQuestion() {
    clearInterval(timer);
    timeLeft = 15;
    updateTimer();
    timer = setInterval(countdown, 1000);

    const q = questions[currentQuestion];
    questionEl.textContent = `Q${currentQuestion + 1}. ${q.question}`;

optionsEl.innerHTML = ""; //empty and then reload questions everytime.
    q.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.classList.add("options-btn");
        btn.textContent = option;
        btn.addEventListener("click", () => {selectAnswer(index, true)});
        optionsEl.appendChild(btn);

    });

    nextBtn.style.display = "none";
};


function selectAnswer(index, shouldScore) {
    clearInterval(timer);
    let q = questions[currentQuestion];
    let buttons = document.querySelectorAll(".options-btn");
//after a click, user can't click again.
    buttons.forEach(btn => btn.disabled = true);

//don't forget its the options that populate the buttons.
    if (index === q.correct) {
        shouldScore && score++; //if true increase score by 1.
        buttons[index].classList.add("correct");
    } else {
        buttons[index].classList.add("wrong");
        buttons[q.correct].classList.add("correct"); //still show correct answer
    }

    nextBtn.style.display = "inline-block";
};


nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
       showResult(); 
    }
});

function showResult() {
    nextBtn.style.display = "none";
    let highScore = localStorage.getItem("quizHighScore") || 0; //initially no score and so returns 0

    let isNewHighScore = score >= highScore; //while playing isNewHighScore gets updated, increasing from 0.

    if (isNewHighScore) { // if indeed there's a new highscore...
        localStorage.setItem("quizHighScore", score); // now set the high score for retrieval later.
    }

    resultsEl.innerHTML = `
        <h1> Congratulations 🥳, Quiz Completed!</h1>
        <p> You have scored ${score} out of ${questions.length} questions.</p>
        ${isNewHighScore? `<p>Highest Score: ${highScore}</p>`: ""}
        <button onclick="location.reload()">Restart Quiz</button>`;
//This line onclick="location.reload()" reloads the current web page — essentially the same as pressing the browser’s refresh button (F5 or ⟳).

   /*  console.log("Trying to show results...");
console.log("Score:", score);
console.log("Total:", questions.length);
console.log("New High Score:", isNewHighScore); */
    
};

//page loads, setInterval starts, countdown executes.
function countdown() {
    timeLeft--;
    updateTimer(); //show everytime I'm reducing the time.
    if(timeLeft === 0) {
        clearInterval(timer);
    // is called the optional chaining operator (?.).
        selectAnswer(questions[currentQuestion]?.correct, false);
    }
   
};

//shows the current time left for the countdown executing.
function updateTimer() {
       timerEl.innerText = `⌛ ${timeLeft}s`;

}

loadQuestion();
