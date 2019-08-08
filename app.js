var colorList = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var started = false;
var level = 0;

$(document).keydown(function(){
    if(!started){
        $("#title").text("level "+level);
        nextSequence();
        started = true;
    }
});

function nextSequence() {
    userPattern = [];
    level++;
    $("#title").text("level "+level);
    var randomColor = colorList[Math.floor(Math.random() * 4)];
    gamePattern.push(randomColor);
    keyAnimation(randomColor);
}


$(".box").click(function () {
    var choosenColor = $(this).attr("id");
    userPattern.push(choosenColor);
    keyAnimation(choosenColor);
    checkAnswer(userPattern.length-1);
});

function keyAnimation(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 95);
}

function checkAnswer(currentLevel){
    if(userPattern[currentLevel] === gamePattern[currentLevel]){
        if(userPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 700);
        }
    }else{
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("#title").text("game over, press any key to restart.");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}