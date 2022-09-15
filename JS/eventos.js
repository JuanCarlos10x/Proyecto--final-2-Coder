// defino 2 objetos para poder controlar lo que va a pasar con js

const db = {
  // db -- data base -- base de datos
  methods: {
    // son funciones dentro de un objeto
    find: (id) => {
      // hace ha que regrese cada elemto donde el id sea igual al id
      return db.items.find((item) => item.id === id);
    },
    remove: (items) => {
      // items son los elemetos que se desean elminar de la base de datos
      items.forEach((item) => {
        const product = db.methods.find(item.id);
        product.qty = product.qty - item.qty; // de la base de datos se va a ir disminuyendo las uniades cada vez que se agregue al carrito
      });
      console.log(db); // se va a imprimir en la consola
    },
  },
  items: [
    // aqui estan mis articulos -- qty hace refencia a las unidades del prodcutos
    {
      id: 0,
      nombre: "Monitor",
      precio: 1500,
      qty: 5,
    },
    {
      id: 1,
      nombre: "Audifonos",
      precio: 500,
      qty: 10,
    },
    {
      id: 2,
      nombre: "Teclado",
      precio: 1000,
      qty: 15,
    },
    {
      id: 3,
      nombre: "TV",
      precio: 15000,
      qty: 5,
    },
    {
      id: 4,
      nombre: "Celular",
      precio: 5000,
      qty: 10,
    },
    {
      id: 5,
      nombre: "Tablet",
      precio: 2500,
      qty: 10,
    },
  ],
};

// esta es informacion indpendiente de la base de datos

const shoppingCart = {
  items: [],
  methods: {
    // estas funciones van a ser controladas a travez de mis 2 objetos
    add: (id, qty) => {
      //
      const cartItem = shoppingCart.methods.get(id);

      if (cartItem) {
        if (shoppingCart.methods.hasInventory(id, qty + cartItem.qty)) {
          //
          cartItem.qty += qty;
        } else {
          alert("No hay inventario suficiente");
        }
      } else {
        shoppingCart.items.push({ id, qty });
      }
    },
    remove: (id, qty) => {
      //
      const cartItem = shoppingCart.methods.get(id);
      if (cartItem.qty - qty > 0) {
        cartItem.qty -= qty;
      } else {
        shoppingCart.items = shoppingCart.items.filter(
          (item) => item.id !== id
        );
      }
    },
    count: () => {
      return shoppingCart.items.reduce((acc, item) => acc + item.qty, 0);
    },
    get: (id) => {
      const index = shoppingCart.items.findIndex((item) => item.id === id);
      return index >= 0 ? shoppingCart.items[index] : null;
    },
    getTotal: () => {
      const total = shoppingCart.items.reduce((acc, item) => {
        const found = db.methods.find(item.id);
        return (acc += found.precio * item.qty);
      }, 0);
      return total;
    },
    hasInventory: (id, qty) => {
      //
      return db.items.find((item) => item.id === id).qty - qty >= 0;
    },
    purchase: () => {
      db.methods.remove(shoppingCart.items);
      shoppingCart.items = [];
    },
  },
};

renderStore();

function renderStore() {
  const html = db.items.map((item) => {
    return `
        <div class="item">
          <div class="title">${item.nombre}</div>
          <div class="price">${numberToCurrency(item.precio)}</div>
          <div class="qty">${item.qty}</div>
  
          <div class="actions">
            <button clas="add" data-id="${item.id}">Agregar al Carrito</button>
          </div>
  
        </div>
      `;
  });

  document.querySelector("#store-container").innerHTML = html.join("");

  document.querySelectorAll(".item .actions .add").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = button.getAttribute("data-id");
      const item = db.methods.find(id);

      if (item && item.qty - 1 > 0) {
        // añadir a shopping cart
        shoppingCart.methods.add();
      } else {
        console.log("ya nop hay inventario");
      }
    });
  });
}

function numberToCurrency(n) {
  // esto sirve para que tengan el sigono de $ y con cuantos decimales quiere que aparesca el precio
  return new Intl.NumberFormat("en-US", {
    maximumSignificantDigits: 2,
    style: "currency",
    currency: "USD",
  }).format(n);
}
