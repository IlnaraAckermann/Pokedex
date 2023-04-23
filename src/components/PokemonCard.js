class PokemonCard extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(this.style());
    shadow.appendChild(this.build());
  }
  build() {
    const componentRoot = document.createElement("li");
    componentRoot.setAttribute(
      "class", `pokemon ${this.getAttribute("mainType")}` );

    const pokemonNumber = document.createElement("span");
    pokemonNumber.setAttribute("class", `number`);
    pokemonNumber.textContent="#" + (this.getAttribute("pokemon-number") || "???")

    const pokemonName = document.createElement("span");
    pokemonName.setAttribute("class", `name`);
    pokemonName.textContent =this.getAttribute("pokemon-name") || "???";

    const pokemonDetail = document.createElement("div");
    pokemonDetail.setAttribute("class", `details`);

    const pokemonTypes = document.createElement("ol");
    pokemonTypes.setAttribute("class", `types`);
    pokemonTypes.innerHTML = this.getAttribute("pokemon-types") || "";

    const pokemonImage = document.createElement("img");
    pokemonImage.src=(this.getAttribute('pokemon-src')) || "https://orig00.deviantart.net/0945/f/2011/237/0/8/who__s_that_pokemon__by_amitlu89-d47rmjf.png"
    pokemonImage.alt =
      "Foto do Pokemon " + (this.getAttribute("pokemon-name") || "???");

    pokemonDetail.appendChild(pokemonTypes);
    pokemonDetail.appendChild(pokemonImage);
    componentRoot.appendChild(pokemonNumber);
    componentRoot.appendChild(pokemonName);
    componentRoot.appendChild(pokemonDetail);
    return componentRoot;
  }
  style() {
    const style = document.createElement("style");
    style.textContent = `

.normal {
    background-color:#a1b281 ;
}

.fire {
    background-color:#ff8838;
}

.water {
    background-color: #0984e3;
}

.grass {
    background-color: #05c46b;
}

.flying {
    background-color: #c178f5;
}

.fighting {
    background-color: #b33939;
}

.poison {
    background-color: #a45ce7;
}

.electric {
    background-color:#ffd32a;
}

.ground {
    background-color: #e3b153;
}

.rock {
    background-color: #675327;
}

.psychic {
    background-color: #e63c8b;
}

.ice {
    background-color: #17c0eb;
}

.bug {
    background-color:#a5ce00;
}

.ghost {
    background-color: #574b90;
}

.steel {
    background-color: #808e9b;
}

.dragon {
    background-color:  #8165ff;
}

.dark {
    background-color: #483c18;
}

.fairy {
    background-color: #f7a4cf;
}
     
ol { 
    list-style: none;
}

li.pokemon { 
    display: flex;
    flex-direction: column;
    margin: 8rem;
    padding: 16rem;
    border-radius: 16rem;
    transition: 0.3s ease-in-out;
}
li.pokemon:hover {
 transform: scale(1.05);
 filter: brightness(1.1);
}

.number {
    align-self: flex-end;
    font-weight: 500;
}

.name {
    font-weight: 700;
    font-size: 24rem;
    text-transform: capitalize;
}

.type {
    border-radius: 15rem;
    padding: 3rem;
    width: 70rem;
    margin: 5rem 0;
    text-align: center;    
    text-transform: capitalize;    
    filter: brightness(1.25);
}

.details {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

img {
    max-width: 100rem;
    height: 100rem;
    align-self: flex-end;
}
        
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

a {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
}
`;

    return style;
  }
}

customElements.define("pokemon-card", PokemonCard);
