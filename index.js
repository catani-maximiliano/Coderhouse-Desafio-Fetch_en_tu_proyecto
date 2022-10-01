//variables
//botones
const ingresar = document.getElementById("ingresar");
const mostrarPlatos = document.getElementById("mostrar");
const ordenarPrecio = document.getElementById("ordenarPrecio");
const ordenarProducto = document.getElementById("ordenarProducto");
const filtrarPlato = document.getElementById("filtrarPlato");
const filtrarPais = document.getElementById("filtrarPais");
const resetear = document.querySelector("#resetear");
const elemento = document.querySelector("#tabla");
const listaPlatos = document.getElementById("tabla");
let nuevoPlato = [];
let usuarioNuevo = [];
const emailRegister = document.getElementById("emailRegister");
const contraseñaRegistro = document.getElementById("contraseñaRegistro");
const contraseñaRegistroCon = document.getElementById("contraseñaRegistroCon");
let usuarioExistente="";
const regexEmail =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

let platoJson = []; //variable donde guardo el objeto traido desde json
let usuarioJson = [];
let tablaContent;
let tablaContentPrecio;
let tablaContentProducto;
let tablaContentFiltroPais;
let tablaContentFiltroPlato;
let ordenadosPrecio = [];
let ordenadosProducto = [];

class comidas {
  constructor(nombre, ingredientes, pais, precio) {
    this.nombre = nombre;
    this.ingredientes = ingredientes;
    this.pais = pais;
    this.precio = precio;
  }
}
class usuario {
  constructor(email, contraseña) {
    this.email = email;
    this.contraseña = contraseña;
  }
}

//funcionalidad de los botones
ingresar.onclick = function (e) {
  ingreso();
};
mostrarPlatos.onclick = function (e) {
  mostrarPlato();
};
ordenarPrecio.onclick = function (e) {
  ordenPrecio();
};
ordenarProducto.onclick = function (e) {
  ordenProducto();
};
filtrarPlato.onclick = function (e) {
  filtradoPlato();
};
filtrarPais.onclick = function (e) {
  filtradoPais();
};
resetear.addEventListener("click", () => {
  reset();
});
registro.onclick = function (e) {
  Register();
};

//funciones
function ver(mostrar) {
  let infoMostrar = "Mostrar los Platos guardados en el LocalStorage";
  let infoOrdenarPrecio = "Ordenar todos los platos por Precio";
  let infoOrdenarProducto = "Ordenar todos los platos por Producto";
  let infofiltrarPlato = "busqueda de platos por su nombre";
  let infofiltrarPais = "busqueda de platos por su pais de origen";
  let inforesetear = "Limpiar Tabla pero no borra los datos del local storage";

  //implementacion de Tostify para los Botones
  if (mostrar == "infoMostrar") {
    Toastify({
      text: infoMostrar,
      className: "info",
      stopOnFocus: true,
      gravity: "top",
      position: "center",
      style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
    }).showToast();
  } else if (mostrar == "infoOrdenarPrecio") {
    Toastify({
      text: infoOrdenarPrecio,
      className: "info",
      gravity: "top",
      position: "center",
      style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
    }).showToast();
  } else if (mostrar == "infoOrdenarProducto") {
    Toastify({
      text: infoOrdenarProducto,
      className: "info",
      gravity: "top",
      position: "center",
      style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
    }).showToast();
  } else if (mostrar == "infofiltrarPlato") {
    Toastify({
      text: infofiltrarPlato,
      className: "info",
      gravity: "top",
      position: "center",
      style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
    }).showToast();
  } else if (mostrar == "infofiltrarPais") {
    Toastify({
      text: infofiltrarPais,
      className: "info",
      gravity: "top",
      position: "center",
      style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
    }).showToast();
  } else if (mostrar == "inforesetear") {
    Toastify({
      text: inforesetear,
      className: "info",
      gravity: "top",
      position: "center",
      style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
    }).showToast();
  }
}

