const regExpLogin = /^(?=^.{0,}$)[A-Za-z]+$/;
const regExpUsername = /^(?=.{0,100}$)([а-яё\s]+|[a-z\s]+)$/iu;
const regExPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
const regExpComment = /^(?=^.{0,280}$)/;

function renderAsideSection(el) {
  el.innerHTML = `
      <article id="article" class="article">
          <div class="article__tools">
              <div class="input-wrapper">
              <i class="fa-solid fa-magnifying-glass"></i>
              <input class="search-input" type="text" placeholder="Search" autocomplete="off">
          </div>
          <div class="view-wrapper">
              <i class="fa-solid fa-table-columns view-selected"></i>
              <i class="fa-solid fa-list-ul"></i>
          </div>
      <form class="filters filters-laptop">
          <div class="filters__title-wrapper">
              <i class="fa-solid fa-sort-down"></i>
              <p class="filters__title">Filters</p>
          </div>
          <button class="button clear-filters-button" type="reset">
              <i class="fa-sharp fa-solid fa-rotate-left"></i>
              CLEAR
          </button>
      </form>
          </div>
          <button class="new-task-button-mobile">Add new task
                    <i class="fa-solid fa-plus"></i>
                </button>
          <div class="article__cards-group-checkboxes">
                    <p class="article__cards-group-checkboxes-title selected">To Do</p>
                    <p class="article__cards-group-checkboxes-title">In Progress</p>
                    <p class="article__cards-group-checkboxes-title">Complete</p>
          </div>
      </article>
      <aside id="aside" class="aside">
                <form id="filters" class="filters">
                    <div class="filters-closed-wrapper">
                        <div class="filters__title-wrapper">
                            <i class="fa-solid fa-sort-down"></i>
                            <p class="filters__title">Filters</p>
                        </div>
                        <button class="button clear-filters-button" type="reset">
                            <i class="fa-sharp fa-solid fa-rotate-left"></i>
                            CLEAR
                        </button>
                    </div>
                    <div id="filtersWrapper"></div>
                </form>
            </aside>`;
  el.classList.remove('main-task');
}

