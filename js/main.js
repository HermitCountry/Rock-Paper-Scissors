function Character (name, taunt, img, strategy) {
    this.name = name;
    this.taunt = taunt;
    this.img = img;
    this.strategy = strategy;
}

//The NPC Characters
var matt = new Character("Matt Winchell", ["I'll eat you for breakfast!","You don't stand a chance!", "Give up while you still can!"], "./img/matt.gif", "random");
var pat = new Character("Pat Cornwall", ["I'm not hacking!"], "./img/pat.gif", "random");
var ray = new Character("Ray Marcilla", ["Bow before my unstoppable force!"], "./img/ray.gif", "rock");
var john = new Character("John McKay", ["You haven't seen anything yet!", "I will never be defeated!"], "./img/john.gif", "hack");

var thePit = [matt, pat, ray, john];

/*
function chooseOpponent() {
    	var i = Math.floor(Math.random()) * thePit.length;
    	opponent = thePit[i];
    };
*/

var opponent = thePit[0];

//The Strategies
var strategy = opponent.strategy;
switch (strategy) {
	case "random":
			var computerChoice = Math.random();
			if (computerChoice < 0.34) {
				computerChoice = "rock";
			} else if (computerChoice <= 0.67) {
				computerChoice = "paper";
			} else {
				computerChoice = "scissors";
			};
		break;
	
	case "rock":
		computerChoice = "rock";
		break;

	case "hack":
		if (userChoice = "rock") {
			computerChoice = "paper";
		} else if (userChoice = "paper") {
			computerChoice = "scissors";
		} else {
			computerChoice = "rock";
		};
		break;

	default:
	break;
}

var speak = function(dialogue) {
	$("#dialogue").text(dialogue);
};

$(document).ready( function(){
		$("button").click( function() {
			$("#popup").hide();
		});

		$(".action").click( function() {
			userChoice = event.target.id;
			getComputerChoice(opponent.strategy);
			$("#popup").show();
			$("#popup_text").text("You chose " + userChoice + ".");

			//alert(computerChoice);

		});

		$("img").attr("src",opponent.img);
		$("#opponent_name").text(opponent.name);
});