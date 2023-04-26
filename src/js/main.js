const pokemonsList = document.getElementById("pokemonsList");
const loadMoreButton = document.getElementById("loadMoreButton");
const limit = 20;
let offset = 0;




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
      .join('');
    pokemonsList.innerHTML += newHtml;
  });
}

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  loadMorePokemons(offset, limit);
});

loadMorePokemons(offset, limit);


