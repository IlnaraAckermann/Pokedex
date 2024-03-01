const limit = 20;
let offset = 0;
const pokeApi = new PokeApi();
import { screen } from "./screens.js";
import { PokeApi } from "./services.js";
// const pokemonsDetail = document.getElementById("pokemon");
const searchBarButton = document.getElementById('searchButton')

searchBarButton.addEventListener('click', searchBar)

async function loadMorePokemons(offset, limit) {
	const pokemons = await pokeApi.getPokemons(offset, limit);
	screen.renderPokemons(pokemons);
	const cards = document.querySelectorAll(`pokemon-card `);

	cards.forEach((card) => {
		card.addEventListener("click", () => {
			const namePkm = card.getAttribute("pokemon-name");
			console.log(namePkm);
			searchByName(namePkm);
		});

		const btnNext = document.getElementById("next");
		const btnPrevious = document.getElementById("previous");
		btnNext.addEventListener("click", next);
		btnPrevious.addEventListener("click", previous);
	});
}

function next() {
	if (offset + limit < pokeApi.count - limit) {
		offset += limit;
		loadMorePokemons(offset, limit);
	} else if (offset != pokeApi.count - limit) {
		offset = pokeApi.count - limit;
		loadMorePokemons(offset, limit);
	}
}
function previous() {
	if (offset >= limit) {
		offset -= limit;
		loadMorePokemons(offset, limit);
	} else if (offset != 0) {
		offset = 0;
		loadMorePokemons(offset, limit);
	}
}

function searchBar(searchValue) {
	searchValue = searchInput.value;
	searchByName(searchValue);
}
async function searchByName(searchValue) {
	searchValue = searchValue.toLowerCase();
	const pokemon = await pokeApi.searchPokemon(searchValue);
	screen.renderDetails(pokemon);
	const close = document.getElementById('close')
	close.addEventListener('click', ()=>loadMorePokemons(offset, limit))
}

loadMorePokemons(offset, limit);
