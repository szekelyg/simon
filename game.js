var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var 

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChoosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChoosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  var audio = new Audio("sounds/" + randomChoosenColour + ".mp3");
  audio.play();

}

$("button").click(function(){
  var userChosenColour = $(this).attr('id');
});
