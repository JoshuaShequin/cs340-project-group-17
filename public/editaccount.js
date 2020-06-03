/* function userReqListener(){
    var newuserinput = document.getElementById("newusernamebox").value.trim();
    var newpassinput = document.getElementById("newpasswordbox").value.trim();
    
}

function credReqListener(){
    var newuserinput = document.getElementById("newusernamebox").value.trim();
    var newpassinput = document.getElementById("newpasswordbox").value.trim();
    
} */

window.addEventListener('DOMContentLoaded', function () {
    var newuserButton = document.getElementById('newusernamesubmit');
    var newpassButton = document.getElementById('newpasswordsubmit');
    newuserButton.addEventListener('click', function(){
        sendData("/alterUsername");
      });
    newpassButton.addEventListener('click', function(){
        sendData("/alterPassword");
      });
});



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


function sendData( posttype ) {
	var oReq = new XMLHttpRequest();

	oReq.addEventListener("load", serverListener);
    oReq.open("POST", posttype);

    /* var form = document.forms[0]; */
    var newuserinput = document.getElementById("newusernamebox").value.trim();
    var newpassinput = document.getElementById("newpasswordbox").value.trim();

    var olduserinput = getCookie("user_name");
    var oldpassinput = getCookie("pass");

    
    /*console.log(form.elements.newusern.value);
    console.log(form.elements.newpswrd.value);*/
    console.log(newuserinput);
    console.log(newpassinput);

    var contents = {
        name : newuserinput,
        pass : newpassinput,
        oldname : olduserinput,
        oldpass : oldpassinput
    }

    var requestBody = JSON.stringify(contents);
    oReq.setRequestHeader('Content-Type', 'application/json');
    oReq.send(requestBody);
};




function serverListener () {
    console.log(this);
    if (this.responseText == "success") {
      console.log("Success!");
      alert("Account successfully altered.");
    }
    else if (this.responseText == "exists") {
      console.log("Username already exists.");
      alert("Username already taken. Please enter a different name.");
    }
    else {
      console.log("Error: " + this.responseText);
    }
  }


  