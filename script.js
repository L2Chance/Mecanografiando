const listaPalabras = [
  "gato",
  "perro",
  "casa",
  "auto",
  "pelota",
  "silla",
  "ventana",
  "fuego",
  "tigre",
  "teclado",
  "pantalla",
  "ratón",
  "programa",
  "javascript",
  "html",
  "css",
  "nube",
  "montaña",
  "sol",
  "luna",
  "estrella",
  "mar",
  "río",
  "bosque",
  "tren",
  "avión",
  "libro",
  "puerta",
  "cielo",
  "árbol",
  "flor",
  "agua",
  "pájaro",
  "nieve",
  "ciudad",
  "playa",
  "camino",
  "jardín",
  "rueda",
  "bote",
  "coche",
  "ratón",
  "reloj",
  "pluma",
  "papel",
  "mesa",
  "lápiz",
  "teléfono",
  "lago",
  "arena",
  "montaña",
  "isla",
  "sol",
  "viento",
  "lluvia",
  "nube",
  "fuego",
  "tierra",
  "pez",
  "animal",
  "piedra",
  "hierba",
  "bosque",
  "fresa",
  "manzana",
  "uva",
  "perro",
  "gato",
  "caballo",
  "vaca",
  "oveja",
  "cerdo",
  "pollo",
  "ratón",
  "zorro",
  "lobo",
  "león",
  "elefante",
  "jirafa",
  "mono",
  "pájaro",
  "mariposa",
  "abeja",
  "araña",
  "serpiente",
  "tiburón",
  "ballena",
  "delfín",
  "pez",
  "lagarto",
  "rana",
  "tortuga",
  "cangrejo",
  "estrella",
  "luna",
  "sol",
  "planeta",
  "galaxia",
  "universo",
  "estrella",
  "cometa",
  "meteorito",
  "atmósfera",
  "nube",
  "lluvia",
  "trueno",
  "relámpago",
  "tormenta",
  "viento",
  "huracán",
  "tornado",
  "volcán",
  "terremoto",
  "fuego",
  "lava",
  "humo",
  "ceniza",
  "roca",
  "arena",
  "barro",
  "nieve",
  "hielo",
  "frío",
  "calor",
  "día",
  "noche",
  "mañana",
  "tarde",
  "hora",
  "minuto",
  "segundo",
  "tiempo",
  "espacio",
  "luz",
  "oscuridad",
  "sombra",
  "color",
  "rojo",
  "azul",
  "verde",
  "amarillo",
  "naranja",
  "morado",
  "rosa",
  "blanco",
  "negro",
  "gris",
  "marrón",
  "plata",
  "oro",
];

const mostrarPalabras = document.getElementById("mostrarPalabras");
const campoEntrada = document.getElementById("campoEntrada");
const temporizador = document.getElementById("temporizador");
const puntuacion = document.getElementById("puntuacion");
const botonReiniciar = document.getElementById("botonReiniciar");

let indiceActual = 0;
let puntos = 0;
let errores = 0;
let tiempoRestante = 60;
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
  tiempoRestante = 60;
  campoEntrada.disabled = false;
  campoEntrada.value = "";
  campoEntrada.focus();
  puntuacion.textContent = "Puntos: 0";
  temporizador.textContent = "Tiempo: 60s";

  mostrarPalabras.style.display = "block";
  document.getElementById("resultadoJuego").style.display = "none";

  generarPalabras();
  resaltarPalabra(0);

  juegoEnCurso = false;
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

  const resultadoDiv = document.getElementById("resultadoJuego");
  resultadoDiv.style.display = "block";

  document.getElementById("resultadoPuntos").textContent = puntos;
  document.getElementById("resultadoErrores").textContent = errores;
  document.getElementById("resultadoTotal").textContent = total;
}

campoEntrada.addEventListener("keydown", function (evento) {
  if (evento.key === " " || evento.key === "Enter") {
    evento.preventDefault();
    verificarEntrada();
  }
});

botonReiniciar.addEventListener("click", () => {
  resetearJuego();
});
