function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


function logout(){
	setCookie("user_name",'', 5);
	setCookie("pass", '', 5);
	window.location.replace("/");
}


window.addEventListener('DOMContentLoaded', function () {
	
	var logoutButton = document.getElementById('logout-button');
	logoutButton.addEventListener('click', logout);
	
});