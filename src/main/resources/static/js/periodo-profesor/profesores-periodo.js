import templateProfesor from "./template-profesor.js";

var profesorPeriodoVigente = $("#profesoresPeriodoVigente");
let checkGeneral = document.getElementById("checkGeneral");
let check = Object;
let arrayBody = [];
let tomarAsistencia = document.getElementById("tomarAsistencia");

async function obtenerProfesoresPorPeriodoVigente() {
  const data = await fetch("/api/profesores");
  return data.json();
}

async function getInasistenciasActuales () {
  const data = await fetch("/api/inasistencias");
  return data.json();
}

async function drawTeacher (data) {
	profesorPeriodoVigente.html('')
	
	const inasistencias = await getInasistenciasActuales();
	data.map((profesor) => {
	  profesorPeriodoVigente.append(templateProfesor(profesor, inasistencias));
  })
}

window.addEventListener(
  "load",
  async function () {
    let response = await obtenerProfesoresPorPeriodoVigente();
    await drawTeacher(response)
    check = document.querySelectorAll(".check-mark");
    checkGeneral.addEventListener("change", checkAll);
    tomarAsistencia.addEventListener("click", enviarAsistencia);
  },
  false
);

const enviarAsistencia = async () => {
  arrayBody = [];
  [...check].map((c) => {
    if (c.checked == true) {
      let body = {
	     "justificacionDigital": false,
	     "justificacionFisica": false,
	     "profesor": {
		    "id": parseInt(c.previousElementSibling.value)
		  }
	  }
	  
      arrayBody.push(body);
    }
  });
  
  const data = await fetch('/api/inasistencias', {
  	method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    
    body: JSON.stringify(arrayBody)
  });
  
  const response = await data.json()

  if (data.status == 400) {
    alert(response.message)
  } else {
	  alert('Se ha tomado asistencia')	 
	  obtenerProfesoresPorPeriodoVigente()
      .then(resp => {
        drawTeacher(resp).then(response => response)
      })
  }

};

const checkAll = (event) => {
  for (let index = 0; index < check.length; index++) {
    let element = check[index];
    if (checkGeneral.checked == true) {
      element.checked = true;
    } else {
      element.checked = false;
    }
  }
};
