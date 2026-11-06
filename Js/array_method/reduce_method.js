// sum all numbers.
const numbers = [10, 20, 30];
const total = numbers.reduce((acc, curr) => acc + curr, 0); // "0" is initial value
console.log(total); //60

// count occurences.
const fruits = ["apple", "banana", "apple", "orange", "apple"];
const count = fruits.reduce((acc, fruit, index) => {
 acc[fruit] = (acc[fruit] || 0) + 1;
 return acc;
}, {}); // acc = {}; empty object as initial value
console.log(count);

// index = 0, acc = {apple: 1}
// index = 1, acc = {apple: 1, banana: 1}
// index = 2, acc = {apple: 2, banana:1}
// index = 3, acc = {apple: 2, banana:1, orange:1}
// index = 4, acc = {apple: 3, banana:1, orange:1}