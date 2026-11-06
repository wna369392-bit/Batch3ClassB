const cart = [{price: 100}, {price: 200}, {price: 50}];

const totalPrice = cart.reduce((total, item) => total + item.price, 0);

console.log("Total Price:", totalPrice); 