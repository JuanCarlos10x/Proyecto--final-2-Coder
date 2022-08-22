// Ingresa tu edad para saber si puedes jugar, solo niños pueden jugar, edad menor a 15 si pueden

let edad = prompt("Ingresa tu edad, para saber si puedes jugar");

while (edad >= 16 ){
    alert ("No puedes jugar por que ya eres mayor")
    edad = prompt("Ingresa de nuevo tu edad")
}

alert ("Si puedes jugar por que eres un niño");