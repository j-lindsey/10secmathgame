let currentScore = 0;
let highScore = 0;


let loadQuestion = function () {
    $('.currentquestion p').html("");
    let firstNum = Math.floor(Math.random() * 10);
    let secNum = Math.floor(Math.random() * 10);
    $('.currentquestion p').html(firstNum + ' + ' + secNum);
    return firstNum + secNum;
}

let updateScore = function(){
    $('.score').html('<p>Current Score: ' + currentScore+'</p><p>High Score: '+highScore+'</p>');
}

let timepassed = 0;
let timer = null;
let startTime;
let startTimer = function () {
    if (!timer) {
        startTime = Date.now() - timepassed;
        timer = setInterval(function () {
            timepassed = Date.now() - startTime;
            timeleft = Math.round(10 - timepassed / 1000);
            $('.timer p').html(timeleft);
            console.log(timeleft);
            if(timeleft === 0){
                stopTimer();
                $('.input input').prop('disabled', true);
                $('.reset').removeClass('hidden');
            }
        }, 50); // Executed every 20 millisecond
    }
};
var stopTimer = function () {
    window.clearInterval(timer);
    timer = null;
    timepassed = 0;
    $('.timer p').html(10);
};




$(document).ready(function () {
    let answer = loadQuestion();
    $('.timer p').html(10);
    $('.input input').on('keydown', function () {
        if (currentScore === 0) {
            startTimer();
        }
        let userAns = Number($(this).val());
        if (userAns === answer) {
            $(this).val('');
            currentScore++;
            startTime+=1000;
            answer = loadQuestion();
            updateScore();
        }
    })

    $(document).on('click', '.reset button', function(){
        console.log(currentScore, highScore);
        if(currentScore > highScore){
            highScore = currentScore;
        }
        currentScore = 0;
        updateScore();
        $('.input input').prop('disabled', false);
        $('.reset').addClass('hidden');
        answer = loadQuestion();
    })
})