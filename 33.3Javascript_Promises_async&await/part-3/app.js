$(function() {
  let baseURL = "https://pokeapi.co/api/v2";

  // 1.
  async function p1() {
    let data = await $.getJSON(`${baseURL}/pokemon/?limit=1000`);
    console.log(data);
  }

  // 2.
  async function p2() {
    let allData = await $.getJSON(`${baseURL}/pokemon/?limit=1000`);
    let randPokemonUrls = [];
    for (let i = 0; i < 3; i++) {
      let randomIdx = Math.floor(Math.random() * allData.results.length);
      let url = allData.results.splice(randomIdx, 1)[0].url;
      randPokemonUrls.push(url);
    }
    let pokeData = await Promise.all(
      randPokemonUrls.map(url => $.getJSON(url))
    );
    pokeData.forEach(p => console.log(p));
  }

  // 3.
  async function p3() {
    let allData = await $.getJSON(`${baseURL}/pokemon/?limit=1000`);
    let randPokemonUrls = [];
    for (let i = 0; i < 3; i++) {
      let randIdx = Math.floor(Math.random() * allData.results.length);
      let url = allData.results.splice(randIdx, 1)[0].url;
      randPokemonUrls.push(url);
    }
    let pokeData = await Promise.all(
      randPokemonUrls.map(url => $.getJSON(url))
    );
    let speciesData = await Promise.all(
      pokeData.map(p => $.getJSON(p.species.url))
    );
    descriptions = speciesData.map(d => {
      let descriptionObj = d.flavor_text_entries.find(
        entry => entry.language.name === "en"
      );
      return descriptionObj
        ? descriptionObj.flavor_text
        : "No description available.";
    });
    descriptions.forEach((desc, i) => {
      console.log(`${pokeData[i].name}: ${desc}`);
    });
  }

  // 4.
  let $btn = $("button");
  let $pokeArea = $("#pokemon-area");

  $btn.on("click", async function() {
    $pokeArea.empty();
    let allData = await $.getJSON(`${baseURL}/pokemon/?limit=1000`);
    let randPokemonUrls = [];
    for (let i = 0; i < 3; i++) {
      let randomIdx = Math.floor(Math.random() * allData.results.length);
      let url = allData.results.splice(randomIdx, 1)[0].url;
      randPokemonUrls.push(url);
    }
    let pokeData = await Promise.all(
      randPokemonUrls.map(url => $.getJSON(url))
    );
    let speciesData = await Promise.all(
      pokeData.map(p => $.getJSON(p.species.url))
    );
    speciesData.forEach((d, i) => {
      let descriptionObj = d.flavor_text_entries.find(function(entry) {
        return entry.language.name === "en";
      });
      let description = descriptionObj ? descriptionObj.flavor_text : "";
      let name = pokeData[i].name;
      let imgSrc = pokeData[i].sprites.front_default;
      $pokeArea.append(makePokeCard(name, imgSrc, description));
    });
  });

  function makePokeCard(name, imgSrc, description) {
    return `
      <div class="card">
        <h1>${name}</h1>
        <img src=${imgSrc} />
        <p>${description}</p>
      </div>
    `;
  }
});
