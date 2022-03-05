

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;

var started = false;


// to check weather the button has pressed or not and to change the text of h1 after a passing level by user
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level " + level);
        nextSequance();

        started = true;
    }

});


// function to detect the user clicked button
$(".btn").click(function(){

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
    
});

// to check answer of user 
function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success!");
    

        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequance();
            }, 1000);
        }
    }
        
    else{
        console.log("Wrong!");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press any key to Restart!"); 

        startOver();
    }
}

// method to generate sequences in different levels
function nextSequance(){
    userClickedPattern = [];
level++
$("#level-title").text("level " + level);


var RandomNum = Math.floor(Math.random()*4);
var randomChosenColor = buttonColors[RandomNum];
gamePattern.push(randomChosenColor);

$("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColor);
} 

// to play sound
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


//to animate buttons
function animatePress(currentColor){

    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}



/* function to restart the game and empting the whole variables */
function startOver(){

    level = 0;
    gamePattern = [];
    started = false;
}


