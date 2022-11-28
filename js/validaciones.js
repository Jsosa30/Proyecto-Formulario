

// verificar una fecha en un formulario

export const validar = (input) => {
    const tipoDeinput = input.dataset.tipo; // con dataset recibe todos los data y en espesifico el .tipo
    if (validadores[tipoDeinput]) {
        validadores[tipoDeinput](input);
    }

    // para que le coloque un borde en rojo al input que no  se relleno o lo contrario si esta lleno
    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeinput,input);
    }
}


const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];


// mensaje de error para mostar en cada caompo que no se llene
const mensajeDeError = {
    name: {
        valueMissing: "El campo nombre no puede estar vacio"
    },
    email: {
        valueMissing: "El campo email no puede estar vacio",
        typeMismatch: "El correo no es valido",
    },
    password: {
        valueMissing: "El campo correo no puede estar vacio",
        patternMismatch: "La contraseña debe tener al menos 6 caracteres  Y maximo 12, debe tener al menos una letra mayuscula y una miniscula , numeros y no debe contener caracteres especiales",
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacio",
        customError: "Debes tener al menos 18 años de edad",
    },
    phoneNumber: {
        valueMissing: "Debes colocar un numero de telefono",
        patternMismatch: "Como maximo debes colocar 10 numeros"
    },
    direccion: {
        valueMissing: "Debes colocar tu dirección",
        patternMismatch: "Como maximo debes colocar 10 caracteres",
    },
    ciudad: {
        valueMissing: "Debes colocar tu ciudad",
        patternMismatch: "Como maximo debes colocar 10 caracteres",
    }
};

const validadores = {
    nacimiento: input => validarNacimiento(input)
}

const mostrarMensajeDeError = (tipoDeinput, input) => {
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        if (input.validity[error]) {
            console.log(tipoDeinput, error);
            console.log(input.validity[error]);
            console.log(mensajeDeError[tipoDeinput][error]);
            mensaje = mensajeDeError[tipoDeinput][error];
        }
    });
    return mensaje;
}


const validarNacimiento = (input) => { // y del evento topo su valor
    const fechausuario = new Date(input.value);  // instancio la fecha
    let mensaje = "";
    if (!mayorDeEadad(fechausuario)) { // sino es mayor de edad le paso un mensaje al intentar ingresar al sitio.
        mensaje = "Eres menor de edad no te puedes registrar en este sitio web"
    }

    input.setCustomValidity(mensaje); // para enviar un mensaje en el input
}

const mayorDeEadad = (fecha) => {   // esta funcion recibe la fecha y la compara con la actual
    const fechaActual = new Date(); // para tomar la fecha actual
    const diferenciFechas = new Date(  // tomo el dia mes y año y le sumo 18 al año
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    console.log(fechaActual, diferenciFechas)
    return diferenciFechas <= fechaActual; // verifico que la diferencia de fecha sea menos o igual a la fecha actual para indicar que si tiene 18 o mas años devuelve true/false
}