function ingreso() {
  let nombre = document.getElementById("formNombre").value;
  let ingredientes = document.getElementById("formIngredientes").value;
  let pais = document.getElementById("formPais").value;
  let precio = document.getElementById("formPrecio").value;

  nuevoPlato.push(new comidas(nombre, ingredientes, pais, precio));

  //guardado del plato en el localStorage.
  localStorage.setItem("plato", JSON.stringify(nuevoPlato));
  //en platoJson guardo el objeto del localstorage y luego la variable platoJson la utilizo para el resto de funciones.
  platoJson = JSON.parse(localStorage.getItem("plato"));

  document.getElementById("formNombre").value = "";
  document.getElementById("formIngredientes").value = "";
  document.getElementById("formPais").value = "";
  document.getElementById("formPrecio").value = "";

  //implementacion de Tostify para el ingreso de un plato
  Toastify({
    text: "Se guardo Correctamente",
    className: "info",
    stopOnFocus: true,
    gravity: "top",
    position: "center",
    style: { background: "green" },
  }).showToast();
}

function mostrarPlato() {
  reset();
  for (let item of platoJson) {
    tablaContent += `
    <tr>
      <td>${item.nombre}</td>
      <td>${item.ingredientes}</td>
      <td>${item.pais}</td>
      <td>${item.precio}</td>
  </td>`;
  }
  listaPlatos.innerHTML += tablaContent;
}

function ordenPrecio() {
  reset();

  ordenadosPrecio = platoJson.map((elemento) => elemento);
  ordenadosPrecio.sort(function (a, b) {
    return a.precio - b.precio;
  });

  for (let item1 of ordenadosPrecio) {
    tablaContentPrecio += `
      <tr>
        <td>${item1.nombre}</td>
        <td>${item1.ingredientes}</td>
        <td>${item1.pais}</td>
        <td>${item1.precio}</td>
      </td>
    `;
  }
  listaPlatos.innerHTML += tablaContentPrecio;
}

function ordenProducto() {
  reset();
  ordenadosProducto = platoJson.map((elemento) => elemento);
  ordenadosProducto.sort(function (a, b) {
    //funcion Optimizada
    a.nombre > b.nombre ? 1 : -1;
    return 0;
  });

  for (let item1 of ordenadosProducto) {
    tablaContentProducto += `
      <tr>
        <td>${item1.nombre}</td>
        <td>${item1.ingredientes}</td>
        <td>${item1.pais}</td>
        <td>${item1.precio}</td>
      </td>
    `;
  }
  listaPlatos.innerHTML += tablaContentProducto;
}

function filtradoPlato() {
  reset();
  let platoF = prompt("ingrese el nombre del plato que quiere buscar");
  let platoFiltrado = platoJson.filter((plato) => plato.nombre == platoF);

  for (let plato of platoFiltrado) {
    tablaContentFiltroPlato += `
    <tr>
      <td>${plato.nombre}</td>
      <td>${plato.ingredientes}</td>
      <td>${plato.pais}</td>
      <td>${plato.precio}</td>
    </td>
  `;
  }
  listaPlatos.innerHTML += tablaContentFiltroPlato;
}

function filtradoPais() {
  reset();
  let platoA = prompt("ingrese el pais de origen del plato que quiere buscar");
  let paisFiltrado = platoJson.filter((plato) => plato.pais == platoA);

  for (let plato of paisFiltrado) {
    tablaContentFiltroPais += `
    <tr>
       <td>${plato.nombre}</td>
       <td>${plato.ingredientes}</td>
       <td>${plato.pais}</td>
       <td>${plato.precio}</td>
    </tr>
   `;
  }
  listaPlatos.innerHTML += tablaContentFiltroPais;
}

function reset() {
  elemento.innerHTML = `
  <table id="tabla" class="w-75 m-5 table table-bordered table-striped table-dark">
  <tr>
      <th>Plato</th>
      <th>ingredientes</th>
      <th>pais de origen</th>
      <th>Precio</th>
  </tr>
  </table>`;

  tablaContent = ``;
  tablaContentPrecio = ``;
  tablaContentProducto = ``;
  tablaContentFiltroPais = ``;
  tablaContentFiltroPlato = ``;
}

