
function showMessage(input, message, type) {
  const msg = input.parentNode.querySelector("small");
  msg.innerText = message;

  input.className = type ? "success" : "error";
  return type;
}
 
function showError(input, message) {
  return showMessage(input, message, false);
}
 
function showSuccess(input) {
  return showMessage(input, "", true);
}
 
function hasValue(input, message) {
  if (input.value.trim() === "") {
    return showError(input, message);
  }
  return showSuccess(input);
}
 
function validateEmail(input, requiredMsg, invalidMsg) {
  // check if the value is not empty
  if (!hasValue(input, requiredMsg)) {
    return false;
  }
  // validate email format
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 
  const email = input.value.trim();
  if (!emailRegex.test(email)) {
    return showError(input, invalidMsg);
  }
  return true;
}

function validatePostalCode(input, requiredMsg, invalidMsg) {
  // check if the value is not empty
  if (!hasValue(input, requiredMsg)) {
    return false;
  }
  // validate email format
  const postalCodeRegex =
    /^[A-za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
 
  const postalCode = input.value.trim();
  if (!postalCodeRegex.test(postalCode)) {
    return showError(input, invalidMsg);
  }
  return true;
}
 
function validatePassword(input, requiredMsg, invalidMsg) {
  const errors = [];
 
  if (!hasValue(input, requiredMsg)) {
    return false;
  }
  const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
  const password = input.value.trim();
  if (!passwordRegex.test(password)) {
    return showError(input, invalidMsg);
  }
  return true;
}
 
function validateConfirmPassword(passwordInput, confirmPasswordInput, requiredMsg, mismatchMsg) {
  
  if (!hasValue(confirmPasswordInput, requiredMsg)) {
    return false;
  }
  
 
  if (passwordInput.value.trim() !== confirmPasswordInput.value.trim()) {
    return showError(confirmPasswordInput, mismatchMsg);
  }
  
  return showSuccess(confirmPasswordInput);
}

function removecity(){
  var liste = document.getElementById("city");
  var elementTodelet = "New York";

  for (var i = 0; i < liste.options.length; i++){
    if (liste.options[i].text === elementTodelet){
      liste.remove(i);
      var newOption = document.createElement("option");
      newOption.text = elementToreplace;
      newOption.value = "Gatineau";
      liste.add(newOption);
      break;
    }
  }
  const button = document.getElementById('remove');
  button.style.display = 'none';
}



const form = document.querySelector("#signup");
const popup = document.getElementById('popup');
const infoPop = document.getElementById('infopop');


const NAME_REQUIRED = "Please enter your name";
const EMAIL_REQUIRED = "Please enter your email";
const EMAIL_INVALID = "Please enter a correct email address format";
const PASSWORD_REQUIRED = "Please enter a Password";
const PASSWORD_INVALID = "Please enter a correct Password and format - The password must be AT LEAST 8 characters, at least one number, one capital letter, and one special character";
const POSTALCODE_REQUIRED = "Please enter your Postal Code";
const POSTALCODE_INVALID = "Please enter a correct format Canadian Postal Code. The Postal Code Must be in this format: H1H 1H1";
const CONFIRM_PASSWORD_REQUIRED = "Please confirm your Password";
const PASSWORD_MISMATCH = "Passwords do not match";


form.addEventListener("submit", function (event) {
  
  event.preventDefault();
  let nameValid = hasValue(form.elements["name"], NAME_REQUIRED);
  let emailValid = validateEmail(form.elements["email"], EMAIL_REQUIRED, EMAIL_INVALID);
  let passwordValid = validatePassword(form.elements["passwordInput"], PASSWORD_REQUIRED, PASSWORD_INVALID);
  let postalCodeValid = validatePostalCode(form.elements["postalcode"], POSTALCODE_REQUIRED, POSTALCODE_INVALID);

  let confirmPasswordValid = validateConfirmPassword(
    form.elements["passwordInput"], 
    form.elements["confirmPassword"], 
    CONFIRM_PASSWORD_REQUIRED, 
    PASSWORD_MISMATCH
  );
  
  openpopup(); 
});


//function openpopup() {

//popup.classList.add("open-popup");
//}



function closepopup(){
  popup.classList.remove("open-popup");
}

function updatePopupConrent(){
  
    
      const name = form.elements["name"].value;
      const email =  form.elements["email"].value;
      const password =  form.elements["passwordInput"].value;
      const postalCode = form.elements["postalcode"].value;
      const city = form.elements["city"].value;
    
  const Ipop = document.getElementById("infopop");
    
    infoPop.innerHTML = `
      Full Name: ${userData.name}<br>
      Email: ${userData.email}<br>
      Postal Code: ${userData.postalCode}<br>
      City: ${userData.city}<br>
      Password: ${userData.password}
    `;

  }



function confirmSubmission() {
 
  let content = infoPop.innerText;
  exportFormData(content);
}




function exportFormData(data) {
  const blob = new Blob([data], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = "userinfo_data.txt"; 
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);


  closepopup();
}


window.onload = function() {
  const confirmButton = document.getElementById("popbuttonC");
  const cancelButton = document.getElementById("popbuttonCancel");

  confirmButton.onclick = confirmSubmission; 
  cancelButton.onclick = closepopup; 
}



const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("password");

togglePassword.addEventListener("click",function(){
  const type = password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type",type);
  this.classList.toggle("bi-eye");
});