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
/* const btnConfigTiempo = document.getElementById('btnConfigTiempo'); */
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
// Activar jugar
let jugarScript = false;
// Imagenes
const imagenes = ['./assets/imgJuego/alarm.svg', './assets/imgJuego/american-football.svg',
                 './assets/imgJuego/analytics.svg', './assets/imgJuego/aperture.svg.svg', 
                 './assets/imgJuego/archive.svg', './assets/imgJuego/arrow-dropdown-circle.svg',
                 './assets/imgJuego/arrow-dropdown.svg', './assets/imgJuego/arrow-dropleft-circle.svg',
                 './assets/imgJuego/arrow-dropleft.svg', './assets/imgJuego/arrow-dropright-circle.svg',
                 './assets/imgJuego/arrow-dropright.svg', './assets/imgJuego/arrow-dropup-circle.svg',
                 './assets/imgJuego/arrow-dropup.svg', './assets/imgJuego/avion.svg',
                 './assets/imgJuego/baseball.svg', './assets/imgJuego/basket.svg',
                 './assets/imgJuego/basketball.svg', './assets/imgJuego/bed.svg',
                 './assets/imgJuego/beer.svg', './assets/imgJuego/bicycle.svg',
                 './assets/imgJuego/boat.svg', './assets/imgJuego/bug.svg',
                 './assets/imgJuego/build.svg', './assets/imgJuego/bulb.svg',
                 './assets/imgJuego/bus.svg', './assets/imgJuego/cafe.svg',
                 './assets/imgJuego/call.svg', './assets/imgJuego/camera.svg',
                 './assets/imgJuego/car.svg', './assets/imgJuego/cloudy-night.svg',
                 './assets/imgJuego/cloudy.svg', './assets/imgJuego/color-palette.svg']

console.log('min: ',min.toString().length);
console.log('seg: ',seg.toString().length);

// TEMPLATES
const formConfNivelNuevo = `<div id="pantallaConfiguracion" class="pantallaConfiguracion">
                            <button class="pantallaConfiguracion__cerrar" id="cerrar">X</button>
                            <div name="confNivel" class="pantallaConfiguracion__confNivel">
                                <h3 class="pantallaConfiguracion__titulo">
                                    Nuevo nivel
                                </h3>
                                <input class="pantallaCOnfiguracion__inputs" type="number" placeholder="Nivel" value="" id="nuevoNivel">
                                <input id="establecer" type="submit" value="Seleccionar"></input>
                            </div>
                            </div>`;

const formConfTiempo = `<div id="pantallaConfiguracion" class="pantallaConfiguracion">
                        <div name="confNivel" class="pantallaConfiguracion__confNivel">
                            <button class="pantallaConfiguracion__cerrar" id="cerrar">X</button>
                            <h3 class="pantallaConfiguracion__titulo">
                                Establecer Tiempo
                            </h3>
                            <input class="pantallaCOnfiguracion__inputs" type="text" placeholder="Nuevo Tiempo 00:00" value="" id="nuevoTiempo">
                            <input id="establecer" type="submit" value="Seleccionar"></input>
                        </div>
                        </div>`;

// IMAGENES
// Imagenes por niveles
class Imagen {
    constructor (ruta) {
        this.ruta = ruta;
    }
};

const interrogacion = './assets/signoInterrogacion1.svg';

//CONFIGURACIONES DEFAULT
nivel.innerHTML = 1;
cargarImagenes(parseInt(nivel.innerHTML));