const emailSesion = document.getElementById("emailSesion").value;
const contraseñaSesion = document.getElementById("contraseñaSesion").value;
usuarioJson = JSON.parse(localStorage.getItem("usuario"));

let usuarioConectado = false;
localStorage.setItem("usuarioConectado", JSON.stringify(usuarioConectado));
let usuarioConectadoJson = JSON.parse(localStorage.getItem("usuarioConectado"));

function Login() {
  console.log("login");
  if (usuarioConectadoJson === false) {
    console.log("if login");
    
    for (var i = 0; i < usuarioJson.length; i++) {
      console.log("for");
      if (
        usuarioJson[i].email == emailSesion &&
        usuarioJson[i].contraseña == contraseñaSesion
      ) {
        console.log((usuarioExistente = usuarioJson[i].email));
        return (usuarioExistente = usuarioJson[i].email);
      }
    }

    if (emailSesion !== usuarioExistente) {
      Swal.fire("Usuario o contraseña incorrectas");
      return;
    } else {
      usuarioConectado = true;

      localStorage.setItem(
        "usuarioConectado",
        JSON.stringify(usuarioConectado)
      );

      //ocultar botones registro y login, y visibilizar el boton cerrar sesion.
      document.getElementById("boton-ingresar").className = "d-none";
      document.getElementById("boton-registrar").className = "d-none";
      document.getElementById("boton-cerrar-sesion").className =
        "d-block btn btn-primary text-dark";
      Swal.fire("ingresaste Correctamente");
      function cerrarBoton() {
        // simulamos el click del mouse en el boton del formulario
        document.getElementById("boton-cerrar-login").click();
      }
      setTimeout(cerrarBoton, 1000);
    }
  }
  //validacion de mail y contraseña dentro del localstorage.
}
//la funcion para registrar usuarios mediante localstorage
function Register() {
  let emailReg = document.getElementById("emailRegister").value;
  let contraseñaReg = document.getElementById("contraseñaRegistro").value;
  let contraseñaRegCon = document.getElementById("contraseñaRegistroCon").value;

  //busca en el localStorage si existe el mail ingresado. intente con filter pero no pude hacer que sea igual un valor a la busqueda.
  for (var i = 0; i < usuarioJson.length; i++) {
    if (usuarioJson[i].email == emailReg)
      Swal.fire("Este mail ya esta registrado!!!");
    return (usuarioExistente = usuarioJson[i].email);
  }
  //validaciones para el registro de usuario
  if (emailReg === "" || contraseñaReg === "" || contraseñaRegCon === "") {
    Swal.fire("los campos no pueden estar vacios");
    return;
  }
  if (emailReg !== "" && !regexEmail.test(emailReg)) {
    Swal.fire("debes escribir una direccion de corrreo valida");
    return;
  }
  if (contraseñaReg !== contraseñaRegCon) {
    Swal.fire("las contraseñas deben coincidir");
    return;
  }
  if (contraseñaReg.length < 6) {
    Swal.fire("la contraseña debe ser mayor a 6 digitos");
    return;
  } else {
    usuarioNuevo.push(new usuario(emailReg, contraseñaReg));
    //guardado del usuario en el localStorage.
    localStorage.setItem("usuario", JSON.stringify(usuarioNuevo));
    //en usuarioJson guardo el objeto del localstorage y luego la variable usuarioJson la utilizo para el resto de funciones.
    usuarioJson = JSON.parse(localStorage.getItem("usuario"));

    Swal.fire("Registrado con exito");

    //cree funcion mostrar y clickbutton para poder cerrar el modal registro y abrir el login simultaneamente.
    function mostrar() {
      // simulamos el click del mouse en el boton del formulario
      document.getElementById("boton-ingresar").click();
    }
    setTimeout(mostrar, 1300);
    function clickbutton() {
      // simulamos el click del mouse en el boton del formulario
      document.getElementById("boton-cerrar-registro").click();
    }
    setTimeout(clickbutton, 1000);
  }
}

function cerrarSesion() {}