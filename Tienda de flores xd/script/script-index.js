/* sebastian urrego pruea de pablo  -  */
// Arreglo de productos en el cart
const cart = [];

document.addEventListener("DOMContentLoaded", function () {
  // Productos en el catálogo.
  const productList = [
    {
      id: 1,
      image: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Rosa Dorada (Gold Rose)",
      description: "La Rosa Dorada ",
      price: 19.99,
    },
    {
      id: 2,
      image: "https://img.freepik.com/foto-gratis/composicion-floral-moderna-estilo-elegante_23-2147897554.jpg?t=st=1715025195~exp=1715028795~hmac=83eb616dc294f80127fb5af087884cac6b846f7237d76cd4d8f1280100a6e9dc&w=826",
      name: "Orquídea Celestial (Heavenly Orchid)",
      description: "La Orquídea Celestial.",
      price: 29.99,
    },
    {
      id: 3,
      image: "https://img.freepik.com/foto-gratis/hermosa-flor-lirio-amarillo_23-2148875534.jpg?t=st=1715025298~exp=1715028898~hmac=aa4e4a282b76947699205ac711054c2b96eed591f31292a6d2bf14f1584b2739&w=996",
      name: "Lirio de Plata (Silver Lily)",
      description: "El Lirio de Plata es una flor única con pétalos plateados",
      price: 24.99,
    },
    {
      id: 4,
      image: "https://get.pxhere.com/photo/nature-blossom-plant-white-photography-meadow-flower-petal-bloom-summer-daisy-spring-botany-yellow-flora-wild-flower-wildflower-flowers-close-up-wild-flowers-asteraceae-daisies-marguerite-composites-macro-photography-garden-plant-bl-tenmeer-flowering-plant-container-plant-meadow-margerite-daisy-family-schnittblume-meadows-margerite-wild-flower-meadow-leucanthemum-paid-feverfew-leucanthemum-vulgare-oxeye-daisy-plant-stem-land-plant-chamaemelum-nobile-marguerite-daisy-1016281.jpg",
      name: "Tulipán de Medianoche (Midnight Tulip)",
      description: "El Tulipán de Medianoche ",
      price: 14.99,
    },
    {
      id: 5,
      image: "https://images.pexels.com/photos/2651796/pexels-photo-2651796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Girasol Brillante (Bright Sunflower)",
      description: "El Girasol Brillante es una flor que irradia",
      price: 59.99,
    },
    {
      id: 6,
      image: "https://c.pxhere.com/photos/ea/f2/water_lily_bloom_leaf_pond_aquatic_yellow_flower_water-1101082.jpg!d",
      name: "Margarita de Luna (Moon Daisy)",
      description: "La Margarita de Luna es una flor blanca con un delicado.",
      price: 12.99,
    },
  ];

  // Obtiene el contenedor donde se mostrará el catálogo y el resumen de compra.
  const productListContainer = document.getElementById("productList");
  const checkoutCartContainer = document.getElementById("checkoutCart");
  const totalCheckout = document.getElementById("totalCheckout");

  // Genera las tarjetas de productos en el catálogo y las agrega al contenedor.
  productList.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("col-md-4", "mb-4");
    card.innerHTML = `
            <div class="card card-custom neo-md rounded-md">
                <img src="${product.image}" class="card-img-top card-img-custom" alt="Producto ${product.id}">
                <div class="card-body">
                    <h5 class="card-title">Producto ${product.id}</h5>
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">Descripción: ${product.description}</p>
                    <p class="card-text">Precio: $${product.price}</p>
                    <div class="input-group">
                        <span class="input-group-btn">
                            <button type="button" class="btn btn-danger btn-number" data-type="minus" data-field="inputQuantity${product.id}">-</button>
                        </span>
                        <input type="text" id="inputQuantity${product.id}" class="form-control input-number" value="1" min="1" max="10">
                        <span class="input-group-btn">
                            <button type="button" class="btn btn-success btn-number" data-type="plus" data-field="inputQuantity${product.id}">+</button>
                        </span>
                    </div>
                    <button class="btn btn-primary add-to-cart" data-product-id="${product.id}" style="margin-top: 20px">Agregar al cart</button>
                </div>
            </div>
        `;
    productListContainer.appendChild(card);

    // Obtiene la cantidad de productos a agregar al cart y manda llamar la función para agregar el producto al cart.
    const btnAdd = card.querySelector(".add-to-cart");
    btnAdd.addEventListener("click", function () {
      const quantity = parseInt(
        document.getElementById(`inputQuantity${product.id}`).value
      );

      if (quantity > 0) {
        addProduct(product, quantity);
      }
    });
  });

  // Almacena en el arreglo los productos agregados al cart y actualiza la cantidad de productos en el carrito en caso de que se agregue más de uno del mismo producto.
  function addProduct(product, quantity) {
    const cartProduct = cart.find((item) => item.product.id === product.id);

    if (cartProduct) {
      cartProduct.quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }

    updateCheckoutCart();
  }

  // Eventos para incrementar y decrementar la cantidad de productos en el cart.
  const btnNumberButtons = document.querySelectorAll(".btn-number");
  btnNumberButtons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      const fieldName = this.getAttribute("data-field");
      const type = this.getAttribute("data-type");
      const input = document.getElementById(fieldName);
      const currentVal = parseInt(input.value);

      if (!isNaN(currentVal)) {
        if (type === "minus") {
          if (currentVal > input.min) {
            input.value = currentVal - 1;
          }
        } else if (type === "plus") {
          if (currentVal < input.max) {
            input.value = currentVal + 1;
          }
        }
      }
    });
  });

  // Elimina un producto del carrito cuando se presiona el botón de eliminar.
  const checkoutCart = document.getElementById("checkoutCart");
  checkoutCart.addEventListener("click", function (e) {
    if (e.target.classList.contains("btnDelete")) {
      const id = e.target.parentElement.parentElement.firstElementChild
        .textContent;
      const index = cart.findIndex((item) => item.product.id === id);

      cart.splice(index, 1);
      updateCheckoutCart();
    }
  });

  // Actualiza el resumen de compra en el carrito cuando se agrega un producto o se cambia la cantidad de productos.
  function updateCheckoutCart() {
    checkoutCart.innerHTML = "";
    let subtotal = 0;

    cart.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>Producto ${item.product.id}</td>
                <td>${item.product.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.product.price}</td>
                <td>$${item.product.price * item.quantity}</td>
                <td><button type="button" class="btn btn-danger btnDelete">Eliminar</button></td>
            `;
      checkoutCart.appendChild(row);

      subtotal += item.product.price * item.quantity;
    });

    totalCheckout.textContent = `$${subtotal.toFixed(2)}`;
  }
});

// Botón para comprar productos y mandarlos al recibo.
const btnBuy = document.querySelector(".btn-comprar");
btnBuy.addEventListener("click", function () {
  if (cart.length > 0) {
    localStorage.removeItem("data-cart");

    const cartProducts = JSON.stringify(cart);
    localStorage.setItem("data-cart", cartProducts);

    window.location.href = "receipt.html";
  } else {
    alert("El cart está vacío.");
  }
});
