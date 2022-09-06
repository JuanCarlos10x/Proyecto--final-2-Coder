// Se pide el numero del mes en el que se nacio, para saber si se va a festejar o no
// Para acalarar pistear no significa nada malo, es ir a festejar

let meses = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto"]; // Aqui declaro mis arrays, deje un string vacio para que tome el valor 0 
                                                                                            // Y cuando se tome el valor de enero que es 1 apareza el alert de ya paso su compleañps   

let pregunta = parseInt(prompt("Introduce el número del mes en el que naciste"));

if (pregunta >= meses.length) { // Tengo un total de 8 arrys, asi que al poner el 9 se debe de mostrar el alert que esta denajo
    alert("Esperamos con ansias tu cumpleaños, para pistear");
} else {
    alert("Valla ya paso tu cumpleños, nos vemos el proximo año"); // Si se pone el numero 8 o menores a este se va a ejecutar el alerte de abajo
}