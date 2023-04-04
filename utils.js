const regExpLogin = /^(?=^.{0,}$)[A-Za-z]+$/;
const regExpUsername = /^(?=.{0,100}$)([а-яё\s]+|[a-z\s]+)$/iu;
const regExPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
const regExpComment = /^(?=^.{0,280}$)/;

function validateField(el, controller) {
  const password = document.getElementById('password');
  const newPassword = document.getElementById('newPassword');
  const oldPassword = document.getElementById('user-current-password');

  if (el.name === 'taskNameTaskPage') {
    if (el.value === '') {
      el.previousElementSibling.innerText = "Task name can't be empty.";
      el.classList.add('form__input-error');
      return false;
    }

    if (!regExpUsername.test(el.value)) {
      el.previousElementSibling.innerText = 'Enter correct task name';
      el.classList.add('form__input-error');
      return false;
    }

    el.previousElementSibling.innerText = '';
    el.classList.remove('form__input-error');
  }

  if (el.name === 'taskName') {
    if (el.value === '') {
      el.previousElementSibling.innerText = 'Please enter task name.';
      el.classList.add('form__input-error');
      return false;
    }

    if (!regExpUsername.test(el.value)) {
      el.previousElementSibling.innerText = 'Enter correct task name.';
      el.classList.add('form__input-error');
      return false;
    }
    el.previousElementSibling.innerText = '';
    el.classList.remove('form__input-error');
  }

  if (el.name === 'assignee') {
    if (el.value === '') {
      el.previousElementSibling.innerText = 'Enter assignee.';
      el.classList.add('form__input-error');
      return false;
    }

    if (!regExpUsername.test(el.value)) {
      el.previousElementSibling.innerText = 'Enter correct name.';
      el.classList.add('form__input-error');
      return false;
    }

    if (
      !controller.users._registeredUsers.find(
        (elem) => elem.userName === el.value
      )
    ) {
      el.previousElementSibling.innerText = 'User not found.';
      el.classList.add('form__input-error');
      return false;
    }

    el.previousElementSibling.innerText = '';
    el.classList.remove('form__input-error');
  }

  if (el.name === 'login') {
    if (el.value === '') {
      el.previousElementSibling.innerText = 'Please enter login.';
      el.parentElement.classList.add('form__input-error');

      return false;
    }

    if (!regExpLogin.test(el.value)) {
      el.previousElementSibling.innerText = 'Enter correct login.';
      el.parentElement.classList.add('form__input-error');
      return false;
    }

    if (el.value.length < 3) {
      el.previousElementSibling.innerText = 'Minimum 3 characters.';
      el.parentElement.classList.add('form__input-error');
      return false;
    }

    el.previousElementSibling.innerText = '';
    el.parentElement.classList.remove('form__input-error');
  }

  if (el.name === 'username') {
    if (el.value === '') {
      el.previousElementSibling.innerText = 'Please enter username.';
      el.parentElement.classList.add('form__input-error');
      return false;
    }

    if (el.value.length < 3) {
      el.previousElementSibling.innerText = 'Minimum 3 characters.';
      el.parentElement.classList.add('form__input-error');
      return false;
    }

    if (!regExpUsername.test(el.value)) {
      el.previousElementSibling.innerText = 'Enter correct username.';
      el.parentElement.classList.add('form__input-error');
      return false;
    }

    el.previousElementSibling.innerText = '';
    el.parentElement.classList.remove('form__input-error');
  }

  if (el.name === 'usernameUserPage') {
    if (el.value === '') {
      el.previousElementSibling.innerText = 'Please enter username.';
      el.classList.add('form__input-error');
      return false;
    }

    if (el.value.length < 3) {
      el.previousElementSibling.innerText = 'Minimum 3 characters.';
      el.classList.add('form__input-error');
      return false;
    }

    if (el.value === controller.list._user.userName) {
      el.previousElementSibling.innerText =
        "The name can't be the same as the old one.";
      el.classList.add('form__input-error');
      return false;
    }

    if (!regExpUsername.test(el.value)) {
      el.previousElementSibling.innerText = 'Enter correct username.';
      el.classList.add('form__input-error');
      return false;
    }

    el.previousElementSibling.innerText = '';
    el.classList.remove('form__input-error');
  }

  if (el.name === 'password') {
    if (oldPassword) {
      if (el.value === oldPassword.value) {
        el.previousElementSibling.innerText =
          "The new password can't be the same as the old one.";
        el.parentElement.classList.add('form__input-error');
        return false;
      }
    }
    if (el.value === '') {
      el.previousElementSibling.innerText = 'Please enter password.';
      el.parentElement.classList.add('form__input-error');
      return false;
    }

    if (el.value.length < 8) {
      el.previousElementSibling.innerText = 'Minimum 8 characters.';
      el.parentElement.classList.add('form__input-error');
      return false;
    }

    if (!regExPassword.test(el.value)) {
      el.previousElementSibling.innerText = 'Enter correct password.';
      el.parentElement.classList.add('form__input-error');
      return false;
    }
    el.previousElementSibling.innerText = '';
    el.parentElement.classList.remove('form__input-error');
  }

  if (el.name === 'confirmPassword') {
    if (password.value === '') {
      el.previousElementSibling.innerText = 'First enter the password.';
      el.parentElement.classList.add('form__input-error');
      return false;
    }

    if (password.value !== el.value && el.value !== '') {
      el.previousElementSibling.innerText = "Passwords don't match.";
      el.parentElement.classList.add('form__input-error');
      return false;
    }

    if (el.value === '') {
      el.previousElementSibling.innerText = 'Please confirm password.';
      el.parentElement.classList.add('form__input-error');
      return false;
    }

    if (!regExPassword.test(el.value)) {
      el.previousElementSibling.innerText = 'Enter correct password.';
      el.parentElement.classList.add('form__input-error');
      return false;
    }

    el.previousElementSibling.innerText = '';
    el.parentElement.classList.remove('form__input-error');
  }

  if (el.name === 'confirmNewPassword') {
    if (newPassword.value === '') {
      el.previousElementSibling.innerText = 'First enter the new password.';
      el.parentElement.classList.add('form__input-error');
      return false;
    }

    if (newPassword.value !== el.value) {
      el.previousElementSibling.innerText = "Passwords don't match.";
      el.parentElement.classList.add('form__input-error');
      return false;
    }

    if (el.value === '') {
      el.previousElementSibling.innerText = 'Please confirm password.';
      el.parentElement.classList.add('form__input-error');
      return false;
    }

    if (!regExPassword.test(el.value)) {
      el.previousElementSibling.innerText = 'Enter correct password.';
      el.parentElement.classList.add('form__input-error');
      return false;
    }

    el.previousElementSibling.innerText = '';
    el.parentElement.classList.remove('form__input-error');
  }

  return true;
}

