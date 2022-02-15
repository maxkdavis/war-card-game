/* 
Challenge: Add a button that, when clicked, gets a new deck of cards from the deckofcards API
URL: https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/
*/
const newDeck = document.querySelector(".new-deck");

newDeck.addEventListener("click", () => {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        });
});

//When we request to draw cards from the API, the API needs to know from which deck.
//We need to initalize an empty string which can then store the 'deck_id' from the API request
let deckId;

newDeck.addEventListener("click", () => {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then((response) => response.json())
        .then((data) => {
            deckId = data.deck_id;
            console.log(deckId);
        });
});

//simplify the above code so that the click event can be stored in a function
function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then((response) => response.json())
        .then((data) => {
            deckId = data.deck_id;
            console.log(deckId);
        });
}

//insert the function as the second argument in our new deck click event listner
newDeck.addEventListener("click", handleClick);

/*
A second button was added to index.html. We'll target that button, which we'll use to draw 
two cards from our initalized deck (deck_id)
 */

//draw two cards from the same deck
drawCards.addEventListener("click", () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data.cards.image);
        });
});

// //add the two returned images into image elements and add them to the newly created <div>
// const cards = document.querySelector('.cards');
// cards.

//get a new deck of cards
newDeck.addEventListener("click", handleClick);

//for each drawn card, take the image property and put it inside an image element
//draw two cards from the same deck
drawCards.addEventListener("click", () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then((response) => response.json())
        .then((data) => {
            cardOne.src = data.cards[0].image;
            document.getElementById("cards-display").firstElementChild.innerContent = cardOne;
            cardTwo.src = data.cards[1].image;
        });
    // cardContainer.innerContent = cardOne + cardTwo;
});
