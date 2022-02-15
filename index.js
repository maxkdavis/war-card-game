// API: shuffle the deck - https://deckofcardsapi.com/api/deck/new/shuffle/
// APIL: draw cards -  https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2
//initialize 'deckId' as an undefined varaible. We'll use this to draw cards from the correct deck (row 13)
let deckId;
let computerScore = 0;
let playerScore = 0;
const newDeck = document.getElementById("new-deck");
const drawCards = document.getElementById("draw-cards");
const cardsContainer = document.getElementById("cards-display");
const header = document.getElementById("header");
const cardsRemaining = document.getElementById("cards-remaining");
const computerScoreDisplay = document.querySelector(".computer-score");
const playerScoreDisplay = document.querySelector(".player-score");

//function to fetch a new deck of cards using API url above
function handleClick() {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            cardsRemaining.textContent = `Cards Remaining: ${data.remaining} `;
            computerScoreDisplay.textContent = "Computer: 0";
            playerScoreDisplay.textContent = "You: 0";
            deckId = data.deck_id;
        });
}

//Create a function that extracts the 'value' properties from the two card objects
function determineWinningCard(card1, card2) {
    const cardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"];
    let cardIndexValue1 = cardValues.indexOf(card1.value);
    let cardIndexValue2 = cardValues.indexOf(card2.value);

    if (cardIndexValue1 > cardIndexValue2) {
        computerScoreDisplay.textContent = `Computer: ${(computerScore += 1)}`;
        return "Computer Wins";
    } else if (cardIndexValue1 < cardIndexValue2) {
        playerScoreDisplay.textContent = `You: ${(playerScore += 1)}`;
        return "You Win";
    } else {
        return "WAR!";
    }
}

//get a new deck of cards
newDeck.addEventListener("click", handleClick);

//for each drawn card, put theimage property inside an image element. Also, make sure to draw from the same deck
drawCards.addEventListener("click", () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            cardsContainer.children[0].innerHTML = `
                <img src=${data.cards[0].image} class="card" />
            `;
            cardsContainer.children[1].innerHTML = `
                 <img src=${data.cards[1].image} class="card" />
            `;
            let winningText = determineWinningCard(data.cards[0], data.cards[1]);
            header.textContent = winningText;

            cardsRemaining.textContent = `Cards Remaining: ${data.remaining} `;

            if (data.remaining === 0) {
                drawCards.disabled = true;
                drawCards.textContent = "No Cards Left";
                drawCards.className = "draw-cards empty";

                if (computerScore > playerScore) {
                    header.textContent = "Computers Triumph";
                } else if (computerScore < playerScore) {
                    header.textContent = "Humans Prevail!";
                } else {
                    header.textContent = "It's a Tie.";
                }
            }
        });
});
