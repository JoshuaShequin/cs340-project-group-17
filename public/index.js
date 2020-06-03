function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function deleteUser() {
	// DELETE the user account.
	console.log("DELETING USER ACCOUNT");
	
	user_name = getCookie('user_name');
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", function(){});
	oReq.open("POST", "/deleteAccount");

	var post_contents = {
		user_name: user_name,
	};

	var requestBody = JSON.stringify(post_contents);
	oReq.setRequestHeader('Content-Type', 'application/json');
	oReq.send(requestBody);
	
	window.location.replace("/");
}

function showCreateTestModal() {

  var showSomethingModal = document.getElementById('create-test-modal');

  showSomethingModal.classList.remove('hidden');

};

function hideModals() {

  var showSomethingModal = document.getElementById('create-test-modal');
  var showSomethingModal2 = document.getElementById('manage-user-modal');
  var showSomethingModal3 = document.getElementById('manage-test-modal');

  showSomethingModal.classList.add('hidden');
  showSomethingModal2.classList.add('hidden');
  showSomethingModal3.classList.add('hidden');

};

function showManageUserModal() {

  var showSomethingModal = document.getElementById('manage-user-modal');

  showSomethingModal.classList.remove('hidden');

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
	
	var logoutButton = document.getElementById('logout-button');
	logoutButton.addEventListener('click', logout);
	
	var deleteUserButton = document.getElementById('delete-user-button');
	deleteUserButton.addEventListener('click', deleteUser);
	
});