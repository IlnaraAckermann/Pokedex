const pokeApi = {};

function convertePokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.numberID = pokeDetail.order;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [mainType] = types;

  pokemon.types = types
  pokemon.mainType = mainType

  pokemon.imagem = pokeDetail.sprites.other.dream_world.front_default;


  pokemon.stats = pokeDetail.stats.map((statSlot)=> statSlot.stat.name);
  pokemon.ability = pokeDetail.abilities.map((abilitySlot)=> abilitySlot.ability.name);
  return pokemon
}

pokeApi.getPokemonsSpecieDetail = (pokemon) => {
  return fetch(pokemon.evolution_chain.url)
    .then((response) => response.json())
  }

pokeApi.getPokemonsDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then ((specieDetail) => specieDetail.map(pokeApi.getPokemonsSpecieDetail))
    .then((specieRequest) => Promise.all(specieRequest))
    .then (convertePokeApiDetailToPokemon);
};

pokeApi.getPokemonsSpecieDetail = (pokemon) => {
    return fetch(pokemon.species.url)
      .then((response) => response.json())
      .then ((evolutionChain) => evolutionChain.map(pokeApi.getPokemonsEvolutionDetail))
      .then((evolutionRequest) => Promise.all(evolutionRequest))
  };

pokeApi.getPokemons = (offset = 0, limit = 20) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}"`;
  return fetch(url)
    .then((response) => response.json()) // arrow function que retorna um response.json
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
    .then((detailRequest) => Promise.all(detailRequest))
    .then((pokemonsDetails) => pokemonsDetails)
    .catch((error) => console.log(error)); // arrow function tratamento de erro
};

