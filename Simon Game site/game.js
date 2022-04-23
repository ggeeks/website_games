
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;

var leaderBoard = [];

var started = false;


$(document).keypress(function(){
     
    if(!started){
        // $("h1").text("level " + level);
        nextSequence();
        started = true;
    }
    
});


function nextSequence() {
    //nextSequence function

    userClickedPattern = [];

    $("h1").text("level " + level);
    level++;

    var randomNumber = Math.floor(Math.random() *4);

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    
    animatePress(randomChosenColor);

    playSound(randomChosenColor);
    
}


$(".btn").click(function() {
    // handler function
    var userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);

    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
    
    // console.log(userClickedPattern);
});

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        // console.log("success"); 
        
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    } 
    else{
        // console.log("failed");
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game over, Press any key to restart. Your scored " + level + " points");
        leaderBoard.push(level);

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
   setTimeout(function () {

       $("#" + currentColor).removeClass("pressed");
   }, 100);
}



