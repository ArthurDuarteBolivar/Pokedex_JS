
function convertPokeApiToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.number = pokeDetail.order
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)    
    const [type] = types
    pokemon.types = types
    pokemon.type =type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

const pokeApi = {}

pokeApi.getPokemons =(offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map((pokemon) => fetch(pokemon.url).then((responseJson) => responseJson.json()
    .then((pokemon) => convertPokeApiToPokemon(pokemon))))) 
    .then((detail) => Promise.all(detail))
    .then((resultado) => resultado)
    .catch((err) => console.error(err))
}