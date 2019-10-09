var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

/* This trigger is responsible for the start of the game */
$(document).keypress(function() {
  if (!gameStarted) {
    gameStarted = true;
    nextSequence();
  }
});

/* This trigger handles when player click on a button */
$(".btn").click(function() {
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  console.log("clickedpatter: " + userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAns(userClickedPattern.length-1);
});

/* Here we check if the player clicked the right button */
function checkAns(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    if (currentLevel == gamePattern.length - 1) {
      userFinished = true;
      setTimeout(function() {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    startOver();
  }
}

/* This functon create the next button flash */
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

/* This funtcion is responsible for playing the right sound */
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

/* Animatepress add the pressed color and removes it */
function animatePress(currentColor) {
  $("#" + currentColor).addClass('pressed');
  setTimeout(function() {
    $("#" + currentColor).removeClass('pressed');
  }, 100);
}

/* We call startover when the game is ended */
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
