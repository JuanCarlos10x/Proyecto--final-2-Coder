// Carrito de compras, lo primero es que declare mi array de objetos, despues un arry vacio para modificar su valor, y una variable donde se hace la pregunta

const productos = [
  { nombre: "monitor", precio: 2000 },
  { nombre: "tablet", precio: 2500 },
  { nombre: "audifonos", precio: 300 },
  { nombre: "teclado", precio: 400 },
  { nombre: "celular", precio: 5000 },
];

let carrito = [];

let seleccion = prompt("Hola, ¿desea comprar algun producto? si o no");

// Aqui empizo haciendo un ciclo para saber si el usuario dea comprar o no

while (seleccion != "si" && seleccion != "no") {
  alert("Por favor, solo renponde si o no");
  seleccion = prompt("Hola de nuevo, desea comprar algo, si o no");
}

// Si el usuario responde que si, se ejecuta este codigo donde se le van a mostar los productos y su precio

if (seleccion == "si") {
  alert("A continuación nuestra lista de prodcutos");
  let losProductos = productos.map(
    (producto) => producto.nombre + " " + producto.precio + "$"
  );
  alert(losProductos.join(" - "));
} else if (seleccion == "no") {
  // En caso de que responda no, se le mostrara un alaert dando las gracias por visitar
  alert("Gracias por visitar, hasta pronto!");
}

while (seleccion != "no") {
  // Al continar con la compra, saldra un prompt donde va ingresar el producto que sea comprar
  let producto = prompt("Agregar un producto a carrito");
  let precio = 0;

  if (
    producto == "monitor" ||
    producto == "tablet" ||
    producto == "audifonos" ||
    producto == "teclado" ||
    producto == "celular"
  ) {
    switch (producto) {
      case "monitor 27 pulgadas":
        precio = 2000;
        break;

      case "tablet":
        precio = 2500;
        break;

      case "audifonos":
        precio = 300;
        break;

      case "teclado":
        precio = 400;
        break;

      case "celular":
        precio = 5000;
        break;

      default:
        break;
    }

    let unidades = parseInt(prompt("¿Cuantas unidades quiere llevar?")); // Se hace una nueva variable para saber cuantas unidades quiere del producto seleccionado, No se limita el numero de unidades

    carrito.push({ producto, unidades, precio });
    console.log(carrito); // Aqui se imprime el valor en la consola
  } else {
    alert("No tenemos ese producto"); // En caso de que se equivoqué o ingrese un elemento que no existe se ejecuta este alert
  }

  // Al agregar un prodcuto al carrito el usuario tiene la posibilidad de saber si quiere seguir agregrando mas productos o ya no
  //

  seleccion = prompt("Desea seguir comprando");

  while (seleccion === "no") {
    // Si el usuario ya no desa comprar màs productos, se ejecuta el alert
    alert(
      "Gracias por la compra hasta pronto, favor de reviscar la consola, para conocer el total de su compra"
    );
    carrito.forEach((carritoFinal) => {
      console.log(
        `producto: ${carritoFinal.producto}, unidades: ${
          carritoFinal.unidades
        }, total a pagar por prodcuto ${
          carritoFinal.unidades * carritoFinal.precio
        } `
      );
    });
    break;
  }
}

// El total de la compra se impime en consola, se va a mostrar el numero de unidades y su valor
const total = carrito.reduce((ecc, el) => ecc + el.precio * el.unidades, 0);
console.log(`El total a pagar por sus compras es: ${total}`);
