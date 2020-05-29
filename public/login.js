function reqListener(){
	console.log(this.responseText);
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

});

