const limit = 20;
let offset = 0;
const pokeApi = new PokeApi();
const pokemonsDetail = document.getElementById("pokemon");



async function searchByName(searchValue) {
	searchValue = searchInput.value.toLowerCase();
	pokemon = await pokeApi.searchPokemon(searchValue);
	const newHtml = `
  <button id="close" onclick="loadMorePokemons()"> X </button>
  <pokemon-detail
    mainType="${pokemon.mainType}"
    pokemon-number="${pokemon.numberID}"
    pokemon-name="${pokemon.name}"
    pokemon-height='${pokemon.height}'
    pokemon-weight='${pokemon.weight}'
    pokemon-src='${pokemon.imagem}'
    pokemon-types='${pokemon.types
			.map((type) => `<span class="${type}">${type}</span>`)
			.join("")}'
    pokemon-stats='${pokemon.stats
			.map(
				(stat) => `
              <div class="stats-bar">
                  <span>${stat.name}</span>
                  <div class="bar">
                      <div class="fill ${pokemon.mainType}" style="width: ${stat.baseStat}%;">
                      </div>
                  </div>
              </div>`
			)
			.join("")}'
      pokemon-abilities='${pokemon.abilities
				.map((ability) => `<span>${ability}</span>`)
				.join("")}'
      pokemon-moves='${pokemon.moves
				.map((move) => `<span>${move}</span>`)
				.join("")}'
  >
  </pokemon-detail>
  `;
	pokemonsDetail.innerHTML = newHtml;
}


async function loadMorePokemons(offset, limit) {
	pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
		const newHtml =
			`<div class="search">
      <input type="text" id="searchInput" placeholder="Procure o Pokémon">
      <button id="searchButton" onclick="searchByName()">Search</button>
      </div>
      <div class="pokemons" id="pokemonsList">` +
			pokemons
				.map(
					(pokemon) =>
						` 
          <pokemon-card          
          mainType="${pokemon.mainType}"
          pokemon-number="${pokemon.numberID}"
          pokemon-name="${pokemon.name}"
          pokemon-src='${pokemon.imagem}'
          pokemon-types='${pokemon.types
						.map((type) => `<li class="type ${type}">${type}</li>`)
						.join("")}'
            )"></pokemon-card>
          `
				)
				.join("") +
			`</div>
          <div class="pagination" id="btnPagination">
          <button onclick="previous()"> Previous </button>
          <button onclick="next()"> Next </button>
          </div>`;
		pokemonsDetail.innerHTML = newHtml;

        // const pokemonCards = document.querySelectorAll("pokemon-card");
       
        // console.log(pokemonCards);
    
        //     pokemonCards.forEach((card) => {
        //         card.addEventListener("click", () => {
        //             const pokemonName = card.getAttribute("pokemon-name");
        //             console.log(pokemonName);
        //             console.log(searchByName(pokemonName))
        //             searchByName(pokemonName);
        //             console.log('sda');
        //         });
        //     });
	});
}
function next() {
	if (offset + limit < pokeApi.count - limit) {
		offset += limit;
		loadMorePokemons(offset, limit);
	} else if (offset != pokeApi.count - limit) {
		offset = pokeApi.count - limit;
		loadMorePokemons(offset, limit);
	}
}
function previous() {
	if (offset >= limit) {
		offset -= limit;
		loadMorePokemons(offset, limit);
	} else if (offset != 0) {
		offset = 0;
		loadMorePokemons(offset, limit);
	}
}

loadMorePokemons(offset, limit);