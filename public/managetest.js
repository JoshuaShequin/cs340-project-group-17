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
}
else if (window.location.pathname.split("/").length == 3){
	// this is the test management overview page.
}
else if(window.location.pathname.split("/").length > 3){
	// this is a specific test we are editing.
};

function attach_url_to_manage_button(){
	content_of_button = event.target.value.split(",");
	test_id = content_of_button[0];
	
	window.location.replace("/managetest/"+getCookie("user_name")+"/"+test_id);
};

window.addEventListener('DOMContentLoaded', function () {
	
	var manage_tests_buttons = document.getElementsByClassName('Manage-Test-Button');
	for (var i = 0; i < manage_tests_buttons.length; i++){
		manage_tests_buttons[i].addEventListener('click', attach_url_to_manage_button);
	}
});