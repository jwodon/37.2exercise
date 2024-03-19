$(document).ready(function () {
    // Step 1: Draw a single card from a new deck
    fetchCard('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
        .then((card) => console.log(`Step 1: ${card.value} of ${card.suit}`))
        .catch((error) => console.error('Error fetching card:', error));

    // Step 2: Draw two cards from the same deck
    fetchCard('https://deckofcardsapi.com/api/deck/new/draw/?count=2')
        .then((cards) => {
            console.log(`Step 2 - Card 1: ${cards[0].value} of ${cards[0].suit}`);
            console.log(`Step 2 - Card 2: ${cards[1].value} of ${cards[1].suit}`);
        })
        .catch((error) => console.error('Error fetching cards:', error));

    // Step 3: Draw cards from a deck on button click
    let deckId;
    fetch('https://deckofcardsapi.com/api/deck/new/')
        .then((response) => response.json())
        .then((data) => {
            deckId = data.deck_id;
            $('#draw-card').show().on('click', drawCard);
        })
        .catch((error) => console.error('Error creating new deck:', error));

    function drawCard() {
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
            .then((response) => response.json())
            .then((data) => {
                if (data.cards.length > 0) {
                    const card = data.cards[0];
                    $('#card-display').append(`<p>${card.value} of ${card.suit}</p>`);
                } else {
                    $('#draw-card').hide();
                    $('#card-display').append('<p>No cards left in the deck</p>');
                }
            })
            .catch((error) => console.error('Error drawing card:', error));
    }

    function fetchCard(url) {
        return fetch(url)
            .then((response) => response.json())
            .then((data) => data.cards)
            .catch((error) => console.error('Error fetching cards:', error));
    }
});
