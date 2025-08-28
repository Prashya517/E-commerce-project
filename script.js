let cart = [];
let subtotal = 0;
let discount = 0;

// Add product to cart
function addToCart(productName, price) {
  const product = { name: productName, price: price };
  cart.push(product);
  updateCart();
  saveCart();
  window.location.href = 'cart-page.html'; // Redirect to cart page
}

// Buy Now function
function buyNow(productName, price) {
  addToCart(productName, price);
  window.location.href = 'checkout.html'; // Redirect to checkout page
}

// Update cart display
function updateCart() {
  const cartItems = document.getElementById('cart-items');
  if (cartItems) {
    cartItems.innerHTML = '';
    subtotal = 0;

    cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
      
      // Add a remove button for each item
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.onclick = () => removeFromCart(index);
      li.appendChild(removeButton);

      cartItems.appendChild(li);
      subtotal += item.price;
    });

    const subtotalElement = document.getElementById('subtotal');
    if (subtotalElement) {
      subtotalElement.textContent = subtotal.toFixed(2);
    }

    calculateTotal();
  }
}

// Remove product from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
  saveCart();
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCart();
  }
}

// Apply discount
function applyDiscount() {
  const promoCode = document.getElementById('promo-code').value;
  if (promoCode === 'DISCOUNT10') {
    discount = subtotal * 0.1; // 10% discount
  } else {
    discount = 0;
  }
  calculateTotal();
}

// Calculate total price
function calculateTotal() {
  const total = subtotal - discount;
  const discountElement = document.getElementById('discount');
  const totalElement = document.getElementById('total-price');

  if (discountElement) {
    discountElement.textContent = discount.toFixed(2);
  }
  if (totalElement) {
    totalElement.textContent = total.toFixed(2);
  }
}

// Filter products
function filterProducts() {
  const searchTerm = document.getElementById('search').value.toLowerCase();
  const products = document.querySelectorAll('.product');

  products.forEach(product => {
    const productName = product.getAttribute('data-name').toLowerCase();
    if (productName.includes(searchTerm)) {
      product.style.display = 'inline-block';
    } else {
      product.style.display = 'none';
    }
  });
}

// Initialize search functionality
document.getElementById('search').addEventListener('input', filterProducts);

// Load cart when the page loads
window.onload = loadCart;