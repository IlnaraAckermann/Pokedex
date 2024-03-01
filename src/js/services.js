import { Pokemon } from "./pokemon-model.js";

class PokeApi {
    baseUrl = 'https://pokeapi.co/api/v2/pokemon'

    convertePokeApiDetailToPokemon(pokeDetail) {
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

    getPokemons = async (offset=0, limit=20) =>{
        const response = await fetch(`${this.baseUrl}?offset=${offset}&limit=${limit}`)
        const data = await response.json()
        this.count = await data.count
        const jsonBody = await data.results
        const pokemons = await Promise.all(jsonBody.map(pokemon => this.getPokemonsDetails(pokemon)))
        return pokemons
}

    getPokemonsDetails = async (pokemon) =>{
        const response = await fetch(pokemon.url)
        const data = await response.json()
        return this.convertePokeApiDetailToPokemon(data)
    }   
    
    searchPokemon = async (name) => {
        // console.log(name);
        const response = await fetch(`${this.baseUrl}/${name}`)     
        const data = await response.json()
        // console.log(data);
        const pkm = await  this.convertePokeApiDetailToPokemon(data)
        // console.log(pkm);
        return pkm
    }
}


export {PokeApi}