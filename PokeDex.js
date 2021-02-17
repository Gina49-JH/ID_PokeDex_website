// create a variable to get the id from the html.
const pokedex = document.getElementById("pokedex");
// create a variable to get the id from the html
const searchBar = document.getElementById('searchBar');
document.getElementById('searchBar').value = '';
// create an empty object to store and display pokemon
const pokeStore = {};
// create an empty list to store data for search
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
        // create a variable(url) to query the link limit of 898 pokemon
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
        // using variable(pokemondata) to map data,store and convert into an array.
        pokemondata = data.results.map((result, index) =>
        ({
            // takes every properties inside the result and copy into pokemon object.
            ...result,
            // name of the pokemon
            name : result.name,
            // id of the specific pokemon number
            id : index + 1,
            // image of a specifc pokemon in an array.
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
        }));
    // display the output of the pokemondata for debugging in console.
    console.log(data.results);
    // call a method displayPokemonData to display pokemonData.
    displayPokemonData(pokemondata);
    }
    // display an error message if the data cannot be found.
    catch(err){
        console.log(err);
    };
};
// create a var
const displayPokemonData = (pokemon) => {
    // display the output of the pokemon in displayPokemonData method for debugging in console.
    console.log(pokemon);
    // create an variable to retrieve the data from pokemon.
    const pokemonHTMLString = pokemon
        // mapping of each pokemon data and stored into an array.
        .map((pokeman) => {
        return`
        <li class ="card" onclick="selectPokemon(${pokeman.id})">
        <img class = "card-image" src="${pokeman.image}" />
        <h2 class ="card-title">#${pokeman.id}<br>${pokeman.name}</h2>
        </li>
        `
        })

    // add the data of pokemonHTMLString into the DOM of pokedex to display the html.
    .join('');
    pokedex.innerHTML = pokemonHTMLString;
}
// create a variable to made a fetch request to the api with an id.
const selectPokemon = async(id) => {
    // if pokeStore[id] does not exist in cache
    if(!pokeStore[id])
    {
    // create a variable(url) to query the pokemon data with an id.
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    // fetch the data from the url
    const res = await fetch(url);
    // retrieve the data from res and convert to JSON Format.
    const pokeman  =  await res.json();
    // when the pokemon is selected, it will add data into a cache
    pokeStore[id] = pokeman;
    // display the output of the pokeStore for debugging in console.
    console.log(pokeStore);
    }
    // if the pokeStore[id] does exist in cache, it will pokeStore directly inside cache.
    displayPopup(pokeStore[id]);
};
// create a variable to retrieve the pokemon data and display in html.
const displayPopup = (pokeman) => {
    // retrieve each one of the names of the types and put together as one and sperate by ,
    const type = pokeman.types.map((type) => type.type.name).join(', ');
    // retrieve each one of the names of the abilities and put together as one and sperate by ,
    const ability = pokeman.abilities.map((ability) => ability.ability.name).join(', ');
    // retrieve each one of the front_default of the sprites to display specific id of each pokeman image
    const image = pokeman.sprites['front_default'];
    // create a variable to retrieve the pokeman data and display in a html format.
    const htmlstring = `
    <!-- create an variable to show the pokeman data in a new windows when users click on
    pokemon card -->
    <div class ="popup">
        <button id="closeBtn" onclick="closePopup()"> Close </button>
        <!-- display the specific data of each pokemon in a new windows when user click on it -->
        <div class="card">
            <img class = "card-image" src="${image}" />
            <h2 class ="card-title">#${pokeman.id} ${pokeman.name}</h2>
            <p><small>Height: </small><br>${pokeman.height}
            <br><small>Weight: </small><br>${pokeman.weight}
            <br><small>Type: </small><br>${type}
            <br><small>Ability: </small><br>${ability}</p>
            <!-- display the pokeman base_stats and name in a table -->
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
    // add the data into the DOM of pokedex to display the html.
    pokedex.innerHTML = htmlstring + pokedex.innerHTML;
    // display the output of the pokemandata in popup method for debugging in console.
    console.log(htmlstring);
};
// create a variable to retrieve data from the card and remove from the DOM.
const closePopup = () => {
    // create a variable for reference class popup.
    const popup = document.querySelector('.popup');
    // use popup variable to look for the parent and remove child that was selected.
    popup.parentElement.removeChild(popup);
} 
// call an method to display fetchPokemonData
fetchPokemonData();
