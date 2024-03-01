const screen = {
	pokemonsDetail: document.getElementById("pokemon"),
	renderPokemons(pokemons) {
		this.pokemonsDetail.innerHTML =
    `
    <div class="pokemons" id="pokemonsList">
    ` +
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
      `).join("") + 
    `    
    </div>
		
          <div class="pagination" id="btnPagination">
              <button id="previous"> Previous </button>
              <button id="next"> Next </button>
          </div>`
  },
	renderDetails(pokemon) {
		this.pokemonsDetail.innerHTML = `
            <button id="close"> X </button>
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
	},
};

export { screen }