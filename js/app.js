//Generador de un numero aleatorio
const num_rand = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}
//ID del pokemon + variables extras
let id = 1;
const min_id = 1;
const max_id = 898;
let contador = 0;
let sig_boton = document.querySelector("#siguiente");
let ant_boton = document.querySelector("#anterior");
let id_array = [id, id];

//Crear un boton de recarga
const reload = document.getElementById("reload");

//Crear boton de siguiente
const siguiente = document.getElementById("siguiente");
//Crear boton de anterior
const anterior = document.getElementById("anterior");

//Agrega funcionalidad al boton de recarga
reload.addEventListener("click", () => {
    location.reload();
});

//Agregar funcionalidad al boton de siguiente y anterior

const sig = () => {
    if (id == max_id) {
        id = min_id;
        id_array[0] = max_id;
        id_array[1] = id + 1;
    } else if (id == max_id - 1) {
        id = max_id;

        id_array[0] = id - 1;
        id_array[1] = min_id;
    } else {
        id++;

        id_array[1] = id + 1;
        id_array[0] = id - 1;
    }

    


    ant_boton.textContent = `No.${id_array[0]} <- Anterior Pokemon`;
    sig_boton.textContent = `Siguiente Pokemon -> No.${id_array[1]}`;

    fetch_data(id);
}

const ant = () => {
    if (id == min_id) {
        id = max_id;

        id_array[0] = id -1;
        id_array[1] = min_id;
    } else if (id == min_id + 1) {
        id = min_id;
        id_array[0] = max_id;
    } else {
        id--;
        id_array[0] = id - 1;
        id_array[1] = id + 1;
    }

    ant_boton.textContent = `No.${id_array[0]} <- Anterior Pokemon`;
    sig_boton.textContent = `Siguiente Pokemon -> No.${id_array[1]}`;

    fetch_data(id);
}


siguiente.addEventListener("click", sig);

anterior.addEventListener("click", ant);

//Usar funciones una vez que este cargado el html
document.addEventListener("DOMContentLoaded", () => {
    id = num_rand(min_id, max_id);

    id_array[0] = id - 1;
    id_array[1] = id + 1;

    if(id == min_id) {
        id_array[0] = max_id;
    }

    ant_boton.textContent = `No.${id_array[0]} <- Anterior Pokemon`;
    sig_boton.textContent = `Siguiente Pokemon -> No.${id_array[1]}`;

    fetch_data(id);
});

//Conectarse a la Api y utilizarla
const fetch_data = async (id) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();

        const pokemon = {
            img: data.sprites.front_default,
            nombre: data.name,
            id: data.id,
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            s_attack: data.stats[3].base_stat,
            s_defense: data.stats[4].base_stat,
            speed: data.stats[5].base_stat,
            xp: data.base_experience,
        }

        draw_pokemon(pokemon);
    } catch (error) {
        console.log(error);
    }
}

//Dibujar el pokemon en la pagina
const draw_pokemon = pokemon => {

    const flex = document.querySelector(".flex");
    const template = document.querySelector("#template-card").content;
    const clone = template.cloneNode(true);
    const fragment = document.createDocumentFragment();

    clone.querySelector(".card-body-img").setAttribute("src", pokemon.img);
    clone.querySelector(".card-body-title").innerHTML = `${pokemon.nombre} <span>no.${pokemon.id}</span>`;
    clone.querySelector(".card-body-text").textContent = `hp: ${pokemon.hp} xp: ${pokemon.xp}`;
    clone.querySelectorAll(".card-footer-social h3")[0].textContent = `${pokemon.attack}`;
    clone.querySelectorAll(".card-footer-social h3")[1].textContent = `${pokemon.s_attack}`;
    clone.querySelectorAll(".card-footer-social h3")[2].textContent = `${pokemon.defense}`;
    clone.querySelectorAll(".card-footer-social h3")[3].textContent = `${pokemon.speed}`;
    clone.querySelectorAll(".card-footer-social h3")[4].textContent = `${pokemon.s_defense}`;

    fragment.appendChild(clone);

    flex.appendChild(fragment);

    contador++;

    if (contador > 1) {
        const del = document.querySelectorAll(".card")[0];
        flex.removeChild(del);
    }
}