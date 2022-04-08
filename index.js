var buttonColours = ["green", "yellow", "blue", "red"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

//Next Sequence---------------------------------------------------

$(".btn").on('click', function() {

    var userChosenColour = $(this).attr('id');

    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});


//Next Sequence----------------------------------------------*********************************************
function nextSequence() {

    userClickedPattern = [];

    level++;

    var randNum = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randNum];

    gamePattern.push(randomChosenColour);

    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    $("#level-title").text("Level " + level);

    checkAnswer(userClickedPattern.length - 1);
}

$(document).keypress(function() {
    if (!started) {
        $("h1").text("level " + level);
        nextSequence();
        started = true;
    }
})

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1500);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 300)
        $("h1").text("Game Over, Press Any Key to Restart🧨");
        startOver()
    }
}


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed")

    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100)
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}