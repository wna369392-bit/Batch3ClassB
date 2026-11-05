try {
    // Code that might cause an error
    let number = "abc";
    let result = number * 2; // Nan (Not an error)

console.log("result" , result);

//But this will cause an error
console.log(undeclaredVariable); // ReferenceError
}catch (error){
console.log("Error Found!");
console.log("Error Name" , error.name);
console.log("Error Message" , error.message);
}finally{
    console.log("Code finished running (with or without erroe.");
}