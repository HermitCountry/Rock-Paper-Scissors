(function (window, document, undefined) {

//Global Game Variables
var yourScore = 0;
var theirScore = 0;
	
//Start a New Round!
function newRound() {
		yourScore = 0;
		theirScore = 0;
	};
	
//The Strategies
function getComputerChoice(strategy) {
	switch (strategy) {
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

})(window, document);