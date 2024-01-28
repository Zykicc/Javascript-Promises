let favNumber = 28;
let baseURL = "http://numbersapi.com";

$.getJSON(`${baseURL}/${favNumber}?json`).then((data) => {
  console.log(data);
});

let MultipleNumbers = [2, 8, 6];
$.getJSON(`${baseURL}/${MultipleNumbers}?json`).then((data) => {
  console.log(data);
});

// 3.
Promise.all(
  Array.from({ length: 4 }, () => {
    return $.getJSON(`${baseURL}/${favNumber}?json`);
  })
).then((facts) => {
  facts.forEach((data) => $("body").append(`<p>${data.text}</p>`));
});
