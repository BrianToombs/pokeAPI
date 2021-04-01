const pokedex = document.getElementById("pokedex");
console.log(pokedex);

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 105; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        promises.push(fetch(url)
            .then((res) => res.json())
            .then((json) => json))
        }
        displayPokemon(promises)
};

const displayPokemon = (promises) => {
    console.log(promises);
    Promise.all(promises).then((results) => {
        const pokemon = results.map((data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types.map((type) => type.type.name).join(', ')
        }));
    
        const pokemonHTMLString = pokemon.map (species => `
    <div class="card" id="pokedex">
        <img src="${species.image}" class="card-img" alt="${species.name}">
        <div class="card-img-overlay">
            <h2 class="card-title">${species.name.toUpperCase()}</h2>
            <p class="card-text">Dex #${species.id} | Type: ${species.type}</p>
            <p class="card-text"></p>
        </div>
    </div>

    `)
    pokedex.innerHTML = pokemonHTMLString;

    });
    
}

fetchPokemon();

// const searchBar = document.getElementById('searchBar');
// searchBar.addEventListener('keyup', () => {
//     console.log(e.target.value);
// })

