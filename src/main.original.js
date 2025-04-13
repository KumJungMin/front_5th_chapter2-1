import { render, updateProductSelector } from "./utils/ui.js";
import { registerEventListeners } from "./utils/events.js";
import { calculateCart } from "./utils/cart.js";
import { triggerRandomSales } from "./utils/sales.js";
import { products } from "./utils/products.js";

function main() {
  render();
  registerEventListeners(products);
  updateProductSelector(products);
  calculateCart(products);
  triggerRandomSales();
}

main();
