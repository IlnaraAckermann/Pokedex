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
  // pokemon.imagem = pokeDetail.sprites.versions["generation-v"]["black-white"].animated.front_default;
  return pokemon;
}

pokeApi.getPokemonsDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertePokeApiDetailToPokemon);
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
}

pokeApi.searchPokemon = (name) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  return pokeApi.fetchPokemonData(url)
    .then((data) => {
      const pokemon = new Pokemon()
      pokemon.numberID = data.id
      pokemon.name = data.name
      pokemon.types = data.types.map((typeSlot) => typeSlot.type.name)
      pokemon.mainType = pokemon.types[0]
      pokemon.imagem = data.sprites.other.dream_world.front_default
      return pokemon
    })
    .catch((error) => {
      console.log(error)
      return null
    });
}