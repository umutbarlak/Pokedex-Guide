const pokeContainer = document.querySelector(".poke-container");
const search = document.querySelector(".search");
const searchBtn = document.querySelector(".searchBtn");
const searchInput = document.querySelector(".searchInput");
const warning = document.querySelector(".warning");

const pokemonCount = 151;

const bg_color = {
  grass: "#8BD369",
  fire: "#FF603F",
  water: "#3399FF",
  bug: "#AABB22",
  normal: "#AAAA99",
  flying: "#9AA8FA",
  poison: "#B76EA4",
  electric: "#FFD34E",
  ground: "#E2C56A",
  fairy: "#F1A8EC",
  psychic: "#FF6EA4",
  fighting: "#C56E5C",
  rock: "#C5B679",
  dragon: "#7766EE",
  ice: "#66CCFF",
};

searchBtn.addEventListener("click", () => {
  search.classList.toggle("active");
  searchInput.focus();
  searchInput.value = "";
});

let timer;

searchInput.addEventListener("input", (e) => {
  clearTimeout(timer);
  setTimeout(() => {
    filteredPoke(e);
  }, 1000);
});

function filteredPoke(e) {
  const searchValue = searchInput.value.toLowerCase();
  const pokemonNames = document.querySelectorAll(".poke-name");

  let anyPokemonDisplayed = false;

  pokemonNames.forEach((pokemonName) => {
    if (pokemonName.innerHTML.toLowerCase().includes(searchValue)) {
      pokemonName.parentElement.parentElement.style.display = "block";
      anyPokemonDisplayed = true;
    } else {
      pokemonName.parentElement.parentElement.style.display = "none";
    }

    if (!anyPokemonDisplayed) {
      warning.style.display = "block";
    } else {
      warning.style.display = "none";
    }
  });
  console.log(pokemonNames);
}

const fetchPokemons = async () => {
  for (let i = 1; i < pokemonCount; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();

  creatPokemonCard(data);
};

const creatPokemonCard = (pokemon) => {
  const pokemonDiv = document.createElement("div");

  const pokemonId = pokemon.id.toString().padStart(3, "0");
  const pokemonType = pokemon.types[0].type.name;
  const pokemonBg = bg_color[pokemonType];
  pokemonDiv.style.backgroundColor = `${pokemonBg}`;

  pokemonDiv.classList.add("pokemon");
  pokemonDiv.innerHTML = `
        <div class="image-container">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"
            alt="First Pokemon"
          />
        </div>
        <div class="poke-info">
          <span class="poke-id">#${pokemonId}</span>
          <h3 class="poke-name">${pokemon.name}</h3>
          <div class="small">
            <small class="poke-exp">
              <i class="fa solid fa-flask"></i>
              ${pokemon.base_experience} exp
            </small>
            <small class="poke-weight">
              <i class="fa solid fa-flask"></i>
              ${pokemon.weight} kg
            </small>
          </div>
          <div class="poke-type">
            <i class="fa-brands fa-uncharted"></i>
             ${pokemonType}
          </div>
        </div>
  `;

  pokeContainer.appendChild(pokemonDiv);
};

fetchPokemons();
