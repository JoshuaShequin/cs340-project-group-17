var totalQuestion;
var currentQuestion;
var testName;
var testSummary;
var questions = [];
var numElement;

function showCreateQuestionModal() {

  var createQuestionModal = document.getElementById('create-question-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  createQuestionModal.classList.remove('hidden');
  modalBackdrop.classList.remove('hidden');

};

function hideCreateQuestionModal() {

  var createQuestionModal = document.getElementById('create-question-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  createQuestionModal.classList.add('hidden');
  modalBackdrop.classList.add('hidden');

};

/* returns cookie value when cookie key is passed in */
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

function enterCreateQuestionModal () {
  var testForm = document.forms.namedItem("create-test-form");
  console.log(testForm.elements.testName.value);
  console.log(testForm.elements.testSummary.value);
  console.log(testForm.elements.testNum.value);
  console.log(testForm);

  totalQuestion   = testForm.elements.testNum.value;
  currentQuestion = 1;
  testName        = testForm.elements.testName.value;
  testSummary     = testForm.elements.testSummary.value;
  if (totalQuestion == "" || testName == "" || testSummary == "") {
    alert("Must enter values into every box.");
    return;
  }

  if (totalQuestion < 1 || totalQuestion > 10) {
    alert("A test must have at least 1 question and cannot have more then 10");
    return;
  }

  numElement = document.getElementById("question-num");
  numElement.innerHTML = "Question " + currentQuestion;
  showCreateQuestionModal();

}

function exitCreateQuestionModal(clear) {
  totalQuestion     = 0;
  currentQuestion   = 0;
  testName          = 0;
  testSummary       = 0;
  questions.length  = 0;

  if (clear) document.forms.namedItem("create-test-form").reset();
  hideCreateQuestionModal();
  console.log("EXIT!");
}


function enterColor() {
  var questionForm = document.forms.namedItem("create-question-form");
  var color = questionForm.elements.colorInput.value;
  console.log("Color sent: " + color);
  questions.push(color);
  currentQuestion++;
  if (currentQuestion > totalQuestion) {
    console.log(questions);
    sendTestData (questions)
    alert("Test submitted!");
    exitCreateQuestionModal(true);
  }
  numElement.innerHTML = "Question " + currentQuestion;
}

/* Send test data below*/
function sendTestData(colors) {
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", serverListener);
	oReq.open("POST", "/createtest");
  var form = document.forms.namedItem("create-test-form");


  var user_name = getCookie("user_name");

  console.log(form);
  console.log(form.elements.testName.value);
  console.log(form.elements.testSummary.value);
  console.log(form.elements.testNum.value);
  console.log(user_name);

  var contents = {
    testName    : form.elements.testName.value,
    testSummary : form.elements.testSummary.value,
    testNum     : form.elements.testNum.value,
    colors      : colors,
    username    : user_name
  }

  console.log(contents);

  var requestBody = JSON.stringify(contents);
  oReq.setRequestHeader('Content-Type', 'application/json');
  oReq.send(requestBody);
};

function serverListener () {
  console.log(this);
  if (this.responseText == "success") {
    console.log("Success!");
    alert("Test successfully created.");
    exitCreateQuestionModal(true);
  }
  else {
    console.log("Error: " + this.responseText);
  }
}
