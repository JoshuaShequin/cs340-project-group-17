function showQuestionModal() {

  var showSomethingModal = document.getElementById('answer-question-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  showSomethingModal.classList.remove('hidden');
  modalBackdrop.classList.remove('hidden');

};

function hideModals() {

  var showSomethingModal = document.getElementById('answer-question-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  showSomethingModal.classList.add('hidden');
  modalBackdrop.classList.add('hidden');

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
	
});