import { productSelector, addToCartButton, cartItemList } from "./ui.js";
import {
  calculateCart,
  getProductById,
  getSelectedProduct,
  getQuantityFromElement,
  handleQuantityChange,
  handleRemoveItem,
  updateExistingCartItem,
  createNewCartItem,
} from "./cart.js";

export function registerEventListeners(products) {
  addToCartButton.addEventListener("click", () => handleAddToCart(products));
  cartItemList.addEventListener("click", (event) =>
    handleCartItemClick(products, event),
  );
}

function handleAddToCart(products) {
  const selectedProduct = getSelectedProduct(productSelector, products);
  if (!selectedProduct || selectedProduct.units <= 0) {
    alert("상품이 품절되었습니다.");
    return;
  }
  const cartItem = document.getElementById(selectedProduct.id);
  if (cartItem) {
    updateExistingCartItem(cartItem, selectedProduct);
  } else {
    createNewCartItem(selectedProduct);
  }
  calculateCart(products);
  // 마지막 선택 상품 ID 업데이트 (전역 변수 또는 별도 상태 관리)
  window.lastSelectedProductId = selectedProduct.id;
}

function handleCartItemClick(products, event) {
  const target = event.target;
  const isQuantityChanged = target.classList.contains("quantity-change");
  const isRemoved = target.classList.contains("remove-item");
  if (!isQuantityChanged && !isRemoved) return;

  const productId = target.dataset.productId;
  const productElement = document.getElementById(productId);
  const product = getProductById(products, productId);
  const currentQuantity = getQuantityFromElement(productElement);
  if (isQuantityChanged) {
    const change = parseInt(target.dataset.change);
    handleQuantityChange(product, productElement, currentQuantity, change);
  }
  if (isRemoved) {
    handleRemoveItem(product, productElement, currentQuantity);
  }
  calculateCart(products);
}
