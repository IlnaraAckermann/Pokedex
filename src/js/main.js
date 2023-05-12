const pokemonsList = document.getElementById("pokemonsList");
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
   
    // searchButton.addEventListener("click", () => {
    //   const searchValue = searchInput.value.toLowerCase();
    //   const searchUrl = `https://pokeapi.co/api/v2/pokemon/${searchValue}`;
    //   fetch(searchUrl)
    //     .then((response) => response.json())
    //     .then((data) => {
    //       const pokemon = convertePokeApiDetailToPokemon(data);
    //       const newHtml = `
    //         <pokemon-card
    //         mainType="${pokemon.mainType}"
    //         pokemon-number="${pokemon.numberID}"
    //         pokemon-name="${pokemon.name}"
    //         pokemon-src='${pokemon.imagem}'
    //         pokemon-types='${pokemon.types
    //           .map((type) => `<li class="type ${type}">${type}</li>`)
    //           .join("")}'
    //           ></pokemon-card>
    //         `;
    //       pokemonsList.innerHTML = newHtml;
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       pokemonsList.innerHTML = `<p>No Pokémon found for "${searchValue}"</p>`;
    //     });
    // });
      


    

  searchButton.addEventListener("click", () => {
      const searchValue = searchInput.value.toLowerCase();
      pokeApi.searchPokemon(searchValue).then((pokemon) => {
    const newHtml = `
            <pokemon-card
            mainType="${pokemon.mainType}"
            pokemon-number="${pokemon.numberID}"
            pokemon-name="${pokemon.name}"
            pokemon-src='${pokemon.imagem}'
            pokemon-types='${pokemon.types
              .map((type) => `<li class="type ${type}">${type}</li>`)
              .join("")}'
              ></pokemon-card>
            `;
  pokemonsList.innerHTML = newHtml;
  })
  .catch((error) => {
    console.log(error)
  })
  })


  }).catch((error) => console.log(error));
