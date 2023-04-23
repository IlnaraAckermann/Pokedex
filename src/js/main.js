const pokemonsList = document.getElementById("pokemonsList");
const loadMoreButton = document.getElementById("loadMoreButton");
const limit = 20;
let offset = 0;

// const count = fetch('https://pokeapi.co/api/v2/pokemon').then((response) => response.json()).then((jsonBody) =>{Number(jsonBody.count); return count;})
// console.log(count)

function loadMorePokemons(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons
      .map(
        (pokemon) => 
          `<li class="pokemon ${pokemon.mainType}">
      <span class="number">#${pokemon.numberID}</span>
      <span class="name">${pokemon.name}</span>
      
      <div class="details">
          <ol class="types">
            ${pokemon.types
              .map((type) => `<li class="type ${type}">${type}</li>`)
              .join("")}
          </ol>
          <img src="${pokemon.imagem}" alt="Foto do Pokemon ${
            pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
          }">
      </div>
  </li>
  `
      )
      .join("");
    pokemonsList.innerHTML += newHtml;
  });
}

loadMoreButton.addEventListener("click", () => {
  offset += limit
  loadMorePokemons(offset, limit);
});

loadMorePokemons(offset, limit);