function validateField(el, controller) {
  const password = document.getElementById('password');
  const newPassword = document.getElementById('newPassword');

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

    // if (
    //   !controller.users._registeredUsers.find(
    //     (elem) => elem.userName === el.value
    //   )
    // ) {
    //   el.previousElementSibling.innerText = 'User not found.';
    //   el.classList.add('form__input-error');
    //   return false;
    // }

    el.previousElementSibling.innerText = '';
    el.classList.remove('form__input-error');
  }

  if (el.name === 'login') {
    if (el.value === '') {
      el.previousElementSibling.innerText = 'Please enter login.';
      el.parentElement.classList.add('form__input-error');

      return false;
    }

    if (!regExpLogin.test(el.value) && el.value !== '') {
      el.previousElementSibling.innerText = 'Only latin letters are allowed.';
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
      el.previousElementSibling.innerText =
        'Only latin and cyrillic letters are allowed.';
      el.parentElement.classList.add('form__input-error');
      return false;
    }

    el.previousElementSibling.innerText = '';
    el.parentElement.classList.remove('form__input-error');
  }

  if (el.name === 'usernameUserPage') {
    if (el.value === controller.list.user.userName) {
      el.previousElementSibling.innerText =
        "The name can't be the same as the old one.";
      el.parentElement.classList.add('form__input-error');
      return false;
    }

    if (!regExpUsername.test(el.value) && el.value !== '') {
      el.previousElementSibling.innerText = 'Enter correct username.';
      el.parentElement.classList.add('form__input-error');
      return false;
    }

    if (el.value.length >= 1 && el.value.length < 3) {
      el.previousElementSibling.innerText = 'Minimum 3 characters.';
      el.parentElement.classList.add('form__input-error');
      return false;
    }

    el.previousElementSibling.innerText = '';
    el.parentElement.classList.remove('form__input-error');
  }

  if (el.name === 'password') {
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
      el.previousElementSibling.innerText =
        'At least 1 uppercase, 1 lowercase letters and numbers are required.';
      el.parentElement.classList.add('form__input-error');
      return false;
    }
    el.previousElementSibling.innerText = '';
    el.parentElement.classList.remove('form__input-error');
  }

  if (el.name === 'newPassword') {
    if (el.value.length >= 1 && el.value.length < 8) {
      el.previousElementSibling.innerText = 'Minimum 8 characters.';
      el.parentElement.classList.add('form__input-error');
      return false;
    }

    if (!regExPassword.test(el.value) && el.value !== '') {
      el.previousElementSibling.innerText =
        'At least 1 uppercase, 1 lowercase letters and numbers are required.';
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
    if (newPassword.value !== el.value) {
      el.previousElementSibling.innerText = "Passwords don't match.";
      el.parentElement.classList.add('form__input-error');
      return false;
    }

    if (newPassword.value !== '' && el.value === '') {
      el.previousElementSibling.innerText = 'Please confirm password.';
      el.parentElement.classList.add('form__input-error');
      return false;
    }

    if (!regExPassword.test(el.value) && el.value !== '') {
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

function setInputsValuesToEditConfig(
  editConfig,
  currentTaskConfig,
  registeredUsers
) {
  const nameInput = document.querySelector('.task-name-input-edit');
  const assigneeInput = document.getElementById('assignee-input');
  const privacySelect = document.getElementById('privacy-select');
  const description = document.querySelector('.task-description');
  const statusSelect = document.getElementById('status-select');
  const prioritySelect = document.getElementById('priority-select');

  nameInput.value = currentTaskConfig.name;
  assigneeInput.value = currentTaskConfig.assignee.userName;
  privacySelect.value = currentTaskConfig.isPrivate ? 'Private' : 'Public';
  description.value = currentTaskConfig.description;
  statusSelect.value = currentTaskConfig.status;
  prioritySelect.value = currentTaskConfig.priority;

  nameInput.addEventListener('input', () => {
    editConfig.name = nameInput.value;
  });

  assigneeInput.addEventListener('input', () => {
    const list = document.getElementById('assignee-list');

    for (let i = 0; i < list.options.length; i++) {
      if (list.options[i].value === assigneeInput.value) {
        assigneeInput.setAttribute(
          'userId',
          list.options[i].getAttribute('id')
        );
      }
    }

    editConfig.assignee = registeredUsers.find((user) => {
      return user.id === assigneeInput.getAttribute('userId');
    }).id;
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

function setInputsValuesToCurrentTaskConfig(
  currentTaskConfig,
  registeredUsers
) {
  const taskName = document.querySelector('.task-top__task-name');
  const taskAssignee = document.querySelector('.task-assignee');
  const taskPrivacy = document.querySelector('.task-privace');
  const taskDescription = document.querySelector('.task-description-text');
  const taskStatus = document.querySelector('.task-status');
  const taskPriority = document.querySelector('.task-priority');

  currentTaskConfig.name = taskName.textContent;
  currentTaskConfig.assignee = registeredUsers.find((user) => {
    return user.id === taskAssignee.getAttribute('id');
  });
  currentTaskConfig.isPrivate =
    taskPrivacy.textContent === 'Public' ? false : true;
  currentTaskConfig.description = taskDescription.textContent;
  currentTaskConfig.status = taskStatus.textContent;
  currentTaskConfig.priority = taskPriority.textContent;
}

function setListenerOnStatusGroupButtons() {
  const tasksGroupsButtonsWrapper = document.querySelector(
    '.article__cards-group-checkboxes'
  );
  const toDoGroup = document.querySelector('.to-do-group');
  const inProgressGroup = document.querySelector('.in-progress-group');
  const completeGroup = document.querySelector('.complete-group');
  const tasksGropButtons = document.querySelectorAll(
    '.article__cards-group-checkboxes-title'
  );

  if (tasksGroupsButtonsWrapper) {
    tasksGroupsButtonsWrapper.addEventListener('click', (e) => {
      if (e.target.textContent === 'To Do') {
        tasksGropButtons.forEach((el) => el.classList.remove('selected'));
        e.target.classList.add('selected');
        if (toDoGroup) {
          toDoGroup.style.display = 'block';
        }
        if (inProgressGroup) {
          inProgressGroup.style.display = 'none';
        }
        if (completeGroup) {
          completeGroup.style.display = 'none';
        }
      }

      if (e.target.textContent === 'In Progress') {
        tasksGropButtons.forEach((el) => el.classList.remove('selected'));
        e.target.classList.add('selected');
        if (toDoGroup) {
          toDoGroup.style.display = 'none';
        }
        if (inProgressGroup) {
          inProgressGroup.style.display = 'block';
        }
        if (completeGroup) {
          completeGroup.style.display = 'none';
        }
      }

      if (e.target.textContent === 'Complete') {
        tasksGropButtons.forEach((el) => el.classList.remove('selected'));
        e.target.classList.add('selected');
        if (toDoGroup) {
          toDoGroup.style.display = 'none';
        }
        if (inProgressGroup) {
          inProgressGroup.style.display = 'none';
        }
        if (completeGroup) {
          completeGroup.style.display = 'block';
        }
      }
    });
  }
}

function setEventOnNewTaskMobile(body) {
  const aside = document.getElementById('aside');
  const newTaskMobileButton = document.querySelector('.new-task-button-mobile');
  if (newTaskMobileButton) {
    newTaskMobileButton.addEventListener('click', () => {
      body.classList.add('confirm');
      if (aside) {
        aside.classList.add('new-task-form-open');
      }
    });
  }

  window.addEventListener('click', (e) => {
    if (aside.classList.contains('new-task-form-open')) {
      if (
        !e.target.closest('.aside') &&
        !e.target.classList.contains('new-task-button-mobile')
      ) {
        body.classList.remove('confirm');
        aside.classList.remove('new-task-form-open');
      }
    }
  });
}

function closeSideMenu(burgerMenu, sideMenu, body) {
  burgerMenu.classList.add('burger-menu-close');
  sideMenu.classList.add('side-menu-close');
  body.classList.remove('confirm');
  setTimeout(() => {
    burgerMenu.classList.remove('burger-menu-open');
    sideMenu.classList.remove('side-menu-open');
    burgerMenu.classList.remove('burger-menu-close');
    sideMenu.classList.remove('side-menu-close');
  }, 200);
}

function convertImageToBase64(url) {
  return fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );
}

function setLoader(elToAppend, loader, body, parametr) {
  const loaderWrapper = document.getElementById(elToAppend);
  const loaderEl = document.createElement('div');
  loaderEl.className = 'lds-dual-ring';

  if (parametr) {
    if (parametr === 'modal') {
      loaderEl.classList.add('modal-loader');
    }

    if (parametr === 'button') {
      loaderEl.classList.add('button-loader');
    }

    if (parametr === 'load-more') {
      loaderEl.classList.add('load-more-loader');
    }
  }

  if (!loader) {
    if (loaderWrapper.querySelector('.lds-dual-ring')) {
      loaderWrapper.querySelector('.lds-dual-ring').remove();
    }

    loaderEl.remove();
    body.classList.remove('confirm');
  } else {
    if (elToAppend === 'confirmDelete') {
      loaderWrapper.prepend(loaderEl);
      return;
    }
    if (elToAppend === 'newCommentButton') {
      loaderWrapper.prepend(loaderEl);
      return;
    }

    if (elToAppend === 'loadMoreButton') {
      loaderWrapper.prepend(loaderEl);
      return;
    }

    loaderWrapper.prepend(loaderEl);
    body.classList.add('confirm');
  }
}

export {
  validateField,
  toggleShowPassword,
  setInputsValuesToEditConfig,
  validateComment,
  validateDescription,
  setInputsValuesToCurrentTaskConfig,
  renderAsideSection,
  setListenerOnStatusGroupButtons,
  closeSideMenu,
  setEventOnNewTaskMobile,
  convertImageToBase64,
  setLoader,
};
