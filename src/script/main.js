const content = document.getElementById("pokemonList");
const btn = document.getElementById("loadMore");
const limit = 5
let offset = 0
const maxLimit = 15

function PokemosView(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}" >
            <span class="number">${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => ` <li class="${type}">${type}</li>`)
                      .join("")} 
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>`;
}

pokeApi
  .getPokemons()
  .then(
    (Pokemons = []) => (content.innerHTML += Pokemons.map(PokemosView).join(""))
  )
  .catch((error) => console.error(error));

function loadPokemonItems(offset, limit) {
  pokeApi
    .getPokemons(offset, limit)
    .then(
      (Pokemons = []) =>
        (content.innerHTML += Pokemons.map(PokemosView).join(""))
    );
}
loadPokemonItems(offset, limit)

btn.addEventListener('click', () => {
    offset += limit
    const newOffset = offset + limit
    if(newOffset >= maxLimit){
        btn.style.display = 'none'
        console.log(offset)
    }
    loadPokemonItems(offset, limit)})