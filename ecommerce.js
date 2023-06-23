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

function getStorageCarrito() {
  const cart2json = localStorage.getItem("carrito");
  return (cart2json == null)?([]):(JSON.parse(cart2json));
}
function setStorageCarrito() {
  const cart2string = JSON.stringify(carrito);
  localStorage.setItem("carrito", cart2string);
}

carrito = getStorageCarrito();

if (carrito != []) {
  showCart();
}

function displayProducts() {
  const product_list = document.getElementById("product-list");

  products.forEach((product) => {
    const product_element = document.createElement("div");
    product_element.classList.add("product");

    const name_element = document.createElement("h3");
    name_element.textContent = product.name;

    const image_element = document.createElement("img");
    image_element.src = product.src;

    const price_element = document.createElement("p");
    price_element.textContent = "$" + product.price;

    const add_button = document.createElement("button");
    add_button.textContent = "Sumar al carrito";
    add_button.classList.add("add2Cart");

    product_element.appendChild(image_element);
    product_element.appendChild(name_element);
    product_element.appendChild(price_element);
    product_element.appendChild(add_button);
    product_list.appendChild(product_element);
  });
}

displayProducts();

function add2Cart(e) {
  let hijo = e.target;
  let padre = hijo.parentNode;

  let nombre_producto = padre.querySelector("h3").textContent;
  let element = carrito.find((element) => element.nombre == nombre_producto);
  let found = element != undefined;
  let cantidad_producto = (!found)?(1):(element.cantidad+1);

  if (!found) {
    let precio_producto = parseInt(padre.querySelector("p").textContent.split("$")[1], 10);
    let img_producto = padre.querySelector("img").src;
    let producto = {
      nombre: nombre_producto,
      precio: precio_producto,
      img: img_producto,
      cantidad: cantidad_producto,
    };
    carrito.push(producto);
  } else {
    let index = carrito.indexOf(element);
    let product = carrito[index];
    let unit_price = product.precio/product.cantidad;
    carrito[index].precio += unit_price;
    carrito[index].cantidad = cantidad_producto;
  }

  setStorageCarrito();
  showCart();
}

function showCart() {
  let tabla = document.getElementById("tbody");
  tabla.innerHTML = "";

  for (let producto of carrito) {
    let fila = document.createElement("tr");
    fila.id = producto.nombre;
    fila.innerHTML = `<td><img src="${producto.img}"></td>
                          <td><p>${producto.nombre}</p></td>
                          <td>${producto.cantidad}</td>
                          <td>${producto.precio}</td>
                          <td><button class="btn btn-danger delFromCart">Borrar</button></td>`;
    tabla.append(fila);
  }

  let btn_borrar = document.querySelectorAll(".delFromCart");

  for (let btn of btn_borrar) {
    btn.addEventListener("click", delFromCart);
  }
}

function delFromCart(e) {
  let abuelo = e.target.parentNode.parentNode;
  let cells = abuelo.cells;
  let nombre_producto = abuelo.id;
  let product = carrito.find((product) => product.nombre == nombre_producto);
  let cantidad_producto = product.cantidad - 1;

  let index = carrito.indexOf(product);
  if (cantidad_producto == 0) {
    abuelo.remove();
    carrito.splice(index, 1);
  } else {
    let unit_price = product.precio/product.cantidad;
    cells[2].innerHTML = cantidad_producto;
    carrito[index].precio -= unit_price;
    carrito[index].cantidad = cantidad_producto;
  }

  setStorageCarrito();
  showCart();
}

let btn_compra = document.querySelectorAll(".add2Cart");

for (let boton of btn_compra) {
  boton.addEventListener("click", add2Cart);
}

let btn_carrito = document.getElementById("showCart");

btn_carrito.addEventListener("click", function () {
  let carrito = document.getElementById("carrito");

  if (carrito.style.display != "none") {
    carrito.style.display = "none";
  } else {
    carrito.style.display = "block";
  }
});
