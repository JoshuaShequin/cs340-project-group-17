function showCreateTestModal() {

  var showSomethingModal = document.getElementById('create-test-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  showSomethingModal.classList.remove('hidden');
  modalBackdrop.classList.remove('hidden');

};

function hideModals() {

  var showSomethingModal = document.getElementById('create-test-modal');
  var showSomethingModal2 = document.getElementById('manage-user-modal');
  var showSomethingModal3 = document.getElementById('manage-test-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  showSomethingModal.classList.add('hidden');
  showSomethingModal2.classList.add('hidden');
  showSomethingModal3.classList.add('hidden');
  modalBackdrop.classList.add('hidden');

};

function showManageUserModal() {

  var showSomethingModal = document.getElementById('manage-user-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  showSomethingModal.classList.remove('hidden');
  modalBackdrop.classList.remove('hidden');

};

function showManageTestModal() {

  var showSomethingModal = document.getElementById('manage-test-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  showSomethingModal.classList.remove('hidden');
  modalBackdrop.classList.remove('hidden');

};


window.addEventListener('DOMContentLoaded', function () {
	
	var createTestButton = document.getElementsByClassName('create-test-button')[0];
	if (createTestButton) {
		createTestButton.addEventListener('click', showCreateTestModal);
	};
	
	var createTestButton = document.getElementsByClassName('manage-account-button')[0];
	if (createTestButton) {
		createTestButton.addEventListener('click', showManageUserModal);
	};
	
	var createTestButton = document.getElementsByClassName('Manage-Test-Button')[0];
	if (createTestButton) {
		createTestButton.addEventListener('click', showManageTestModal);
	};
	
	var modalHideButtons = document.getElementsByClassName('modal-hide-button');
	for (var i = 0; i < modalHideButtons.length; i++) {
		modalHideButtons[i].addEventListener('click', hideModals);
	}
	
});