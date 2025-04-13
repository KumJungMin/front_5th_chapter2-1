export let cartItemList = document.createElement("div");
export let cartTotal = document.createElement("div");
export let productSelector = document.createElement("select");
export let addToCartButton = document.createElement("button");
export let stockStatus = document.createElement("div");

export function render() {
  const root = document.getElementById("app");
  const container = createContainer();
  const card = createCardLayout();

  root.appendChild(container);
  container.appendChild(card);
  card.appendChild(createTitle());
  card.appendChild(createCartItemList());
  card.appendChild(createCartTotal());
  card.appendChild(createProductSelector());
  card.appendChild(createAddToCartButton());
  card.appendChild(createStockStatus());
}

function createContainer() {
  const container = document.createElement("div");
  container.className = "bg-gray-100 p-8";

  return container;
}

function createCardLayout() {
  const card = document.createElement("div");
  card.className =
    "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8";

  return card;
}

function createTitle() {
  const title = document.createElement("h1");
  title.className = "text-2xl font-bold mb-4";
  title.textContent = "장바구니";

  return title;
}

function createCartItemList() {
  cartItemList.id = "cart-items";

  return cartItemList;
}

function createCartTotal() {
  cartTotal.id = "cart-total";
  cartTotal.className = "text-xl font-bold my-4";

  return cartTotal;
}

function createProductSelector() {
  productSelector.id = "product-select";
  productSelector.className = "border rounded p-2 mr-2";

  return productSelector;
}

function createAddToCartButton() {
  addToCartButton.id = "add-to-cart";
  addToCartButton.className = "bg-blue-500 text-white px-4 py-2 rounded";
  addToCartButton.textContent = "추가";

  return addToCartButton;
}

function createStockStatus() {
  stockStatus.id = "stock-status";
  stockStatus.className = "text-sm text-gray-500 mt-2";

  return stockStatus;
}

export function updateProductSelector(products) {
  productSelector.innerHTML = "";

  products.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = `${item.name} - ${item.price}원`;
    option.disabled = item.units === 0;
    productSelector.appendChild(option);
  });
}

export function renderCartTotal(finalTotal, discountRate) {
  cartTotal.textContent = `총액: ${Math.round(finalTotal)}원`;

  if (discountRate > 0) {
    const discountText = document.createElement("span");
    discountText.className = "text-green-500 ml-2";
    discountText.textContent = `(${(discountRate * 100).toFixed(1)}% 할인 적용)`;
    cartTotal.appendChild(discountText);
  }
}

export function updateLoyaltyPoints(finalTotal) {
  const bonusPoints = Math.floor(finalTotal / 1000);
  let points = document.getElementById("loyalty-points");

  if (!points) {
    points = document.createElement("span");
    points.id = "loyalty-points";
    points.className = "text-blue-500 ml-2";
    cartTotal.appendChild(points);
  }
  points.textContent = `(포인트: ${bonusPoints})`;
}

export function updateStockStatus(products) {
  const limitUnits = 5;
  let statusMessage = "";

  products.forEach((item) => {
    if (item.units < limitUnits) {
      const stockMessage =
        item.units > 0 ? `재고 부족 (${item.units}개 남음)` : "품절";
      statusMessage += `${item.name}: ${stockMessage}\n`;
    }
  });
  stockStatus.textContent = statusMessage;
}
