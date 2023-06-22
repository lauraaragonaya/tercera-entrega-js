const products = JSON.parse(`[
    { 
        "id": 1,
        "name": "Alfajor Milka",
        "price": 150,
        "src": "./images/milka 2.jpeg"
    },
    { 
        "id": 2,
        "name": "Yerba Playadito",
        "price": 850,
        "src": "./images/playadito.jpeg"
    },
    { 
        "id": 3,
        "name": "Gaseosa Coca-Cola", 
        "price": 330, 
        "src": "./images/cocacola.jpeg"
    }
]`);

let carrito = [];

// Sample product data
function getStorageCarrito() {
  const carritoFromJSON = localStorage.getItem("carrito");
  return carritoFromJSON == null
    ? []
    : (parsedCarrito = JSON.parse(carritoFromJSON));
}
function setStorageCarrito() {
  const carritoJSON = JSON.stringify(carrito);
  localStorage.setItem("carrito", carritoJSON);
}

//setStorageCarrito();
//const cartBody = document.querySelector("#cartBody");

//
//producto.img = document.createElement("img");
//img.src=".//images/milka 2.jpeg"

carrito = getStorageCarrito();

if (carrito != []) {
  mostrar_carrito();
}

// Function to display products on the webpage
function displayProducts() {
  const productList = document.getElementById("product-list");

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    const nameElement = document.createElement("h3");
    nameElement.textContent = product.name;

    const imageElement = document.createElement("img");
    imageElement.src = product.src;

    const priceElement = document.createElement("p");
    priceElement.textContent = "$" + product.price;

    const addButton = document.createElement("button");
    addButton.textContent = "Sumar al carrito";
    //addButton.addEventListener("click", () => agregar_a_carrito(product));
    addButton.classList.add("botonCompra");

    productElement.appendChild(imageElement);
    productElement.appendChild(nameElement);
    productElement.appendChild(priceElement);
    productElement.appendChild(addButton);

    productList.appendChild(productElement);
  });
}

// Call the displayProducts function when the page loads
//window.addEventListener("load", displayProducts);
displayProducts();

function agregar_a_carrito(e) {
  let hijo = e.target;
  let padre = hijo.parentNode;

  let nombre_producto = padre.querySelector("h3").textContent;

  let precio_producto = padre.querySelector("p").textContent;

  let img_producto = padre.querySelector("img").src;

  let element = carrito.find((element) => element.nombre == nombre_producto);
  let found = element != undefined;
  let cantidad_producto = !found ? 1 : element.cantidad++;

  if (!found) {
    let producto = {
      nombre: nombre_producto,
      precio: precio_producto,
      img: img_producto,
      cantidad: cantidad_producto,
    };
    carrito.push(producto);
  } else {
    let index = carrito.indexOf(element);
    carrito[index].cantidad_producto;
  }

  setStorageCarrito();

  mostrar_carrito();
}

function mostrar_carrito() {
  let tabla = document.getElementById("tbody");
  tabla.innerHTML = "";

  for (let producto of carrito) {
    let fila = document.createElement("tr");
    fila.id = producto.nombre;
    fila.innerHTML = `<td><img src="${producto.img}"></td>
                          <td><p>${producto.nombre}</p></td>
                          <td>${producto.cantidad}</td>
                          <td>${producto.precio}</td>
                          <td><button class="btn btn-danger borrar_elemento">Borrar</button></td>`;
    tabla.append(fila);
  }

  let btn_borrar = document.querySelectorAll(".borrar_elemento");

  for (let btn of btn_borrar) {
    btn.addEventListener("click", borrar_producto);
  }
}

function borrar_producto(e) {
  let abuelo = e.target.parentNode.parentNode;
  let cells = abuelo.cells;
  let nombre_producto = abuelo.id;
  let element = carrito.find((element) => element.nombre == nombre_producto);
  let cantidad_producto = element.cantidad - 1;

  let index = carrito.indexOf(element);
  if (cantidad_producto == 0) {
    abuelo.remove();
    carrito.splice(index, 1);
  } else {
    cells[2].innerHTML = cantidad_producto;
    carrito[index].cantidad = cantidad_producto;
  }

  setStorageCarrito();
}

let btn_compra = document.querySelectorAll(".botonCompra");

for (let boton of btn_compra) {
  boton.addEventListener("click", agregar_a_carrito);
}

let btn_carrito = document.getElementById("mostrar_carrito");

btn_carrito.addEventListener("click", function () {
  let carrito = document.getElementById("carrito");

  if (carrito.style.display != "none") {
    carrito.style.display = "none";
  } else {
    carrito.style.display = "block";
  }
});
