// Filter out even numbers.
const numbers = [1, 2, 3, 4, 5, 6];
const evens  = numbers.filter((num) => num % 2 === 0);
console.log(evens); // [2, 4, 6]

// Filter only adults.
const people = [
    {name: "Anna", age: 17},
    {name: "Tom", age: 22},
    {name: "Lisa", age: 19},
];
const adults = people.filter((person) => person.age >= 18);
console.log(adults);
// [{name: "Tom", age: 22},{name: "Lisa", age: 19}]