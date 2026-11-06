const students = [
  { name: "Sara", score: 80 },
  { name: "Tom", score: 90 }
];

const studentNamesInUppercase = students.map(student => student.name.toUpperCase());

console.log(studentNamesInUppercase); 
