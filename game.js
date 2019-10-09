var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

$("h1").on("tap",function(){
  if (!gameStarted) {
    gameStarted = true;
    nextSequence();
  }
});


$(document).keypress(function() {
  if (!gameStarted) {
    gameStarted = true;
    nextSequence();
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  console.log("clickedpatter: " + userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAns(userClickedPattern.length-1);
});

function checkAns(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    if (currentLevel == gamePattern.length - 1) {
      userFinished = true;
      setTimeout(function() {  /*userClickedPattern = [];*/
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    startOver();
  }
}


function nextSequence() {
  $("h1").text("Level " + level);
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  console.log("gamePattern: " + gamePattern);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass('pressed');
  setTimeout(function() {
    $("#" + currentColor).removeClass('pressed');
  }, 100);
}

function startOver(){
  playSound("wrong");
  $("h1").text("Game Over Press Any Key To Restart");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  gameStarted = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
