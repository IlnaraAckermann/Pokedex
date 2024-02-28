class PokemonDetailCard extends HTMLElement {
	constructor() {
		super();

		const shadow = this.attachShadow({ mode: "open" });
		shadow.appendChild(this.reset());
		shadow.appendChild(this.typography());
		shadow.appendChild(this.styles());
		shadow.appendChild(this.colors());
		shadow.appendChild(this.build());
	}
	build() {
		const componentRoot = document.createElement("div");
		componentRoot.setAttribute("class", `pokemonContent`);

		/*-----------imagem ---------------*/
		const imagem = document.createElement("div");
		imagem.setAttribute("class", `imagem`);

		const pokemonImage = document.createElement("img");
		pokemonImage.src =
			this.getAttribute("pokemon-src") ||
			"https://orig00.deviantart.net/0945/f/2011/237/0/8/who__s_that_pokemon__by_amitlu89-d47rmjf.png";
		pokemonImage.alt =
			"Foto do Pokemon " + (this.getAttribute("pokemon-name") || "???");

		const imagemOverlay = document.createElement("div");
		imagemOverlay.setAttribute("class", `imagem-overlay`);

		imagem.appendChild(pokemonImage);
		imagem.appendChild(imagemOverlay);

		/*-----------sideUp ---------------*/
		const sideUp = document.createElement("div");
		sideUp.setAttribute("class", `sideUp ${this.getAttribute("mainType")}`);

		const pokemonNumber = document.createElement("span");
		pokemonNumber.setAttribute("class", `id`);
		pokemonNumber.textContent =
			"#" + (this.getAttribute("pokemon-number") || "???");

		const pokemonName = document.createElement("h2");
		pokemonName.setAttribute("class", `title`);
		pokemonName.textContent = this.getAttribute("pokemon-name") || "???";

		const pokemonTypes = document.createElement("div");
		pokemonTypes.setAttribute("class", `type`);
		pokemonTypes.innerHTML = this.getAttribute("pokemon-types") || "";

		sideUp.appendChild(pokemonNumber);
		sideUp.appendChild(pokemonName);
		sideUp.appendChild(pokemonTypes);

		/*-----------sideDown ---------------*/

		const sideDown = document.createElement("div");
		sideDown.setAttribute("class", `sideDown`);

		/*----------------- metrics -----------------*/
		const metrics = document.createElement("div");
		metrics.setAttribute("class", `metrics`);

		const height = document.createElement("div");
		height.setAttribute("class", `height`);
		const heightTitle = document.createElement("span");
		heightTitle.textContent = "Height";
		const heightValue = document.createElement("span");
		heightValue.textContent = this.getAttribute("pokemon-height") || "???";
		height.appendChild(heightTitle);
		height.appendChild(heightValue);

		const weight = document.createElement("div");
		weight.setAttribute("class", `weigth`);
		const weigthTitle = document.createElement("span");
		weigthTitle.textContent = "Height";
		const weigthValue = document.createElement("span");
		weigthValue.textContent = this.getAttribute("pokemon-weight") || "???";
		weight.appendChild(weigthTitle);
		weight.appendChild(weigthValue);

		metrics.appendChild(height);
		metrics.appendChild(weight);

		/*----------------- stats -----------------*/
		const h3Stat = document.createElement("h3");
		h3Stat.textContent = "Stats";

		const stats = document.createElement("div");
		stats.setAttribute("class", `stats`);
		stats.innerHTML = this.getAttribute("pokemon-stats") || "";

		/*----------------- abilities -----------------*/
		const h3Abilities = document.createElement("h3");
		h3Abilities.textContent = "Abilities";

		const abilities = document.createElement("div");
		abilities.setAttribute("class", `abilities`);
		abilities.innerHTML = this.getAttribute("pokemon-abilities") || "";

		/*----------------- moves -----------------*/

		const h3Moves = document.createElement("h3");
		h3Moves.textContent = "Moves";

		const moves = document.createElement("div");
		moves.setAttribute("class", `moves`);
		moves.innerHTML = this.getAttribute("pokemon-moves") || "";

		sideDown.appendChild(metrics);
		sideDown.appendChild(h3Stat);
		sideDown.appendChild(stats);
		sideDown.appendChild(h3Abilities);
		sideDown.appendChild(abilities);
		sideDown.appendChild(h3Moves);
		sideDown.appendChild(moves);

		componentRoot.appendChild(imagem);
		componentRoot.appendChild(sideUp);
		componentRoot.appendChild(sideDown);

		return componentRoot;
	}

	styles() {
		const style = document.createElement("link");
		style.rel = "stylesheet";
		style.href = "./src/css/cardDetail.css";
		return style;
	}
	reset() {
		const reset = document.createElement("link");
		reset.rel = "stylesheet";
		reset.href = "./src/css/reset.css";
		return reset;
	}
	typography() {
		const style = document.createElement("link");
		style.rel = "stylesheet";
		style.href = "./src/css/typography.css";
		return style;
	}
	colors() {
		const style = document.createElement("link");
		style.rel = "stylesheet";
		style.href = "./src/css/pokemon-colors.css";
		return style;
	}
}

customElements.define("pokemon-detail", PokemonDetailCard);
