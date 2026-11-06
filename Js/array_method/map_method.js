// Double the numbers in an array
const numbers = [1, 2, 3, 4];
const doubled = numbers.map((num) => {
    return num * 2; // must be returned;
});

console.log("Original Array: " , numbers); // [1, 2, 3, 4] <= original array
console.log(doubled); // [2, 4, 6,8] <= new array

// example 2: Extract names from an array of obbjects
const uses = [
    {
        name: "Alice" , age: 21
    },
    {name: "Bob", age: 25},

];
const names = users.map((user) => user.name);
console.log(names); //["Alice","Bob"]
console.log(users);