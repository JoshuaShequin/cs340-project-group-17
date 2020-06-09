function hideModals() {

  var showSomethingModal = document.getElementById('create-login-error-modal');

  var modalBackdrop = document.getElementById('modal-backdrop');

  showSomethingModal.classList.add('hidden');

  modalBackdrop.classList.add('hidden');

};

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function reqListener(){
	if (this.responseText == "Login successful!"){
		setCookie("user_name",document.getElementById('username-input').value.trim().replace(/[^a-zA-Z0-9] /g, ""), 5);
		setCookie("pass", document.getElementById('password-input').value.trim().replace(/[^a-zA-Z0-9] /g, ""), 5);
		
		window.location.replace("/home");
	}
	else{
		var showSomethingModal = document.getElementById('create-login-error-modal');

		showSomethingModal.classList.remove('hidden');
		setCookie("user_name",'', 5);
		setCookie("pass", '', 5);
	};
}

function hitLogin(){
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", reqListener);
	oReq.open("POST", "/enterlogin");

	var login_contents = {
		user_name: document.getElementById('username-input').value.trim().replace(/[^a-zA-Z0-9] /g, ""),
		pass: document.getElementById('password-input').value.trim().replace(/[^a-zA-Z0-9] /g, "")
	};

	var requestBody = JSON.stringify(login_contents);
	oReq.setRequestHeader('Content-Type', 'application/json');
	oReq.send(requestBody);
};

window.addEventListener('DOMContentLoaded', function () {

  var loginButton = document.getElementById('login-button');
  loginButton.addEventListener('click', hitLogin);
  
  var modalHideButtons = document.getElementsByClassName('modal-exit-button');
	for (var i = 0; i < modalHideButtons.length; i++) {
		modalHideButtons[i].addEventListener('click', hideModals);
	}

	// make it able to login on enter key
	var input = document.getElementById("username-input");
	input.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			document.getElementById("login-button").click();
		}
	});
	var input = document.getElementById("password-input");
	input.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			document.getElementById("login-button").click();
		}
	});

});

