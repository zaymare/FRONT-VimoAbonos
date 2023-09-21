const urlAbonos = "http://localhost:8082/api/abonos";
let id = "";

const listarAbonos = async () => {
  let respuesta = "";
  let contenido = document.getElementById("tablaBody");

  fetch(urlAbonos, {
    method: "GET",
    mode: "cors",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((resp) => resp.json())
    .then(function (data) {
      let listaAbonos = data.Abonos;
      datos = listaAbonos.map(function (abono) {
        respuesta +=
          `<tr><td>${abono.cliente}</td>` +
          `<td>${abono.fecha}</td>` +
          `<td><button type="button" class="btn" id="${abono._id}" onclick="cambiarEstado('${abono._id}')">${abono.estado}</button></td>` +
          `<td>${abono.valor}</td>` +
          `<td><button type="button" class="btn" id="btnAct" value="${abono._id}" onclick="abrirForm('${abono._id}')">Editar</button></td>` +
          `</tr>`;
        contenido.innerHTML = respuesta;
      });
    });
};

const cambiarEstado = (idBoton) => {
  const boton = document.getElementById(idBoton);
  if (boton.textContent == "Pagado") {
    boton.textContent = "Pendiente"
  } else {
    boton.textContent = "Pagado"
  }
  fetch(urlAbonos, {
    method: "GET",
    mode: "cors",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((resp) => resp.json())
    .then(function (data) {
      let listaAbonos = data.Abonos;
      datos = listaAbonos.map(function (abono) {
        for (let i = 0; i < abono._id.length; i++) {
          if (idBoton == abono._id) {
            id = abono._id;
            asignar();
          }
          break;
        }
      });
    });
  function asignar() {
    const estado = {
      _id: id,
      estado: boton.textContent
    }
    fetch(urlAbonos, {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(estado),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((resp) => resp.json())
      .then((json) => {
        Swal.fire({
          icon: "success",
          showConfirmButton: false,
          text: "Estado actualizado :)",
          timer: 1500
        });
      });
  }
};

const registrarAbono = () => {
  const nombre = document.getElementById("nombre").value;
  const fecha = document.getElementById("fecha").value;
  const monto = document.getElementById("monto").value;
  if (nombre == "" && fecha == "" && monto == "") {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Por favor, llenar todos los campos!"
    });
  }
  else if (nombre == "") {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Por favor, ingrese un nombre!"
    });
  }
  else if (fecha == "") {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Por favor, ingrese una fecha!"
    });
  }
  else if (monto == "") {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Por favor, ingrese un monto!"
    });
  } else {
    const Abonos = {
      cliente: nombre,
      fecha: fecha,
      estado: "Pendiente",
      valor: monto
    }
    fetch(urlAbonos, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(Abonos),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((resp) => resp.json())
      .then((json) => {
        Swal.fire({
          icon: "success",
          showConfirmButton: false,
          text: json.msg,
          timer: 1500,
        });
      });
    listarAbonos();
  }
};
document.getElementById("Abonito").addEventListener("click", registrarAbono)

const abrirForm = async (boton) => {
  const formulario = document.getElementById("formulario")
  if (formulario.style.display=="block"){
    formulario.style.display="none"
  }else{
    formulario.style.display="block"
  }
  const btnAct = document.getElementById(`btnAct`)
  console.log(btnAct.value)
  fetch(urlAbonos, {
    method: "GET",
    mode: "cors",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((resp) => resp.json())
    .then(function (data) {
      let listaAbonos = data.Abonos;
      datos = listaAbonos.map(function (abono) {
        for (let i = 0; i < abono._id.length; i++) {
          if (boton == abono._id) {
            id = abono._id;
            document.getElementById("cliente").value = abono.cliente
            document.getElementById("fecha2").value = abono.fecha
            document.getElementById("valor").value = abono.valor
          }
          break;
        }
      });
    });
}

const actualizarAbonos = async () => {
  const nombre = document.getElementById("cliente").value;
  const fecha = document.getElementById("fecha2").value;
  const monto = document.getElementById("valor").value;
  if (nombre == "" && fecha == "" && monto == "") {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Por favor, llenar todos los campos!"
    });
  }
  else if (nombre == "") {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Por favor, ingrese un nombre!"
    });
  }
  else if (fecha == "") {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Por favor, ingrese una fecha!"
    });
  }
  else if (monto == "") {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Por favor, ingrese un monto!"
    });
  } else {
    const clienteAbo = {
      _id:id,
      cliente: nombre,
      fecha: fecha,
      valor: monto
    }
    fetch(urlAbonos, {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(clienteAbo),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((resp) => resp.json())
      .then((json) => {
        Swal.fire({
          icon: "success",
          showConfirmButton: false,
          text: "Estado actualizado :)",
          timer: 1500
        });
      });
      listarAbonos()
      abrirForm()
  }
}