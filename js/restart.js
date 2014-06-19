(function (window, document, undefined) {

//Start a New Round!
function newRound() {
		yourScore = 0;
		theirScore = 0;
		getBackground();
		getOpponent();
	};

	//The NPC Characters
	function Character (name, taunt, img, strategy) {
	    this.name = name;
	    this.taunt = taunt;
	    this.img = img;
	    this.strategy = strategy;
	    this.speak = function(dialogue) {
	    	$("#dialogue").text(dialogue);
	    };
	    this.sayTaunt = function(){
			var i = Math.floor(Math.random() * this.taunt.length);
			taunt = this.taunt[i];
			this.speak(taunt);    	
	    };
	    this.getChoice =  function() {
	    	switch (this.strategy) {
	    		case "random":
	    				var computerChoice = Math.random();
	    				if (computerChoice < 0.34) {
	    					return "rock";
	    				} else if (computerChoice <= 0.67) {
	    					return "paper";
	    				} else {
	    					return "scissors";
	    				};
	    			break;
	    		
	    		case "rock":
	    			return "rock";
	    			break;

	    		case "hack":
	    			if (userChoice === "rock") {
	    				return "paper";
	    			} else if (userChoice === "paper") {
	    				return "scissors";
	    			} else {
	    				return "rock";
	    			};
	    			break;

	    		default:
	    		break;
	    		};
	    };
	};

	var matt = new Character("Matt Winchell", ["I'll eat you for breakfast!","You don't stand a chance!", "Give up while you still can!"], "./img/matt.gif", "random");
	var pat = new Character("Pat Cornwall", ["I'm not hacking!"], "./img/pat.gif", "random");
	var ray = new Character("Ray Marcilla", ["Bow before my unstoppable force!", "Rock never fails!"], "./img/kuhlman.gif", "rock");
	var john = new Character("John McKay", ["You haven't seen anything yet!", "I will never be defeated!"], "./img/mckay.gif", "hack");
	var heath = new Character("Heath Gifford", ["Who's your daddy?", "You got a problem with me?", "Dont come in here with your big dick swagger!"], "./img/heath.gif", "random");

	var thePit = [matt, pat, ray, john, heath];

	function getOpponent() {
		var i = Math.floor(Math.random() * thePit.length);
		opponent = thePit[i];
		$("img").attr("src",opponent.img);
		$("#opponent_name").text(opponent.name);
	};

//Get Game Outcome
function compare(choice1, choice2) {
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

//The Backgrounds
var background = ["./img/bg1.gif","./img/bg2.png","./img/bg3.png","./img/bg4.png"];

function getBackground() {
	var i = Math.floor(Math.random() * background.length);
	$("#game_canvas").css("background-image","url(" + background[i] + ")");
};

//Set Score
function setScore() {
	$("#yourScore").text("Your score: " + yourScore);
	$("#theirScore").text(opponent.name + "'s Score: " + theirScore);
};

function resetScore() {
	yourScore = 0;
	theirScore = 0;
	setScore();
};

// The jQuery Part

function closePopup() {
	if ($("#popup").is(":visible")) {
		$("#popup").hide();
	}
};

$("#close").click( function() {
	closePopup();
	if (yourScore >= 5) {
		$("#popup").show();
		$("#popup_text").text("You have defeated " + opponent.name + "!");
			resetScore();
			newRound();
	} else if (theirScore >= 5) {
		$("#popup").show();
		$("#popup_text").text("You have been defeated by the mighty " + opponent.name + "!");
			resetScore();
			newRound();
	};
});

$(".action").click( function() {
	userChoice = event.target.id;
	computerChoice = opponent.getChoice();
	opponent.getChoice();
	opponent.speak("I choose " + computerChoice + ".");
	compare(userChoice,computerChoice);
	setScore();
	opponent.sayTaunt();
	$("#popup").show();
	$("#popup_text").text(outcome);
});

newRound();

})(window, document);