// ======================================================
// OKYAK STORE — SCRIPT PRINCIPAL
// Gift Cards • Busca • Filtros • Carrinho • WhatsApp
// ======================================================


// ======================================================
// PRODUTOS
// ======================================================

const products = [

  // ==================================================
  // XBOX — DISPONÍVEL
  // ==================================================

  {
    id: 1,
    name: "Cartão-presente digital Xbox",
    category: "Xbox",
    value: "R$ 5,00",
    price: 7.00,

    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Xbox_logo_(2019).svg",

    icon: "🎮",

    description:
      "Cartão-presente Xbox com R$ 5,00 de saldo.",

    stock: true
  },


  // ==================================================
  // GOOGLE PLAY — SEM ESTOQUE
  // ==================================================

  {
    id: 2,
    name: "Cartão-presente Google Play",
    category: "Google Play",
    value: "R$ 10,00",
    price: 12.00,

    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Google_Play.svg",

    icon: "▶️",

    description:
      "Cartão-presente Google Play.",

    stock: false
  },


  // ==================================================
  // STEAM — SEM ESTOQUE
  // ==================================================

  {
    id: 3,
    name: "Cartão-presente Steam",
    category: "Steam",
    value: "R$ 10,00",
    price: 12.00,

    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Steam_icon_logo.svg",

    icon: "🎮",

    description:
      "Cartão-presente Steam.",

    stock: false
  },


  // ==================================================
  // PLAYSTATION — SEM ESTOQUE
  // ==================================================

  {
    id: 4,
    name: "Cartão-presente PlayStation",
    category: "PlayStation",
    value: "R$ 10,00",
    price: 12.00,

    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/PlayStation_logo.svg",

    icon: "🎮",

    description:
      "Cartão-presente PlayStation.",

    stock: false
  },


  // ==================================================
  // ROBLOX — DISPONÍVEL
  // ==================================================

{
  id: 5,
  name: "Roblox — 1.050 Robux",
  category: "Roblox",
  value: "1.050 Robux",
  price: 71.50,
  
  image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Roblox_Logo.svg",
  icon: "⬜",
  
  description:  
    "Receba 1.050 Robux para usar na sua conta Roblox.",
  
  stock: true
},


  // ==================================================
  // FREE FIRE — SEM ESTOQUE
  // ==================================================

  {
    id: 6,
    name: "Gift Card Free Fire",
    category: "Free Fire",
    value: "R$ 10,00",
    price: 12.00,

    image:
      "https://upload.wikimedia.org/wikipedia/en/9/9a/Garena_Free_Fire_Logo.png",

    icon: "🔥",

    description:
      "Gift Card para Free Fire.",

    stock: false
  }

];


// ======================================================
// ELEMENTOS DO HTML
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
// FORMATAÇÃO DE PREÇO
// ======================================================

function formatPrice(value) {

  return Number(value).toLocaleString("pt-BR", {
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
      <div class="catalog-empty">
        🔎 Nenhum Gift Card encontrado.
      </div>
    `;

    return;
  }


  productsContainer.innerHTML = filteredProducts.map(product => {

    return `
      <article class="product ${product.stock ? "" : "out-of-stock"}">

        <div class="product-image">

          <img
            src="${product.image}"
            alt="${product.name}"
            loading="lazy"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='grid';"
          >

          <div
            class="product-icon image-fallback"
            style="display:none;"
          >
            ${product.icon}
          </div>

          <span class="stock-badge ${product.stock ? "available" : ""}">
            ${product.stock ? "DISPONÍVEL" : "SEM ESTOQUE"}
          </span>

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

        ${
          product.stock
          ?
          `<div class="price">${formatPrice(product.price)}</div>`
          :
          `<div class="price unavailable">Indisponível</div>`
        }

        ${
          product.stock
          ?
          `
          <button
            class="btn add"
            type="button"
            onclick="addToCart(${product.id})"
          >
            🛒 Adicionar ao carrinho
          </button>
          `
          :
          `
          <button
            class="btn add"
            type="button"
            disabled
          >
            🚫 Sem estoque
          </button>
          `
        }

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

    activeCategory = button.dataset.category || "Todos";

    document.querySelectorAll(".filter").forEach(filter => {
      filter.classList.remove("active");
    });

    button.classList.add("active");

    renderProducts();

  });

}


// ======================================================
// PESQUISA
// ======================================================

if (searchInput) {

  searchInput.addEventListener("input", function() {

    searchTerm = this.value.trim();

    renderProducts();

  });

}


// ======================================================
// ADICIONAR AO CARRINHO
// ======================================================

function addToCart(productId) {

  const product = products.find(
    item => item.id === Number(productId)
  );

  if (!product) {
    console.error("Produto não encontrado:", productId);
    return;
  }


  if (!product.stock) {

    alert("Este Gift Card está sem estoque.");

    return;

  }


  const existingItem = cartItems.find(
    item => item.id === product.id
  );


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

  const item = cartItems.find(
    product => product.id === Number(productId)
  );

  if (!item) return;


  item.quantity += Number(change);


  if (item.quantity <= 0) {

    cartItems = cartItems.filter(
      product => product.id !== Number(productId)
    );

  }


  updateCart();

}


// ======================================================
// REMOVER PRODUTO
// ======================================================

