const pokeContent = document.getElementById('pokemonContent');
let pokeForm = document.getElementById('searchPokemon');
let generationshow = 1
const modalSearch = document.getElementById('pokemonContent')
const divGeneration = document.getElementById('textGen')
/*ordenar xr generacion*/
/*Primera Gen 1-151*/
/*Segunda Gen 152-251*/
/*tercera Gen 252-386*/

function showPokemonGen(gen) {
    const pokemonGen = {
        1: [1, 151],
        2: [152, 251],
        3: [252, 386]
    };

    const pokemonGenDefault = [1, 151];
    const generacion = pokemonGen[gen] || pokemonGenDefault;
    return generacion;

}

let pokemonGeneration = showPokemonGen(generationshow)


/*cambiar de generacion*/

let arrowRight = document.getElementById('arrow-right').addEventListener('click', e => {

    if (generationshow < 4) {
        modalSearch.innerHTML = '';
        generationshow += 1
        pokemonGeneration = showPokemonGen(generationshow)
        divGeneration.innerHTML = 'Gen ' + generationshow
        drawPokemon()
    }
})


let arrowleft = document.getElementById('arrow-left').addEventListener('click', e => {

    if (generationshow > 0) {
        modalSearch.innerHTML = '';
        generationshow -= 1
        pokemonGeneration = showPokemonGen(generationshow)
        divGeneration.innerHTML = 'Gen ' + generationshow
        drawPokemon()
        console.log(generationshow)
    }
})


const drawPokemon = async () => {      //la función siempre devolverá una promesa. Otros valores serán envueltos y resueltos en una promesa automáticamente
    for (let i = pokemonGeneration[0]; i <= pokemonGeneration[1]; i++) {
        await getPokemon(i);
    }
}

const getPokemon = async (id, modal) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const rest = await fetch(url);
    const pokemon = await rest.json();
    createPokemon(pokemon, modal);
}

/*pintar carta pokemon*/
const colors = {
    fuego: '#FFA05D',
    planta: '#8FD594',
    electrico: '#FFE43B',
    agua: '#7E97C0',
    tierra: '#CAAC4D',
    roca: '#90642D',
    veneno: '#9D5B9B',
    bicho: '#EAFD71',
    dragon: '#97b3e6',
    psiquico: '#FF96B5',
    volador: '#CDCDCD',
    lucha: '#FF5D5D',
    normal: '#FFFFFF'
}

const main_types = Object.keys(colors)   //tipos principales


function createPokemon(pokemon, modal) {
    const pokemonEl = document.createElement('div');

    pokemonEl.classList.add('pokemon');

    const poke_types = pokemon.types.map(type => type.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const color = colors[type];

    pokemonEl.style.backgroundColor = color;



    if (modal !== true) {
        const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id
            }.png" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
                .toString()
                .padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Tipo: <span>${type}</span></small>
        </div>
    `;
        pokemonEl.innerHTML = pokeInnerHTML;
        pokeContent.appendChild(pokemonEl);
    }

    else {
        const pokeInnerHTML = `
        <div class="modal" id="modalPokemon">
        <div class="pokemon">
        <div class="img-container">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id
            }.png" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
                .toString()
                .padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Tipo: <span>${type}</span></small>
        </div>
        </div>
    
    </div>`;


        modalSearch.innerHTML = pokeInnerHTML;

    }
}

drawPokemon()


/*Buscar pokemon*/

pokeForm.addEventListener('submit', e => {      //se utiliza para validar el formulario antes de ser enviado al servidor o bien para abortar el envío y procesarlo con JavaScript
    e.preventDefault();
    let searchPokemon = document.getElementById('pokemon').value;
    getPokemon(searchPokemon, true);
})

function exitModal() {
    const modalPokemon = document.getElementById('modalPokemon');
    modalPokemon.style.display = 'none'
    drawPokemon()
}


