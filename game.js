/* Data */
const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameStarted = false;
let level = 0;

/* Random Game Colour */
$(document).keydown(function() {
    if (!gameStarted) {
        playSound("newgame");
        $('h1#level-title').text("Game Is Starting...");
        $('h2#game-record').toggle();
        setTimeout(() => {
            gameStarted = true;
            nextSequence();
        }, 1000);
    }
});

/* User Chosen Colour */
$('div[type="button"]').click(function() {   
    if (gameStarted) {
        let userChosenColour = $(this).attr('id');
        console.log("Clicked Color: " + userChosenColour);
        userClickedPattern.push(userChosenColour);
        console.log("User Pattern: " + userClickedPattern);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer();
    }
});

/* Random Number Generator Function from 0 to 3 */
function nextSequence() {
    userClickedPattern = [];
    level++;
    $('h1#level-title').text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColors[randomNumber];
    console.log("Random Color: " + randomChosenColour);
    gamePattern.push(randomChosenColour);
    console.log("Game Pattern: " + gamePattern);

    /* Flash & Sound Play */
    $('div#' + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

/* Sound Player Function */
function playSound(name) {
    let sound = $("audio#" + name + "-sound")[0];
    sound.pause();
    sound.currentTime = 0;
    sound.play();
}

/* Button Pressed Animation Function*/
function animatePress(currentColour) {
    $('div#' + currentColour).toggleClass('pressed');
    setTimeout(() => {
        $('div#' + currentColour).toggleClass('pressed');
    }, 100);
}

/* Correct Answer Checker Function */
function checkAnswer() {
    if ((gamePattern[userClickedPattern.length - 1] === userClickedPattern[userClickedPattern.length - 1]) && (gamePattern.length === userClickedPattern.length)) {
        console.log('Success');
        playSound('success');
        $('h1#level-title').text("Level " + level + " Completed");
        $('div[type="button"]').toggleClass('disable-click');
        setTimeout(() => {
            $('h1#level-title').text("Level " + level);
            $('div[type="button"]').toggleClass('disable-click')
            nextSequence();
        }, 1000);

    } else if ((gamePattern[userClickedPattern.length - 1] !== userClickedPattern[userClickedPattern.length - 1]) && (gamePattern.length === userClickedPattern.length)) {
        console.log('Failure');
        playSound('wrong');
        $('body').toggleClass('game-over');
        setTimeout(() => {
            $('body').toggleClass('game-over');
        }, 200);
        $('h1#level-title').text("Game Over, Press Any Key to Restart");
        $('h2#game-record').toggle();
        $('h2#game-record').text("Current Record: Level " + level);
        startOver();
    }
}

/* Game Restart Function */
function startOver() {
    gameStarted = false;
    level = 0;
    gamePattern = [];
}