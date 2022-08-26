// Esta función va a ayudar a conocer el máximo común divisor y solo funciona con números

num1 = parseInt(prompt("Escribir un número"));
num2 = parseInt(prompt("Escribir el otro numero número"));

function MCD (n1, n2) {

    let mcd;    // mcd = Maximo comun divirsor 
    let resto;  

    while(n1 != 0 && n2 != 0) {

        resto = n1%n2              
        n1 = n2;
        n2 = resto
        
    }

    if (n1 == 0) {

        mcd = n2;

    } else if (n2 == 0){

        mcd = n1;

    }

    return mcd;
}

alert("MCD de " +num1+" y "+num2+ " es "+MCD(num1, num2));

// Ejemplo si se puede el mcd de 10 y 5 el resultado es 5 
