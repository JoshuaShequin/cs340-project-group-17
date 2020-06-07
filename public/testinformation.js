var color_selected = 6;
var question_id = 0;

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

function submitAnswer(){
	if (color_selected != 6){
		user_name = getCookie('user_name');
		var oReq = new XMLHttpRequest();
		oReq.addEventListener("load", showAnswerInformation);
		oReq.open("POST", "/testinformation/answer/"+user_name+"/"+question_id);

		var post_contents = {
			user_name: user_name,
			answer: color_selected
		};

		var requestBody = JSON.stringify(post_contents);
		oReq.setRequestHeader('Content-Type', 'application/json');
		oReq.send(requestBody);
		
		hideModals();
	}
};

function showQuestionModal() {
	content_of_button = event.target.value.split(",");
	question_id = content_of_button[0];
	

	var answered_already = false;

	// get objects and set values
	var questionNumberSpan = document.getElementById('question-number-span');
	questionNumberSpan.innerHTML = "Question #" + content_of_button[2];
	var questionColor = document.getElementById('color-container');
	questionColor.style = "background-color:"+content_of_button[1]+"; width: 100px; height: 100px;"
	var showSomethingModal = document.getElementById('answer-question-modal');
  
	// get answer information from site
	user_name = getCookie('user_name');
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", showAnswerInformation);
	oReq.open("GET", "/testinformation/"+user_name+"/"+content_of_button[0]);

	var get_contents = {
		user_name: user_name,
	};

	var requestBody = JSON.stringify(get_contents);
	oReq.setRequestHeader('Content-Type', 'application/json');
	oReq.send(requestBody);
  
	showSomethingModal.classList.remove('hidden');

};

function showAnswerInformation(){
	info = this.responseText.split(":");
	if (info.length != 0){
		if (info[0] == "A"){
			selectColor(info[1]-1)
			console.log("ALREADY ANSWERED");
		}
		else if(info[0] == "F"){
			deselectAllColors();
		};
	};
};

function answerHit(){
	color_hit = event.target.id;
	
	if(color_hit == "colorRed") {
		selectColor(0);
	}
	else if(color_hit == "colorOrange"){
		selectColor(1);
	}
	else if(color_hit == "colorYellow"){
		selectColor(2);
	}
	else if(color_hit == "colorGreen"){
		selectColor(3);
	}
	else{
		selectColor(4);
	}
};

function selectColor(colorNum){
	var colorRed = document.getElementById('colorRed');
	var colorOrange = document.getElementById('colorOrange');
	var colorYellow = document.getElementById('colorYellow');
	var colorGreen = document.getElementById('colorGreen');
	var colorBlue = document.getElementById('colorBlue');
	
	colors = [colorRed, colorOrange, colorYellow, colorGreen, colorBlue];
	
	for (var i = 0; i < colors.length; i++){
		colors[i].classList.remove('answer-selected');
	}
	colors[colorNum].classList.add('answer-selected');
	
	color_selected = colorNum + 1;
};

function deselectAllColors(){
	var colorRed = document.getElementById('colorRed');
	var colorOrange = document.getElementById('colorOrange');
	var colorYellow = document.getElementById('colorYellow');
	var colorGreen = document.getElementById('colorGreen');
	var colorBlue = document.getElementById('colorBlue');
	
	colors = [colorRed, colorOrange, colorYellow, colorGreen, colorBlue];
	
	for (var i = 0; i < colors.length; i++){
		colors[i].classList.remove('answer-selected');
	}
}

function hideModals() {

  var showSomethingModal = document.getElementById('answer-question-modal');

  showSomethingModal.classList.add('hidden');

};

window.addEventListener('DOMContentLoaded', function () {
	var answerQuestionButtons = document.getElementsByClassName('Answer-Question-Button');
	for (var i = 0; i < answerQuestionButtons.length; i++) {
		answerQuestionButtons[i].addEventListener('click', showQuestionModal);
	}
	
	var modalHideButtons = document.getElementsByClassName('modal-hide-button');
	for (var i = 0; i < modalHideButtons.length; i++) {
		modalHideButtons[i].addEventListener('click', hideModals);
	}
	
	var selectColorButtons = document.getElementsByClassName('answer');
	for (var i = 0; i < selectColorButtons.length; i++){
		selectColorButtons[i].addEventListener('click', answerHit);
	};
	
	var submitButton = document.getElementById('submit-button');
	submitButton.addEventListener('click', submitAnswer);
	
});