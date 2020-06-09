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
		setCookie("user_name",document.getElementById('username-input').value.trim(), 5);
		setCookie("pass", document.getElementById('password-input').value.trim(), 5);
		
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
		user_name: document.getElementById('username-input').value.trim(),
		pass: document.getElementById('password-input').value.trim()
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

});

