const form = document.getElementById("form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const email = document.getElementById("email");
const iconoSuccess = document.getElementById("iconoSuccess");
const iconoError = document.getElementById("iconoError");
const ventanaPopUp = document.getElementById("ventanaPopUp")
const spanVentana = document.getElementById("nombreUsuario")
const botonAceptar = document.getElementById("botonAceptar")

form.addEventListener("submit", (e) => {
  //es para evitar el comportamiento default, que es justamente, submit
  e.preventDefault();
  validate();
});

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const validate = () => {
  //como no queremos que nos cuente los espacios, usamos el metodo trim para quitar los espacios al principio y al final
  user = username.value.trim();
  //si el campo username está vacío en consola aparece "el campo está vacio"
  //si el campo se relleno entonces se ejecuta el la funcion inputSuccess
  if (user === "") {
    let errorMessage = "El user no puede estar vacío";
    inputError(username, errorMessage);
  } else if (user.length < 2 || user.length > 30) {
    let errorMessage =
      "El nombre de usuario debe tener entre 2 y 30 caracteres";
    inputError(username, errorMessage);
  } else {
    inputSuccess(username, user);
  }

  const mail = email.value.trim();

  if (mail === "") {
    let errorMessage = "El email no puede estar vacío";
    inputError(email, errorMessage);
    //email regex es la variable que contiene el regex. test es un metodo que devuelve true o false
  } else if (!emailRegex.test(mail)) {
    let errorMessage = "El email no es válido";
    inputError(email, errorMessage);
  } else {
    inputSuccess(email);
  }

  const pass = password.value.trim();

  if (pass === "") {
    let errorMessage = "El password no puede estar vacío";
    inputError(password, errorMessage);
  } else if (!passRegex.test(pass)) {
    let errorMessage =
      "El password no es válido. Debe tener mayúscula, minúscula, números y al menos 8 caracteres.";
    inputError(password, errorMessage);
  } else {
    inputSuccess(password);
  }
};

const inputSuccess = (input) => {
  const inputParent = input.parentElement;
  const small = inputParent.querySelector("small");
  inputParent.classList.add("success");
  inputParent.classList.remove("error");
  small.innerHTML = "";
  abrirVentanaPopUp(input.value)
};

const inputError = (input, message) => {
  const inputParent = input.parentElement;

  const small = inputParent.querySelector("small");
  inputParent.classList.add("error");
  inputParent.classList.remove("success");

  small.classList.add("error");
  small.innerHTML = message;
};

function abrirVentanaPopUp() {
  ventanaPopUp.style.display="block"
  spanVentana.innerHTML = `${username.value}`
  botonAceptar.addEventListener("click", function() {
    ventanaPopUp.style.display="none"
    form.reset()
  })
}



