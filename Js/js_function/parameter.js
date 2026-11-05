function sayHello(name){
    // 'name' is a parameter
    console.log("Hello" + name + "!");
}
sayHello(" Shine"); // "Shine" is a argument
sayHello(" Wanna"); // "Wanna" is a argument

// parameters are variables in the function definition
function add(a , b) {
    return a + b;
}

let result = add (5 , 3); // Arguments are values you pass when calling the function
console.log(result);

// return statement
function square(n) {
    return n * n;
}
console.log(square(4));