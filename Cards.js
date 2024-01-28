$(function () {
  let baseURL = "https://deckofcardsapi.com/api/deck";

  // 1.
  $.getJSON(`${baseURL}/new/draw/`).then((data) => {
    let { s, v } = data.cards[0];
    console.log(`${s} of ${v}`);
  });

  // 2.
  let Card1 = null;
  $.getJSON(`${baseURL}/new/draw/`)
    .then((data) => {
      Card1 = data.cards[0];
      let deckId = data.deck_id;
      return $.getJSON(`${baseURL}/${deckId}/draw/`);
    })
    .then((data) => {
      let Card2 = data.cards[0];
      [Card1, Card2].forEach(function (card) {
        console.log(`${card.value} of ${card.suit}`);
      });
    });

  // 3.
  let deckId = null;
  let $btn = $("button");
  let $cardArea = $("#card-area");

  $.getJSON(`${baseURL}/new/shuffle/`).then((data) => {
    deckId = data.deck_id;
    $btn.show();
  });

  $btn.on("click", function () {
    $.getJSON(`${baseURL}/${deckId}/draw/`).then((data) => {
      let cardSrc = data.cards[0].image;
      let angle = Math.random() * 90 - 45;
      let randomX = Math.random() * 40 - 20;
      let randomY = Math.random() * 40 - 20;
      $cardArea.append(
        $("<img>", {
          src: cardSrc,
          css: {
            transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`,
          },
        })
      );
      if (data.remaining === 0) $btn.remove();
    });
  });
});
