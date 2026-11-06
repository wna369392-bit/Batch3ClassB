const colors = ["red", "blue", "red", "green", "blue", "red"];

const colorCount = colors.reduce((counts, color) => {
    counts[color] = (counts[color] || 0) + 1;
    return counts;
}, {});

console.log("Color Counts:", colorCount); 
