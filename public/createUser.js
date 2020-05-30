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

// window.addEventListener('DOMContentLoaded', function () {
//
//   var createButton = document.getElementById('create-account-button');
//
//   createButton.addEventListener('click', sendData);
// });

function sendData() {
  console.log("Click");
	var oReq = new XMLHttpRequest();

	oReq.addEventListener("load", serverListener);

	oReq.open("POST", "/createUser");

  var form = document.forms[0];

  // console.log(form);
  console.log(form.elements.username.value);
  console.log(form.elements.password.value);
  console.log(form.elements.sex.value);
  console.log(form.elements.date.value);

  var contents = {
    name : form.elements.username.value,
    pass : form.elements.password.value,
    sex  : form.elements.sex.value,
    date : form.elements.date.value
  }

  var requestBody = JSON.stringify(contents);
  oReq.setRequestHeader('Content-Type', 'application/json');
  oReq.send(requestBody);
};

function serverListener () {
  if (this.responseText == "success") {
    console.log("Success!");
  }
  else if (this.responseText == "exists") {
    console.log("Error");
  }
  else {
    console.log("something fucky happened");
  }
}
