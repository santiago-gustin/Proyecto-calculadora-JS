// Envuelve tu código en un evento 'DOMContentLoaded'
document.addEventListener('DOMContentLoaded', function() {
   

const formulario = document.querySelector("#formulario-calculadora");
const resultado = document.querySelector("#resultado");

formulario.addEventListener("submit", (event)=>{
    event.preventDefault();
    const name = document.querySelector("#name");
    const docu = document.querySelector("#docu");
    const number = document.querySelector("#number");
    const edad = document.querySelector("#edad");
    const peso = document.querySelector("#peso");
    const altura = document.querySelector("#altura");
    const actividad = document.querySelector("#actividad");
    const genero = document.querySelector("input[name='genero']:checked");
    
    validarDatos(name,genero);
})

function validarDatos(name,genero){
    (name.value == "" || docu.value == "" || number.value == "" || edad.value == "" || peso.value == "" || altura.value == "" || actividad.value == "" || genero.value == "") ? mostrarMensajeDeError("Datos faltantes"):calcularCalorias(genero);
}

function calcularCalorias(genero) {

    const multiplicadorTMB = {
        peso: 10,
        altura: 6.25,
        edad: 5
    }

    let calculoCalorias = actividad.value*(multiplicadorTMB.peso*peso.value)+(multiplicadorTMB.altura*altura.value)-(multiplicadorTMB.edad*edad.value);
    genero.value == "M" ? calculoCalorias = calculoCalorias + 5 : calculoCalorias = calculoCalorias - 161; 

    //totalCalorias.value = `${Math.floor(calculoCalorias)} kcal`;
    
    resultado.innerHTML = `<div class=" card-body d-flex flex-column justify-content-center align-items-center h-100" id="calculo"><h5 class="card-title h2">Calorías requeridas</h5><div class="mb-3 w-100"><input class="form-control text-center" value="${calculoCalorias} kcal" style="font-size: 2rem" disabled></div></div>`;
    resultado.style.display = "block";
    aparecerResultado();
    // Volver a limpiar variables

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
        distancia *= 2;
        resultado.style.top = `${distancia}vh`;
        if (distancia > 100) {
            clearInterval(id);
            resultado.style.display = 'none';
            resultado.style.top = 0;
        }
    }, 10)
}
});