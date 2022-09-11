// Declaro arrya de objetos, en este son destinos de alguna parte del mundo

let vuelos = [
  { nombre: "mexico", precio: 20000 },
  { nombre: "argentina", precio: 25000 },
  { nombre: "california", precio: 30000 },
  { nombre: "alemania", precio: 40000 },
  { nombre: "china", precio: 50000 },
  { nombre: "irak", precio: 70000 },
  { nombre: "francia", precio: 80000 },
];

// Aqui declaro a los elemetos que se van a modicar por el DOM, son un h1 - titulo, h2 - titulo2 y select - select

let titulo = document.getElementById("titulo");
let titulo2 = document.getElementById("titulo2");
let select = document.getElementById("section");

// Aqui pongo este promt, ya que se tiene que preguntar si se requiere de comprar

let saludo = prompt(
  "Hola bienvenido a la aerolinea MexiVuelos, ¿Desea comprar algun vuelos?, Si o No"
);

// A partir de la repuesta del usuario se va a ejecuar alguna de las condiciones

while (saludo != "si" && saludo != "no") {
  alert("Por favor, solo renponde si o no");
  saludo = prompt("Hola de nuevo, ¿desea comprar un vuelo?, si o no");
}
if (saludo == "si") {
  alert("A continuación le presentamos los vuelos que tenemos disponibles");
  titulo.innerText =
    "Hola Bienvendio a MexiVuelos, estos son nuestros viajes disponibles"; // Este titutlo se va a mostar cuando el usuario diga que si y se mostrara una serie de opciones de vuelos

  vuelos.map((vuelos) => {
    const option = document.createElement("option"); // aqui se crea un nuevo elemento que en este caso son las opciones
    option.innerText = `Destino ${vuelos.nombre}: con un precio de ${vuelos.precio}`; // aqui ingreso los valores que van aparecer en en las opcines
    select.append(option);
  });

  const buton = document.createElement("button"); // aqui creo un boton
  buton.innerText = "Agregar al carrito";
  document.body.append(buton); // indico que parte del archivo html se va a crear
} else if (saludo == "no") {
  titulo2.innerText =
    "MexiVuelos lamenta no poder ayudarle, estamos a sus ordenes, que tenga un buen dia :)"; // En caso de que conteste que no, se mostrara el titutlo y no se va a mostart ninguna opcion a seleccionar
}
