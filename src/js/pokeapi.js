const pokeApi = {};
function convertePokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.numberID = pokeDetail.id;
  pokemon.name = pokeDetail.name;
  const types = pokeDetail.types.map((type) => type.type.name);
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
pokeApi.searchPokemon = (name) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  return pokeApi
    .fetchPokemonData(url)
    .then(convertePokeApiDetailToPokemon)
    .catch((error) => console.log(error));
};




