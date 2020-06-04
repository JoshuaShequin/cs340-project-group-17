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

  numElement = document.getElementById("question-num");
  numElement.innerHTML = "Question " + currentQuestion;
  showCreateQuestionModal();

}

function exitCreateQuestionModal() {
  totalQuestion   = 0;
  currentQuestion = 0;
  testName        = 0;
  testSummary     = 0;

  hideCreateQuestionModal();
}


function enterColor() {
  var questionForm = document.forms.namedItem("create-question-form");
  var color = questionForm.elements.colorInput.value;
  console.log("Color sent: " + color);
  questions.push(color);
  currentQuestion++;
  numElement.innerHTML = "Question " + currentQuestion;
  if (currentQuestion > totalQuestion) {
    hideCreateQuestionModal();
    alert("Test submitted!");
  }
}
