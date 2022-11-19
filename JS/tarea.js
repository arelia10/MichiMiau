const indicacionEstado = document.querySelector('.notificaciones');
const estadoJuego = ["", "", "", "", "", "", "", "", ""];
const  mensajeGanador = () => `El michi ${jugadorActual} ha ganado!`
const  terminoJuego = () => `El Michi Miau termino no hay ganadores`
const turnoJugador = () => `Turno del michi ${jugadorActual}`

let juegoActivo = true,
 jugador= ["O","X"],
 jugadorActual =jugador[Math.floor(Math.random()*jugador.length)];


// funcion principal que llamara a las funciones Click
function principal() {
  mostrarEstadoMensaje(turnoJugador())
  funcionesClick()
}
function mostrarEstadoMensaje(mensaje) {
  indicacionEstado.innerHTML = mensaje
} 
function funcionesClick() {
  document.querySelector('.contenedor').addEventListener('click', manipulacionClickCelda)
  document.querySelector('.reinicio').addEventListener('click',restablecerJuego )
}

function restablecerJuego() {
  juegoActivo = true
  jugadorActual = 'X'
  resetearEstadoJuego()
  mostrarEstadoMensaje(turnoJugador())
  document.querySelectorAll('.celdaJuego').forEach(celdas => celdas.innerHTML = "")
}
function resetearEstadoJuego() {
  let i = estadoJuego.length
  while (i--) {
    estadoJuego[i] = ''
  }
}

function manipulacionClickCelda(eventoClickCelda ) {
  const clickCelda = eventoClickCelda.target
  if (clickCelda.classList.contains('celdaJuego')) {
    const clickCeldaIndice =parseInt(
      clickCelda.getAttribute('indiceCelda'))
    if (estadoJuego[clickCeldaIndice] !== '' || !juegoActivo) {
      return false
    }

    celdaManipulado(clickCelda, clickCeldaIndice)
    validacionResultado()
  }
}

function celdaManipulado(clickCelda, clickCeldaIndice) {
  estadoJuego[clickCeldaIndice] = jugadorActual // Agrega en la posición correspondiente el valor ya sea "X" u "O" en el estado actual del juego
  clickCelda.innerHTML =jugadorActual // Agrega en el HTML el valor del jugador
}
//es para ver si un jugador ha ganado
const posibilidadesGanar = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
function validacionResultado() {
  let juegoGanado = false
  for (let i = 0; i < posibilidadesGanar.length; i++) { // Itera cada uno de las posibles combinaciones ganadores
    const condicionGanar = posibilidadesGanar[i] // Guarda la combinación por ejemplo: [0, 1, 2]
    let position1 = estadoJuego[condicionGanar[0]],
      position2 = estadoJuego[condicionGanar[1]],
      position3 = estadoJuego[condicionGanar[2]] // Almacena el valor del estado actual del juego según las posiciones de condicionGanar

    if (position1 === '' || position2 === '' || position3 === '') {
      continue; // Si hay algún valor vacio nadie ha ganado aún
    }
    if (position1 === position2 && position2 === position3) {
      juegoGanado = true // Si todas las posiciones coinciden entonces, dicho jugador ha ganado la partida
      break
    }
  }

  if (juegoGanado) {
    mostrarEstadoMensaje(mensajeGanador())
    juegoActivo = false
    return
  }

  let finalJuego = !estadoJuego.includes("") // Si todas las celdas tienen valor y la sentencia anterior fue falsa entonces  el juego termino no hay ganador
  if (finalJuego) {
    mostrarEstadoMensaje(terminoJuego())
    juegoActivo = false
    return
  }

  oportunidadJugador()
}
// si no se cumple las condiciones anteriores se cambia el  turno del  jugador
function oportunidadJugador() {
    jugadorActual= jugadorActual === "X" ? "O" : "X"
    mostrarEstadoMensaje(turnoJugador())
}


principal()