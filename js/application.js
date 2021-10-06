let currentScore = 0;
let highScore = 0;
let equationTypes = ['+'];
let range = 10;

let getEquationOperators = function () {
    equationTypes = [];
    $('.equationType :checked').each(function () {
        equationTypes.push($(this).val());
    })
}


let loadQuestion = function () {
    $('.currentquestion p').html("");
    let firstNum = Math.floor(Math.random() * range);
    let secNum = Math.floor(Math.random() * range);
    if(firstNum === 0 && secNum === 0){
        secNum = Math.floor(Math.random() * range);
    }
    let operator = equationTypes[Math.floor(Math.random() * equationTypes.length)];
    if (operator === '+') {
        $('.currentquestion p').html(firstNum + operator + secNum);
        return firstNum + secNum;
    } else if (operator === '-') {
        if (firstNum > secNum) {
            $('.currentquestion p').html(firstNum + operator + secNum);
            return firstNum - secNum;
        } else {
            $('.currentquestion p').html(secNum + operator + firstNum);
            return secNum - firstNum;
        }
    } else if (operator === 'x') {
        $('.currentquestion p').html(firstNum + operator + secNum);
        return firstNum * secNum;
    } else if (operator === '/') {
        let answer = secNum;
        secNum = firstNum * secNum;
        $('.currentquestion p').html(secNum + operator + firstNum);
        return answer;
    }
}

let updateScore = function () {
    $('.score').html('<p>Current Score: ' + currentScore + '</p><p>High Score: ' + highScore + '</p>');
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
            $('.timer p').html(timeleft + ' sec');
            console.log(timeleft);
            if (timeleft === 0) {
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
    $('.timer p').html(10 + ' sec');
    $('.input input').on('keydown', function () {
        if (currentScore === 0) {
            startTimer();
        }
        let userAns = Number($(this).val());
        if (userAns === answer) {
            $(this).val('');
            currentScore++;
            startTime += 1000;
            answer = loadQuestion();
            updateScore();
        }
    })

    $(document).on('click', '.reset button', function () {
        console.log(currentScore, highScore);
        if (currentScore > highScore) {
            highScore = currentScore;
        }
        currentScore = 0;
        updateScore();
        $('.input input').prop('disabled', false);
        $('.reset').addClass('hidden');
        $('.input input').val('');
        answer = loadQuestion();
    })

    $('.equationType :checkbox').change(function () {
        // this will contain a reference to the checkbox   
        getEquationOperators();
        answer = loadQuestion();
    });

    $('.range input').on('input', function () {
        range = $(this).val();
        $(this).val(range);
        answer = loadQuestion();
    });
})