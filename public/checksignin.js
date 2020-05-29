function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

user_name = getCookie("user_name");
pass = getCookie("pass");

if (user_name == '' || pass == ''){
	if (window.location.pathname != '/'){
		window.location.replace("/");
	}
}
else{

	function reqListener(){
		if (this.responseText == "Login successful!"){
			// login successfull, do nothing unless this is the login page(see login page)
			if (window.location.pathname == "/"){
				window.location.replace("/home");
			};
		}
		else{
			console.log("GOING BACK TO LOGIN");
			window.location.replace("/"); // change this to the correct URL when hosted.
		};
	}

	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", reqListener);
	oReq.open("POST", "/enterlogin");

	var login_contents = {
		user_name: user_name,
		pass: pass
	};

	var requestBody = JSON.stringify(login_contents);
	oReq.setRequestHeader('Content-Type', 'application/json');
	oReq.send(requestBody);
}


