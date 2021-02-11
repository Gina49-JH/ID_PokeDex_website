/* Building pokeDex valina method part 1: https://www.youtube.com/watch?v=T-VQUKeSU1w&ab_channel=JamesQQuick
                                  part 2: https://www.youtube.com/watch?v=L0pPRauLP2E&t=1126s&ab_channel=JamesQQuick */
const pokedex = document.getElementById("pokedex");
const searchBar = document.getElementById('searchBar');
const pokeStore = {}

const fetchPokemonData = async() => {
    try{
        const url = `https://pokeapi.co/api/v2/pokemon`;
        const res = fetch(url);
        const data = await (await res).json();
        const pokemondata = data.results.map((result, index) =>
        ({
            ...result,
            name : result.name,
            id : index + 1,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
        }));
    console.log(data.results);
    displayPokemonData(pokemondata);
    }
    catch(err){
        console.log(err);
    }
};

const displayPokemonData = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon
        .map((pokeman) => {
        return`
        <li class ="card" onclick="selectPokemon(${pokeman.id})">
        <img class = "card-image" src="${pokeman.image}" />
        <h2 class ="card-title">${pokeman.id}.${pokeman.name}</h2>
        </li>
        `
        })

    .join('');
    pokedex.innerHTML = pokemonHTMLString;
}

const selectPokemon = async(id) => {
   if(!pokeStore[id])
   {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokeman  =  await res.json();
    pokeStore[id] = pokeman;
    console.log(pokeStore);
   }
    displayPopup(pokeStore[id]);
};

const displayPopup = (pokeman) => {
    const type = pokeman.types.map((type) => type.type.name).join(', ');
    const image = pokeman.sprites['front_default'];
    const htmlstring = `
    <div class ="popup">
        <button id="closeBtn" onclick="closePopup()"> Close </button>
        <div class="card">
            <img class = "card-image" src="${image}" />
            <h2 class ="card-title">${pokeman.id}.${pokeman.name}</h2>
            <p><small>Height: </small>${pokeman.height} 
            | <small>Weight: </small>${pokeman.weight}
            | <small>Type: </small>${type}
        </div>
    </div>
    `
    pokedex.innerHTML = htmlstring + pokedex.innerHTML;
    console.log(htmlstring);
};

const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
}



fetchPokemonData();