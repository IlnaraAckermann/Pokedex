const pokemonsList = document.getElementById("pokemonsList");
const pokemonsDetail = document.getElementById("pokemon")
const loadMoreButton = document.getElementById("loadMoreButton");
const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");
const limit = 20;
let offset = 0;
let count = 0;

pokeApi
  .getCount()
  .then(() => {
    count = pokeApi.count;
    loadMorePokemons(offset, limit);

    function loadMorePokemons(offset, limit) {
      pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons
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
            ></pokemon-card>
          `
          )
          .join("");
          pokemonsList.innerHTML = newHtml;
      });
    }

    nextButton.addEventListener("click", () => {
      if (offset + limit < count - limit) {
        offset += limit;
        loadMorePokemons(offset, limit);
      } else if (offset != count - limit) {
        offset = count - limit;
        loadMorePokemons(offset, limit);
      }
    });

    previousButton.addEventListener("click", () => {
      if (offset >= limit) {
        offset -= limit;
        loadMorePokemons(offset, limit);
      } else if (offset != 0) {
        offset = 0;
        loadMorePokemons(offset, limit);
      }
    });
   

  searchButton.addEventListener("click", () => {
      const searchValue = searchInput.value.toLowerCase();
      pokeApi.searchPokemon(searchValue).then((pokemon) => {
        console.log(searchValue)
        console.log(pokemon)
    const newHtml=`
    <pokemon-detail
      mainType="${pokemon.mainType}"
      pokemon-number="${pokemon.numberID}"
      pokemon-name="${pokemon.name}"
      pokemon-src='${pokemon.imagem}'
      pokemon-types='${pokemon.types
                   .map((type) => `<span class="${type}">${type}</span>`)
                   .join("")}'
      pokemon-height='${pokemon.height}'
      pokemon-weight='${pokemon.weight}'
      pokemon-stats='${pokemon.stats
        .map((stat) => `
                <div class="stats-bar">
                    <span>${stat.name}</span>
                    <div class="bar">
                        <div class="fill ${pokemon.mainType}" style="width: ${stat.baseStat}%;">
                        </div>
                    </div>
                </div>`)
        .join("")}'
        pokemon-abilities='${pokemon.abilities
          .map((ability) => `<span>${ability}</span>`)
          .join("")}'
        pokemon-moves='${pokemon.moves
          .map((move) => `<span>${move}</span>`)
          .join("")}'
    >    
    </pokemon-detail>
    `
  pokemonsDetail.innerHTML = newHtml;
  })
  .catch((error) => {
    console.log(error)
  })
  })


  }).catch((error) => console.log(error));
