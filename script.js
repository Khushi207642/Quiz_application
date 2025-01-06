// Quiz Data
const questions = [
    {
        question: "What is the capital of India?",
        options: ["Gujarat", "Delhi", "Hyderabad", "Kolkata"],
        answer: "Delhi"
    },
    {
        question: "What is 2+2 ?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        question: "Which programming language is used for web development?",
        options: ["Python", "Java", "JavaScript", "C++"],
        answer: "JavaScript"
    }
];

let currentQuestionIndex = 0;
let score = 0;

// DOM elements
const quizContainer = document.getElementById("quiz");
const nextButton = document.getElementById("next-button");
const resultContainer = document.getElementById("result");
const scoreDisplay = document.getElementById("score");
const restartButton = document.getElementById("restart-button");
const startButton = document.getElementById("start-button");

// Function to start the quiz
function startQuiz() {
    const permission = confirm("Are you ready to start the quiz?");
    if (permission) {
        document.getElementById("start-button").style.display = "none"; // Hide Start Button
        document.getElementById("quiz").classList.remove("hidden");
        nextButton.classList.remove("hidden");
        showQuestion();
    } else {
        alert("Quiz canceled. Come back when you're ready!");
    }
}

// Function to display the current question
function showQuestion() {
    const question = questions[currentQuestionIndex];
    quizContainer.innerHTML = `
        <h2>${question.question}</h2>
        <ul>
            ${question.options
                .map(
                    (option, index) =>
                        `<li><input type="radio" name="answer" id="option${index}" value="${option}">
                         <label for="option${index}">${option}</label></li>`
                )
                .join("")}
        </ul>
    `;
}

// Function to show results at the end of the quiz
function showResult() {
    quizContainer.classList.add("hidden");
    nextButton.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = `${score} / ${questions.length}`;
}

// Event listener for "Next" button
nextButton.addEventListener("click", () => {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        alert("Please select an answer!");
        return;
    }

    if (selectedOption.value === questions[currentQuestionIndex].answer) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

// Event listener for "Restart" button
restartButton.addEventListener("click", () => {
    score = 0;
    currentQuestionIndex = 0;
    resultContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    nextButton.classList.remove("hidden");
    showQuestion();
});

// Event listener for "Start Quiz" button
startButton.addEventListener("click", () => {
    startQuiz();
});

// Initialize the quiz by hiding elements at the start
quizContainer.classList.add("hidden");
nextButton.classList.add("hidden");
resultContainer.classList.add("hidden");