```javascript
// ======================================================
// OKYAK STORE — SCRIPT PRINCIPAL
// Gift Cards • Busca • Filtros • Carrinho • WhatsApp
// ======================================================

// ======================================================
// PRODUTOS
// ======================================================

const products = [
  {
    id: 1,
    name: "Cartão-presente digital Xbox",
    category: "Xbox",
    value: "R$ 5,00",
    price: 7.00,
    icon: "🎮",
    description: "Cartão-presente Xbox com R$ 5,00 de saldo."
  }

  // Novos produtos podem ser adicionados aqui depois.
];


// ======================================================
// ELEMENTOS DO SITE
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

    activeCategory = button.dataset.category;

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

    searchTerm = this.value.trim();

    renderProducts();

  });

}


// ======================================================
// ADICIONAR AO CARRINHO
// ======================================================

function addToCart(productId) {

  const product = products.find(
    item => item.id === productId
  );

  if (!product) return;


  const existingItem = cartItems.find(
    item => item.id === productId
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
    product => product.id === productId
  );

  if (!item) return;


  item.quantity += change;


  if (item.quantity <= 0) {

    cartItems = cartItems.filter(
      product => product.id !== productId
    );

  }


  updateCart();
}


// ======================================================
// REMOVER ITEM
// ======================================================

function removeFromCart(productId) {

  cartItems = cartItems.filter(
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

            <div style="
              margin-top:8px;
              display:flex;
              align-items:center;
              gap:7px;
            ">

              <button
                class="qty button"
                onclick="changeQuantity(${item.id}, -1)"
              >
                −
              </button>

              <strong>
                ${item.quantity}
              </strong>

              <button
                class="qty button"
                onclick="changeQuantity(${item.id}, 1)"
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


  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );


  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + (item.price * item.quantity),
    0
  );


  if (cartCount) {
    cartCount.textContent = totalQuantity;
  }


  if (cartTotal) {
    cartTotal.textContent =
      formatPrice(totalPrice);
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
// CHECKOUT
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


// ======================================================
// CLICAR FORA DO MODAL
// ======================================================

if (customerModal) {

  customerModal.addEventListener("click", function(event) {

    if (event.target === customerModal) {

      customerModal.classList.remove("show");

    }

  });

}


// ======================================================
// GERAR PEDIDO WHATSAPP
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


    // ==============================================
    // MONTA OS PRODUTOS DO PEDIDO
    // ==============================================

    let orderText =
      "Olá! Gostaria de fazer um pedido na Okyak Store.%0A%0A";


    orderText +=
      "*Cliente:* " +
      encodeURIComponent(name) +
      "%0A";


    orderText +=
      "*WhatsApp:* " +
      encodeURIComponent(phone) +
      "%0A%0A";


    orderText +=
      "*Pedido:*%0A";


    cartItems.forEach(item => {

      const subtotal =
        item.price * item.quantity;


      orderText +=
        "• " +
        encodeURIComponent(item.name) +
        " x" +
        item.quantity +
        " — " +
        encodeURIComponent(formatPrice(subtotal)) +
        "%0A";

    });


    const total = cartItems.reduce(
      (sum, item) =>
        sum + (item.price * item.quantity),
      0
    );


    orderText +=
      "%0A*Total: " +
      encodeURIComponent(formatPrice(total)) +
      "*";


    if (note) {

      orderText +=
        "%0A%0A*Observação:* " +
        encodeURIComponent(note);

    }


    orderText +=
      "%0A%0A_Aguardo as instruções para pagamento via PIX._";


    // ==============================================
    // NÚMERO DA OKYAK STORE
    // ==============================================
    //
    // TROQUE PELO SEU NÚMERO DO WHATSAPP.
    //
    // Formato:
    // 55 + DDD + número
    //
    // Exemplo:
    // 5587999999999
    //

    const whatsappNumber =
      "5511930758262";


    const whatsappURL =
      `https://wa.me/${whatsappNumber}?text=${orderText}`;


    window.open(
      whatsappURL,
      "_blank"
    );


    customerModal.classList.remove("show");

  });

}


// ======================================================
// ANO DO RODAPÉ
// ======================================================

if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}


// ======================================================
// INICIALIZAÇÃO
// ======================================================

renderProducts();

updateCart();
```

