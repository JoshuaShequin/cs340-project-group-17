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
if (window.location.pathname === "/managetest"){
	window.location.replace("/managetest/"+getCookie("user_name"));
}
else if (window.location.pathname.split("/")[2] != getCookie("user_name")){
	window.location.replace("/");
};