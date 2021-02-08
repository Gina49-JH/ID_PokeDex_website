/*https://www.youtube.com/watch?v=XL68br6JyYs&t=257s&ab_channel=FlorinPop 15:06 */
const PokeDex_Container = document.getElementById('PokeDex_Container');
const pokemon_number= 898;
const colors = {
    fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
    water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
    normal : '#F5F5F5'
}

const main_types = Object.keys(colors);
console.log(main_types);
const fetchPokemonsList = async() => {
    for (let c = 1; c <= pokemon_number; c++){
        await getPokemon(c);
    }
}

const getPokemon = async id =>{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();   
    createPokemonCard(pokemon);
}

fetchPokemonsList();
function createPokemonCard(pokemon){
    const Pokemon_Card = document.createElement('div')
    Pokemon_Card.classList.add('pokemon');

    const poke_types = pokemon.types.map(type => type.type.name);
	const type = main_types.find(type => poke_types.indexOf(type) > -1);
    const uppername = pokemon.name[0].toUpperCase() + 
    pokemon.name.slice(1);

    const pokeInnerHTMl = `
    <div class = "img-containerlist">
        <a href="index.html"><img src = "https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png"/></a>
    </div>
    <div class ="pokemon_info">
        <span class ="pokenumber">${pokemon.id}</span>
        <h3 class ="pokename">${uppername}</h3>
        <small class="type">Type: <span>${type}</span></small>
    </div>    
    `;
    
    Pokemon_Card.innerHTML = pokeInnerHTMl;
    PokeDex_Container.appendChild(Pokemon_Card)
}

getPokemon(0);

$('.ui.search')
  .search({
    apiSettings: {
      url: 'https://pokeres.bastionbot.org/images/pokemon/$id.png"/'
    },
    fields: {
      results : 'items',
      title   : 'name',
      url     : 'html_url'
    },
    minCharacters : 3
  })
;