// FUNCIONES
// Elecciones aleatorias
function aleatorio(min,max) {
    return ((Math.floor(Math.random() * max - min + 1) + min))
}
// cargarImagenes
// cantidad es la cantidad de cartas
function cargarImagenes(nivel){
    function buscar1(lista,img,image) {
        while(lista.includes(img)) {
            if(image === 0) {
                cont++
                if(cont < 3) {
                    return;
                }
            }
            console.log('loop');
            img = image[aleatorio(0,image.length)];
        }
    }
    console.log('nivel: ',nivel);
    tablero.innerHTML = '';
    let imgs = [];
    let cont = 0;
    for (let img1 = 0; img1 < nivel * 2; img1++) {
        let img = '';
        if(nivel * 2 < 5) {
            tablero.style = `grid-template-columns: repeat(${nivel * 2},1fr);`
        }
        else {
            tablero.style = `grid-template-columns: repeat(4,1fr);
                            overflow-y: scroll;`;
        }
        console.log(contenedorImagenes);
        console.log(imagenes.length);
        if(img1 < nivel) {
            img = imagenes[aleatorio(0,imagenes.length - 1)];
            buscar1(imgs,img,imagenes);
            imgs.push(img);
            console.log(imgs);
            console.log('imagen aleatoria: ', img);
            console.log(imagenes.length);
            console.log(imagenes[aleatorio(0,imagenes.length)]);
        }
        else {
            console.log('aca debe de crear nueva lista')
            for(x=0; x<4; x++) {
                img = imgs[aleatorio(0,imgs.length -1)];
                buscar1(imgs,img,0);
                console.log(img)
            }
        }
        tablero.innerHTML += //html 
                            `<div class="juego__imgContenedor">
                                <input id="card" type="checkbox" class="juego__checkbox">
                                <label class="juego__label" for="card">
                                    <img src="${imgs[imgs.length - 1]}" alt="" class="juego__img">
                                </label>
                            </div>`;
    }  
}
//////////////////////////////////////
// cantidad de numeros en el input number
function cantidadNumeros(btn) {
    console.log('entra');
    btn.addEventListener('keypress', (k) => {
        k.preventDefault()
        console.log(parseInt(k.key))
        console.log(k)
        if(parseInt(k.key)) {
            console.log('parseint: ', k.key);
            numerosString = k.key;
            console.log(btn.value)
            console.log(numerosString.length, 'length')
            if(btn.value.length > 3) {
                console.log('el numero de nivel nuevo es: ', numeroEstablecido)
                return
            }

            if(btn.value.length < 3) {
                console.log('pasa menor de 3')
                btn.value += numerosString;
                console.log(btn.value.length)
                numeroEstablecido = parseInt(btn.value)
                console.log('el numero de nivel nuevo es: ', numeroEstablecido)
                return
            }
            if(btn.value.length === 3) {
                console.log('pasa igual a 2')
                numeroEstablecido = parseInt(btn.value);
                console.log('el numero de nivel nuevo es: ', numeroEstablecido)
                btn.value = numeroEstablecido;
                return
            }
        }
    })
    document.addEventListener('keydown', (e) => {
        console.log(e.key);
        switch(e.key) {
            case 'ArrowRight':
                e.preventDefault()
                /* if(posicion < btn.value.length) {
                    posicion += 1;
                    console.log()
                    console.log('flecha derecha posicion: ', posicion);
                } */
                break
            case 'ArrowLeft':
                e.preventDefault()
                /* if(btn.value.length > 0) {
                    posicion = btn.value.length - 1;
                    console.log('flecha izquierda posicion: ', posicion);
                    let prueba = toString(numeroEstablecido)
                    prueba.substring(posicion)
                    console.log(prueba)
                } */
                break
            case 'Backspace':
                numeroEstablecido = btn.value.slice(0, -1);
                console.log('el numero de nivel nuevo es: ', numeroEstablecido);
                break
            /* case 'Delete':
                console.log('delete');
                let stringNumEstablecido = toString(numeroEstablecido);
                console.log(stringNumEstablecido.slice(posicion + 1))
                console.log(numeroEstablecido)
                break */
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
////////////////////////////////////
// Alerta
function mostrarAlerta(alert, btn) {
    alerta.style.display = 'flex';
    alerta.innerHTML = alert;
    // Botón cerrar configuracion
    const btnCerrar = document.getElementById('cerrar');
    // Botón establecer cambio en configuración
    const btnEstablecer = document.getElementById('establecer');
    cantidadNumeros(btn)
    btnCerrar.addEventListener('click', (e) => {
        numeroEstablecido = 0;
        console.log('el numero de nivel nuevo es: ', numeroEstablecido);
        alerta.style.display = 'none';
    })
    btnEstablecer.addEventListener('click', () => {
        const nuevoNivel = document.getElementById('nuevoNivel').value;
        nivel.innerHTML = nuevoNivel;
        console.log('numero establecido mod: ', nuevoNivel)
        alerta.style.display = 'none';
        cargarImagenes(nuevoNivel);
        numeroEstablecido = 0;
        console.log('juemadre')
    })
}

/////////////////////////////////
// Juego
function iniciarJuego() {
    
}

// EVENTOS
// Iniciar a jugar o reiniciar

jugar.addEventListener('click', (e) => {
    estadoActual = 0;
    jugar.style = 'background-color: gray; cursor: default;';
    jugar.disabled = true;
    relojPlay(1);
    iniciarJuego();
})

reiniciar.addEventListener('click', (e) => {
    estadoActual = 1;
    clearInterval(contSeg);
    jugar.style = 'rgb(164, 89, 209);'
    reiniciar.disabled = true;
    jugar.disabled = false;
    relojPlay(0);
})

btnConfigNuevoNivel.addEventListener('click', () => {
    const btnConfigNuevoNivel = document.getElementById('btnConfigNuevoNivel');
    mostrarAlerta(formConfNivelNuevo, btnConfigNuevoNivel);
})

btnConfigTiempo.addEventListener('click', () => {
    const btnConfigTiempo = document.getElementById('btnConfigTiempo');
    mostrarAlerta(formConfTiempo, btnConfigTiempo);
})


