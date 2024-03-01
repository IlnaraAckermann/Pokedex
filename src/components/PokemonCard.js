class PokemonCard extends HTMLElement {
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

		componentRoot.setAttribute(
			"class",
			`pokemon ${this.getAttribute("mainType")}`
		);
		// componentRoot.addEventListener("click", () => {
		// 	const namePkm = this.getAttribute("pokemon-name");
		// 	searchByName(namePkm);
		// });

		const pokemonNumber = document.createElement("span");
		pokemonNumber.setAttribute("class", `number`);
		pokemonNumber.textContent =
			"#" + (this.getAttribute("pokemon-number") || "???");

		const pokemonName = document.createElement("span");
		pokemonName.setAttribute("class", `name`);
		pokemonName.textContent = this.getAttribute("pokemon-name") || "???";

		const pokemonDetail = document.createElement("div");
		pokemonDetail.setAttribute("class", `details`);

		const pokemonTypes = document.createElement("ol");
		pokemonTypes.setAttribute("class", `types`);
		pokemonTypes.innerHTML = this.getAttribute("pokemon-types") || "";

		const pokemonImage = document.createElement("img");
		pokemonImage.src =
			this.getAttribute("pokemon-src") ||
			"https://orig00.deviantart.net/0945/f/2011/237/0/8/who__s_that_pokemon__by_amitlu89-d47rmjf.png";
		pokemonImage.alt =
			"Foto do Pokemon " + (this.getAttribute("pokemon-name") || "???");

		pokemonDetail.appendChild(pokemonTypes);
		pokemonDetail.appendChild(pokemonImage);
		componentRoot.appendChild(pokemonNumber);
		componentRoot.appendChild(pokemonName);
		componentRoot.appendChild(pokemonDetail);
		return componentRoot;
	}
	styles() {
		const style = document.createElement("link");
		style.rel = "stylesheet";
		style.href = "./src/css/style-pokemon-card.css";
		return style;
	}
	colors() {
		const style = document.createElement("link");
		style.rel = "stylesheet";
		style.href = "./src/css/pokemon-colors.css";
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
}

customElements.define("pokemon-card", PokemonCard);
