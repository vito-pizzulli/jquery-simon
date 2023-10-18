/* Data */
const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameStarted = false;
let level = 0;
let gameRecord = 0;

/* Game start with key press */
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

/* Game start with click */
$('h1#level-title').click(function() {
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

/* User chosen colour with animation and sound */
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

/* Function that makes the next game sequence start, with animation and sound */
function nextSequence() {
    userClickedPattern = [];
    level++;
    $('h1#level-title').text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColors[randomNumber];
    console.log("Random Color: " + randomChosenColour);
    gamePattern.push(randomChosenColour);
    console.log("Game Pattern: " + gamePattern);
    $('div#' + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

/* Function that plays a sound */
function playSound(name) {
    let sound = $("audio#" + name + "-sound")[0];
    sound.pause();
    sound.currentTime = 0;
    sound.play();
}

/* Function that animates the pressed button */
function animatePress(currentColour) {
    $('div#' + currentColour).toggleClass('pressed');
    setTimeout(() => {
        $('div#' + currentColour).toggleClass('pressed');
    }, 100);
}

/* Function that checks if the colour chosen by the user is correct, if it's wrong makes the game end, if the entire sequence is correct it makes the next level start */
function checkAnswer() {
    if ((gamePattern[userClickedPattern.length - 1] === userClickedPattern[userClickedPattern.length - 1]) && (gamePattern.length === userClickedPattern.length)) {
        console.log('Success');
        playSound('success');
        $('h1#level-title, h2#game-record').toggleClass('success');
        $('h1#level-title').text("Level " + level + " Completed");
        $('div[type="button"]').toggleClass('disable-click');
        setTimeout(() => {
            $('h1#level-title, h2#game-record').toggleClass('success');
            $('h1#level-title').text("Level " + level);
            $('div[type="button"]').toggleClass('disable-click')
            nextSequence();
        }, 1000);

    } else if ((gamePattern[userClickedPattern.length - 1] !== userClickedPattern[userClickedPattern.length - 1]) || (gamePattern[userClickedPattern.length - 1] !== userClickedPattern[userClickedPattern.length - 1] && gamePattern.length === userClickedPattern.length)) {
        console.log('Failure');
        playSound('wrong');
        $('h1#level-title, h2#game-record').toggleClass('game-over');
        setTimeout(() => {
            $('h1#level-title, h2#game-record').toggleClass('game-over');
        }, 200);
        $('h1#level-title').text("Game Over! Press Any Key or Click Here to Restart");
        if (gameRecord < level - 1) {
            gameRecord = level - 1;
        }
        $('h2#game-record').toggle();
        if (gameRecord === 0) {
            $('h2#game-record').text("Current Record: None ");
        } else {
            $('h2#game-record').text("Current Record: Level " + gameRecord);
        }
        startOver();
    }
}

/* Function that restarts variables before the user can start a new game */
function startOver() {
    gameStarted = false;
    level = 0;
    gamePattern = [];
}