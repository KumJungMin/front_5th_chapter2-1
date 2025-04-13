import { updateProductSelector } from "./ui.js";

export let lastSelectedProductId;

export function triggerRandomSales() {
  scheduleFlashSale();
  scheduleRecommendationSale();
}

function scheduleFlashSale() {
  const delay = Math.random() * 10000;
  setTimeout(() => setInterval(flashSaleToRandomProduct, 30000), delay);
}

function scheduleRecommendationSale() {
  const delay = Math.random() * 20000;
  setTimeout(() => setInterval(suggestProductDiscount, 60000), delay);
}

function flashSaleToRandomProduct(products) {
  const luckyItem = getRandomProduct(products);
  if (Math.random() < 0.3 && luckyItem.units > 0) {
    luckyItem.price = Math.round(luckyItem.price * 0.8);
    alert(`번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);
    updateProductSelector(products);
  }
}

function suggestProductDiscount(products) {
  if (!lastSelectedProductId) return;
  const suggestedItem = products.find(
    (item) => item.id !== lastSelectedProductId && item.units > 0,
  );
  if (suggestedItem) {
    suggestedItem.price = Math.round(suggestedItem.price * 0.95);
    alert(
      `${suggestedItem.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`,
    );
    updateProductSelector(products);
  }
}

export function getRandomProduct(products) {
  return products[Math.floor(Math.random() * products.length)];
}
