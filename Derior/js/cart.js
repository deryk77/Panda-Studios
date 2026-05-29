/* DERIOR — Cart (localStorage) */

const CART_KEY = 'derior_cart';

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}

function _saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id:           product.id,
      name:         product.name,
      price:        product.price,
      priceDisplay: product.priceDisplay,
      image:        product.image,
      category:     product.category,
      quantity:     1,
    });
  }
  _saveCart(cart);
}

function removeFromCart(productId) {
  _saveCart(getCart().filter(item => item.id !== productId));
}

function updateQuantity(productId, newQty) {
  if (newQty < 1) { removeFromCart(productId); return; }
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) { item.quantity = newQty; _saveCart(cart); }
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

function getCartTotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function clearCart() {
  _saveCart([]);
}

window.CartAPI = { getCart, addToCart, removeFromCart, updateQuantity, getCartCount, getCartTotal, clearCart };