function removeFromCart(productId) {

  cartItems = cartItems.filter(
    product => product.id !== Number(productId)
  );

  updateCart();

}


// ======================================================
// ATUALIZAR CARRINHO
// ======================================================

function updateCart() {

  if (!cartItemsContainer) return;


  // CARRINHO VAZIO
  if (cartItems.length === 0) {

    cartItemsContainer.innerHTML = "";

    if (cartEmpty) {
      cartEmpty.style.display = "block";
    }

  }

  // CARRINHO COM PRODUTOS
  else {

    if (cartEmpty) {
      cartEmpty.style.display = "none";
    }


    cartItemsContainer.innerHTML = cartItems.map(item => {

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

            <div class="quantity-control">

              <button
                class="qty"
                onclick="changeQuantity(${item.id}, -1)"
                type="button"
              >
                −
              </button>

              <strong>
                ${item.quantity}
              </strong>

              <button
                class="qty"
                onclick="changeQuantity(${item.id}, 1)"
                type="button"
              >
                +
              </button>

            </div>

          </div>


          <div class="cart-product-total">

            <strong>
              ${formatPrice(subtotal)}
            </strong>

            <button
              class="remove-product"
              onclick="removeFromCart(${item.id})"
              type="button"
            >
              Remover
            </button>

          </div>

        </div>
      `;

    }).join("");

  }


  // TOTAL DE ITENS
  const totalQuantity = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );


  // TOTAL EM DINHEIRO
  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + (item.price * item.quantity),
    0
  );


  if (cartCount) {
    cartCount.textContent = totalQuantity;
  }


  if (cartTotal) {
    cartTotal.textContent = formatPrice(totalPrice);
  }

}


// ======================================================
// ABRIR CARRINHO
// ======================================================

function openCart() {

  if (!cart || !overlay) return;

  cart.classList.add("open");

  overlay.classList.add("show");

}


// ======================================================
// FECHAR CARRINHO
// ======================================================

function closeCart() {

  if (!cart || !overlay) return;

  cart.classList.remove("open");

  overlay.classList.remove("show");

}


// ======================================================
// BOTÃO CARRINHO
// ======================================================

if (cartButton) {

  cartButton.addEventListener("click", openCart);

}


if (closeCartButton) {

  closeCartButton.addEventListener("click", closeCart);

}


if (overlay) {

  overlay.addEventListener("click", closeCart);

}


// ======================================================
// LIMPAR CARRINHO
// ======================================================

if (clearCartButton) {

  clearCartButton.addEventListener("click", function() {

    cartItems = [];

    updateCart();

  });

}


// ======================================================
// FINALIZAR PEDIDO
// ======================================================

if (checkoutButton) {

  checkoutButton.addEventListener("click", function() {

    if (cartItems.length === 0) {

      alert("Seu carrinho está vazio.");

      return;

    }


    if (customerModal) {

      customerModal.classList.add("show");

    }

  });

}


// ======================================================
// FECHAR MODAL
// ======================================================

if (closeModalButton) {

  closeModalButton.addEventListener("click", function() {

    customerModal.classList.remove("show");

  });

}


if (customerModal) {

  customerModal.addEventListener("click", function(event) {

    if (event.target === customerModal) {

      customerModal.classList.remove("show");

    }

  });

}


// ======================================================
// ENVIAR PEDIDO PARA WHATSAPP
// ======================================================

if (orderForm) {

  orderForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const name =
      customerName.value.trim();

    const phone =
      customerPhone.value.trim();

    const note =
      customerNote.value.trim();


    if (!name || !phone) {

      alert("Preencha seu nome e WhatsApp.");

      return;

    }


    let message =
      "Olá! Gostaria de fazer um pedido na Okyak Store.\n\n";


    message +=
      "Cliente: " + name + "\n";

    message +=
      "WhatsApp: " + phone + "\n\n";


    message +=
      "PEDIDO:\n";


    cartItems.forEach(item => {

      const subtotal =
        item.price * item.quantity;


      message +=
        "• " +
        item.name +
        " x" +
        item.quantity +
        " — " +
        formatPrice(subtotal) +
        "\n";

    });


    const total =
      cartItems.reduce(
        (sum, item) =>
          sum + (item.price * item.quantity),
        0
      );


    message +=
      "\nTotal: " +
      formatPrice(total);


    if (note) {

      message +=
        "\n\nObservação: " +
        note;

    }


    message +=
      "\n\nAguardo as instruções para pagamento via PIX.";


    // ==================================================
    // IMPORTANTE:
    // COLOQUE AQUI O SEU NÚMERO REAL DO WHATSAPP
    // ==================================================

    const whatsappNumber =
      "5511930758262";


    const whatsappURL =
      "https://wa.me/" +
      whatsappNumber +
      "?text=" +
      encodeURIComponent(message);


    window.open(
      whatsappURL,
      "_blank"
    );


    customerModal.classList.remove("show");

  });

}


// ======================================================
// ANO AUTOMÁTICO
// ======================================================

if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}


// ======================================================
// INICIAR LOJA
// ======================================================

renderProducts();

updateCart();


// ======================================================
// TESTE NO CONSOLE
// ======================================================

console.log("OKYAK STORE carregada com sucesso.");
console.log("Produtos:", products.length);
console.log("Categoria atual:", activeCategory);
