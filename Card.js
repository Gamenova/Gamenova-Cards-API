/**

	DISCLAIMER HERE!!!!!
*/

/**
	Card Class 
	@constructor
*/
function Card(config){

	if(!config)config = {};

	/**
		Card Id 
		@property USed to identify a card
	*/
	this.id = config.id || -1;

	/**
		Symbol
		@property Symbol of the card 1-2-3-J-K-Q-A, etc.
	*/
	this.symbol = config.symbol || "nosymbol";

	/**
		Seed
		@property Seed of the card. Diamond,Spade,Heart,etc
	*/
	this.seed = config.seed || "noseed";

	/**
		Sprite Reference
		@property Reference to the associated Sprite Object to draw the card
	*/
	this.spriteRef = config.spriteRef || null;


}

/**
	Card Combination Class 
	@constructor
*/
function CardCombo(config){

	if(!config)config = {cards:[]};

	/**
		Cards contained in the Deck
		@property An array of card objects
	*/
	this.cards = [];
	if(config.cards != null){

		for(var i=0; i<config.cards.length; i++){

			this.cards.push( new Card(config.cards[i]) );
		}
	};

	/**
		Add a card to the Deck
		@function
		@param {object} card The card to add to the Deck
		@param {number} position The position where to put the card on the deck, default on top.
	*/
	this.addCard = function(card,position){

		if(!card)return;

		if(!position)
			position = 0;


		this.cards.splice(position,0,card);
	};

	/**
		Removes a card from the Deck
		@function
		@param {object} card The card to add to the Deck
	*/
	this.removeCard = function(card){

		if(!card)return;

		for(var position = 0; position < this.cards.length; position++)
		{
			if(this.cards[position] == card)
			{
				this.cards.splice(position,1);
				return card;
			}
		}

		return null;
	};

	/**
		Removes a card from the Deck
		@function
		@param {number} position The position where to put the card on the deck, default on top.
	*/
	this.removeCardAt = function(position){

		if(!position)
			position = 0;

		return this.cards.splice(position,1)[0];
	};



	/**
		Pops a card from the Deck
		@function
	*/
	this.pop = function(){

		return this.removeCard(0);
	}

	/**
		Shuffles the Deck
		@function
	*/
	this.shuffle = function(){

		var cards = this.cards;
		var tempArray = [];
		
		while(cards.length > 0)
		{
			var rndId = Math.floor(Math.random() * cards.length);
			var card = cards.splice(rndId, 1);
			tempArray.push(card[0]);
		}
		this.cards = tempArray;
	}

	/**
		Get the number of cards in the Deck
		@function
	*/
	this.getSize = function(){

		return this.cards.length;
	}

	/**
		Checks if the Deck is empty
		@function
	*/
	this.isEmpty = function(){

		return this.cards.length == 0;
	}
}

/**
	Hand Class 
	@constructor
*/
function Hand(config){

	/**
		Selects and returns a number of cards from the Hand removing them
		@function
		@param {object} indices An array of card indices of the cards to get
	*/
	this.getCards = function(indices){

		var cardSelection = [];

		for(var ik in indices){

			var cardIndex  =  indices[ik];

			var card = this.cards[cardIndex];

			if(card != null)
				cardSelection.push(card);
		}

		return cardSelection;
	};
}
Hand.prototype = new CardCombo();

/**
	Card Combination 
	@constructor

	This is a group of cards
*/
function Deck(){};

Deck.prototype = new CardCombo();

/**
	Rules Class 
	@constructor
*/
function Rules(config){

	/**
		List of rules
	*/
	this.list = config.list == null ? {} : config.list;

	/**
		Adds a rule 
		@function
		@param {object} ruleDef Configuration object for the rule <ruleName,ruleFunc>
	*/
	this.addRule = function(ruleDef){

		if(!ruleDef)ruleDef = {};

		if(ruleDef.ruleName != null && ruleDef.ruleFunc != null ){

			this.list[ruleDef.ruleName] = ruleDef.ruleFunc;
		}
	};

	/**
		Checks a rule
		@function 
		@param {string} ruleName Name of the rule to check
		@param {object} testObj Object conatining the state to be tested
		@return {boolean} true if the rule is verified else false
	*/
	this.checkRule = function(ruleName,testObj){

		if(!ruleName || !testObj)
			return false;

		var rule = this.list[ruleName];

		if(rule){

			return rule(testObj);
		}

		return false;
	};
}

/**
	Table Class 
	@constructor
*/
function Table(config){

	if(!config)config = {};

	/**
		Decks used bythe table
	*/
	this.decks = [];
	if(config.decks != null){

		for(int i=0; i<config.decks.length; i++){

			this.decks.push( new Deck(config.decks[i]) );
		}
	};

	/**
		Rules of the table( game )
	*/
	this.rules = config.rules == null ? new Rules() : new Rules(config.rules);

	/**
		Hands/Players 
	*/
	this.hands = [];
	if(config.hands != null){

		for(int i=0; i<config.hands.length; i++){

			this.hands.push( new Hand(config.hands[i]) );
		}
	};

	/**
		Players choices ( card combos )
	*/
	this.playerChoices = [];
	if(config.playerChoices != null){

		for(int i=0; i<config.playerChoices.length; i++){

			this.playerChoices.push( new CardCombo(config.playerChoices[i]) );
		}
	};

	/**
		Player Data
	*/
	this.playerData = config.playerData == null ? [] : config.playerData;
};
