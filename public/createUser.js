function showCreateAccountModal() {

  var createAccountModal = document.getElementById('create-account-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  createAccountModal.classList.remove('hidden');
  modalBackdrop.classList.remove('hidden');

};

function hideCreateAccountModal() {

  var createAccountModal = document.getElementById('create-account-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  createAccountModal.classList.add('hidden');
  modalBackdrop.classList.add('hidden');

};

function sendData() {

  var form = document.forms[0];

  var contents = {
    name : form.elements.username.value,
    pass : form.elements.password.value,
    sex  : form.elements.sex.value,
    date : form.elements.date.value
  }

  // removes special characters that mess up database
  contents.name = contents.name.replace(/[^a-zA-Z0-9] /g, "");
  contents.pass = contents.pass.replace(/[^a-zA-Z0-9] /g, "");

  console.log(contents.name);
  console.log(contents.pass);
  console.log(contents.sex);
  console.log(contents.date);

  if (contents.name == "" || contents.pass == "" || contents.date == "") {
    alert("Please fill out each portion of the form");
    return;
  }

	var oReq = new XMLHttpRequest();

	oReq.addEventListener("load", serverListener);

	oReq.open("POST", "/createUser");

  var requestBody = JSON.stringify(contents);
  oReq.setRequestHeader('Content-Type', 'application/json');
  oReq.send(requestBody);

};

function serverListener () {
  console.log(this);
  if (this.responseText == "success") {
    console.log("Success!");
    alert("Account successfully created.");
    hideCreateAccountModal();
  }
  else if (this.responseText == "exists") {
    console.log("Username already exists.");
    alert("Username already taken. Please enter a different name.");
  }
  else {
    console.log("Error: " + this.responseText);
  }
}
