//The NPC Characters
function Character (name, taunt, img, strategy) {
    this.name = name;
    this.taunt = taunt;
    this.img = img;
    this.strategy = strategy;
}

var matt = new Character("Matt Winchell", ["I'll eat you for breakfast!","You don't stand a chance!", "Give up while you still can!"], "./img/matt.gif", "random");
var pat = new Character("Pat Cornwall", ["I'm not hacking!"], "./img/pat.gif", "random");
var ray = new Character("Ray Marcilla", ["Bow before my unstoppable force!", "Rock never fails!"], "./img/kuhlman.gif", "rock");
var john = new Character("John McKay", ["You haven't seen anything yet!", "I will never be defeated!"], "./img/mckay.gif", "hack");
var heath = new Character("Heath Gifford", ["Who's your daddy?", "You got a problem with me?", "Dont come in here with your big dick swagger!"], "./img/heath.gif", "random");

var thePit = [matt, pat, ray, john, heath];

var getOpponent = function () {
	var i = Math.floor(Math.random() * thePit.length);
	opponent = thePit[i];
};

//Taunt them!
var getTaunt = function () {
	var i = Math.floor(Math.random() * opponent.taunt.length);
	taunt = opponent.taunt[i];
	speak(taunt);
};

//The Strategies
var getComputerChoice = function() {
switch (opponent.strategy) {
	case "random":
			computerChoice = Math.random();
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
		if (userChoice === "rock") {
			computerChoice = "paper";
		} else if (userChoice === "paper") {
			computerChoice = "scissors";
		} else {
			computerChoice = "rock";
		};
		break;

	default:
	break;
	}
};

//The Backgrounds
var background = ["./img/bg1.gif","./img/bg2.png","./img/bg3.png","./img/bg4.png"];

var getBackground = function () {
	var i = Math.floor(Math.random() * background.length);
	$("#game_canvas").css("background-image","url(" + background[i] + ")");
};


//Start a New Round!
var newRound = function () {
	yourScore = 0;
	theirScore = 0;
	getBackground();
	getOpponent();
	$("img").attr("src",opponent.img);
	$("#opponent_name").text(opponent.name);
	$("#popup").show();
	$("#popup_text").text("Prepare to fight " + opponent.name);
	speak("Let's Go!");
	$("#close").click( function() {
		closePopup();
	});
};
    
    
//Have NPC Speak
var speak = function(dialogue) {
	$("#dialogue").text(dialogue);
};

//Set Score
var setScore = function() {
	$("#yourScore").text("Your score: " + yourScore);
	$("#theirScore").text(opponent.name + "'s Score: " + theirScore);
};

//Get Game Outcome
var compare = function (choice1, choice2) {
    if (choice1 === choice2) {
        outcome = "The result is a tie!";
    } else if ( choice1 ===  "rock") {
        if (choice2 === "scissors") {
            outcome = "Rock beats Scissors!";
            win = true;
            yourScore += 1;
        } else {
            outcome = "Paper beats Rock!";
            win = false;
            theirScore += 1;
        }
    } else if (choice1 === "paper") {
        if (choice2 === "rock") {
            outcome = "Paper beats Rock!";
            win = true;
            yourScore += 1;
        } else {
            outcome = "Scissors beats Paper!";
            win = false;
            theirScore += 1;
        }
    } else if (choice1 === "scissors") {
        if (choice2 === "rock") {
            outcome = "Rock beats Scissors!";
            win = false;
            theirScore += 1;
        } else {
            outcome = "Scissors beats Paper!";
            yourScore += 1;
            win = true;
        }
    }
};
var closePopup = function() {
	if ($("#popup").is(":visible")) {
		$("#popup").hide();
	}
};

$(document).ready( function(){
		//Close those popup windows
		newRound();

		$(".action").click( function() {
			userChoice = event.target.id;
			getComputerChoice();
			compare(userChoice, computerChoice);
			
			speak("I choose " + computerChoice + ".");
			
			$("#popup").show();
			$("#popup_text").text(outcome);
			
			$("#close").click( function() {
				closePopup();
				getTaunt();
				setScore();
				if (yourScore >= 5) {
					$("#popup").show();
					$("#popup_text").text("You have defeated " + opponent.name + "!");
						$(this).click( function() {
							newRound();
						});
				} else if (theirScore >= 5) {
					$("#popup").show();
					$("#popup_text").text("You have been defeated by the mighty " + opponent.name + "!");
						$(this).click( function() {
							newRound();
						});
				};
			});
			
		});
});


