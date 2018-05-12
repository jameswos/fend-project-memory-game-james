/*
 * Create a list that holds all of your cards
 */

/*jshint esversion: 6 */

let cards = [
  'fa fa-diamond',
  'fa fa-paper-plane-o',
  'fa fa-anchor',
  'fa fa-bolt',
  'fa fa-cube',
  'fa fa-anchor',
  'fa fa-leaf',
  'fa fa-bicycle',
  'fa fa-diamond',
  'fa fa-bomb',
  'fa fa-leaf',
  'fa fa-bomb',
  'fa fa-bolt',
  'fa fa-bicycle',
  'fa fa-paper-plane-o',
  'fa fa-cube'
];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

document.addEventListener("DOMContentLoaded", function(event) {
  event.preventDefault();
  shuffle(cards);
  shuffledDeck();
});

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function shuffledDeck() {
  const cardList = document.querySelectorAll('#play');
  const lengthList = cardList.length;
  for (i = lengthList - 1; i >= 0; i--) { // Cycles through node list created from cardList
    for (let card of cards) {
      cardList[i].className = cards[i]; // Sets the class name from the cards array (after being shuffled of course!)
    }
  }
}

document.addEventListener('click', flipCard);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let flippedCards = [];
let matchedCards = [];

function flipCard() {
  if (event.target.classList.contains('card')) {
    showCard();
    addMoves();
    starRating();
  }
  // if the list already has another card, check to see if the two cards match
  if (flippedCards.length == 2) {
    checkForMatch();
  }
}

// display the card's symbol
function showCard() {
  if (flippedCards.length < 2) {
    event.target.classList.add('open', 'show');
    // adds the card to a *list* of "open" cards
    flippedCards.push(event.target);
  }
}

// checks to see if the two cards match
function checkForMatch() {
  // if the cards do match, cards lock in the open position
  if (flippedCards[0].firstElementChild.className === flippedCards[1].firstElementChild.className) {
    for (const flippedCard of flippedCards) {
      flippedCard.classList.replace('show', 'match');
      matchedCards.push(flippedCard);
      flippedCards = [];
    }
  } else {
    badGuess();
    setTimeout(function() {
      hideCards();
    }, 750);
  }
}

// shows player that the cards don't match
function badGuess() {
  for (let flippedCard of flippedCards) {
    flippedCard.classList.add('wrong');
  }
}

// if the cards do not match, remove the cards from the list and hide the card's symbol
function hideCards() {
  for (const flippedCard of flippedCards) {
    flippedCard.classList.remove('open', 'show', 'wrong');
    flippedCards = [];
  }
}

// increment the move counter and display it on the page
let count = 0;

function addMoves() {
  const showMoves = document.querySelector('.moves');
  count++;
  showMoves.innerHTML = count;
}

// sets criteria for star rating based on total moves
function starRating() {
  const threeStars = document.getElementById('first-star');
  const twoStars = document.getElementById('second-star');
  const oneStar = document.getElementById('third-star');
  if (count >= 16 && count <= 25) {
    threeStars.firstElementChild.classList.remove('fa-star');
  } else if (count >= 26 && count <= 35) {
    twoStars.firstElementChild.classList.remove('fa-star');
  } else if (count > 35) {
    oneStar.firstElementChild.classList.remove('fa-star');
  }
}