
////Variables////
let nombre = "Kevin";
const edad = 25;

nombre = "Ana Maria";

const saludo = "Hola, " + nombre + ". Tienes " + edad + " años.";
console.log(saludo);

////Funciones ARROW ////
const cuadrado = numero => numero * numero;

////3 ejemplos//////
console.log(cuadrado(2));  
console.log(cuadrado(4));  
console.log(cuadrado(20)); 


////g///////

const saludoPersonalizado = (nombre, edad) => `Hola, me llamo ${nombre} y tengo ${edad} años.`;
console.log(saludoPersonalizado("Isay", 37));