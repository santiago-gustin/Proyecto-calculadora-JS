// Evento 'DOMContentLoaded'
document.addEventListener('DOMContentLoaded', function() {
   
//const datosForm = ["name", "docu", "number", "edad", "peso", "altura", "actividad", "femenino", "masculino"];
const formulario = document.querySelector("#formulario-calculadora");
const resultado = document.querySelector("#resultado");
let historial = [];

formulario.addEventListener("submit", (event)=>{
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    //let datos = extraerDatos();
    let valores = Object.values(data);
    (valores.every(validarDatos) == true) ? calcularCalorias(data):mostrarMensajeDeError("Registre todos sus datos por favor.");
})

/*function extraerDatos(){
    let datos = [];
    for (let element of formulario){
        //console.dir(element);
        (datosForm.includes(element.id)) ? (element.type == "radio") ? (element.checked == true) ? datos.push(element.value):console.log("Elemento no checkeado"):datos.push(element.value) : console.log("Elemento no pertenece");
    }
    console.log(datos);
    return datos;
}*/

function validarDatos(elemento) {
    return elemento !== ''; // Verifica si el campo no está vacío
  };

function calcularCalorias(data) {
    const multiplicadorTMB = {peso: 10, altura: 6.25, edad: 5};
    
    historial.push(data);
    let calculoCalorias = data.actividad*(multiplicadorTMB.peso*data.peso)+(multiplicadorTMB.altura*data.altura)-(multiplicadorTMB.edad*data.edad);
    data.genero == "M" ? calculoCalorias += 5 : calculoCalorias -= 161; 
    let mensaje = `El paciente ${data.name} identificado con ${data.docu} NO.${data.number}, requiere un total de ${calculoCalorias} kcal para el sostenimiento de su TBM.`; 
    resultado.innerHTML = `<div class=" card-body d-flex flex-column justify-content-center align-items-center h-100" id="calculo"><h5 class="card-title h2">Resultados obtenidos</h5><div class="mb-3 w-100" style="height: 100px;"><div class="form-control text-center" style="font-size: 1rem;" contenteditable="false">${mensaje}</div></div></div>`;
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
        resta *= 1.2;
        resultado.style.top = `${distancia - resta}vh`;
        if (resta > 100) {
            clearInterval(id);
        }
    }, 10)
}

function desvanecerResultado() {
    let distancia = 1;

    let id = setInterval(() => {
        distancia *= 1.1;
        resultado.style.top = `${distancia}vh`;
        if (distancia > 100) {
            clearInterval(id);
            resultado.style.display = 'none';
            resultado.style.top = 0;
        }
    }, 10)
}
});