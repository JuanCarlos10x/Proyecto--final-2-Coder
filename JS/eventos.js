// Aqui defino 2 objetos que despues se van a utilizar

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
    // aqui estan mis articulos -- qty hace refencia a las unidades del prodcutos, tambien cambie algunos nombres
    {
      id: 0,
      title: "Monitor",
      price: 1500,
      qty: 5,
    },
    {
      id: 1,
      title: "Audifonos",
      price: 500,
      qty: 10,
    },
    {
      id: 2,
      title: "Teclado",
      price: 1000,
      qty: 15,
    },
    {
      id: 3,
      title: "TV",
      price: 15000,
      qty: 5,
    },
    {
      id: 4,
      title: "Celular",
      price: 5000,
      qty: 10,
    },
    {
      id: 5,
      title: "Tablet",
      price: 2500,
      qty: 10,
    },
  ],
};

const shoppingCart = {
  items: [],
  methods: {
    // estas funciones se van a minupular con las 2 funciones del inicio, sirven para poder añadir, rmeover, conocer los elemtos que se estan añadiendo ectcetera
    add: (id, qty) => {
      const cartItem = shoppingCart.methods.get(id);
      if (cartItem) {
        if (shoppingCart.methods.hasInventory(id, qty + cartItem.qty)) {
          cartItem.qty++;
        } else {
          alert("No hay más inventario");
        }
      } else {
        shoppingCart.items.push({ id, qty });
      }
    },
    remove: (id, qty) => {
      const cartItem = shoppingCart.methods.get(id);

      if (cartItem.qty - 1 > 0) {
        cartItem.qty--;
      } else {
        shoppingCart.items = shoppingCart.items.filter(
          (item) => item.id !== id
        );
      }
    },
    count: () => {
      return shoppingCart.items.reduce((acc, item) => acc + item.qyt, 0);
    },
    get: (id) => {
      const index = shoppingCart.items.findIndex((item) => item.id === id);
      return index >= 0 ? shoppingCart.items[index] : null;
    },
    getTotal: () => {
      let total = 0;
      shoppingCart.items.forEach((item) => {
        const found = db.methods.find(item.id);
        total += found.price * item.qty;
      });
      return total;
    },
    hasInventory: (id, qty) => {
      return db.items.find((item) => item.id === id).qty - qty >= 0;
    },
    purchase: () => {
      db.methods.remove(shoppingCart.items);
    },
  },
};

// en estas funciones son las que se van a impirmir en la patalla con los datos de los elementos

renderStore();

function renderStore() {
  const html = db.items.map((item) => {
    // aqui se estan añadiendo los elementos que se van a mostrar
    return `
            <div class="item">
                  <div class="title">${item.title}</div>
                  <div class="price">${numberToCurrency(item.price)}</div>
                  <div class="qty">${item.qty} unidades</div>
                <div class="actions">
                  <button class="add" data-id="${
                    item.id
                  }">Añadir al carrtio</button>
                </div>
            </div>`;
  });

  document.querySelector("#store-container").innerHTML = html.join("");

  document.querySelectorAll(".item .actions .add").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = parseInt(button.getAttribute("data-id"));
      const item = db.methods.find(id);

      if (item && item.qty - 1 > 0) {
        shoppingCart.methods.add(id, 1);
        console.log(db, shoppingCart);
        renderShoppingCart();
      } else {
        alert("Ya no hay existencia de ese artículo");
      }
    });
  });
}

// aqui se van a ver cambios en las unidades de los elemtos ya que al añadirse al carrtio va a disminuir la cantidad de unidades del producto

function renderShoppingCart() {
  const html = shoppingCart.items.map((item) => {
    const dbItem = db.methods.find(item.id);
    return `
                <div class="item">
                    <div class="title">${dbItem.title}</div>
                    <div class="price">${numberToCurrency(dbItem.price)}</div>
                    <div class="qty">${item.qty} unidades</div>
                    <div class="subtotal">Subtotal: ${numberToCurrency(
                      item.qty * dbItem.price
                    )}</div>
                    <div class="actions">
                        <button class="addOne" data-id="${dbItem.id}">+</button>
                        <button class="removeOne" data-id="${
                          dbItem.id
                        }">-</button>
                    </div>
                </div>
            `;
  });

  // aqui defino los eventos de los botonoes y lo que van a ejecutar, tanto en los elemtos (productos) como en la ventana flotante

  const closeButton = `
      <div class="cart-header">
        <button id="bClose">Close</button>
      </div>`;

  const purchaseButton =
    shoppingCart.items.length > 0
      ? `
        <div class="cart-actions">
          <button id="bPurchase">Terminar compra</button>
          </div>`
      : "";

  const total = shoppingCart.methods.getTotal();
  const totalDiv = `<div class="total">Total: ${numberToCurrency(total)}</div>`;
  document.querySelector("#shopping-cart-container").innerHTML =
    closeButton + html.join("") + totalDiv + purchaseButton;

  document.querySelector("#shopping-cart-container").classList.remove("hide");
  document.querySelector("#shopping-cart-container").classList.add("show");

  document.querySelectorAll(".addOne").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = parseInt(button.getAttribute("data-id"));
      shoppingCart.methods.add(id, 1);
      renderShoppingCart();
    });
  });

  document.querySelectorAll(".removeOne").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = parseInt(button.getAttribute("data-id"));
      shoppingCart.methods.remove(id, 1);
      renderShoppingCart();
    });
  });

  document.querySelector("#bClose").addEventListener("click", (e) => {
    document.querySelector("#shopping-cart-container").classList.remove("show");
    document.querySelector("#shopping-cart-container").classList.add("hide");
    // shoppingCartContainer.classList.remove("show");
    // shoppingCartContainer.classList.add("hide");
  });

  const bPurchase = document.querySelector("#bPurchase");
  if (bPurchase) {
    bPurchase.addEventListener("click", (e) => {
      shoppingCart.methods.purchase();
      renderStore();
      renderShoppingCart();
    });
  }
}

function numberToCurrency(n) {
  return new Intl.NumberFormat("en-US", {
    // esta funcion sirve para que añada el signo de $ hace una conversion a moneda
    maximumSignificantDigits: 2,
    style: "currency",
    currency: "USD",
  }).format(n);
}
