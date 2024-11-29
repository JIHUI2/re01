const quizData = [
    {
        question: "Who can get you drunk?",
        answer: "Brasserie des Vagabond"
    },
    {
        question: "Who's the sweetest?",
        answer: "Chocokiel"
    },
    {
        question: "Who is a skin management expert?",
        answer: "CHANAND"
    },
    {
        question: "Which activity is the invisible surprise?",
        answer: "Blind tasting"
    },
    {
        question: "Who's reminding you not to waste food?",
        answer: "KITRO"
    },
    {
        question: "Who produce candles skin care？",
        answer: "Mayi"
    },
    {
        question: "Who produce sweety honey？",
        answer: "Melinis"
    },
	{
        question: "Who produce fresh fruit jam?",
        answer: "Degust"
    },
	{
        question: "Who makes wine in Yvorne?",
        answer: "Domaine Dillet"
    },
    {
        question: "Who represent Respect Program?",
        answer: "Rossigol"
    }
];

window.onload = function() {
    const currentQuizIndex = parseInt(localStorage.getItem('currentQuizIndex'));
    const quiz = quizData[currentQuizIndex];
    
    // Display question number and text
    document.getElementById('questionNumber').textContent = currentQuizIndex + 1;
    document.getElementById('questionText').textContent = quiz.question;
    
    // Set up event listeners
    const answerInput = document.getElementById('answerInput');
    const submitButton = document.getElementById('submitButton');
    const feedbackDiv = document.getElementById('feedback');
    
    // Handle enter key press
    answerInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            handleAnswer();
        }
    });
    
    // Handle submit button click
    document.getElementById('submitAnswer').addEventListener('click', handleAnswer);
};

function handleAnswer() {
    const currentQuizIndex = parseInt(localStorage.getItem('currentQuizIndex'));
    const quiz = quizData[currentQuizIndex];
    const answerInput = document.getElementById('answerInput');
    const feedbackDiv = document.getElementById('feedback');
    
    // Get user's answer and normalize it
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = quiz.answer.toLowerCase();
    
    if (userAnswer === correctAnswer) {
        // Show success feedback
        feedbackDiv.textContent = 'Correct!';
        feedbackDiv.className = 'feedback-text feedback-correct';
        
        // Update completed quizzes
        const completedQuizzes = JSON.parse(localStorage.getItem('completedQuizzes')) || [];
        if (!completedQuizzes.includes(currentQuizIndex)) {
            completedQuizzes.push(currentQuizIndex);
            localStorage.setItem('completedQuizzes', JSON.stringify(completedQuizzes));
        }
        
        // Redirect after delay
        setTimeout(() => {
            if (completedQuizzes.length === quizData.length) {
                alert('Congratulations! You have completed all questions! You can now claim your free ice cream!');
            }
            window.location.href = 'index.html';
        }, 1500);
    } else {
        // Show error feedback
        feedbackDiv.textContent = 'Incorrect. Please try again.';
        feedbackDiv.className = 'feedback-text feedback-wrong';
        answerInput.value = '';
        answerInput.focus();
    }
}