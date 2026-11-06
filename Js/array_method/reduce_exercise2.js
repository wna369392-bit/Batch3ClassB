const numbers = [5, 8, 2, 10, 3];

const maxNumber = numbers.reduce((max, current) => {
    return current > max ? current : max;
}, numbers[0]);

console.log("Maximum Number:", maxNumber); 