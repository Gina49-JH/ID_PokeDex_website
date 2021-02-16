// create a variable to get the id from the html.
const pokedex = document.getElementById("pokedex");
// create a variable to get the id from the html
const searchBar = document.getElementById('searchBar');
document.getElementById('searchBar').value = '';
// create an empty {} to store and display pokemon
const pokeStore = {};
// create an empty list to store data for search
// reference: https://www.youtube.com/watch?v=wxz5vJ1BWrc
let pokemondata = [];

// addEventListener to track user input
searchBar.addEventListener('keyup', (e) => {
    $('#searchBar').val = '';
    // gather user input for pokemon name in pokemondata list.
    const searchString = e.target.value.toLowerCase();
    // gather user input for pokemon number in pokemondata list.
    const searchNumber = e.target.value.toString();
    // display the output of the user input in console for debugging in console.
    // name of the pokemon
    console.log(searchString);
    // number of the pokemon index
    console.log(searchNumber);
    // variable to filiter specific types of data inside pokemondata
    const filterList = pokemondata.filter((pokeman) => {
         // convert name inside pokemondata to lowercase and then compare if data is found inside.
         return pokeman.name.toLowerCase().includes(searchString)
         // convert numbers inside pokemondata and then compare if data is found inside.
         || pokeman.id.toString().includes(searchNumber);
    });
    // display the filterList data to method called displayPokemonData
    displayPokemonData(filterList);
});
// calling an method for PokeDex API convert Data to JSON.
const fetchPokemonData = async() => {
    try{
        // create a variable(url) to store api url link
        const url = `https://pokeapi.co/api/v2/pokemon?limit=898`;
        //hide the loader when everything is finished loading
        window.addEventListener("load", function () {
            const loader = document.querySelector(".loader");
            loader.className += " hidden"; // class "loader hidden"
        });
        // create a variable(res) to fetch the data from the variable url.
        const res = fetch(url);
        // fetch the res from the url and convert to JSON Format.
        const data = await (await res).json();
        // using variable(pokemondata) to map data and store into an array.
        pokemondata = data.results.map((result, index) =>
        ({
            ...result,
            name : result.name,
            id : index + 1,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
        }));
    // display the output of the pokemondata for debugging in console
    console.log(data.results);
    // call a method displayPokemonData to display pokemonData.
    displayPokemonData(pokemondata);
    }
    // display an error message if the data cannot be found.
    catch(err){
        console.log(err);
    };
};
//
const displayPokemonData = (pokemon) => {
    //  display the output of the pokemon in displayPokemonData method for debugging in console
    console.log(pokemon);
    //
    const pokemonHTMLString = pokemon
        .map((pokeman) => {
        return`
        <li class ="card" onclick="selectPokemon(${pokeman.id})">
        <img class = "card-image" src="${pokeman.image}" />
        <h2 class ="card-title">#${pokeman.id}<br>${pokeman.name}</h2>
        </li>
        `
        })

    .join('');
    pokedex.innerHTML = pokemonHTMLString;
}
//
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



// create a variable to retrieve the pokemon data and display in html.
const displayPopup = (pokeman) => {
    // 
    const type = pokeman.types.map((type) => type.type.name).join(', ');
    //
    const ability = pokeman.abilities.map((ability) => ability.ability.name).join(', ');
    //
    const image = pokeman.sprites['front_default'];
    //
    //const test = pokeman.species['url'];
    const htmlstring = `
    <div class ="popup">
        <button id="closeBtn" onclick="closePopup()"> Close </button>
        <div class="card">
            <img class = "card-image" src="${image}" />
            <h2 class ="card-title">#${pokeman.id} ${pokeman.name}</h2>
            <p><small>Height: </small><br>${pokeman.height}
            <br><small>Weight: </small><br>${pokeman.weight}
            <br><small>Type: </small><br>${type}
            <br><small>Ability: </small><br>${ability}</p>
            <!-- display the pokeman statt and name in a table -->
            <table>
            <h2 class="stats-info">Stats</h2>
            <tr>
                <th>${pokeman.stats[0].stat.name}: </th>
                <th>${pokeman.stats[0].base_stat}</th>
            </tr>
            <tr>
                <th>${pokeman.stats[1].stat.name}: </th>
                <th>${pokeman.stats[1].base_stat}</th>
            </tr>
            <tr>
                <th>${pokeman.stats[2].stat.name}: </th>
                <th>${pokeman.stats[2].base_stat}</th>
            </tr>
            <tr>
                <th>${pokeman.stats[3].stat.name}: </th>
                <th>${pokeman.stats[3].base_stat}</th>
            </tr>
            <tr>
                <th>${pokeman.stats[4].stat.name}: </th>
                <th>${pokeman.stats[4].base_stat}</th>
            </tr>
            </table>
        </div>
    </div>
    `
    pokedex.innerHTML = htmlstring + pokedex.innerHTML;
    // display the output of the pokemandata in popup method for debugging in console
    console.log(htmlstring);
};

const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
} 
// call an method to display fetchPokemonData
fetchPokemonData();
