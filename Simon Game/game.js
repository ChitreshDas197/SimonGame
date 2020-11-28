var gamePattern = [];
var buttoncolors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];

var started = false;

var level = 0;

//for first key press
$(document).keypress(function(){
    if(!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

//for button click
$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor);

    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1); //sending the index of the last entered color to check the color
    //                                             to check the color the at the same index of the game pattern
})


//to check the pattern match
function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }

    }
    else {
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();

        $("body").addClass("game-over");
        

        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200);

        $("#level-title").text("Game Over, Press any key to Restart");

        startOver();

        
    }

}

//to generate the seq internally
function nextSequence() {
    userClickedPattern = []; //re assigning for next level

    level ++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttoncolors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);


}


//function to play sound corresponding to a color
function playSound (name) {
    var colorSound = new Audio("sounds/" + name + ".mp3");
    colorSound.play();
}

//function to animate the button on click
function animatePress (currentColor) {
    $("#"+ currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver () {
    level = 0;
    gamePattern = [];
    started = false;
}