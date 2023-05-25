// Reloj
const reloj = document.getElementById('reloj');
// Botones Jugar y Reiniciar
const jugar = document.getElementById('jugar');
const reiniciar = document.getElementById('reiniciar');
// Contenedores de imagenes del juego
const contenedorImagenes = document.getElementsByClassName('.juego__imgContenedor');
// Tablero de juego
const tablero = document.getElementById('tablero');
// Input configurar nivel
/* const inputNuevoNivel = document.getElementById('nuevoNivel'); */
// Botón cerrar configuracion
/* const btnCerrar = document.getElementById('cerrar'); */
// Contenedor alerta
const alerta = document.getElementById('alerta');
// Botón configuración nuevo nivel
const btnConfigNuevoNivel = document.getElementById('btnConfigNuevoNivel');
// Botón configuración titulo
const btnConfigTiempo = document.getElementById('btnConfigTiempo');
// Nivel
const nivel = document.getElementById('nivel');

// Variables
let estadoActual = 0;
let contSeg;
let min = 1;
let seg = 3;
let listaImagenes = [];
let numerosString = '';
let numeroEstablecido = 0;
let posicion = 0;

console.log('min: ',min.toString().length);
console.log('seg: ',seg.toString().length);

// TEMPLATES
const formConfNivelNuevo = `<div id="pantallaConfiguracion" class="pantallaConfiguracion">
                            <button class="pantallaConfiguracion__cerrar" id="cerrar">X</button>
                            <form action="memorin.html" name="confNivel" class="pantallaConfiguracion__confNivel">
                                <h3 class="pantallaConfiguracion__titulo">
                                    Nuevo nivel
                                </h3>
                                <input type="number" placeholder="Nivel" value="" id="nuevoNivel">
                                <input type="submit" value="Seleccionar"></input>
                            </form>
                            </div>`;

const formConfTiempo = `<div id="pantallaConfiguracion" class="pantallaConfiguracion">
                        <form action="#" name="confNivel" class="pantallaConfiguracion__confNivel">
                            <button class="pantallaConfiguracion__cerrar" id="cerrar">X</button>
                            <h3 class="pantallaConfiguracion__titulo">
                                Establecer Tiempo
                            </h3>
                            <input type="text" placeholder="Nivel" value="" id="nuevoTiempo">
                            <input type="submit" value="Seleccionar"></input>
                        </form>
                        </div>`;

// IMAGENES
// Imagenes por niveles
class imagen {
    constructor (ruta) {
        this.ruta = ruta;
    }
};

const interrogacion = './assets/signoInterrogacion1.svg';

//CONFIGURACIONES DEFAULT
nivel.innerHTML = 1;
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
//////////////////////////////////////
// cantidad de numeros en el input number
function cantidadNumeros() {
    console.log('entra')
    const inputNuevoNivel = document.getElementById('nuevoNivel');
    inputNuevoNivel.addEventListener('keypress', (k) => {
        k.preventDefault()
        console.log(parseInt(k.key))
        console.log(k)
        if(parseInt(k.key)) {
            console.log('parseint: ', k.key);
            numerosString = k.key;
            console.log(inputNuevoNivel.value)
            console.log(numerosString.length, 'length')
            if(inputNuevoNivel.value.length > 3) {
                console.log('el numero de nivel nuevo es: ', numeroEstablecido)
                return
            }

            if(inputNuevoNivel.value.length < 3) {
                console.log('pasa menor de 3')
                inputNuevoNivel.value += numerosString;
                console.log(inputNuevoNivel.value.length)
                numeroEstablecido = parseInt(inputNuevoNivel.value)
                console.log('el numero de nivel nuevo es: ', numeroEstablecido)
                return
            }
            if(inputNuevoNivel.value.length === 3) {
                console.log('pasa igual a 2')
                numeroEstablecido = parseInt(inputNuevoNivel.value);
                console.log('el numero de nivel nuevo es: ', numeroEstablecido)
                inputNuevoNivel.value = numeroEstablecido;
                return
            }
        }
    })
    document.addEventListener('keydown', (e) => {
        console.log(e.key);
        switch(e.key) {
            case 'ArrowRight':
                if(posicion < inputNuevoNivel.value.length) {
                    posicion += 1;
                    console.log('flecha derecha posicion: ', posicion);
                }
                break
            case 'ArrowLeft':
                if(inputNuevoNivel.value.length > 0) {
                    posicion = inputNuevoNivel.value.length - 1;
                    console.log('flecha izquierda posicion: ', posicion);
                }
                break
            case 'Backspace':
                numeroEstablecido = inputNuevoNivel.value.slice(0, -1);
                console.log('el numero de nivel nuevo es: ', numeroEstablecido);
                break
            case 'Delete':
                console.log('delete');
                let stringNumEstablecido = toString(numeroEstablecido);
                console.log(stringNumEstablecido.indexOf(posicion))
                console.log(numeroEstablecido)
                break
        }
    })
}
//////////////////////////////////////////////////////
// Botón configuración nuevo nivel

/////////////////////////////////
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
    clearInterval(contSeg);
    reiniciar.disabled = true;
    jugar.disabled = false;
    relojPlay(0);
})

btnConfigNuevoNivel.addEventListener('click', () => {
    alerta.style.display = 'flex';
    alerta.innerHTML = formConfNivelNuevo;
    // Botón cerrar configuracion
    const btnCerrar = document.getElementById('cerrar');
    cantidadNumeros()
    btnCerrar.addEventListener('click', (e) => {
        alerta.style.display = 'none';
    })
})



