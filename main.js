// Evento 'DOMContentLoaded'
document.addEventListener('DOMContentLoaded', function() {
   
const datosForm = ["name", "docu", "number", "edad", "peso", "altura", "actividad", "femenino", "masculino"];
const formulario = document.querySelector("#formulario-calculadora");
const resultado = document.querySelector("#resultado");

formulario.addEventListener("submit", (event)=>{
    event.preventDefault();
    let datos = extraerDatos();
    (datos.every(validarDatos) == true) ? calcularCalorias(datos):mostrarMensajeDeError("Registre todos sus datos por favor.");
})

function extraerDatos(){
    //const data = Object.fromEntries(new FormData(event.target));
    //alert(JSON.stringify(data));
    
    /*const name = document.querySelector("#name");
    const docu = document.querySelector("#docu");
    const number = document.querySelector("#number");
    const edad = document.querySelector("#edad");
    const peso = document.querySelector("#peso");
    const altura = document.querySelector("#altura");
    const actividad = document.querySelector("#actividad");
    const genero = document.querySelector("input[name='genero']:checked");*/
    let datos = [];
    for (let element of formulario){
        //console.dir(element);
        (datosForm.includes(element.id)) ? (element.type == "radio") ? (element.checked == true) ? datos.push(element.value):console.log("Elemento no checkeado"):datos.push(element.value) : console.log("Elemento no pertenece");
    }
    console.log(datos);
    return datos;
}

function validarDatos(elemento) {
    return elemento !== ''; // Verifica si el campo no está vacío
  };

function calcularCalorias(datos) {

    const multiplicadorTMB = {
        peso: 10,
        altura: 6.25,
        edad: 5
    }

    let calculoCalorias = datos[datosForm.indexOf("actividad")]*(multiplicadorTMB.peso*datos[datosForm.indexOf("peso")])+(multiplicadorTMB.altura*datos[datosForm.indexOf("altura")])-(multiplicadorTMB.edad*datos[datosForm.indexOf("edad")]);
    datos[datosForm.indexOf("femenino")] == "M" ? calculoCalorias += 5 : calculoCalorias -= 161; 
    resultado.innerHTML = `<div class=" card-body d-flex flex-column justify-content-center align-items-center h-100" id="calculo"><h5 class="card-title h2">Calorías requeridas</h5><div class="mb-3 w-100"><input class="form-control text-center" value="${calculoCalorias} kcal" style="font-size: 2rem" disabled></div></div>`;
    resultado.style.display = "block";
    aparecerResultado();
    // Volver a limpiar variables
    setTimeout(() => {
        desvanecerResultado();
        formulario.reset();
    }, 10000);
}

function mostrarMensajeDeError(msg) {
    const calculo = document.querySelector('#calculo');
    if (calculo) {
        calculo.remove();
    }
    console.log(msg);
    const divError = document.createElement('div');
    divError.className = 'd-flex justify-content-center align-items-center h-100';
    divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

    resultado.appendChild(divError);
    resultado.style.display = "block";
    setTimeout(() => {
        divError.remove();
        desvanecerResultado();
    }, 5000);
}


// Animaciones
function aparecerResultado() {
    resultado.style.top = '100vh';
    resultado.style.display = 'block';
    
    let distancia = 100;
    let resta = 0.3;
    let id = setInterval(() => {
        resta *= 1.1;
        resultado.style.top = `${distancia - resta}vh`;
        if (resta > 100) {
            clearInterval(id);
        }
    }, 10)
}

function desvanecerResultado() {
    let distancia = 1;

    let id = setInterval(() => {
        distancia *= 1.5;
        resultado.style.top = `${distancia}vh`;
        if (distancia > 100) {
            clearInterval(id);
            resultado.style.display = 'none';
            resultado.style.top = 0;
        }
    }, 10)
}
});