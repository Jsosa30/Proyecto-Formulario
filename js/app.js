import { validar } from "./validaciones.js";

const inpust = document.querySelectorAll("input");

inpust.forEach(input => {
    input.addEventListener("blur",(input)=>{
        validar(input.target)
    });
});