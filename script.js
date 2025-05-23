// const data = require("./data.js") // node js syntax
import { quizData } from './data.js';  // browser syntax

let currentQuestionIndex = 0;
let score = 0;
//first tagging the main 3 screens
const introScreen = document.getElementById('quiz-intro-screen');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');

//tagging questions , options and buttons

const startButton = document.getElementById('start-button');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');

//tagging the current progress and scores ( also a rematch )

const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionSpan = document.getElementById('total-questions');
const finalScoreSpan = document.getElementById('final-score');
const totalQuestionResultSpan = document.getElementById('total-questions-result');
const restartButton = document.getElementById('restart-button');
const scoreMessage = document.getElementById('score-message');

// === FUNCTIONS TO IMPLEMENT ===

function startQuiz() {
    // TODO: Hide intro screen, show question screen
    introScreen.style.display = "none";
    questionScreen.style.display = "block";
    resultScreen.style.display = "none";
    // TODO: Reset currentQuestionIndex and score to 0
    currentQuestionIndex = 0;
    score = 0;
    // TODO: Set total questions display
    totalQuestionSpan.textContent = quizData.length;
    // TODO: Load first question
    loadQuestion();
}
startButton.addEventListener('click', startQuiz);


function loadQuestion() {
    // TODO: Check if quiz is finished (if so, show results)
    if (currentQuestionIndex >= quizData.length) {
        showResult();
        return;
    }
    // TODO: Get current question from quizData
    const currentQuestion = quizData[currentQuestionIndex];
    // TODO: Display question text
    questionText.textContent = currentQuestion.question;
    // TODO: Update question progress (1/5, 2/5, etc.)
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    // TODO: Hide next button
    optionsContainer.innerHTML = "";
    // TODO: Create option buttons dynamically



    for (let key in currentQuestion) {
        if (key !== 'question' && key !== 'correct') {
            //creates a new button
            const newButton = document.createElement('button');
            newButton.textContent = currentQuestion[key];
            newButton.dataset.option = key;

            //add click event
            newButton.addEventListener('click', function () {
                if (this.dataset.option === currentQuestion.correct) {
                    // this refers to the button that was clicked
                    score++;
                }
                currentQuestionIndex++;
                loadQuestion();
            });

            optionsContainer.appendChild(newButton); //takes a newly created element and adds it as a child inside another element.

        }

    }


}


function showResult() {
    // TODO: Hide question screen, show result screen
    questionScreen.style.display = "none";
    resultScreen.style.display = "block";
    // TODO: Display final score
    finalScoreSpan.textContent = score;
    totalQuestionResultSpan.textContent = quizData.length;

    //show score messages
    if (score === quizData.length) {
        scoreMessage.textContent = "Perfect! 🎉";
    } else if (score >= quizData.length * 0.8) {
        scoreMessage.textContent = "Great job! 👏";
    } else if (score >= quizData.length * 0.6) {
        scoreMessage.textContent = "Not bad! 👍";
    } else {
        scoreMessage.textContent = "Keep practicing! 💪";
    }

}

// === EVENT LISTENERS ===
// TODO: Add click listeners for start, next, and restart buttons
restartButton.addEventListener('click' , function(){
    currentQuestionIndex = 0;
    score = 0;
    resultScreen.style.display = "none";
    introScreen.style.display = "block";
})