function validateComment(el) {
  if (!regExpComment.test(el.value) && el.value !== '') {
    el.previousElementSibling.innerText = 'Maximum length 280 characters.';
    el.classList.add('form__input-error');
    return false;
  }
  el.previousElementSibling.innerText = '';
  el.classList.remove('form__input-error');

  return true;
}

function validateDescription(el) {
  if (el.classList.contains('new-task-description')) {
    if (!regExpComment.test(el.value)) {
      el.previousElementSibling.innerText = 'Maximum 280 characters.';
      el.classList.add('form__input-error');
      return false;
    }

    if (el.value === '') {
      el.previousElementSibling.innerText = 'Enter description.';
      el.classList.add('form__input-error');
      return false;
    }
  } else {
    if (!regExpComment.test(el.value)) {
      el.previousElementSibling.innerText = 'Maximum length 280 characters.';
      el.classList.add('form__input-error');
      return false;
    }

    if (el.value === '') {
      el.previousElementSibling.innerText = "Description can't be empty.";
      el.classList.add('form__input-error');
      return false;
    }
  }

  el.previousElementSibling.innerText = '';
  el.classList.remove('form__input-error');

  return true;
}

function toggleShowPassword(e) {
  if (e.target.classList.contains('fa-eye')) {
    const passwordInput = e.target.previousElementSibling;
    passwordInput.getAttribute('type') === 'password'
      ? passwordInput.setAttribute('type', 'text')
      : passwordInput.setAttribute('type', 'password');
  }
}

function setInputsValuesToEditConfig(editConfig, currentTaskConfig) {
  const nameInput = document.querySelector('.task-name-input-edit');
  const assigneeInput = document.getElementById('assignee-input');
  const privacySelect = document.getElementById('privacy-select');
  const description = document.querySelector('.task-description');
  const statusSelect = document.getElementById('status-select');
  const prioritySelect = document.getElementById('priority-select');

  nameInput.value = currentTaskConfig.name;
  assigneeInput.value = currentTaskConfig.assignee;
  privacySelect.value = currentTaskConfig.isPrivate ? 'Private' : 'Public';
  description.value = currentTaskConfig.description;
  statusSelect.value = currentTaskConfig.status;
  prioritySelect.value = currentTaskConfig.priority;

  nameInput.addEventListener('input', () => {
    editConfig.name = nameInput.value;
  });

  assigneeInput.addEventListener('input', () => {
    editConfig.assignee = assigneeInput.value;
  });

  privacySelect.addEventListener('change', () => {
    editConfig.isPrivate = Boolean(Number(privacySelect.value));
  });

  description.addEventListener('input', () => {
    editConfig.description = description.value;
  });

  statusSelect.addEventListener('change', () => {
    editConfig.status = statusSelect.value;
  });

  prioritySelect.addEventListener('change', () => {
    editConfig.priority = prioritySelect.value;
  });
}

function setInputsValuesToCurrentTaskConfig(currentTaskConfig) {
  const taskName = document.querySelector('.task-top__task-name');
  const taskAssignee = document.querySelector('.task-assignee');
  const taskPrivacy = document.querySelector('.task-privace');
  const taskDescription = document.querySelector('.task-description-text');
  const taskStatus = document.querySelector('.task-status');
  const taskPriority = document.querySelector('.task-priority');

  currentTaskConfig.name = taskName.textContent;
  currentTaskConfig.assignee = taskAssignee.textContent;
  currentTaskConfig.isPrivate =
    taskPrivacy.textContent === 'Public' ? false : true;
  currentTaskConfig.description = taskDescription.textContent;
  currentTaskConfig.status = taskStatus.textContent;
  currentTaskConfig.priority = taskPriority.textContent;
}

function getLengthOfTasks(status, controller) {
  const tasksWithStatus = Array.from(controller.list._tasks).filter(
    (task) => task.status === status
  );

  return tasksWithStatus.length;
}

function setListenerOnLoadMoreBtn(controller, itemsOnPageToRender) {
  const loadMoreButton = document.querySelector('.load-more');

  if (loadMoreButton) {
    loadMoreButton.addEventListener('click', () => {
      itemsOnPageToRender += 2;

      controller.getFeed(itemsOnPageToRender);
    });
  }
}

export {
  validateField,
  toggleShowPassword,
  setInputsValuesToEditConfig,
  validateComment,
  validateDescription,
  setInputsValuesToCurrentTaskConfig,
  setListenerOnLoadMoreBtn,
  getLengthOfTasks,
};
