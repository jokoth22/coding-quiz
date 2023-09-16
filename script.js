let currentQuestionIndex = 0;
let timeLeft = 100;
let timer;

const questions = [
    {
        question: "What does HTML stand for?",
        answers: ["Hyper Text Markup Language", "High Technology Modern Language", "Hyper Transfer Markup Language", "High Transfer Modern Language"],
        correctAnswer: 0,
    },
    {
        question: "What does CSS stand for?",
        answers: ["Computer Style Sheet", "Computer Styling Sheet", "Cascading Style Sheet", "Cascading Styling Sheet"],
        correctAnswer: 2,
    },
    {
        question: "Where can you find documentation support for Web Building?",
        answers: ["W3Schools", "Mozilla Developer(MDN)", "Neither", "Both"],
        correctAnswer: 3,
    },
    {
        question: "Which front end language allows you to make the website more dynamic?",
        answers: ["Hyper Text Markup Language", "JavaScript", "Cascading Style Sheet", "JavaScript Object Notation"],
        correctAnswer: 1,
    }
];

document.getElementById('startButton').addEventListener('click', startQuiz);
document.getElementById('saveScoreButton').addEventListener('click', saveScore);

function startQuiz() {
    currentQuestionIndex =0; // reset the question index
    timeLeft = 100; //reset the timer

    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('quizScreen').style.display = 'block';

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById('timeLeft').textContent = timeLeft;
        if (timeLeft <= 0) endQuiz();
    }, 1000);

    nextQuestion();
}

function nextQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endQuiz();
        return;
    }

    const question = questions[currentQuestionIndex];
    document.getElementById('question').textContent = question.question;

    for (let i = 0; i < question.answers.length; i++) {
        const button = document.getElementById('answer' + (i + 1));
        button.textContent = question.answers[i];
        button.onclick = () => checkAnswer(i);
    }
}

function checkAnswer(answer) {
    if (answer === questions[currentQuestionIndex].correctAnswer) {
        //prompt showing correct answer
    } else {
        //prompt showing incorrect answer
        timeLeft -= 10;
    }

    currentQuestionIndex++;
    nextQuestion();
}

function endQuiz() {
    clearInterval(timer);
    document.getElementById('quizScreen').style.display = 'none';
    document.getElementById('endScreen').style.display = 'block';
    document.getElementById('score').textContent = timeLeft;
}

function saveScore() {
    const initials = document.getElementById('initials').value;
    if (!initials) return;

    let highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    highscores.push({ initials, score: timeLeft });
    localStorage.setItem('highscores', JSON.stringify(highscores));
}

document.getElementById('highScores').addEventListener('click', viewHighScores);
document.getElementById('clearHighScores').addEventListener('click', clearHighScores);
document.getElementById('backToStart').addEventListener('click', backToStart);

function viewHighScores() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('quizScreen').style.display = 'none';
    document.getElementById('endScreen').style.display = 'none';
    document.getElementById('highScores').style.display = 'block';
    
    let highScoresList = document.getElementById('highScoresList');
    highScoresList.innerHTML = '';
    let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.sort((currentScore, newScore) => newScore.score - currentScore.score);
    highScores.forEach((score, index) => {
        let li = document.createElement('li');
        li.textContent = `${index + 1}. ${score.initials} - ${score.score}`;
        highScoresList.appendChild(li);
    });
}

function clearHighScores() {
    localStorage.removeItem('highScores');
    viewHighScores();
}

function backToStart() {
    document.getElementById('highScores').style.display = 'none';
    document.getElementById('startScreen').style.display = 'block';
}