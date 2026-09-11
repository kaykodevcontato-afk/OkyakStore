```javascript
// ======================================================
// OKYAK STORE — SCRIPT PRINCIPAL
// Gift Cards • Busca • Filtros • Carrinho • WhatsApp
// ======================================================


// ======================================================
// PRODUTOS
// ======================================================

const products = [

  // =========================
  // XBOX — DISPONÍVEL
  // =========================

  {
  id: 1,
  name: "Cartão-presente digital Xbox",
  category: "Xbox",
  value: "R$ 5,00",
  price: 7.00,
  image: "https://m.media-amazon.com/images/I/51z5xQx7JVL._SL1000_.jpg",
  description: "Cartão-presente Xbox com R$ 5,00 de saldo.",
  stock: true
},


  // =========================
  // GOOGLE PLAY — SEM ESTOQUE
  // =========================

  {
    id: 2,
    name: "Cartão-presente Google Play",
    category: "Google Play",
    value: "R$ 10,00",
    price: 12.00,
    icon: "▶️",
    description: "Cartão-presente Google Play.",
    stock: false
  },


  // =========================
  // STEAM — SEM ESTOQUE
  // =========================

  {
    id: 3,
    name: "Cartão-presente Steam",
    category: "Steam",
    value: "R$ 10,00",
    price: 12.00,
    icon: "🎮",
    description: "Cartão-presente Steam.",
    stock: false
  },


  // =========================
  // PLAYSTATION — SEM ESTOQUE
  // =========================

  {
    id: 4,
    name: "Cartão-presente PlayStation",
    category: "PlayStation",
    value: "R$ 10,00",
    price: 12.00,
    icon: "🎮",
    description: "Cartão-presente PlayStation.",
    stock: false
  },


  // =========================
  // ROBLOX — SEM ESTOQUE
  // =========================

  {
    id: 5,
    name: "Cartão-presente Roblox",
    category: "Roblox",
    value: "R$ 10,00",
    price: 12.00,
    icon: "🧱",
    description: "Cartão-presente Roblox.",
    stock: false
  },


  // =========================
  // FREE FIRE — SEM ESTOQUE
  // =========================

  {
    id: 6,
    name: "Gift Card Free Fire",
    category: "Free Fire",
    value: "R$ 10,00",
    price: 12.00,
    icon: "🔥",
    description: "Gift Card para Free Fire.",
    stock: false
  }

];


// ======================================================
// ELEMENTOS
// ======================================================

const productsContainer = document.getElementById("products");
const searchInput = document.getElementById("search");
const filtersContainer = document.getElementById("filters");

const cartButton = document.getElementById("openCart");
const closeCartButton = document.getElementById("closeCart");
const cart = document.getElementById("cart");
const overlay = document.getElementById("overlay");

const cartItemsContainer = document.getElementById("cartItems");
const cartEmpty = document.getElementById("cartEmpty");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const clearCartButton = document.getElementById("clearCart");
const checkoutButton = document.getElementById("checkout");

const customerModal = document.getElementById("customerModal");
const closeModalButton = document.getElementById("closeModal");
const orderForm = document.getElementById("orderForm");

const customerName = document.getElementById("customerName");
const customerPhone = document.getElementById("customerPhone");
const customerNote = document.getElementById("customerNote");

const yearElement = document.getElementById("year");


// ======================================================
// ESTADO
// ======================================================

let cartItems = [];
let activeCategory = "Todos";
let searchTerm = "";


// ======================================================
// FORMATAÇÃO
// ======================================================

function formatPrice(value) {

  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

}


// ======================================================
// MOSTRAR PRODUTOS
// ======================================================

function renderProducts() {

  if (!productsContainer) return;


  const filteredProducts = products.filter(product => {

    const matchesCategory =
      activeCategory === "Todos" ||
      product.category === activeCategory;


    const text =
      `${product.name} ${product.category} ${product.description}`
        .toLowerCase();


    const matchesSearch =
      text.includes(searchTerm.toLowerCase());


    return matchesCategory && matchesSearch;

  });


  if (filteredProducts.length === 0) {

    productsContainer.innerHTML = `
      <div style="
        grid-column:1/-1;
        text-align:center;
        padding:40px;
        color:#aaa5bd;
      ">
        🔎 Nenhum Gift Card encontrado.
      </div>
    `;

    return;
  }


  productsContainer.innerHTML = filteredProducts.map(product => {

    // =========================
    // PRODUTO SEM ESTOQUE
    // =========================

    if (!product.stock) {

      return `
        <article class="product">

          <div class="product-icon">
            ${product.icon}
          </div>

          <span class="tag">
            ${product.category}
          </span>

          <h3>
            ${product.name}
          </h3>

          <p class="tag">
            ${product.description}
          </p>

          <div class="price">
            ${formatPrice(product.price)}
          </div>

          <button
            class="btn add"
            type="button"
            disabled
            style="
              opacity:.55;
              cursor:not-allowed;
            "
          >
            🚫 Sem estoque
          </button>

        </article>
      `;

    }


    // =========================
    // PRODUTO DISPONÍVEL
    // =========================

    return `
      <article class="product">

        <div class="product-icon">
          ${product.icon}
        </div>

        <span class="tag">
          ${product.category}
        </span>

        <h3>
          ${product.name}
        </h3>

        <p class="tag">
          ${product.description}
        </p>

        <div class="price">
          ${formatPrice(product.price)}
        </div>

        <button
          class="btn add"
          type="button"
          onclick="addToCart(${product.id})"
        >
          🛒 Adicionar ao carrinho
        </button>

      </article>
    `;

  }).join("");

}


// ======================================================
// FILTROS
// ======================================================

if (filtersContainer) {

  filtersContainer.addEventListener("click", function(event) {

    const button = event.target.closest(".filter");

    if (!button) return;


    activeCategory =
      button.dataset.category;


    document.querySelectorAll(".filter").forEach(filter => {

      filter.classList.remove("active");

    });


    button.classList.add("active");


    renderProducts();

  });

}


// ======================================================
// BUSCA
// ======================================================

if (searchInput) {

  searchInput.addEventListener("input", function() {

    searchTerm =
      this.value.trim();


    renderProducts();

  });

}


// ======================================================
// ADICIONAR AO CARRINHO
// ======================================================

function addToCart(productId) {

  const product =
    products.find(item => item.id === productId);


  if (!product) return;


  if (!product.stock) {

    alert("Este Gift Card está sem estoque.");

    return;

  }


  const existingItem =
    cartItems.find(item => item.id === productId);


  if (existingItem) {

    existingItem.quantity += 1;

  } else {

    cartItems.push({
      ...product,
      quantity: 1
    });

  }


  updateCart();

  openCart();

}


// ======================================================
// ALTERAR QUANTIDADE
// ======================================================

function changeQuantity(productId, change) {

  const item =
    cartItems.find(product => product.id === productId);


  if (!item) return;


  item.quantity += change;


  if (item.quantity <= 0) {

    cartItems =
      cartItems.filter(
        product => product.id !== productId
      );

  }


  updateCart();

}


// ======================================================
// REMOVER
// ======================================================

function removeFromCart(productId) {

  cartItems =
    cartItems.filter(
      product => product.id !== productId
    );


  updateCart();

}


// ======================================================
// ATUALIZAR CARRINHO
// ======================================================

function updateCart() {

  if (!cartItemsContainer) return;


  if (cartItems.length === 0) {

    cartItemsContainer.innerHTML = "";

    if (cartEmpty) {
      cartEmpty.style.display = "block";
    }

  } else {

    if (cartEmpty) {
      cartEmpty.style.display = "none";
    }


    cartItemsContainer.innerHTML =
      cartItems.map(item => {

        const subtotal =
          item.price * item.quantity;


        return `
          <div class="cart-row">

            <div>

              <strong>
                ${item.name}
              </strong>

              <small>
                ${formatPrice(item.price)} cada
              </small>

              <div style="
                margin-top:8px;
                display:flex;
                align-items:center;
                gap:7px;
              ">

                <button
                  class="qty button"
                  onclick="changeQuantity(${item.id}, -1)"
                  type="button"
                >
                  −
                </button>

                <strong>
                  ${item.quantity}
                </strong>

                <button
                  class="qty button"
                  onclick="changeQuantity(${item.id}, 1)"
                  type="button"
                >
                  +
                </button>

              </div>

            </div>


            <div style="text-align:right">

              <strong>
                ${formatPrice(subtotal)}
              </strong>

              <button
                onclick="removeFromCart(${item.id})"
                type="button"
                style="
                  display:block;
                  margin-top:8px;
                  background:none;
                  border:0;
                  color:#ff6b9d;
                  cursor:pointer;
                "
              >
                Remover
              </button>

            </div>

          </div>
        `;

      }).join("");

  }


  const totalQuantity =
    cartItems.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );


  const totalPrice =
    cartItems.reduce(
      (total, item) =>
        total + (item.price * item.quantity),
      0
    );


  if (cartCount) {

    cartCount.textContent =
      totalQuantity;

  }


  if (cartTotal) {

    cartTotal.textContent =
      formatPrice(totalPrice);

  }

}


// ======================================================
// ABRIR CARRINHO
// ======================================================
```
