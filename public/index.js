function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

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



function attach_url_to_manage_button(){
	content_of_button = event.target.value.split(",");
	test_id = content_of_button[0];
	
	window.location.replace("/managetest/"+getCookie("user_name")+"/"+test_id);
};


function logout(){
	setCookie("user_name",'', 5);
	setCookie("pass", '', 5);
	window.location.replace("/");
}

function re_route_home(){
	if (window.location.pathname=="/home"){
		window.location.replace("/home/"+getCookie("user_name"));
	};
}

re_route_home();
window.addEventListener('DOMContentLoaded', function () {
	
	var logoutButton = document.getElementById('logout-button');
	logoutButton.addEventListener('click', logout);
	
	var manage_tests_buttons = document.getElementsByClassName('Manage-Test-Button');
	for (var i = 0; i < manage_tests_buttons.length; i++){
		manage_tests_buttons[i].addEventListener('click', attach_url_to_manage_button);
	}
  
  // load in the server info and insert it into the page
  //send_search_data();

});

function send_search_data() {
  var oReq = new XMLHttpRequest();
  user_name = getCookie('user_name');
  oReq.open("GET", "/home");
  //console.log("==CLIENT:", user_name);
  oReq.send(user_name);
  /*
  test_ID, summary, number_of_questions, name, user_name
  */
  // console.log("==search querys", );
  // search_query = {
  //     user_name: user_name
  // };
  // console.log("==CLIENT search query", search_query);

  // var requestBody = JSON.stringify(search_query);
  // oReq.setRequestHeader('Content-Type', 'application/json');
  // console.log("==request body", requestBody);
};