// Ingresa tu edad para saber si puedes jugar

let edad = prompt("Ingresa tu edad");

while (edad >= 16 ){
    alert ("No puedes jugar por que ya eres mayor")
    edad = prompt("Ingresa de nuevo tu edad")
}

alert ("Si puedes jugar por que eres un niño");