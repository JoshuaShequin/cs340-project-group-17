function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}



function showCreateTestModal() {

  var showSomethingModal = document.getElementById('create-test-modal');

  showSomethingModal.classList.remove('hidden');

};

function hideModals() {

  var showSomethingModal = document.getElementById('create-test-modal');
  var showSomethingModal3 = document.getElementById('manage-test-modal');

  showSomethingModal.classList.add('hidden');
  showSomethingModal3.classList.add('hidden');

};

function showManageTestModal() {

  var showSomethingModal = document.getElementById('manage-test-modal');

  showSomethingModal.classList.remove('hidden');

};

function logout(){
	setCookie("user_name",'', 5);
	setCookie("pass", '', 5);
	window.location.replace("/");
}


window.addEventListener('DOMContentLoaded', function () {
	
	var createTestButton = document.getElementsByClassName('create-test-button')[0];
	if (createTestButton) {
		createTestButton.addEventListener('click', showCreateTestModal);
	};
	
	var createTestButton = document.getElementsByClassName('Manage-Test-Button')[0];
	if (createTestButton) {
		createTestButton.addEventListener('click', showManageTestModal);
	};
	
	var modalHideButtons = document.getElementsByClassName('modal-hide-button');
	for (var i = 0; i < modalHideButtons.length; i++) {
		modalHideButtons[i].addEventListener('click', hideModals);
	}
	
	var logoutButton = document.getElementById('logout-button');
	logoutButton.addEventListener('click', logout);
	
});