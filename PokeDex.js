// get the id from the html.
const pokedex = document.getElementById("pokedex");
const searchBar = document.getElementById('searchBar');
// create an empty {} to store and display pokemon
const pokeStore = {};
// create an empty list to store data for search
// reference: https://www.youtube.com/watch?v=wxz5vJ1BWrc
let pokemondata = [];

searchBar.addEventListener('keyup', (e) => {
    // gather user input for pokemon name in pokemondata list.
    const searchString = e.target.value.toLowerCase();
    const searchNumber = e.target.value.toString();
    // display the output of the user input in console for debugging.
    console.log(searchString);
    console.log(searchNumber);
    // if searchStr is H -> h
    // if searchStr is h -> H
    const filterList = pokemondata.filter((pokeman) => {
         // convert name to lowercase and then compare
        return pokeman.name.toLowerCase().includes(searchString)
        || pokeman.id.toString().includes(searchNumber);
    });
    // display the filterList data to homepage
    displayPokemonData(filterList);
});
// calling an method for PokeDex API convert Data to JSON.
const fetchPokemonData = async() => {
    try{
        const url = `https://pokeapi.co/api/v2/pokemon?limit=151`;
        const res = fetch(url);
        const data = await (await res).json();
        pokemondata = data.results.map((result, index) =>
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
    };
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
    const ability = pokeman.abilities.map((ability) => ability.ability.name).join(', ');
    const image = pokeman.sprites['front_default'];
    const htmlstring = `
    <div class ="popup">
        <button id="closeBtn" onclick="closePopup()"> Close </button>
        <div class="card">
            <img class = "card-image" src="${image}" />
            <h2 class ="card-title">${pokeman.id}.${pokeman.name}</h2>
            <p><small>Height: </small><br>${pokeman.height}
            <br><small>Weight: </small><br>${pokeman.weight}
            <br><small>Type: </small><br>${type}
            <br><small>Ability: </small><br>${ability}
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


// call an method to display fetchPokemonData
fetchPokemonData();