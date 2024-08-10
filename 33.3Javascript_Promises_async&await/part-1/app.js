let favNum = 5;
let baseURL = "http://numbersapi.com";

// 1.
async function p1() {
  let data = await $.getJSON(`${baseURL}/${favNum}?json`);
  console.log(data);
}
p1();

// 2.
const favNumbers = [7, 11, 22];
async function p2() {
  let data = await $.getJSON(`${baseURL}/${favNum}?json`);
  console.log(data);
}
p2();

// 3.
async function p3() {
  let facts = await Promise.all(
    Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${favNum}?json`))
  );
  facts.forEach(data => {
    $('body').append(`<p>${data.text}</p>`);
  });
}
p3();
