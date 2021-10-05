
let loadQuestion = function () {
    $('.currentquestion p').html("");
    let firstNum = Math.floor(Math.random() * 10);
    let secNum = Math.floor(Math.random() * 10);
    $('.currentquestion p').html(firstNum + ' + ' + secNum);
    return firstNum + secNum;
}


var timepassed = 0;
var timer = null;
var startTime;
var startTimer = function () {
    if (!timer) {
        startTime = Date.now() - timepassed;
        console.log(startTime / 1000);
        timer = setInterval(function () {
            timepassed = Date.now() - startTime;
            timeleft = Math.round(10 - timepassed / 1000);
            $('.timer p').html(timeleft);
            console.log(timeleft);
            if(timeleft === 0){
                stopTimer();
            }
        }, 50); // Executed every 20 millisecond
    }
};
var stopTimer = function () {
    window.clearInterval(timer);
    timer = null;
};




$(document).ready(function () {
    let answer = loadQuestion();
    let currentScore = 0;
    $('.timer p').html(10);
    $('.input input').on('keydown', function () {
        if (currentScore === 0) {
            startTimer();
        }
        let userAns = Number($(this).val());
        if (userAns === answer) {
            $(this).val('');
            currentScore++;
            answer = loadQuestion();
        }
    })

})