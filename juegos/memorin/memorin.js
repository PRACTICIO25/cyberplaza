// Reloj
const reloj = document.getElementById('reloj');
// Botones Jugar y Reiniciar
const jugar = document.getElementById('jugar');
const reiniciar = document.getElementById('reiniciar');
// Contenedores de imagenes del juego
const contenedorImagenes = document.getElementsByClassName('.juego__imgContenedor');
// Tablero de juego
const tablero = document.getElementById('tablero');
// Variables
let estadoActual = 0;
let contSeg;
let min = 1;
let seg = 3;
let listaImagenes = [];

console.log('min: ',min.toString().length)
console.log('seg: ',seg.toString().length)

// IMAGENES
// Imagenes por niveles
class imagen {
    constructor (ruta) {
        this.ruta = ruta;
    }
}

const interrogacion = './assets/signoInterrogacion1.svg'



//CONFIGURACIONES DEFAULT
// Nivel
const nivel = document.getElementById('nivel');
nivel.innerHTML = 1
cargarImagenes();

// FUNCIONES
// cargarImagenes
// cantidad es la cantidad de cartas
function cargarImagenes(nivel=8){
    console.log('nivel: ',nivel);

    for (let img1 = 0; img1 < nivel * 2; img1++) {
        if(nivel * 2 < 5) {
            tablero.style = `grid-template-columns: repeat(${nivel * 2},1fr);`
        }
        else {
            tablero.style = `grid-template-columns: repeat(4,1fr);
                            overflow-y: scroll;`
        }
        console.log(contenedorImagenes)
        tablero.innerHTML += `<div class="juego__imgContenedor">
                            <img src="${interrogacion}" alt="" class="juego__img">
                            </div>`;
        
    }
    
}
// reloj
function longitud() {
    if(seg.toString().length === 1 && min.toString().length === 1) {
        reloj.innerHTML = `0${min} : 0${seg}`;
        return
    }
    else if(seg.toString().length === 1 && min.toString().length === 2) {
        reloj.innerHTML = `${min} : 0${seg}`;
        return
    }
    else if(seg.toString().length === 2 && min.toString().length === 1) {
        reloj.innerHTML = `0${min} : ${seg}`;
        return
    }
}

longitud();
function iniciarReloj() {
    console.log('setinterval')
    seg--;
    longitud();
    if(seg === 0) {
        min--;
    }
    if(seg < 0) {
        seg = 5;
        longitud();
    }
    if(min < 0 && seg === 0) {
        clearInterval(contSeg);
        // finalizar juego
        return
    }
}

function relojPlay(estado) {
    if(estado === 1 && estadoActual === 0) {
        contSeg = setInterval(iniciarReloj,1000)
    }
    else {
        min = 3;
        seg = 0;
        reloj.innerHTML = `0${min} : 0${seg}`;
        return
    }
};
/////////////////////////////////
// Juego
function iniciarJuego() {
    contenedorImagenes.forEach(e => {
        console.log(e)
    })
}

// EVENTOS
// Iniciar a jugar o reiniciar

jugar.addEventListener('click', (e) => {
    estadoActual = 0;
    jugar.disabled = true;
    relojPlay(1);
    iniciarJuego();
})

reiniciar.addEventListener('click', (e) => {
    estadoActual = 1;
    clearInterval(contSeg)
    reiniciar.disabled = true
    jugar.disabled = false
    relojPlay(0)
})

