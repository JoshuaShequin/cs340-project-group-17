function showCreateAccountModal() {

  var createAccountModal = document.getElementById('create-account-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  createAccountModal.classList.remove('hidden');
  modalBackdrop.classList.remove('hidden');

};

function hideCreateAccountModal() {

  var createAccountModal = document.getElementById('create-account-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  createAccountModal.classList.add('hidden');
  modalBackdrop.classList.add('hidden');

};
