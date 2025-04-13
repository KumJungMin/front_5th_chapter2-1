// products.js
export const products = [
  { id: "p1", name: "상품1", price: 10000, units: 50 },
  { id: "p2", name: "상품2", price: 20000, units: 30 },
  { id: "p3", name: "상품3", price: 30000, units: 20 },
  { id: "p4", name: "상품4", price: 15000, units: 0 },
  { id: "p5", name: "상품5", price: 25000, units: 10 },
];

// 전역 참조를 위해 (sales.js에서 window.products 참조)
window.products = products;
