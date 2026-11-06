const products = [
  { name: "A", inStock: true },
  { name: "B", inStock: false },
  { name: "C", inStock: true }
];

const inStockProducts = products.filter(product => product.inStock);

console.log(inStockProducts); 
