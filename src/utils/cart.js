// cart.js
// 장바구니 계산, 할인율, 수량 업데이트 등 비즈니스 로직

import {
  renderCartTotal,
  updateStockStatus,
  updateLoyaltyPoints,
} from "./ui.js";

let finalTotal = 0;
let totalItemsInCart = 0;

export function calculateCart(products) {
  const cartItems = getCartItems();
  let originalTotal = 0;
  finalTotal = 0;
  totalItemsInCart = 0;

  cartItems.forEach(({ id, units }) => {
    const product = getProductById(products, id);
    const amount = product.price * units;
    const discountRate = getItemDiscountRate(units, product.id);

    totalItemsInCart += units;
    originalTotal += amount;
    finalTotal += amount * (1 - discountRate);
  });

  const discountRate = getDiscountRate({
    originalTotal,
    finalTotal,
    totalItemsInCart,
  });

  renderCartTotal(finalTotal, discountRate);
  updateStockStatus(products);
  updateLoyaltyPoints(finalTotal);
}

export function getCartItems() {
  const cartItemList = document.getElementById("cart-items");
  const items = Array.from(cartItemList.children);
  return items.map((el) => {
    const id = el.id;
    const units = parseInt(el.querySelector("span").textContent.split("x ")[1]);
    return { id, units };
  });
}

export function getItemDiscountRate(units, productId) {
  if (units < 10) return 0;
  const discountRateMap = {
    p1: 0.1,
    p2: 0.15,
    p3: 0.2,
    p4: 0.05,
    p5: 0.25,
  };
  return discountRateMap[productId] ?? 0;
}

export function getDiscountRate({
  originalTotal,
  finalTotal,
  totalItemsInCart,
}) {
  let rate = (originalTotal - finalTotal) / originalTotal;
  if (totalItemsInCart >= 30) {
    const maxBulkDiscountAmount = originalTotal * 0.25;
    if (maxBulkDiscountAmount > originalTotal - finalTotal) {
      finalTotal = originalTotal * (1 - 0.25);
      rate = 0.25;
    }
  }
  if (new Date().getDay() === 2) {
    finalTotal *= 0.9;
    rate = Math.max(rate, 0.1);
  }
  return rate;
}

export function getProductById(products, id) {
  return products.find((p) => p.id === id);
}

export function getSelectedProduct(selector, products) {
  const selectedId = selector.value;
  return products.find((p) => p.id === selectedId);
}

export function getQuantityFromElement(element) {
  const text = element.querySelector("span").textContent;
  return parseInt(text.split("x ")[1]);
}

export function handleQuantityChange(
  product,
  element,
  currentQuantity,
  change,
) {
  const updatedQuantity = currentQuantity + change;
  const availableStock = product.units + currentQuantity;
  if (updatedQuantity > 0 && updatedQuantity <= availableStock) {
    const label = element.querySelector("span").textContent.split("x ")[0];
    element.querySelector("span").textContent = `${label}x ${updatedQuantity}`;
    product.units -= change;
  } else if (updatedQuantity <= 0) {
    element.remove();
    product.units -= change;
  } else {
    alert("재고가 부족합니다.");
  }
}

export function updateExistingCartItem(element, product) {
  const currentQuantity = getQuantityFromElement(element);
  const updatedQuantity = currentQuantity + 1;
  if (updatedQuantity <= product.units + currentQuantity) {
    element.querySelector("span").textContent =
      `${product.name} - ${product.price}원 x ${updatedQuantity}`;
    product.units--;
  } else {
    alert("재고가 부족합니다.");
  }
}

export function createNewCartItem(product) {
  const newItem = document.createElement("div");
  newItem.id = product.id;
  newItem.className = "flex justify-between items-center mb-2";
  newItem.innerHTML = `
    <span>${product.name} - ${product.price}원 x 1</span>
    <div>
      <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${product.id}" data-change="-1">-</button>
      <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${product.id}" data-change="1">+</button>
      <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${product.id}">삭제</button>
    </div>
  `;
  document.getElementById("cart-items").appendChild(newItem);
  product.units--;
}

export function handleRemoveItem(product, element, currentQuantity) {
  product.units += currentQuantity;
  element.remove();
}
