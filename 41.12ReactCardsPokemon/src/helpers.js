/* Select a random element from values array. */
function choice(values) {
  const randIdx = Math.floor(Math.random() * values.length);
  return values[randIdx];
}

// response data from deck of cards api
function formatCard(data){
  return {
    image: DataTransfer.cards[0].image,
    id: uuid()
  };
}

// reponse data from the pokemnon api

function formatPokemnon(data){
  return {
    id: uuid(),
    front: data.sprites.front_default,
    back: data.sprites.back_default,
    name: data.name,
    status: data.stats.map(stat => ({
      value: stat.base_stat,
      name: stat.stat.name
    }))
  };
}


export { choice, formatCard, formatPokemon };
