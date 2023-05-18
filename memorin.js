const reloj = document.getElementById('reloj');
const jugar = document.getElementById('jugar');
const reiniciar = document.getElementById('reiniciar');
const tablero = document.getElementById('tablero');
let estadoActual = 0;
let contSeg;
let min = 1;
let seg = 10;

console.log('min: ',min.toString().length)
console.log('seg: ',seg.toString().length)

// cartas


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

longitud()
function iniciarReloj() {
   seg--;
   longitud()
   if(seg === -1) {
        if(min === 0) {
            min = 0;
        }
        else {
            min--
        }
        seg = 59;
        longitud()
   }
   if(min === 0 && seg === 0) {
        clearInterval(contSeg);
        longitud();
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

jugar.addEventListener('click', (e) => {
    estadoActual = 0
    jugar.disabled = true
    relojPlay(1)
})

reiniciar.addEventListener('click', (e) => {
    estadoActual = 1;
    clearInterval(contSeg)
    reiniciar.disabled = true
    jugar.disabled = false
    relojPlay(0)
})

