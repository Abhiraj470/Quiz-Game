const startScreen = document.querySelector("#start-screen");
const quizScreen = document.querySelector("#quiz-screen");
const resultScreen = document.querySelector("#result-screen");
const startButton = document.querySelector("#start-btn");
const questionText = document.querySelector("#question-text");
const answerContainer = document.querySelector("#answers-container");
const currentQuestionSpan = document.querySelector("#current-question");
const totalQuestionSpan = document.querySelector("#total-questions");
const scoreSpan = document.querySelector("#score");
const finalScoreSpan = document.querySelector("#final-score");
const maxScoreSpan = document.querySelector("#max-score");
const resultMessage = document.querySelector("#result-message");
const restartButton = document.querySelector("#restart-btn");
const progressBar = document.querySelector("#progress");

const quizQuestions = [
    {
        question:"What is the capital of France?",
        answers :[
            {text:"Berlin" , correct:false},
            {text:"Madrid",correct:false},
            {text:"France" , correct:true},
            {text:"Rome",correct:false}
        ]
    },
    {
        question:"Which planet is known as Red Planet?",
        answers :[
            {text:"Venus" , correct:false},
            {text:"Mars",correct:true},
            {text:"Jupiter" , correct:false},
            {text:"Mercury",correct:false}
        ]
    },
    {
        question:"Which is largest ocean on Earth?",
        answers :[
            {text:"Atlantic Ocean" , correct:false},
            {text:"Indian Ocean",correct:false},
            {text:"Artic Ocean" , correct:false},
            {text:"Pacific Ocean",correct:true}
        ]
    },
    {
        question:"How many continents are there on Earth?",
        answers :[
            {text:"5" , correct:false},
            {text:"6",correct:false},
            {text:"7" , correct:true},
            {text:"8",correct:false}
        ]
    },
    {
        question:"What is chemical symbol of gold?",
        answers :[
            {text:"Ag" , correct:false},
            {text:"Au",correct:true},
            {text:"Go" , correct:false},
            {text:"Gd",correct:false}
        ]
    }
    
]

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

startButton.addEventListener("click",startQuiz);
restartButton.addEventListener("click",restartQuiz);

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = score;
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    showQuestion();
}

function showQuestion(){
    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercentage = (currentQuestionIndex /quizQuestions.length) * 100;

    progressBar.style.width = progressPercentage + "%";

    questionText.textContent = currentQuestion.question;

    answerContainer.innerHTML = "";

    currentQuestion.answers.forEach((answer)=>{
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");
        button.dataset.correct = answer.correct;

        button.addEventListener("click",selectAnswer);
        answerContainer.appendChild(button);
        })

}

function selectAnswer(event){
    if(answersDisabled) return;

    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answerContainer.children).forEach((button)=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }else if(button === selectedButton){
            button.classList.add("incorrect");
        }
    })

    if(isCorrect){
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(()=>{
        currentQuestionIndex++;
        if(currentQuestionIndex < quizQuestions.length){
            showQuestion();
        }else{
            showResult();
        }
    },1000)
}

function showResult(){
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = (score/quizQuestions.length) * 100;
    
    if(percentage === 100){
        resultMessage.textContent = "Perfect! You have a great knowledge";
    }else if (percentage >= 80 ){
        resultMessage.textContent = "Great Job! You know alot of things";
    }else if (percentage >= 60 ){
        resultMessage.textContent = "Good effort! Keep learning";
    }else if (percentage >= 40 ){
        resultMessage.textContent = "Not bad! Try to improve";
    }else{
        resultMessage.textContent ="Keep studying! You will get better";
    }
}
function restartQuiz(){
    resultScreen.classList.remove("active");
    startQuiz();
}