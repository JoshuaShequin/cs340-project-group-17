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

function update_test_information(){
	var test_name = document.getElementById('tname').value.trim()
	var test_summary = document.getElementById('tsummary').value.trim()
	
	var user_name = getCookie("user_name");
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", reqListener);
	oReq.open("POST", "/changetestinfo");

	var body_contents = {
		user_name: user_name,
		test_ID: window.location.pathname.split("/")[3],
		test_name: test_name,
		test_summary: test_summary
	};

	var requestBody = JSON.stringify(body_contents);
	oReq.setRequestHeader('Content-Type', 'application/json');
	oReq.send(requestBody);
	window.location.replace('/managetest/'+user_name+"/")

}

window.addEventListener('DOMContentLoaded', function () {
	
	var manage_tests_buttons = document.getElementsByClassName('Manage-Test-Button');
	for (var i = 0; i < manage_tests_buttons.length; i++){
		manage_tests_buttons[i].addEventListener('click', attach_url_to_manage_button);
	}
	
	var submit_changes_button = document.getElementById('submit-test-button');
	if (submit_changes_button){
		submit_changes_button.addEventListener('click', update_test_information);
	};
});