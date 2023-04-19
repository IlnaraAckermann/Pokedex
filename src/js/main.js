// function convertPokemonTypesToHTML(pokemonTypes) {
//     return pokemonTypes.map((typeSlot) =>  `<li class="type">${typeSlot.type.name}</li>`)
// }

function convertPokemonToHTML(pokemon) {
  return `
    <li class="pokemon ${pokemon.mainType}">
    <span class="number">#${pokemon.numberID}</span>
    <span class="name">${
      pokemon.name}</span>
    
    <div class="details">
        <ol class="types">
        ${pokemon.types.map((type) =>  `<li class="type ${type}">${type}</li>`).join('')}
        </ol>
        <img src="${pokemon.imagem}" alt="Foto do Pokemon ${
          pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
        }">
    </div>
</li>
`
}

const pokemonsList = document.getElementById("pokemonsList");

pokeApi.getPokemons().then((pokemons = []) => {
    pokemonsList.innerHTML = pokemons.map(convertPokemonToHTML).join('')
})
