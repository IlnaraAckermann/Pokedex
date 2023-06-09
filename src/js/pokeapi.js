const pokeApi = {};
function getCount() {}

function convertePokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.numberID = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);

  const [mainType] = types;

  pokemon.types = types;
  pokemon.mainType = mainType;

  pokemon.imagem = pokeDetail.sprites.other.dream_world.front_default;

  pokemon.weight = pokeDetail.weight;
  pokemon.height = pokeDetail.height;

  const stats = pokeDetail.stats.map((stat) => {
    return {
      baseStat: stat.base_stat,
      name: stat.stat.name,
    };
  });

  pokemon.stats=stats;


  const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);
  pokemon.abilities = abilities; 
  
  const moves = pokeDetail.moves.map((moveSlot) => moveSlot.move.name);
  pokemon.moves = moves; 

  return pokemon;
}

pokeApi.getPokemonsDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertePokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 20) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return fetch(url)
    .then((response) => response.json()) // arrow function que retorna um response.json
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
    .then((detailRequest) => Promise.all(detailRequest))
    .then((pokemonsDetails) => pokemonsDetails)
    .catch((error) => console.log(error)); // arrow function tratamento de erro
};

pokeApi.getCount = () => {
  const url = `https://pokeapi.co/api/v2/pokemon`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      pokeApi.count = data.count;
    })
    .catch((error) => console.log(error));
};

pokeApi.fetchPokemonData = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error));
};

// pokeApi.searchPokemon = (name) => {
//   const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
//   return pokeApi
//     .fetchPokemonData(url)
//     .then((data) => {
//       const pokemon = new Pokemon();
//       pokemon.numberID = data.id;
//       pokemon.name = data.name;
//       pokemon.types = data.types.map((typeSlot) => typeSlot.type.name);
//       pokemon.mainType = pokemon.types[0];
//       pokemon.imagem = data.sprites.other.dream_world.front_default;
//       return pokemon;
//     })
//     .catch((error) => {
//       console.log(error);
//       return null;
//     });
// };

pokeApi.searchPokemon = (name) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  return pokeApi
    .fetchPokemonData(url)
    .then(convertePokeApiDetailToPokemon)
    .catch((error) => {
      console.log(error);
      return null;
    });
};



const pokemonCards = pokemonsList.getElementsByTagName('pokemon-card');
console.log(pokemonCards)
console.log("pokemonCards.length : " + pokemonCards.length)
const nodeArray = pokemonsList.querySelectorAll('pokemon-card')
console.log("nodeArray " + nodeArray)


for (let card of pokemonCards ) {
  console.log("card: " + card)
}

// elementsArray.forEach((card) => {  
// console.log(card)
//   card.addEventListener('click', () => {
//     const searchValue = card.getAttribute('pokemon-name').toLowerCase();
//     pokeApi.searchPokemon(searchValue)
//       .then((pokemon) => {
//         console.log(searchValue);
//         console.log(pokemon);
//         const newHtml = `
//           <pokemon-detail
//             mainType="${pokemon.mainType}"
//             pokemon-number="${pokemon.numberID}"
//             pokemon-name="${pokemon.name}"
//             pokemon-src="${pokemon.imagem}"
//             pokemon-types="${pokemon.types
//               .map((type) => `<span class="${type}">${type}</span>`)
//               .join('')}"
//             pokemon-height="${pokemon.height}"
//             pokemon-weight="${pokemon.weight}"
//             pokemon-stats="${pokemon.stats
//               .map(
//                 (stat) => `
//                   <div class="stats-bar">
//                     <span>${stat.name}</span>
//                     <div class="bar">
//                       <div class="fill ${pokemon.mainType}" style="width: ${stat.baseStat}%;">
//                       </div>
//                     </div>
//                   </div>`
//               )
//               .join('')}"
//             pokemon-abilities="${pokemon.abilities
//               .map((ability) => `<span>${ability}</span>`)
//               .join('')}"
//             pokemon-moves="${pokemon.moves
//               .map((move) => `<span>${move}</span>`)
//               .join('')}"
//           >
//           </pokemon-detail>
//         `;
//         pokemonsDetail.innerHTML = newHtml;
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   });
// });


function funcao(array) {
  let acc = 0;

  for (let elemento of array) {
    acc += elemento;
  }

  return (acc / array.length);
}

console.log(funcao([4, 6, 4, 2]));
