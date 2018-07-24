import React from 'react'
import Highlight from 'react-highlight'

const Blackjack = () => (
  <div id="page_code" className="container">
    <div className="col">
      <Highlight language="javascript">
{`        //------------------------------------------------------------------------------------------------------------------------------------------------//

/*	Constructor functino for deck object.
This object will return a full card deck to be used. */

function Deck() {
	let deck = [];
	/*  Itterate through all the available card symbols. harten; ruiten; schoppen; klaveren; */
		for(let symbols = 0; symbols < 4; symbols++) {
			let symbool;
			switch(symbols) {
				case 0:
					symbool = 'harten';
					break;
				case 1:
					symbool = 'ruiten';
					break;
				case 2:
					symbool = 'schoppen';
					break;
				case 3:
					symbool = 'klaveren';
					break;
			}
			/* Itterates through all the possible card values (1-13).
			This will combine the symbol with the value and add the card to the deck. */
			for(let i = 1; i < 14; i++) {
				let card = {
					waarde: i,
					symbool: symbool,
					id: symbool + i,
					imgPath: './images/' + symbool + '-' + i + '.png'
				};
				deck.push(card);
			}
		}
	return deck;
}

//------------------------------------------------------------------------------------------------------------------------------------------------//
/*
* Constructor function for the Game object.
* This function/object will require a object that contains a deck as parameter.
* This function/object will handle the cards in the deck and hand of player and dealer.
* This function/object also calculates the score based on cards in hand, however it doesn't store it.
*/
function Game(deck) {
	let cardsInDeck = deck;
	let discardPile = [];
	let error = "";
	let hand = [];
	let dealerHand = [];

/*This method will randomize the order of the cards in variable cardsInDeck*/
	this.shuffleDeck = () => {
		let a = cardsInDeck;
		let b = [];
		/*Itterates through array a, takes our a random card and pushes it in array b.*/
		while(a.length > 0) {
			let rand = Math.floor(Math.random() * a.length);
			b = [ ...b, a[rand]];
			a = [ ...a.slice(0,rand), ...a.slice(rand + 1)];
		}
		/*Replaces cardsInDeck with a new randomized array; b*/
		cardsInDeck = b;
	};

	/*
	*This method pulls cards from cardsInDeck and puts them in the respective hand.
	*This method expects a number for the amount of cards to pull as first parameter.
	*This method expects a direcion for the pulled cards as string for the second parameter.
	*If the second paramenter is empty, "player" will be assumed.
	*/
	this.pullCards = (n, dir = "player") => {
		/*Itterates through the amount of cards pulled and concats to respective direction*/
		if(cardsInDeck.length >= n) {
			if(dir === "dealer") {
				dealerHand = [ ...dealerHand, ...cardsInDeck.splice(0, n)];
			}
			else {
				hand = [ ...hand, ...cardsInDeck.splice(0, n)];
			}
		}
		/*Error handling in case there are not enough cards in deck.*/
		else {
			error = 'Er zitten niet genoeg kaarten meer in het deck!';
			console.log(error);
		}
	};

	/*This method calculates the score based on the cards in respective hand.
	This method requires an array of cards.*/
	this.calculateScore = (cards) => {
		let score = 0;
		let aces = 0;

		/*Itterates through all the cards in 'cards' array*/
		cards.forEach((card) => {
			/*In case the value is 1, the card is an ace*/
			if(card.waarde == 1) {
				aces++;
			}

			/*In case ace is pulled, value added to score will be assumed as 11.*/
			if(card.waarde == 1) {
				score += 11;
			}
			/*In case a jack, queen or king is pulled, value will be over 11.
			Value added will always be 10 in this case. */
			else if(card.waarde > 10) {
				score += 10;
			}
			/*In case a normal card is pulled, value is added*/
			else {
				score += card.waarde;
			}
			/*
			*In case the total score is over 21, itterated through all aces pulled.
			*every time an ace is encountered, score is deducted by 10 and one ace will be deducted from calculation.
			*This simulates that an ace can have both value 1 and 11.
			*/
			while(score > 21 && aces > 0) {
				score -= 10;
				aces--;
			}
		});
		/*Returns the score after calculations.*/
		return score;
	};

	/*This method discards all the cards given to discard discardPile
	Method requires a array of cards to discard as parameter.*/
	this.discardCards = (cards) => {
		for(let i = 0; i < cards.length; i++){
			hand = hand.filter(card => card != cards[i]);
		}
		discardPile = [ ...discardPile, ...cards];

	};

	/*This method discards all cards that are currently highlightend.
	This method requires an Id as parameter to know which card has been highlightend and thus has to be removed.*/
	this.discardHighlighted = (id) => {
		let result = hand.find(card => card.id === id);
		hand = hand.filter(card => card != result);
		discardPile = [ ...discardPile, result];
	};

	/*This method will put cards back in cardsInDeck
	This method requires cards as array to know which cards to put back.*/
	this.putCardsBack = (cards) => {
		for(let i = 0; i < cards.length; i++) {
			hand = hand.filter(card => card != cards[i]);
		}
		cardsInDeck = [ ...cards, ...cardsInDeck];
	};

	/*This method will put cardfs from discard pile back to cardsInDeck
	This method requires an array of the cards in the discard pile as parameter*/
	this.discardToDeck = (cards) => {
		for(let i =  0; i < cards.length; i++) {
			discardPile = discardPile.filter(card => card != cards[i]);
		}
		cardsInDeck = [ ...cardsInDeck, ...cards];
	};

	/*getter for hand.*/
	this.getHand = () => {
		return hand;
	};

	/*getter for dealerHand*/
	this.getDealerHand = () => {
		return dealerHand;
	};

	/*Getter for discardPile*/
	this.getDiscardPile = () => {
		return discardPile;
	};

	/*getter for cardsInDeck*/
	this.getCardsInDeck = () => {
		return cardsInDeck;
	};

	return this;
}

//------------------------------------------------------------------------------------------------------------------------------------------------//

window.onload = () => {

	/*Decleration of variables*/
  const dealerField = document.getElementById('handdealer');
  const playerField = document.getElementById('playerhand');
  const scoreField = document.getElementById('score');
	const cheatConsole = document.getElementById('cheatconsole');
	const standButton = document.getElementById('standButton');
	const hitButton = document.getElementById('hitButton');
	const startGameButton = document.getElementById('startGameButton');
	let game = null;

	//function to either disable or enable the butons
	const setButtonsDisabled = (state, newgame) => {
		if(state) {
			standButton.setAttribute('disabled', 'disabled');
			hitButton.setAttribute('disabled', 'disabled');
			startGameButton.setAttribute('disabled', 'disabled');
		}
		else if(!state && document.querySelectorAll('.kaart').length > 2 || newgame) {
			console.log('huh?');
			standButton.removeAttribute('disabled');
			hitButton.removeAttribute('disabled');
			startGameButton.removeAttribute('disabled');
		}
		//hitButton.disabled = state;
		//startGameButton.disabled = state;
	}
	/*Excecutes when the transition on card ends and card is in game.
	Buttons are clickable again*/
	const onTransitionEnd = () => {
		setButtonsDisabled(false);
	}

	/*
	*This function will create a card and add it to the document.
	*This function requires a card object as first parameter.
	*This function requires a target field to append to in the DOM as second parameter.
	*This function requires a boolean simulate as parameter the card or not.
	*If no parameter is given, assume true.
	*/
  const createCard = (card, target, simulate = "true") => {
		let img = document.createElement('img');
		/*If the card object is null, assume that it has to show the backside of the card instead and create a card turned around.*/
		if(card === "backside") {
			img.src = './images/achterkant.png';
			img.id = 'achterkant';
		}
		else if(card === "cobra") {
			img.src = './images/cobra.png';
			img.id = 'cobra';
		}
		else{
			img.src = card.imgPath;
			img.id = card.id;
		}
    img.className="kaart";
		img.addEventListener('transitionend', onTransitionEnd);
    target.appendChild(img);

		if(simulate) {
			setTimeout(() => {
				img.classList.add('active');
			}, 100)
		}
		else{
			img.classList.add('active');
		}

  };

	/*
	*This function will handle pulling a new card and adding it the the DOM
	*This function also checks the score to check if the player has exceeded score 21.
	*This function requires a string 'person' as first parameter to determine where to set card too.
	*If left empty card will be pulled for player.
	*This function requires a string 'state' as second parameter to determine state of the game.
	*This handles a hit where the card is different than front side. i.e. backside card for second pull for dealer.
	*If left empty will be assumed its a normal card.
	*/
  const hit = (_callback = null, person, state) => {

		if(person == "dealer") {
				game.pullCards(1, person);
				if(state == "start") {
					createCard("backside", dealerField);
				}
				else {
					let card = game.getDealerHand()[game.getDealerHand().length - 1];
					createCard(card, dealerField);
				}

		}
		else {
			game.pullCards(1, person);
			let card = game.getHand()[game.getHand().length - 1];
			createCard(card, playerField);
			scoreField.innerHTML = 'Score: ' + game.calculateScore(game.getHand());


		}
		setTimeout(() => {
			if(game.calculateScore(game.getHand() ) > 21 ) {
				stand();
			}
			if(_callback !== null) {
				_callback();
			}
		}, 1200)
  };

	/*This function calls to calculate the score and alert the final score and who won. */
  const stand = () => {
		/*In case the player exceeds 21, player BUST*/
    if(game.calculateScore(game.getHand()) > 21 ) {
			if(document.getElementById('cobra') !== null) {
				alert('BUST!\n\nBut you have a cobra so........\n........\n........\n........\n\nWIN!')
			}
			else {
				alert('BUST!\nYou went over 21.');
			}

			endGame();
    }
		else {
			/*Simulates the card pulling for the dealer*/
			simulateDealer(function() {
				/*Variables that contain the score for player and dealer*/
				let playerScore = game.calculateScore(game.getHand());
				let dealerScore = game.calculateScore(game.getDealerHand());

				/*Alert the result of the game*/
				if(document.getElementById('cobra') !== null) { //in case cobra cheat is used, win game
					alert('You win!\nDealer could not win against your cobra!')
				}
				else if(dealerScore > 21) {
					alert('Dealer went over 21, you win!');
				}
				else if(playerScore == dealerScore) {
					alert('Draw! \nBoth you and the dealer scored: ' + playerScore + '.')
				}
				else if(playerScore > dealerScore) {
					alert('You win!\nYou scored ' + playerScore + ' and the dealer scored ' + dealerScore + '.')
				}
				else {
					alert('You lose!\nYou scored ' + playerScore + ' and the dealer scored ' + dealerScore + '.')
				}
				/*End the game after the result has been shown.*/
				endGame();
			});

		}
  };

	/*This function simulates the actions of the dealer*/
	const simulateDealer = (_callback) => {
		/*remove the backside card and create a real card.
		card is created earlier in the dealerhand in the game object, so the card value of the card stays the same.*/
		dealerField.lastChild.remove();
		createCard(game.getDealerHand()[game.getDealerHand().length - 1], dealerField, false);

		let dealerScore = game.calculateScore(game.getDealerHand());

			/*if the score of the dealer is under 17, the dealer will pull another cards.*/
			if(dealerScore >= 17) {
				_callback();
			}
			else {
				while(dealerScore < 17) {
					hit(null, "dealer");
					dealerScore = game.calculateScore(game.getDealerHand());
				}
				setTimeout(() => {
					_callback();
				}, 1200)
			}

	};

	/*This function will create the game object and starts the game to his first state.*/
	const startGame = () => {
		/*Check if ther is an ungoing game, if so, end it.*/
		if(game !== null) {
			endGame();
		}
		game = new Game(new Deck());
		setButtonsDisabled(true);

		/*Shuffle the cards in the deck*/
		game.shuffleDeck();

		/*Pull 2 cards for the player*/
		hit(function() {
			hit(null);
		});
		//hit();

		/*Pulls 2 cards for the dealer.
		The second card will show the backside and won't reveal its value*/
		hit(function() {
			hit(null, "dealer", "start")
		}, "dealer");
		//hit("dealer", "start");
	};

	/*This function will end the current game and empties the playing field.*/
	const endGame = () => {
		game = null;
		setButtonsDisabled(false, true);
		while(playerField.firstChild) {
			playerField.firstChild.remove();
		}
		while(dealerField.firstChild) {
			dealerField.firstChild.remove();
		}
		scoreField.innerHTML = 'Score: ';
	};

	/*this function checks if the cheat submitted matches a cheatcode, if so, excecute the function accordingly.
	This function requires a cheatCode as string for the first parameter*/
	const cheat = (cheatCode) => {
		let error = "/Please try again later";
		let message = "";
		switch (cheatCode) {
			case "hit": //run the hit button
				message = "/Running hit button event";
				hitButton.hasAttribute('disabled') ? appendToCheatHistory(error) : appendToCheatHistory(message);
				hitButtonHandler();
				break;

			case "stand": //run the stand button
				message = "/Running stand button event";
				standButton.hasAttribute('disabled') ? appendToCheatHistory(error) : appendToCheatHistory(message);
				standButtonHandler();
				break;

			case "start game": //run the start game button
				message = "/Running new game button event";
				startGameButton.hasAttribute('disabled') ? appendToCheatHistory(error) : appendToCheatHistory(message);
				startGameButtonHandler();
				break;

			case "yes": //play mp3 file "yes.mp3";
				appendToCheatHistory('/Captain Valcon says: yes');
				let audio = new Audio('media/yes.mp3');
				audio.play();
				break;

			case "I R WINNER": //Automaticly win the game
				appendToCheatHistory('/You miraculously win the game');
				alert("You win!?!");
				endGame();
				break;

			case "RESIGN": //Automaticly lose the game
				appendToCheatHistory('/You suck at this game')
				alert("You lose!?!")
				endGame();
				break;

			case "dance": //Opens youtube; rickroll
				appendToCheatHistory("/Go dance");
				window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
				break;

			case "next card": //Shows the next card that will be pulled from the deck
				if (game === null) {
						appendToCheatHistory('/Game has not been started yet. Type "start game" to start');
				}
				else {
					let card = game.getCardsInDeck()[0].symbool + ' ' + game.getCardsInDeck()[0].waarde;
					appendToCheatHistory('/The next card will be ' + card);
				}
				break;

			case "HOW DO YOU TURN THIS ON": //gives/creates a cobra card for the player. this will 100% win the game.
				if(game === null) {
				appendToCheatHistory('/Game has not been started yet. Type "start game" to start');
				}
				else {
					appendToCheatHistory('/You are now the proud owner of a Cobra')
					createCard("cobra", playerField);
				}
				break;

			case "kaching": //Get 1000 funds for when betting is build.
				appendToCheatHistory("/If you had money, you would now get 1.000 more! but you don't");
				break;

			case "motherlode": //Get 50000 funds for when betting is build.
				appendToCheatHistory("/If you had money, you would now get 50.000 more! but you don't");;
				break;

			case "John Wardley": //useless text
				appendToCheatHistory("/Wow!")
				break;

			case "Damon Hill": //useless text
				appendToCheatHistory("/Go-karts go twice the speed. too bad you're playing blackjack right now.");
				break;

			default: //default message if the cheat is not recognized
				appendToCheatHistory("/String not recognized as cheat")
				break;
		}
	}

	const appendToCheatHistory = (input) => {
		let inputHistory = document.getElementById('inputhistory');
		let listItem = document.createElement('li');
		listItem.textContent = input;
		inputHistory.appendChild(listItem);
	}

	/*Handler function the the hitButtom in DOM*/
	const hitButtonHandler = (e) => {
		/*Check if there is an ungoing game.*/
		if(hitButton.hasAttribute('disabled')) {
				null;
		}
		else {
			if(game) {
				setButtonsDisabled(true);
				hit();
			}
			/*If there is no ungoing game, ask to create one.*/
			else {
				if(confirm("Game has not been started yet.\nWould you like to start?")) {
					startGame();
				}
			}
		}

	};

	/*Handler function the the hitButtom in DOM*/
	const standButtonHandler = (e) => {
		/*Check if there is an ungoing game.*/
		if(standButton.hasAttribute('disabled')) {
				null;
		}
		else {
			if(game) {
				setButtonsDisabled(true);
				stand();
			}
			else {
				/*If there is no ungoing game, ask to create one.*/
				if(confirm("Game has not been started yet.\nWould you like to start?")) {;
					startGame();
				}
			}
		}

	};

	/*Handler function the the hitButtom in DOM*/
	const startGameButtonHandler = (e) => {
		/*Check if there is an ungoing game.
		If so, ask to restart the game.*/
		if(standButton.hasAttribute('disabled')) {
				null;
		}
		else {
			if(game) {
				if(confirm("There is currently a game being played.\nWould you like to start over?")) {
					startGame();
				}
			}
			else {
				setButtonsDisabled(true);
				startGame();
			}
		}

	};

	/*Handler for keypress. Checks wheter or not tab is pressed.
	if tab is pressed, either open or close the cheat console.*/
	onKeyPressHandler = (e) => {
		if(e.key == "Tab" || e.target.key == "Tab") {
			e.preventDefault();
			cheatConsole.classList.toggle('cheats');
			if(cheatConsole.classList.contains('cheats')) {
				document.getElementById('inputcheat').focus();
			}
		}
	}

	/*Handles submits from the input field in the cheat cheatconsole
	appends input as <li> to the input history <ul> list*/
	onSubmitHandler = (e) => {
		e.preventDefault();
		appendToCheatHistory(e.target[0].value);
		cheat(e.target[0].value);
		e.target[0].value = "";
	}

	/*Create event listeners for the buttons in the DOM*/
  document.getElementById('hitButton').addEventListener('click', hitButtonHandler);
  document.getElementById('standButton').addEventListener('click', standButtonHandler);
	document.getElementById('startGameButton').addEventListener('click', startGameButtonHandler);
	document.getElementById('cheatform').addEventListener('submit', onSubmitHandler);
	window.addEventListener('keypress', onKeyPressHandler);
};`}

      </Highlight>
    </div>

  </div>
)

export default Blackjack;
