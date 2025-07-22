import listaPalabras from "./recursos/palabras.js";

const mostrarPalabras = document.getElementById("mostrarPalabras");
const campoEntrada = document.getElementById("campoEntrada");
const temporizador = document.getElementById("temporizador");
const puntuacion = document.getElementById("puntuacion");
const botonesReiniciar = document.querySelectorAll(".boton-reiniciar");

let indiceActual = 0;
let puntos = 0;
let errores = 0;
let tiempoRestante = 5;
let intervalo = null;
let juegoEnCurso = false;

generarPalabras();
resaltarPalabra(0);
campoEntrada.disabled = false;
campoEntrada.value = "";
campoEntrada.focus();

function resetearJuego() {
  clearInterval(intervalo);
  puntos = 0;
  errores = 0;
  indiceActual = 0;
  tiempoRestante = 5;
  campoEntrada.disabled = false;
  campoEntrada.value = "";
  puntuacion.textContent = "Puntos: 0";
  temporizador.textContent = `Tiempo: ${tiempoRestante}s`;

  mostrarPalabras.style.display = "block";
  document.querySelector(".entrada-info").style.display = "flex";
  document.getElementById("resultadoJuego").style.display = "none";
  puntuacion.style.display = "none";

  generarPalabras();
  resaltarPalabra(0);

  juegoEnCurso = false;
  campoEntrada.focus();
}

function iniciarJuego() {
  intervalo = setInterval(() => {
    tiempoRestante--;
    temporizador.textContent = `Tiempo: ${tiempoRestante}s`;

    if (tiempoRestante <= 0) {
      terminarJuego();
    }
  }, 1000);

  juegoEnCurso = true;
}

function generarPalabras() {
  mostrarPalabras.innerHTML = "";
  agregarMasPalabras(50);
}

function agregarMasPalabras(cantidad = 30) {
  const nuevas = [...listaPalabras]
    .sort(() => 0.5 - Math.random())
    .slice(0, cantidad)
    .map((palabra) => `<span>${palabra}</span>`);

  mostrarPalabras.insertAdjacentHTML("beforeend", nuevas.join(" "));
}

function resaltarPalabra(indice) {
  const spans = mostrarPalabras.querySelectorAll("span");
  spans.forEach((span, i) => {
    span.classList.remove("actual");
    if (i === indice) {
      span.classList.add("actual");
      span.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  });
}

campoEntrada.addEventListener("input", () => {
  const entrada = campoEntrada.value.trim();

  if (!juegoEnCurso && entrada.length > 0) {
    iniciarJuego();
  }

  const spans = mostrarPalabras.querySelectorAll("span");
  const spanActual = spans[indiceActual];
  const palabraActual = spanActual.textContent;

  if (spanActual.classList.contains("evaluada")) return;

  if (palabraActual.startsWith(entrada)) {
    spanActual.classList.remove("incorrecta");
  } else {
    spanActual.classList.add("incorrecta");
  }
});

function verificarEntrada() {
  const entrada = campoEntrada.value.trim();
  const spans = mostrarPalabras.querySelectorAll("span");
  const spanActual = spans[indiceActual];
  const palabraActual = spanActual.textContent;

  spanActual.classList.remove("incorrecta");

  if (entrada === palabraActual) {
    spanActual.classList.add("correcta");
    puntos++;
    puntuacion.textContent = `Puntos: ${puntos}`;
  } else {
    spanActual.classList.add("incorrecta");
    errores++;
  }

  spanActual.classList.add("evaluada");

  campoEntrada.value = "";
  indiceActual++;

  const palabrasRestantes = spans.length - indiceActual;
  if (palabrasRestantes < 10) {
    agregarMasPalabras(30);
  }

  const nuevosSpans = mostrarPalabras.querySelectorAll("span");
  if (indiceActual < nuevosSpans.length) {
    resaltarPalabra(indiceActual);
  }
}

function terminarJuego() {
  clearInterval(intervalo);
  campoEntrada.disabled = true;
  juegoEnCurso = false;

  const total = puntos + errores;

  mostrarPalabras.style.display = "none";
  document.querySelector(".entrada-info").style.display = "none";

  const resultadoDiv = document.getElementById("resultadoJuego");
  resultadoDiv.style.display = "block";

  document.getElementById("resultadoPuntos").textContent = puntos;
  document.getElementById("resultadoErrores").textContent = errores;
  document.getElementById("resultadoTotal").textContent = total;

  puntuacion.style.display = "block";
}

campoEntrada.addEventListener("keydown", function (evento) {
  if (evento.key === " " || evento.key === "Enter") {
    evento.preventDefault();
    verificarEntrada();
  }
});

botonesReiniciar.forEach((boton) => {
  boton.addEventListener("click", () => {
    resetearJuego();
  });
});
