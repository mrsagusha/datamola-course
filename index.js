import {
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
  setEventOnNewTaskLaptop,
  convertImageToBase64,
  setLoader,
} from './utils.js';

class TaskFeedApiService {
  constructor(server) {
    this.server = server;
  }

  _tasks = [];

  _user = window.localStorage.getItem('currentUser')
    ? window.localStorage.getItem('currentUser')
    : {};

  get tasks() {
    return this._tasks;
  }

  set tasks(tasks) {
    this._tasks = tasks;
  }

  get user() {
    return this._user;
  }

  set user(user) {
    this._user = user;
  }

  changeUser(user) {
    this._user = user;
  }

  _getToken() {
    return window.localStorage.getItem('token');
  }

  _getRequestOptions(method, data) {
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        accept: '*/*',
        authorization: `Bearer ${this._getToken()}`,
      },
    };

    if (method !== 'GET' && method !== 'DELETE') {
      options.body = JSON.stringify(data);
    }

    return options;
  }

  async getTasks(skip, top, status) {
    try {
      const res = await fetch(
        `${this.server}/tasks?${new URLSearchParams({
          skip: skip,
          top: top,
          status: status,
        })}`
      );
      const json = await res.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  }

  async getTask(id) {
    try {
      const response = await fetch(`${this.server}/tasks/${id}`);
      const json = await response.json();

      if (!response.ok) {
        return response;
      }

      return json;
    } catch (error) {
      console.log(error);
    }
  }

  async getComments(id) {
    try {
      const res = await fetch(`${this.server}/tasks/${id}/comments`);
      const json = await res.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  }

  async getAllUsers() {
    try {
      const response = await fetch(`${this.server}/user/allUsers`);
      const json = await response.json();

      if (!response.ok) {
        return response;
      }

      return json;
    } catch (error) {
      console.log(error);
    }
  }

  async registerUser(data) {
    try {
      const res = await fetch(
        `${this.server}/user/register`,
        this._getRequestOptions('POST', data)
      );
      const json = await res.json();
      if (!res.ok) {
        return json.message;
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async loginUser(data) {
    try {
      const res = await fetch(
        `${this.server}/auth/login`,
        this._getRequestOptions('POST', data)
      );
      const json = await res.json();

      window.localStorage.setItem('token', json.token);

      if (!res.ok) {
        return json.message;
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async getMyProfile() {
    try {
      const response = await fetch(
        `${this.server}/user/myProfile`,
        this._getRequestOptions('GET')
      );
      const json = await response.json();

      if (!response.ok) {
        return response;
      }

      return json;
    } catch (error) {
      console.log(error);
    }
  }

  async postComment(id, data) {
    try {
      const response = await fetch(
        `${this.server}/tasks/${id}/comments`,
        this._getRequestOptions('POST', data)
      );
      const json = await response.json();

      if (!response.ok) {
        return response;
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async postTask(data) {
    try {
      const res = await fetch(
        `${this.server}/tasks`,
        this._getRequestOptions('POST', data)
      );
      const json = await res.json();
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteTask(id) {
    try {
      const res = await fetch(
        `${this.server}/tasks/${id}`,
        this._getRequestOptions('DELETE')
      );
      const json = await res.json();
    } catch (error) {
      console.log(error.message);
    }
  }

  async editTask(id, data) {
    try {
      const res = await fetch(
        `${this.server}/tasks/${id}`,
        this._getRequestOptions('PATCH', data)
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  async editUser(id, data) {
    try {
      const res = await fetch(
        `${this.server}/user/${id}`,
        this._getRequestOptions('PATCH', data)
      );
      const json = await res.json();
      if (!res.ok) {
        return json.message;
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}

class UserCollection {
  constructor() {
    this._registeredUsers;
  }

  get users() {
    return this._registeredUsers;
  }

  get(id) {
    return this._registeredUsers.find((user) => user._id === String(id));
  }

  addUser(login, userName, password, photo) {
    const user = {};

    user._id = Date.now().toString();
    user.login = login;
    user.userName = userName;
    user.password = password;
    user.photo = photo;

    this._registeredUsers.push(user);
  }

  edit(id, name, password, photo) {
    if (arguments.length === 0) {
      return false;
    }

    const editUser = JSON.parse(JSON.stringify(this.get(id)));

    editUser.userName = name;
    editUser.password = password;
    editUser.photo = photo;

    this._registeredUsers = this._registeredUsers.map((user) => {
      return user._id === id ? (user = editUser) : user;
    });
  }
}

class HeaderView {
  constructor(id) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  display(user) {
    const header = document.getElementById(this._id);
    let isUser = user.userName
      ? user.userName === controller.api._user.userName
      : false;
    if (!user) {
      isUser = false;
    }

    if (header) {
      header.innerHTML = `
      <div class="logo">
      <img class="logo__image" src="./assets/Logo.png" alt="logo">
      <h1 class="logo__text">Turbo</h1>
      </div>
      <div class="user-profile-wrapper">
            <div class="user-profile">
              <p class="user-profile__user-name">${
                user.userName ? user.userName : 'Guest'
              }</p>
              ${
                isUser
                  ? `<img class="user-image" src='data:image/png;base64,${user.photo}' alt="user"></img>`
                  : ''
              }
          </div>
          ${
            isUser
              ? `<button class="button button__logout">LOGOUT<i class="fa-solid fa-arrow-right-from-bracket"></i></button>`
              : `<button class="button button__signin">SIGN IN</button>`
          }
      </div>
      `;
    }
  }
}

class TaskFeedView {
  constructor(id) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  display(tasks) {
    const tasksFeedContainer = document.getElementById(this._id);
    const viewToggleSection = document.querySelector('.view-wrapper');
    const tasksFeed = document.createElement('div');
    const toDoGroup = createSection('to-do-group');
    const inProgressGroup = createSection('in-progress-group');
    const completeGroup = createSection('complete-group');
    const loadMoreButton = document.createElement('button');
    loadMoreButton.className = 'button load-more';
    loadMoreButton.setAttribute('id', 'loadMoreButton');
    loadMoreButton.innerText = 'Load more';
    tasksFeed.classList.add('article__tasks-wrapper');

    function formatGroupName(groupName) {
      const groupNameArray = groupName.replace(/[^A-Z0-9]/gi, ' ').split(' ');

      return groupName
        .replace(/[^A-Z0-9]/gi, ' ')
        .split(' ')
        .slice(0, groupNameArray.length - 1)
        .map((el) => {
          return el.charAt(0).toUpperCase() + el.slice(1);
        })
        .join(' ');
    }

    function createSection(groupName) {
      const tasksFeedGroupWraperr = document.createElement('section');
      const tasksFeedGroupName = document.createElement('h3');
      const tasksFeedGroup = document.createElement('div');
      tasksFeedGroupWraperr.classList.add('article__cards-group');
      tasksFeedGroupWraperr.classList.add(`${groupName}`);
      tasksFeedGroupName.classList.add('article__group-name');
      tasksFeedGroupName.innerText = formatGroupName(groupName);
      tasksFeedGroup.classList.add('article__cards-wrapper');
      tasksFeedGroupWraperr.append(tasksFeedGroup);
      tasksFeedGroupWraperr.prepend(tasksFeedGroupName);

      return tasksFeedGroupWraperr;
    }

    if (viewToggleSection) {
      if (!viewToggleSection.classList.contains('list-view')) {
        tasksFeed.append(toDoGroup);
        tasksFeed.append(inProgressGroup);
        tasksFeed.append(completeGroup);

        for (let i = 0; i < tasks.length; i++) {
          if (
            tasks[i].isPrivate &&
            tasks[i].assignee.id !== controller.api.user.id &&
            tasks[i].creator.id !== controller.api.user.id
          ) {
            continue;
          }
          const newTask = document.createElement('div');
          newTask.classList.add('card');
          newTask.setAttribute('id', tasks[i].id);
          newTask.setAttribute('status', tasks[i].status);
          newTask.innerHTML = `
          <i class="fa-solid fa-ellipsis-vertical ${
            controller.api.user.id === tasks[i].creator.id ? '' : 'forbidden'
          }"><div class="card-options">
              <i class="fa-solid fa-trash delete-task-board"></i>
              <i class="fa-solid fa-pen edit-task-board"></i>
          </div></i>
          <div class="card__main-info">
              <div class="card__task-info">
                  <div class="card__task-name-wrapper">
                    <p class="card__task-name">${tasks[i].name}</p>
                    <p class="card__privacy card__privacy-laptop">${
                      tasks[i].isPrivate ? 'Private' : 'Public'
                    }</p>
                  </div>
                  <div class="card__task-assignee-wrapper">
                      <i class="fa-solid fa-user"></i>
                      <p  class="card__task-assignee">${
                        tasks[i].assignee.userName
                      }</p>
                  </div>
                  <p class="card__task-description">${tasks[i].description} </p>
              </div>
              <div class="card__status-info">
                  <p class="card__privacy">${
                    tasks[i].isPrivate ? 'Private' : 'Public'
                  }</p>
                  <p class="card__status ${tasks[i].status
                    .split(' ')
                    .join('-')
                    .toLowerCase()}">${tasks[i].status}</p>
                  <p class="card__priority ${tasks[
                    i
                  ].priority.toLowerCase()}">${tasks[i].priority}</p>
              </div>
          </div>
          <div class="card__footer">
              <i class="fa-regular fa-message">
              ${
                tasks[i].comments.length > 0
                  ? `<span class="message-quantity">
                    ${tasks[i].comments.length}
                  </span>`
                  : ''
              }                             
              </i>
              <div class="task-date-wrapper">
                  <time class="card__date">${
                    ('0' + new Date(tasks[i].createdAt).getDate()).slice(-2) +
                    '.' +
                    ('0' + (new Date(tasks[i].createdAt).getMonth() + 1)).slice(
                      -2
                    ) +
                    '.' +
                    new Date(tasks[i].createdAt).getFullYear()
                  }</time>
                  <time class="card__date">
                    ${
                      new Date(tasks[i].createdAt).getHours() +
                      ':' +
                      (String(new Date(tasks[i].createdAt).getMinutes())
                        .length === 1
                        ? '0' + new Date(tasks[i].createdAt).getMinutes()
                        : new Date(tasks[i].createdAt).getMinutes())
                    }
                  </time>
              </div>
          </div>
          `;

          if (tasks[i].status === 'To Do') {
            toDoGroup.lastElementChild.append(newTask);
          }

          if (tasks[i].status === 'In progress') {
            inProgressGroup.lastElementChild.append(newTask);
          }

          if (tasks[i].status === 'Complete') {
            completeGroup.lastElementChild.append(newTask);
          }
        }
      } else {
        tasksFeed.classList.add('list-view-wrapper');
        const toDoGroup = createTasksGroupSections('to-do-group');
        const inProgressGroup = createTasksGroupSections('in-progress-group');
        const completeGroup = createTasksGroupSections('complete-group');

        function createTasksGroupSections(groupName) {
          const section = document.createElement('section');
          const tasksWrapper = document.createElement('div');
          tasksWrapper.classList.add('tasks-wrapper-list-view');
          const tasksWrapperInformation = document.createElement('div');
          tasksWrapperInformation.classList.add('article__cards-group-info');
          const sectionName = document.createElement('h3');
          sectionName.classList.add('article__cards-group__group-name');
          section.classList.add('article__cards-group-list-view');
          section.classList.add(`${groupName}`);
          if (groupName === 'to-do-group') {
            section.classList.add('group-open');
          }
          sectionName.textContent = formatGroupName(groupName);
          tasksWrapper.append(tasksWrapperInformation);
          section.append(sectionName);
          section.append(tasksWrapper);

          tasksWrapperInformation.innerHTML = `
            <span>Task name</span>
            <span>Assignee</span>
            <span>Date</span>
            <span>Description</span>
            <span>Comments</span>
            <span>Status</span>
            <span>Priority</span>
            <span>Privacy</span>
        `;

          return section;
        }

        for (let i = 0; i < tasks.length; i++) {
          if (
            tasks[i].isPrivate &&
            tasks[i].assignee.id !== controller.api.user.id &&
            tasks[i].creator.id !== controller.api.user.id
          ) {
            continue;
          }
          const newTask = document.createElement('div');
          newTask.classList.add('card-list-view');
          newTask.setAttribute('id', tasks[i].id);
          newTask.setAttribute('status', tasks[i].status);
          newTask.innerHTML = `
                <span class="card-name-list-view">${tasks[i].name}</span>
                <span>${tasks[i].assignee.userName}</span>
                <div class="task-date-list-view-wrapper">
                  <time>${
                    ('0' + new Date(tasks[i].createdAt).getDate()).slice(-2) +
                    '.' +
                    ('0' + (new Date(tasks[i].createdAt).getMonth() + 1)).slice(
                      -2
                    ) +
                    '.' +
                    new Date(tasks[i].createdAt).getFullYear()
                  }</time>
                  <time>${
                    new Date(tasks[i].createdAt).getHours() +
                    ':' +
                    (String(new Date(tasks[i].createdAt).getMinutes())
                      .length === 1
                      ? '0' + new Date(tasks[i].createdAt).getMinutes()
                      : new Date(tasks[i].createdAt).getMinutes())
                  }</time>
                </div>
                <span class="card-description-list-view">${
                  tasks[i].description
                }</span>
                <span>${tasks[i].comments.length}</span>
                <span class="card-status-list-view ${tasks[i].status
                  .toLowerCase()
                  .split(' ')
                  .join('-')}">${tasks[i].status}</span>
                <span class="card-priority-list-view ${tasks[
                  i
                ].priority.toLowerCase()}">${tasks[i].priority}</span>
                <span>${tasks[i].isPrivate ? 'Private' : 'Public'}</span>
          `;

          if (tasks[i].status === 'To Do') {
            toDoGroup.lastElementChild.append(newTask);
          }

          if (tasks[i].status === 'In progress') {
            inProgressGroup.lastElementChild.append(newTask);
          }

          if (tasks[i].status === 'Complete') {
            completeGroup.lastElementChild.append(newTask);
          }
        }

        tasksFeed.append(toDoGroup);
        tasksFeed.append(inProgressGroup);
        tasksFeed.append(completeGroup);
      }
    }

    if (
      tasks.length === 0 ||
      (tasks.every((task) => task.assignee.id !== controller.api.user.id) &&
        tasks.every((task) => task.isPrivate === true))
    ) {
      loadMoreButton.setAttribute('disabled', true);
      tasksFeed.innerHTML = `
      <div class="article__tasks-not-found-wrapper">
          <img class="robot-image" class src="./assets/robot.png" alt="robot">
          <p class="article__tasks-not-found-main-text">No results found</p>
          <p class="article__tasks-not-found-text">We couldn't find what you searched for. Try searching again.</p>
      </div>
      `;
    }

    if (tasksFeedContainer) {
      if (tasksFeedContainer.lastElementChild.classList.contains('load-more')) {
        tasksFeedContainer.lastElementChild.remove();
        tasksFeedContainer.lastElementChild.remove();
      }
      tasksFeedContainer.append(tasksFeed);
      tasksFeedContainer.append(loadMoreButton);
    }
  }
}

class FilterView {
  constructor(id) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  display(registeredUsers) {
    const filtersWrapper = document.getElementById(this._id);
    const fragment = new DocumentFragment();
    const assigneeLabel = document.createElement('label');
    const priorityLabel = document.createElement('label');
    const privacyLabel = document.createElement('label');
    const statusLabel = document.createElement('label');
    const dateFromLabel = document.createElement('label');
    const dateToLabel = document.createElement('label');

    assigneeLabel.setAttribute('for', 'assignee-input');
    priorityLabel.setAttribute('for', 'priority-select');
    privacyLabel.setAttribute('for', 'privacy-select');
    statusLabel.setAttribute('for', 'status-select');

    if (filtersWrapper) {
      filtersWrapper.innerHTML = '';
    }

    assigneeLabel.innerHTML = `
    Assignee
    <input class="assignee-input" id="assignee-input" type="text" autocomplete="off" list="assignee-list">
        <datalist id="assignee-list">
            ${registeredUsers
              .map((user) => {
                return `
                <option id='${user.id}' value='${user.userName}'></option>
              `;
              })
              .join('')}
        </datalist>
    `;

    priorityLabel.innerHTML = `
    Priority
    <select name="priority" id="priority-select">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
    </select>
    `;

    privacyLabel.innerHTML = `
    Privacy
    <select name="privacy" id="privacy-select">
        <option value='0'>Public</option>
        <option value='1'>Private</option>
    </select>
    `;

    statusLabel.innerHTML = `
    Status
    <select name="status" id="status-select">
        <option value="To Do">To Do</option>
        <option value="In progress">In Progress</option>
        <option value="Complete">Complete</option>
    </select>
    `;

    dateFromLabel.innerHTML = `
    Date from
    <div class="filter-date-container">
        <input class="filter-date" type="date"></input>
        <input class="filter-time" type="time" disabled></input>
    </div>
    `;

    dateToLabel.innerHTML = `
    Date to
    <div class="filter-date-container">
        <input class="filter-date date-to" type="date"></input>
        <input class="filter-time time-to" type="time" disabled></input>
    </div>
    `;

    fragment.append(
      assigneeLabel,
      statusLabel,
      priorityLabel,
      privacyLabel,
      dateFromLabel,
      dateToLabel
    );

    if (filtersWrapper) {
      filtersWrapper.append(fragment);
    }
  }
}

class TaskView {
  constructor(id) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  display(task, registeredUsers) {
    const mainTaskWrapper = document.getElementById(this._id);
    const isEditMode = mainTaskWrapper.classList.contains('edit-mode');

    mainTaskWrapper.classList.add('main-task');

    if (mainTaskWrapper) {
      mainTaskWrapper.innerHTML = `
      <div class="task-head">
          <button id="returnToTheMainPage" class="return-to-main-button">
              <i class="fa-solid fa-arrow-left"></i>
                  Return to the main page
          </button>
          <div class="task-date-wrapper task-page-date">
              <time class="task-date">${
                ('0' + new Date(task.createdAt).getDate()).slice(-2) +
                '.' +
                ('0' + (new Date(task.createdAt).getMonth() + 1)).slice(-2) +
                '.' +
                new Date(task.createdAt).getFullYear()
              }</time>
              <time class="task-date">${new Date(
                task.createdAt
              ).toLocaleTimeString()}</time>
          </div>
      </div>
      <div class="task-top">
          ${
            !isEditMode
              ? `<h1 class="task-top__task-name">${task.name}</h1>`
              : `<div class="form__input-error-message error-task-page"></div><input class="task-name-input task-name-input-edit" placeholder='Enter task name...' name="taskNameTaskPage" autofocus/>`
          }
          <div class="task-top__buttons-section">
              <button class="edit edit-task" ${
                controller.api.user.id === task.creator.id ? '' : 'disabled'
              }><i class="fa-solid ${
        !isEditMode ? 'fa-pen pen-task-page' : 'fa-floppy-disk'
      }"></i></button>
              <button class="delete" ${
                controller.api.user.id === task.creator.id ? '' : 'disabled'
              }><i class="fa-solid fa-trash trash-task-page"></i></button>
          </div>
      </div>
      <div class="task-main">
          <div class="task-details">
           
                  ${
                    !isEditMode
                      ? `<div class="task-info-wrapper">
                      <span class="task-info-span">assignee: </span><p class="task-assignee" id="${task.assignee.id}">${task.assignee.userName}</p>
                    </div>`
                      : `<div class="task-info-wrapper">
                          <span class="task-info-span">assignee: </span>
                          <div class="form__input-error-message error-task-page-assignee"></div>
                          <input class="assignee-input assignee-input-edit" id="assignee-input" type="text" autocomplete="off" name="assignee" list="assignee-list" userId="${
                            task.assignee.id
                          }">
                          <datalist id="assignee-list">
                          ${registeredUsers
                            .map((user) => {
                              return `
                          <option id='${user.id}' value='${user.userName}'></option>
                          `;
                            })
                            .join('')}
                          </datalist>
                      </div>`
                  }
              ${
                !isEditMode
                  ? `<div class="task-info-wrapper">
                    <span class="task-info-span">privacy:</span>
                    <p class="task-privace">${
                      task.isPrivate ? 'Private' : 'Public'
                    }</p>
                  </div>`
                  : `<div class="task-info-wrapper">
                  <span class="task-info-span">privacy:</span>
                  <label for="privacy-select">
                    <select name="privacy" id="privacy-select">
                      <option value='${task.isPrivate ? 1 : 0}'>${
                      task.isPrivate ? 'Private' : 'Public'
                    }</option>
                      <option value='${task.isPrivate ? 0 : 1}'>${
                      task.isPrivate ? 'Public' : 'Private'
                    }</option>
                    </select>
                </label>
                  </div>`
              }
                  ${
                    !isEditMode
                      ? `<div class="task-info-wrapper">
                        <p><span class="task-info-span">status: </span></p>
                        <p class="task-status ${task.status
                          .toLowerCase()
                          .split(' ')
                          .join('')}-task">${task.status}</p>
                      </div>`
                      : `<div class="task-info-wrapper">
                      <span class="task-info-span">status:</span>
                      <select name="status" id="status-select">
                      <option value="To Do">To Do</option>
                      <option value="In progress">In Progress</option>
                      <option value="Complete">Complete</option>
                  </select>
                      </div>`
                  }
                  ${
                    !isEditMode
                      ? `<div class="task-info-wrapper">
                        <p><span class="task-info-span">priority: </span></p>
                        <p class="task-priority ${task.priority.toLowerCase()}-task">${
                          task.priority
                        }</p>
                      </div>`
                      : `<div class="task-info-wrapper">
                      <span class="task-info-span">priority:</span>
                      <select name="priority" id="priority-select">
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                  </select>
                      </div>`
                  }
                  ${
                    !isEditMode
                      ? `<div class="task-description-wrapper">
                      <p><span class="task-info-span">description: </span></p>
                      <p class="task-description-text">${task.description}</p>
                      </div>`
                      : `<div class="task-description-wrapper">
                      <span class="task-info-span">description:</span>
                      <div class="form__input-error-message"></div>
                      <textarea class="task-description" name="description" id="description" cols="25" rows="10"></textarea>
                      </div>`
                  }
          </div>
          <div class="task-comments">
              <div class="task-comments__comments-wrapper">
                  ${task.comments
                    .sort((a, b) => a.createdAt - b.createdAt)
                    .map((comment) => {
                      return `
                    <div class="comment">
                      <div class="comment__info">
                          <p class="comment__author">${
                            comment.creator.userName
                          }</p>
                          <div>
                          <time class="comment__date">${
                            ('0' + new Date(comment.createdAt).getDate()).slice(
                              -2
                            ) +
                            '.' +
                            (
                              '0' +
                              (new Date(comment.createdAt).getMonth() + 1)
                            ).slice(-2) +
                            '.' +
                            new Date(comment.createdAt).getFullYear()
                          }</time>
                          <time class="comment__date">${new Date(
                            comment.createdAt
                          ).toLocaleTimeString()}</time>
                          </div>
                      </div>
                      <p class="comment__text">${comment.text}
                      </p>
                  </div>`;
                    })
                    .join('')}
              </div>
              <div class="task-comments__new-comment-wrapper">
                  <div class="form__input-error-message"></div>
                  <textarea class="task-comments__new-comment" name="" id="" ${
                    !controller.api.user.userName || isEditMode
                      ? 'disabled'
                      : ''
                  } placeholder="Enter new comment..."></textarea>
                  <button id="newCommentButton" class="button new-comment-button" disabled>
                      <i class="fa-solid fa-paper-plane"></i>
                  </button>
              </div>
          </div>
      </div>`;
    }

    const confirmDeleteModal = document.createElement('div');
    confirmDeleteModal.className = 'task-confirm-modal';
    confirmDeleteModal.innerHTML = `
      <p class="task-confirm-modal__text">ARE YOU SURE YOU WANT TO DELETE THE TASK?</p>
      <div class="task-confirm-modal__buttons-wrapper">
          <button id="cancelDelete" class="button cancel">CANCEL</button>
          <button id="confirmDelete" class="button delete delete-confirm">DELETE</button>
      </div>
    `;
  }
}

class UserView {
  constructor(id) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  display() {
    const main = document.getElementById(this._id);
    const isEditMode = main.classList.contains('edit-mode');

    main.innerHTML = `
    <div class="signin-error"></div>
    <div class="form__registration-default-images-wrapper">
        <img class="default-image" src="./assets/default1.png" alt="image">
        <img class="default-image" src="./assets/default2.png" alt="image">
        <img class="default-image" src="./assets/default3.png" alt="image">
        <img class="default-image" src="./assets/default4.png" alt="image">
        <img class="default-image" src="./assets/default5.png" alt="image">
        <img class="default-image" src="./assets/default6.png" alt="image">
        <img class="default-image" src="./assets/default7.png" alt="image">
        <img class="default-image" src="./assets/default8.png" alt="image">
        <img class="default-image" src="./assets/default9.png" alt="image">
        <img class="default-image" src="./assets/default10.png" alt="image">
    </div>
    <div class="user-wrapper">
    <div class="user-top">
        <button class="return-to-main-button">
            <i class="fa-solid fa-arrow-left"></i>
            Return to the main page
        </button>
        <div class="edit-mode-toggle-wrapper laptop">
            <p class="edit-mode-toggle-title">Edit mode</p>
            <label class="edit-mode-toggle">
                <input class="toggle-edit-input-laptop" type="checkbox" ${
                  isEditMode ? 'checked' : ''
                }>
                <span class="slider"></span>
            </label>  
        </div>         
    </div>
    <div class="user-main">
        <div class="user-info">
            <div class="user-images">
                <label class="user-main-image-wrapper" for="userImageInput">
                    ${
                      isEditMode
                        ? `<input class='user-image-input' id="userImageInput" type="file"/>`
                        : ''
                    }
                    <img class="user-main-image ${
                      isEditMode ? 'main-image-edit' : ''
                    }" src="data:image/png;base64,${
      controller.api.user.photo
    }" alt="user">
                    ${
                      isEditMode
                        ? '<img class="camera" src="./assets/camera.png" alt="camera">'
                        : ''
                    }
                </label>
                ${
                  isEditMode
                    ? `<button class="button gallery-button"><i class="fa-regular fa-image"></i>Gallery</button>`
                    : ''
                }
            </div>
            <form class="user-info-form" action="">
                <p class="user-info__user-name">${
                  controller.api.user.userName
                }</p>
                <div class="user-info-form__login-wrapper">
                    <i class="fa-solid fa-user user-page"></i>
                    <input id="user-login" class="user-info-form__login" type="text" name="" id="" value="${
                      controller.api.user.login
                    }" disabled>
                </div>
                ${
                  isEditMode
                    ? `<div class="user-info-field-wrapper">
                    <label for="user-new-password">New user name:</label>
                    <div class="user-info-form__password-wrapper">
                    <div class="form__input-error-message"></div>
                    <input id="usernameUserPage" class="user-info-form__password" type="text" name="usernameUserPage" placeholder="${
                      document.documentElement.scrollWidth <= 853
                        ? 'New user name'
                        : ''
                    }">
                    </div>
                    </div>
                    <div class="user-info-field-wrapper">
                <label for="user-new-password">New password:</label>
                <div class="user-info-form__password-wrapper">
                    <i class="fa-solid fa-lock"></i>
                    <div class="form__input-error-message"></div>
                    <input id="newPassword" class="user-info-form__password" type="password" name="newPassword" placeholder="${
                      document.documentElement.scrollWidth <= 853
                        ? 'New password'
                        : ''
                    }">
                    <i class="fa-solid fa-eye"></i>
                </div>
            </div>
            <div class="user-info-field-wrapper">
                <label for="">Confirm password:</label>
                <div class="user-info-form__password-wrapper">
                    <i class="fa-solid fa-lock"></i>
                    <div class="form__input-error-message"></div>
                    <input id="user-confirm-password" class="user-info-form__password" type="password" name="confirmNewPassword" placeholder="${
                      document.documentElement.scrollWidth <= 853
                        ? 'Confirm password'
                        : ''
                    }">
                    <i class="fa-solid fa-eye"></i>
                </div>
            </div>
            <input class="button create-task" type="submit" value="SAVE CHANGES" disabled/>
            <button class="button reset-changes" type="reset">
                <i class="fa-sharp fa-solid fa-rotate-left"></i>
                RESET CHANGES
            </button>`
                    : ''
                }
            </form>
        </div>
        <div class="edit-mode-toggle-wrapper">
            <p class="edit-mode-toggle-title">Edit mode</p>
            <label class="edit-mode-toggle">
                <input class="toggle-edit-input" type="checkbox" ${
                  isEditMode ? 'checked' : ''
                }
                }>
                <span class="slider"></span>
            </label>  
        </div>        
    </div> 
</div>           
    `;
  }
}

class LogInView {
  constructor(id) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  display() {
    const main = document.getElementById(this._id);

    main.innerHTML = `
    <div class="signin-error"></div>
    <form class="form form-signin" action="">
        <p class="form__title">SIGN IN</p>
        <div class="form__input-wrapper">
            <i class="fa-solid fa-user user-registartion-ico"></i>
            <div class="form__input-error-message"></div>
            <input class="form__input" type="text" placeholder="Login" name="login">
        </div>
        <div class="form__input-wrapper">
            <i class="fa-solid fa-lock"></i>
            <div class="form__input-error-message"></div>
            <input class="form__input" type="password" placeholder="Password" name="password">
            <i class="fa-solid fa-eye"></i>
        </div>
        <button class="form__signup-button">Not a member?<span>SIGN UP NOW</span></button>
        <input class="button form__signin-button-main" type="submit" value="SIGN IN"></input>
        <button class="return-to-main-button">
            <i class="fa-solid fa-arrow-left"></i>
                Return to the main page
        </button>
    </form>
    `;
  }
}

class RegistrationView {
  constructor(id) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  display() {
    const main = document.getElementById(this._id);

    main.innerHTML = `
    <div class="signin-error"></div>
    <form class="form" action="">
    <p class="form__title">REGISTRATION</p>
    <div class="form__input-wrapper">
        <i class="fa-solid fa-user user-registartion-ico"></i>
        <div class="form__input-error-message"></div>
        <input class="form__input" type="text" placeholder="Login" name="login">
    </div>
    <div class="form__input-wrapper">
        <i class="fa-solid fa-lock"></i>
        <div class="form__input-error-message"></div>
        <input id="password" class="form__input" type="password" placeholder="Password" name="password">
        <i class="fa-solid fa-eye"></i>
    </div>
    <div class="form__input-wrapper">
        <div class"form__authorization-error-message"></div>
        <i class="fa-solid fa-lock"></i>
        <div class="form__input-error-message"></div>
        <input class="form__input" id="confirmPassword" type="password" placeholder="Confirm password" name="confirmPassword">
        <i class="fa-solid fa-eye"></i>
    </div>
    <div class="form__input-wrapper">
        <i class="fa-solid fa-user user-registartion-ico"></i>
        <div class="form__input-error-message"></div>
        <input class="form__input" type="text" placeholder="Username" name="username">
    </div>
    <div class="form__file-input-wrapper">
        <label class="form__file-input-label" for="imageInput">
            <div class="form__file-select">
                <i class="fa-solid fa-image"></i>
                <p class="form__file-select-text">Select image</p>
            </div>
            <input class="form__file-input" id="imageInput" type="file">
            <div class="form__file-name"></div>
        </label>
        <img class="form__registration-image" src="./assets/default1.png" alt="image">
    </div>
    <button class="form__signin-button">Already have an account?<span>SIGN IN</span></button>
    <input class="button form__register-button" type="submit" value="REGISTER" disabled></input>
    <button class="return-to-main-button">
        <i class="fa-solid fa-arrow-left"></i>
            Return to the main page
    </button>
    <div class="form__registration-default-images-wrapper">
        <img class="default-image" src="./assets/default1.png" alt="image">
        <img class="default-image" src="./assets/default2.png" alt="image">
        <img class="default-image" src="./assets/default3.png" alt="image">
        <img class="default-image" src="./assets/default4.png" alt="image">
        <img class="default-image" src="./assets/default5.png" alt="image">
        <img class="default-image" src="./assets/default6.png" alt="image">
        <img class="default-image" src="./assets/default7.png" alt="image">
        <img class="default-image" src="./assets/default8.png" alt="image">
        <img class="default-image" src="./assets/default9.png" alt="image">
        <img class="default-image" src="./assets/default10.png" alt="image">
    </div>
</form>
    `;
  }
}

class NewTaskView {
  constructor(id) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  display(registeredUsers) {
    const aside = document.getElementById(this._id);
    const newTaskForm = document.createElement('form');
    newTaskForm.classList.add('new-task-form');
    newTaskForm.innerHTML = `
    <label for="task-name-input">Task name
    <div class="form__input-error-message new-task-error"></div>
    <input placeholder="" class="form__input new-task-input" id="task-name-input" type="text" name="taskName" autocomplete="off" ${
      !controller.api.user.userName ? 'disabled' : ''
    }>
</label>
<label for="assignee-input">Assignee
    <div class="form__input-error-message new-task-error"></div>
    <input class="form__input new-task-input" id="assignee-input-new-task" type="text" list="list" name="assignee" autocomplete="off" ${
      !controller.api.user.userName ? 'disabled' : ''
    }>
    <datalist id="list">
    ${registeredUsers
      .map((user) => {
        return `
        <option id='${user.id}' value='${user.userName}'></option>
      `;
      })
      .join('')}
    </datalist>
</label>
<label for="status-select">Status
    <select name="status" id="status-select-new-task" ${
      !controller.api.user.userName ? 'disabled' : ''
    }>
        <option value="To Do">To Do</option>
        <option value="In progress">In Progress</option>
        <option value="Complete">Complete</option>
    </select>
</label>
<label for="priority-select">
    Priority
    <select name="priority" id="priority-select-new-task" ${
      !controller.api.user.userName ? 'disabled' : ''
    }>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
    </select>
</label>
<label for="privacy-select">
    Privacy
    <select name="privacy" id="privacy-select-new-task" ${
      !controller.api.user.userName ? 'disabled' : ''
    }>
        <option value="0">Public</option>
        <option value="1">Private</option>
    </select>
</label>
<label for="description">
    Description
    <div class="form__input-error-message new-task-error"></div>
    <textarea class="task-description new-task-description" name="description" id="description" cols="25" rows="10" ${
      !controller.api.user.userName ? 'disabled' : ''
    }></textarea>
</label>
<input class="button create-task" type="submit" value="CREATE TASK" disabled>
</input>
<input class="button reset-changes" type="reset" value="RESET CHANGES" disabled>
</input>
    `;

    aside.append(newTaskForm);
  }
}

class ErrorView {
  constructor(id) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  display(status, statusText) {
    const main = document.getElementById(this.id);
    main.classList.add('error-page');

    main.innerHTML = `
    <div class="main__error-wrapper">
        <button class="return-to-main-button">
            <i class="fa-solid fa-arrow-left"></i>
        Return to the main page
        </button>
        <div class="main__error-info-wrapper">
            <div class="main__error-description">
                <p class="main__error-status">${status}</p>
                <p class="main__error-message">OOPS! ${statusText}</p>
            </div>
            <img src="./assets/robot-big.png" alt="">
        </div>
    </div>
    `;
  }
}

class TasksController {
  constructor(
    users,
    header,
    taskFeed,
    filters,
    taskPage,
    logIn,
    registrationPage,
    userPage,
    newTask,
    error
  ) {
    this.api = new TaskFeedApiService('http://169.60.206.50:7777/api');
    this.users = users;
    this.header = header;
    this.taskFeed = taskFeed;
    this.filters = filters;
    this.taskPage = taskPage;
    this.logIn = logIn;
    this.registrationPage = registrationPage;
    this.userPage = userPage;
    this.newTask = newTask;
    this.error = error;
  }

  setCurrentUser(user) {
    this.api.changeUser(user);
    this.header.display(user);
  }

  async getTasks(skip = 0, top = 10, status = 0) {
    let arrayToPush = [];

    if (status === 0) {
      this.api.tasks = await this.api.getTasks(skip, top, status);
    } else {
      arrayToPush = await this.api.getTasks(skip, top, status);
      this.api.tasks = [...this.api.tasks, ...arrayToPush];
    }

    return this.api.tasks;
  }

  getFeed(filterConfig) {
    filterConfig
      ? this.taskFeed.display(getPage(filterConfig))
      : this.taskFeed.display(this.api.tasks);

    function getPage(filterConfig) {
      let tasksCopy = controller.api.tasks;
      if (filterConfig) {
        tasksCopy = tasksCopy
          .filter((task) => {
            return filterConfig.hasOwnProperty('assignee')
              ? filterConfig.assignee.id
                ? task.assignee.id === filterConfig.assignee.id
                : task.assignee.userName
                    .toLowerCase()
                    .includes(filterConfig.assignee.toLowerCase())
              : task;
          })
          .filter((task) => {
            return filterConfig.hasOwnProperty('dateFrom')
              ? new Date(task.createdAt) >= filterConfig.dateFrom
              : task;
          })
          .filter((task) => {
            return filterConfig.hasOwnProperty('dateTo')
              ? new Date(task.createdAt) <= filterConfig.dateTo
              : task;
          })
          .filter((task) => {
            return filterConfig.hasOwnProperty('status')
              ? task.status.toLowerCase() === filterConfig.status.toLowerCase()
              : task;
          })
          .filter((task) => {
            return filterConfig.hasOwnProperty('priority')
              ? task.priority.toLowerCase() ===
                  filterConfig.priority.toLowerCase()
              : task;
          })
          .filter((task) => {
            return filterConfig.hasOwnProperty('isPrivate')
              ? task.isPrivate === filterConfig.isPrivate
              : task;
          })
          .filter((task) => {
            return filterConfig.hasOwnProperty('name')
              ? task.name
                  .toLowerCase()
                  .includes(filterConfig.name.toLowerCase())
              : task;
          });
      }

      return tasksCopy.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
  }

  getFilters(registeredUsers) {
    this.filters.display(registeredUsers);
  }

  async showTask(id, registeredUsers) {
    const response = await this.api.getTask(id);

    if (response.id) {
      this.taskPage.display(response, registeredUsers);
    } else {
      this.error.display(response.status, response.statusText);
      throw Error(response.status);
    }
  }

  async registerUser(data) {
    const response = await this.api.registerUser(data);

    return response;
  }

  async loginUser(data) {
    const response = await this.api.loginUser(data);

    return response;
  }

  async getMyProfile() {
    const response = await this.api.getMyProfile();

    return response;
  }

  async postComment(id, text) {
    const res = await this.api.postComment(id, text);

    return res;
  }

  async postTask(data) {
    const res = await this.api.postTask(data);

    return res;
  }

  async deleteTask(id) {
    const res = await this.api.deleteTask(id);

    return res;
  }

  async editTask(id, data) {
    const res = this.api.editTask(Number(id), data);

    return res;
  }

  async getAllUsers() {
    const response = await this.api.getAllUsers();

    if (response.status) {
      this.error.display(response.status, response.statusText);
      throw Error(response.status);
    }

    return response;
  }

  async editUser(id, data) {
    const response = await this.api.editUser(id, data);

    return response;
  }

  showLogIn(id) {
    this.logIn.display(id);
  }

  showRegistration(id) {
    this.registrationPage.display(id);
  }

  showUser() {
    this.userPage.display();
  }

  showNewTask(registeredUsers) {
    this.newTask.display(registeredUsers);
  }

  showError() {
    this.error.display();
  }
}

const users = new UserCollection();
const header = new HeaderView('header');
const taskFeed = new TaskFeedView('article');
const filters = new FilterView('filtersWrapper');
const taskPage = new TaskView('main');
const logIn = new LogInView('main');
const registrationPage = new RegistrationView('main');
const userPage = new UserView('main');
const newTask = new NewTaskView('aside');
const error = new ErrorView('main');
const controller = new TasksController(
  users,
  header,
  taskFeed,
  filters,
  taskPage,
  logIn,
  registrationPage,
  userPage,
  newTask,
  error
);

const allTasks = await controller.getTasks();
const registeredUsers = await controller.getAllUsers();
const main = document.getElementById('main');
const body = document.getElementById('body');
const container = document.querySelector('.container');
const userProfileButton = document.querySelector('.side-menu__profile-button');
const burgerMenu = document.querySelector('.burger-menu');
const sideMenu = document.querySelector('.side-menu');
const sideMenuProfileImage = document.querySelector(
  '.side-menu__profile-image'
);
const sideMenuUser = document.querySelector('.side-menu__user-name');
const sideMenuProfileButton = document.querySelector('.side-menu__button');
const form = document.getElementById('filters');
const imageFormats = [
  'jpeg',
  'png',
  'ico',
  'gif',
  'tiff',
  'webp',
  'eps',
  'svg',
  'psd',
  'jpg',
];

let loader = false;
let tasksToSkip = 0;
let currentTaskId = null;
const editConfig = {};
const currentTaskConfig = {};
let filterConfig = {};

controller.api.tasks = [];

window.localStorage.getItem('currentUser')
  ? controller.setCurrentUser(
      JSON.parse(window.localStorage.getItem('currentUser'))
    )
  : controller.setCurrentUser({});

controller
  .getTasks(tasksToSkip, 10, 1)
  .then(() => {
    return controller.getTasks(tasksToSkip, 10, 2);
  })
  .then(() => {
    return controller.getTasks(tasksToSkip, 10, 3);
  })
  .finally(() => {
    controller.getFeed();
    tasksToSkip += 10;
  });

async function setEventOnTaskCard() {
  try {
    const registeredUsers = await controller.getAllUsers();
    setListenerOnStatusGroupButtons();

    main.addEventListener('click', (e) => {
      if (
        (e.target.className === 'card' ||
          e.target.className === 'card-list-view') &&
        controller.api.user.id
      ) {
        currentTaskId = e.target.getAttribute('id');
        loader = true;
        setLoader('article', loader, body);
        controller
          .showTask(currentTaskId, registeredUsers, loader)
          .then(() => {
            setEventsOnTaskPage();
          })
          .catch(() => {
            setEventOnError();
          })
          .finally(() => {
            loader = false;
            setLoader('main', loader, body);
          });
        container.classList.remove('container-main');
      }

      if (e.target.classList.contains('load-more')) {
        e.target.classList.add('loading');
        form.reset();
        loader = true;
        e.target.innerHTML = '';
        setLoader('loadMoreButton', loader, body, 'load-more');
        controller
          .getTasks(tasksToSkip, 10, 1)
          .then(() => {
            return controller.getTasks(tasksToSkip, 10, 2);
          })
          .then(() => {
            return controller.getTasks(tasksToSkip, 10, 3);
          })
          .finally(() => {
            loader = false;
            controller.getFeed();
            tasksToSkip += 10;
            if (!(allTasks.length > controller.api.tasks.length)) {
              document
                .querySelector('.load-more')
                .setAttribute('disabled', true);
            }
          });
      }

      if (e.target.classList.contains('article__cards-group-list-view')) {
        if (!e.target.classList.contains('group-open')) {
          e.target.classList.add('group-open');
        } else {
          e.target.classList.add('group-close');
          setTimeout(() => {
            e.target.classList.remove('group-open');
            e.target.classList.remove('group-close');
          }, 200);
        }
      }

      if (e.target.classList.contains('fa-ellipsis-vertical')) {
        const cardOptions = e.target.querySelector('.card-options');
        if (!cardOptions.classList.contains('card-options-open')) {
          cardOptions.classList.add('card-options-open');
        } else {
          cardOptions.classList.add('card-options-close');
          setTimeout(() => {
            cardOptions.classList.remove('card-options-close');
            cardOptions.classList.remove('card-options-open');
          }, 100);
        }
      }

      if (e.target.classList.contains('delete-task-board')) {
        const confirmDeleteModal = document.createElement('div');
        confirmDeleteModal.className = 'task-confirm-modal';
        confirmDeleteModal.setAttribute('id', 'confirmDeleteModal');
        confirmDeleteModal.innerHTML = `
            <p class="task-confirm-modal__text">ARE YOU SURE YOU WANT TO DELETE THE TASK?</p>
            <div class="task-confirm-modal__buttons-wrapper">
                <button id="cancelDelete" class="button cancel">CANCEL</button>
                <button id="confirmDelete" class="button delete delete-confirm">DELETE</button>
            </div>
          `;
        body.classList.add('confirm');
        main.prepend(confirmDeleteModal);
        const cancelDelete = document.getElementById('cancelDelete');
        const confirmDelete = document.getElementById('confirmDelete');

        confirmDelete.addEventListener('click', () => {
          loader = true;
          confirmDeleteModal.innerHTML = '';
          setLoader('confirmDeleteModal', loader, body, 'modal');
          controller
            .deleteTask(e.target.closest('.card').getAttribute('id'))
            .then(() => {
              controller.api.tasks = [];
              tasksToSkip = 0;
              controller
                .getTasks(tasksToSkip, 10, 1)
                .then(() => {
                  return controller.getTasks(tasksToSkip, 10, 2);
                })
                .then(() => {
                  return controller.getTasks(tasksToSkip, 10, 3);
                })
                .finally(() => {
                  body.classList.remove('confirm');
                  confirmDeleteModal.remove();
                  controller.getFeed();
                  tasksToSkip += 10;
                  setListenerOnStatusGroupButtons();
                  loader = false;
                });
            });
        });

        cancelDelete.addEventListener('click', () => {
          body.classList.remove('confirm');
          confirmDeleteModal.remove();
        });
      }

      if (e.target.classList.contains('edit-task-board')) {
        currentTaskId = e.target.closest('.card').getAttribute('id');
        loader = true;
        setLoader('article', loader, body);
        controller
          .showTask(currentTaskId, registeredUsers)
          .then(() => {
            setInputsValuesToCurrentTaskConfig(
              currentTaskConfig,
              registeredUsers
            );
            container.classList.remove('container-main');
            main.classList.add('edit-mode');
          })
          .then(() => {
            controller.showTask(currentTaskId, registeredUsers).then(() => {
              setEventsOnTaskPage();
              setInputsValuesToEditConfig(
                editConfig,
                currentTaskConfig,
                registeredUsers
              );
              loader = false;
              setLoader('main', loader, body);
            });
          });
      }

      if (e.target.classList.contains('fa-list-ul')) {
        const viewTiggle = document.querySelector('.view-wrapper');
        const defautlViewButton = document.querySelector('.fa-table-columns');
        viewTiggle.classList.add('list-view');
        defautlViewButton.classList.remove('view-selected');
        e.target.classList.add('view-selected');
        controller.getFeed(filterConfig);
      }

      if (e.target.classList.contains('fa-table-columns')) {
        const viewTiggle = document.querySelector('.view-wrapper');
        const listViewButton = document.querySelector('.fa-list-ul');
        if (viewTiggle.classList.contains('list-view')) {
          viewTiggle.classList.remove('list-view');
          listViewButton.classList.remove('view-selected');
          e.target.classList.add('view-selected');
          controller.getFeed(filterConfig);
        }
      }
    });

    if (burgerMenu) {
      burgerMenu.addEventListener('click', () => {
        if (!sideMenu.classList.contains('side-menu-open')) {
          burgerMenu.classList.add('burger-menu-open');
          sideMenu.classList.add('side-menu-open');
          body.classList.add('confirm');
          if (!controller.api.user.id) {
            userProfileButton.style.display = 'none';
            sideMenuProfileImage.style.display = 'none';
            sideMenuUser.textContent = 'Guest';
            sideMenuProfileButton.textContent = 'Sign in';
            sideMenuProfileButton.classList.add('sign-in');
            sideMenuProfileButton.addEventListener('click', () => {
              closeSideMenu(burgerMenu, sideMenu, body);
              main.classList.remove('main-task');
              main.classList.remove('edit-mode');
              setEventOnLogIn();
              controller.setCurrentUser({});
            });
          } else {
            sideMenuProfileImage.src = `data:image/png;base64,${controller.api.user.photo}`;
            sideMenuUser.textContent = controller.api.user.userName;
            userProfileButton.style.display = 'flex';
            sideMenuProfileImage.style.display = 'block';
            sideMenuUser.textContent = `${controller.api.user.userName}`;
            sideMenuProfileButton.textContent = 'Logout';
            sideMenuProfileButton.classList.remove('sign-in');
            sideMenuProfileButton.addEventListener('click', () => {
              closeSideMenu(burgerMenu, sideMenu, body);
              main.classList.remove('main-task');
              main.classList.remove('edit-mode');
              setEventOnLogIn();
              controller.setCurrentUser('');
            });
          }
        } else {
          closeSideMenu(burgerMenu, sideMenu, body);
        }
      });
    }

    setEventOnNewTaskMobile(body);
    setEventOnNewTaskLaptop(body);

    window.addEventListener('click', (e) => {
      if (sideMenu.classList.contains('side-menu-open')) {
        if (
          !e.target.closest('.side-menu') &&
          !e.target.classList.contains('burger-menu')
        ) {
          closeSideMenu(burgerMenu, sideMenu, body);
        }
      }
    });

    userProfileButton.addEventListener('click', () => {
      closeSideMenu(burgerMenu, sideMenu, body);
      main.classList.remove('main-task');
      main.classList.remove('edit-mode');
      setEventOnUserPage();
    });
    setListenerOnStatusGroupButtons();
  } catch (error) {
    console.log(error);
    setEventOnError();
  }
}

async function setEventsOnTaskPage() {
  const registeredUsers = await controller.getAllUsers();
  const returnToTheMainPageButton = document.getElementById(
    'returnToTheMainPage'
  );
  const deleteButton = document.querySelector('.delete');
  const editButton = document.querySelector('.edit-task');
  const newCommentButton = document.querySelector('.new-comment-button');
  const taskPageInputs = document.getElementsByTagName('input');
  const commentTextArea = document.querySelector('.task-comments__new-comment');
  const descriptionTextArea = document.querySelector('.task-description');

  Array.from(taskPageInputs).forEach((el) => {
    el.addEventListener('input', () => {
      Array.from(taskPageInputs).some(
        (element) => !validateField(element, controller, registeredUsers)
      ) ||
      !validateDescription(descriptionTextArea) ||
      descriptionTextArea.value === ''
        ? editButton.setAttribute('disabled', true)
        : editButton.removeAttribute('disabled');
      validateField(el, controller, registeredUsers);
      a;
    });
  });

  returnToTheMainPageButton.addEventListener('click', () => {
    tasksToSkip = 0;
    loader = true;
    setLoader('main', loader, body);
    controller.api.tasks = [];
    controller
      .getTasks(0, 10, 1)
      .then(() => {
        return controller.getTasks(0, 10, 2);
      })
      .then(() => {
        return controller.getTasks(0, 10, 3);
      })
      .then(() => {
        if (main.classList.contains('edit-mode')) {
          main.classList.remove('edit-mode');
        }
        container.classList.add('container-main');
        renderAsideSection(main);
        controller.getFeed();
        setEventOnFilters();
        setEventOnNewTaskMobile(body);
        setListenerOnStatusGroupButtons();
        setEventOnNewTask();
        loader = false;
        setLoader('article', loader, body);
      });
  });

  deleteButton.addEventListener('click', () => {
    const confirmDeleteModal = document.createElement('div');
    confirmDeleteModal.className = 'task-confirm-modal';
    confirmDeleteModal.setAttribute('id', 'confirmDeleteModal');
    confirmDeleteModal.innerHTML = `
        <p class="task-confirm-modal__text">ARE YOU SURE YOU WANT TO DELETE THE TASK?</p>
        <div class="task-confirm-modal__buttons-wrapper">
            <button id="cancelDelete" class="button cancel">CANCEL</button>
            <button id="confirmDelete" class="button delete delete-confirm">DELETE</button>
        </div>
      `;
    body.classList.add('confirm');
    main.prepend(confirmDeleteModal);

    const cancelDelete = document.getElementById('cancelDelete');
    const confirmDelete = document.getElementById('confirmDelete');

    confirmDelete.addEventListener('click', () => {
      loader = true;
      confirmDeleteModal.innerHTML = '';
      setLoader('confirmDeleteModal', loader, body, 'modal');
      controller.deleteTask(currentTaskId).then(() => {
        controller.getTasks().then(() => {
          body.classList.remove('confirm');
          renderAsideSection(main);
          controller.getFeed();
          setEventOnFilters();
          setEventOnNewTask();
          setEventOnNewTaskMobile(body);
          setListenerOnStatusGroupButtons();
          loader = false;
        });
      });
    });

    cancelDelete.addEventListener('click', () => {
      confirmDeleteModal.remove();
      body.classList.remove('confirm');
    });
  });

  editButton.addEventListener('click', () => {
    if (main.classList.contains('edit-mode')) {
      loader = true;
      setLoader('main', loader, body);
      controller.editTask(currentTaskId, editConfig).then(() => {
        main.classList.remove('edit-mode');
        controller.showTask(currentTaskId, registeredUsers).then(() => {
          setEventsOnTaskPage();
          loader = false;
          setLoader('main', loader, body);
        });
      });
    } else {
      setInputsValuesToCurrentTaskConfig(currentTaskConfig, registeredUsers);
      main.classList.add('edit-mode');
      controller.showTask(currentTaskId, registeredUsers).then(() => {
        setEventsOnTaskPage();
        setInputsValuesToEditConfig(
          editConfig,
          currentTaskConfig,
          registeredUsers
        );
      });
    }
  });

  if (descriptionTextArea) {
    descriptionTextArea.addEventListener('input', () => {
      !validateDescription(descriptionTextArea) ||
      Array.from(taskPageInputs).some(
        (element) => !validateField(element, controller, registeredUsers)
      ) ||
      descriptionTextArea.value === ''
        ? editButton.setAttribute('disabled', true)
        : editButton.removeAttribute('disabled');
      validateDescription(descriptionTextArea);
    });
  }

  commentTextArea.addEventListener('input', () => {
    validateComment(commentTextArea);
    if (commentTextArea.value === '' || !validateComment(commentTextArea)) {
      newCommentButton.setAttribute('disabled', true);
    } else {
      newCommentButton.removeAttribute('disabled');
    }

    commentTextArea.style.height = 'auto';
    commentTextArea.style.height = commentTextArea.scrollHeight + 'px';
  });

  newCommentButton.addEventListener('click', () => {
    loader = true;
    newCommentButton.innerHTML = '';
    setLoader('newCommentButton', loader, body, 'button');
    controller
      .postComment(Number(currentTaskId), {
        text: commentTextArea.value,
      })
      .then(() => {
        controller.showTask(currentTaskId).then(() => {
          loader = false;
          setEventsOnTaskPage();
        });
      });
  });
}

async function setEventOnFilters() {
  const form = document.getElementById('filters');
  const registeredUsers = await controller.getAllUsers();
  controller.getFilters(registeredUsers);
  const filtersHead = form.querySelector('.filters-closed-wrapper');
  const filters = document.getElementById('filters');
  const taskNameInput = document.querySelector('.search-input');
  const assigneeInput = document.querySelector('.assignee-input');
  const statusSelect = document.getElementById('status-select');
  const prioritySelect = document.getElementById('priority-select');
  const privacySelect = document.getElementById('privacy-select');
  const dateFromDateSelect = document.querySelector('.filter-date');
  const dateFromTimeSelect = document.querySelector('.filter-time');
  const dateToDateSelect = document.querySelector('.date-to');
  const dateToTimeSelect = document.querySelector('.time-to');

  filtersHead.addEventListener('click', () => {
    filters.classList.toggle('open');
  });

  taskNameInput.addEventListener('input', () => {
    filterConfig.name = taskNameInput.value;
    controller.getFeed(filterConfig);
    setEventOnNewTaskMobile(body);
    setListenerOnStatusGroupButtons();
  });

  assigneeInput.addEventListener('input', () => {
    const list = form.querySelector('[id="assignee-list"]');

    assigneeInput.removeAttribute('userId');

    for (let i = 0; i < list.options.length; i++) {
      if (list.options[i].value === assigneeInput.value) {
        assigneeInput.setAttribute(
          'userId',
          list.options[i].getAttribute('id')
        );
      }
    }

    filterConfig.assignee = assigneeInput.getAttribute('userID')
      ? registeredUsers.find(
          (user) => user.id === assigneeInput.getAttribute('userID')
        )
      : assigneeInput.value;
    controller.getFeed(filterConfig);
    setEventOnNewTaskMobile(body);
    setListenerOnStatusGroupButtons();
  });

  statusSelect.addEventListener('change', () => {
    filterConfig.status = statusSelect.value;
    controller.getFeed(filterConfig);
    setEventOnNewTaskMobile(body);
    setListenerOnStatusGroupButtons();
  });

  prioritySelect.addEventListener('change', () => {
    filterConfig.priority = prioritySelect.value;
    controller.getFeed(filterConfig);
    setEventOnNewTaskMobile(body);
    setListenerOnStatusGroupButtons();
  });

  privacySelect.addEventListener('change', () => {
    filterConfig.isPrivate = Boolean(Number(privacySelect.value));
    controller.getFeed(filterConfig);
    setEventOnNewTaskMobile(body);
    setListenerOnStatusGroupButtons();
  });

  dateFromDateSelect.addEventListener('input', () => {
    dateFromDateSelect.value
      ? dateFromTimeSelect.removeAttribute('disabled')
      : dateFromTimeSelect.setAttribute('disabled', 'true');
    filterConfig.dateFrom = new Date(dateFromDateSelect.value);
    controller.getFeed(filterConfig);
    setEventOnNewTaskMobile(body);
    setListenerOnStatusGroupButtons();
  });

  dateFromTimeSelect.addEventListener('input', () => {
    filterConfig.dateFrom = new Date(
      `${dateFromDateSelect.value}:${dateFromTimeSelect.value}`
    );
    controller.getFeed(filterConfig);
    setEventOnNewTaskMobile(body);
    setListenerOnStatusGroupButtons();
  });

  dateToDateSelect.addEventListener('input', () => {
    dateToDateSelect.value
      ? dateToTimeSelect.removeAttribute('disabled')
      : dateToTimeSelect.setAttribute('disabled', 'true');
    filterConfig.dateTo = new Date(dateToDateSelect.value);
    controller.getFeed(filterConfig);
    setEventOnNewTaskMobile(body);
    setListenerOnStatusGroupButtons();
  });

  dateToTimeSelect.addEventListener('input', () => {
    filterConfig.dateTo = new Date(
      `${dateToDateSelect.value}:${dateToTimeSelect.value}`
    );
    controller.getFeed(filterConfig);
    setEventOnNewTaskMobile(body);
    setListenerOnStatusGroupButtons();
  });

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('clear-filters-button')) {
      filterConfig = {};
      controller.getFeed(filterConfig);

      setEventOnNewTaskMobile(body);
      setListenerOnStatusGroupButtons();
    }
  });
}

function setEventOnRegistration() {
  controller.showRegistration();

  const _DEFAULT_SRC = './assets/default1.png';
  const registrationForm = document.querySelector('.form');
  const signInButton = document.querySelector('.form__signin-button');
  const registerButton = registrationForm.querySelector(
    '.form__register-button'
  );
  const returnToTheMainPageButton = document.querySelector(
    '.return-to-main-button'
  );
  const photo = registrationForm.querySelector('.form__registration-image');
  const srcPath = document.querySelector('.form__file-name');
  const defaultImagesWrapper = document.querySelector(
    '.form__registration-default-images-wrapper'
  );
  const { elements } = registrationForm;
  const errorMessage = document.querySelector('.signin-error');
  const data = {};

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('form__registration-image')) {
      body.classList.add('confirm');
      defaultImagesWrapper.classList.add('default-images-wrapper-open');
    } else {
      if (
        defaultImagesWrapper.classList.contains('default-images-wrapper-open')
      ) {
        defaultImagesWrapper.classList.add('default-images-wrapper-close');
        body.classList.remove('confirm');
        setTimeout(() => {
          defaultImagesWrapper.classList.remove('default-images-wrapper-open');
          defaultImagesWrapper.classList.remove('default-images-wrapper-close');
        }, 400);
      }
    }

    if (e.target.classList.contains('default-image')) {
      srcPath.innerText = '';
      photo.src = e.target.src;
      convertImageToBase64(e.target.src).then(
        (url) => (data.photo = url.split(',')[1])
      );
    }
  });

  registrationForm.addEventListener('click', (e) => {
    toggleShowPassword(e);
  });

  if (!data.photo) {
    convertImageToBase64(_DEFAULT_SRC).then((url) => {
      data.photo = url.split(',')[1];
    });
  }

  registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const login = registrationForm.querySelector('[name="login"]');
    const user = registrationForm.querySelector('[name="username"]');
    const password = registrationForm.querySelector('[name="password"]');
    const confirmPassword = document.getElementById('confirmPassword');

    data.login = login.value;
    data.userName = user.value;
    data.password = password.value;
    data.retypedPassword = confirmPassword.value;

    loader = true;
    setLoader('main', loader, body);
    controller
      .registerUser(data)
      .then((message) => {
        if (message) {
          errorMessage.classList.add('signin-error-open');
          errorMessage.innerText = `${message[0]}`;

          setTimeout(() => {
            errorMessage.classList.add('signin-error-close');
            errorMessage.classList.remove('signin-error-open');
            setTimeout(() => {
              errorMessage.classList.remove('signin-error-close');
            }, 1000);
          }, 2000);
        } else {
          controller.showLogIn();
          setEventOnLogIn();
        }
      })
      .finally(() => {
        loader = false;
        setLoader('main', loader, body);
      });
  });

  Array.from(elements).forEach((el) => {
    if (el.classList.contains('form__input')) {
      el.addEventListener('input', () => {
        Array.from(elements).some(
          (element) => !validateField(element, controller, registeredUsers)
        )
          ? registerButton.setAttribute('disabled', true)
          : registerButton.removeAttribute('disabled');
        validateField(el, controller, registeredUsers);
        a;
      });
    }
  });

  document.getElementById('imageInput').addEventListener('change', () => {
    const imageInput = document.getElementById('imageInput');
    const fileReader = new FileReader();
    const arrayFromimageInput = imageInput.value.split('.');
    const promise = new Promise((res, rej) => {
      if (
        !imageFormats.includes(
          arrayFromimageInput[arrayFromimageInput.length - 1].toLowerCase()
        )
      ) {
        rej('Invalid file format');
        return;
      }

      fileReader.readAsDataURL(document.getElementById('imageInput').files[0]);
      fileReader.onload = () => {
        photo.src = fileReader.result;
        res(photo);
      };
    });

    promise
      .then(() => {
        srcPath.innerText = imageInput.value;
        data.photo = photo.src.split(',')[1];
      })
      .catch(() => {
        srcPath.innerText = '';
        photo.src = _DEFAULT_SRC;
        errorMessage.classList.add('signin-error-open');
        errorMessage.innerText = 'Invalid file format.';
        setTimeout(() => {
          errorMessage.classList.add('signin-error-close');
          errorMessage.classList.remove('signin-error-open');
          setTimeout(() => {
            errorMessage.classList.remove('signin-error-close');
          }, 1000);
        }, 2000);
      });
  });

  signInButton.addEventListener('click', () => {
    setEventOnLogIn();
  });

  returnToTheMainPageButton.addEventListener('click', () => {
    container.classList.add('container-main');
    renderAsideSection(main);
    controller.getFeed();
    setEventOnNewTaskMobile(body);
    setListenerOnStatusGroupButtons();
    setEventOnFilters();
    setEventOnHeader();
    setEventOnNewTask();
  });
}

function setEventOnLogIn() {
  controller.showLogIn();
  container.classList.remove('container-main');

  const signInForm = document.querySelector('.form');
  const signUpButton = signInForm.querySelector('.form__signup-button');
  const returnToTheMainPageButton = signInForm.querySelector(
    '.return-to-main-button'
  );
  const { elements } = signInForm;
  const elementsArray = Array.from(elements);
  const data = {};

  elementsArray.forEach((el) => {
    if (el.classList.contains('form__input')) {
      el.addEventListener('input', () => {
        validateField(el, controller, registeredUsers);
      });
    }
  });

  signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const login = signInForm.querySelector('[name="login"]');
    const password = signInForm.querySelector('[name="password"]');
    const errorMessage = document.querySelector('.signin-error');

    loader = true;
    setLoader('main', loader, body);
    controller
      .loginUser({
        login: login.value,
        password: password.value,
      })
      .then((message) => {
        if (!message) {
          renderAsideSection(main);
          controller.getMyProfile().then((user) => {
            controller.setCurrentUser(user);
            window.localStorage.setItem('currentUser', JSON.stringify(user));
            controller.getFeed();

            setEventOnNewTaskMobile(body);
            setListenerOnStatusGroupButtons();
            setEventOnFilters();
            setEventOnHeader();
            setEventOnNewTask();
          });
        } else {
          errorMessage.classList.add('signin-error-open');
          errorMessage.innerText = `${message}`;

          setTimeout(() => {
            errorMessage.classList.add('signin-error-close');
            errorMessage.classList.remove('signin-error-open');
            setTimeout(() => {
              errorMessage.classList.remove('signin-error-close');
            }, 1000);
          }, 2000);
        }
      })
      .finally(() => {
        loader = false;
        setLoader('main', loader, body);
      });
  });

  signInForm.addEventListener('click', (e) => {
    toggleShowPassword(e);
  });

  signUpButton.addEventListener('click', () => {
    setEventOnRegistration();
  });

  returnToTheMainPageButton.addEventListener('click', () => {
    container.classList.add('container-main');
    renderAsideSection(main);
    controller.getFeed();
    setEventOnNewTaskMobile(body);
    setListenerOnStatusGroupButtons();
    setEventOnFilters();
    setEventOnHeader();
    setEventOnNewTask();
  });
}

function setEventOnHeader() {
  const logInButton = document.querySelector('.button__signin');
  const logOutButton = document.querySelector('.button__logout');
  const userProfileButton = document.querySelector('.user-profile');
  const logo = document.querySelector('.logo');

  if (logInButton) {
    logInButton.addEventListener('click', () => {
      main.classList.remove('edit-mode');
      setEventOnLogIn();
    });
  }

  if (logOutButton) {
    logOutButton.addEventListener('click', () => {
      main.classList.remove('main-task');
      main.classList.remove('edit-mode');
      setEventOnLogIn();
      controller.setCurrentUser('');
    });
  }

  if (userProfileButton) {
    userProfileButton.addEventListener('click', () => {
      main.classList.remove('main-task');
      main.classList.remove('edit-mode');
      setEventOnUserPage();
    });
  }

  if (logo) {
    logo.addEventListener('click', () => {
      if (main.classList.contains('edit-mode')) {
        main.classList.remove('edit-mode');
      }
      container.classList.add('container-main');
      renderAsideSection(main);
      controller.getFeed();
      setEventOnFilters();
      setEventOnNewTask();

      setEventOnNewTaskMobile(body);
      setListenerOnStatusGroupButtons();
    });
  }
}

function setEventOnUserPage() {
  container.classList.add('container-user');
  controller.showUser();

  const userImageInput = document.getElementById('userImageInput');
  const photo = document.querySelector('.user-main-image');
  const form = document.querySelector('.user-info-form');
  const { elements } = form;
  const elementsArray = Array.from(elements);
  const toggleEditButton = document.querySelector('.toggle-edit-input');
  const toggleEditButtonMobile = document.querySelector(
    '.toggle-edit-input-laptop'
  );
  const returnToTheMainPageButton = document.querySelector(
    '.return-to-main-button'
  );
  const saveChangesButton = document.querySelector('.create-task');
  const defaultImagesWrapper = document.querySelector(
    '.form__registration-default-images-wrapper'
  );
  const errorMessage = document.querySelector('.signin-error');
  const data = {};

  container.classList.remove('container-main');
  main.classList.remove('main-page');
  main.classList.add('main-task');
  setEventOnHeader();

  elementsArray.forEach((el) => {
    el.addEventListener('input', (e) => {
      if (
        e.target.classList.contains('user-info-form__name') ||
        e.target.classList.contains('user-info-form__password')
      ) {
        elementsArray.some(
          (element) => !validateField(element, controller, registeredUsers)
        )
          ? saveChangesButton.setAttribute('disabled', true)
          : saveChangesButton.removeAttribute('disabled');
        validateField(el, controller, registeredUsers);
        a;
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('gallery-button')) {
      body.classList.add('confirm');
      defaultImagesWrapper.classList.add('default-images-wrapper-open');
    } else {
      if (
        defaultImagesWrapper.classList.contains('default-images-wrapper-open')
      ) {
        defaultImagesWrapper.classList.add('default-images-wrapper-close');
        body.classList.remove('confirm');
        setTimeout(() => {
          defaultImagesWrapper.classList.remove('default-images-wrapper-open');
          defaultImagesWrapper.classList.remove('default-images-wrapper-close');
        }, 400);
      }
    }

    if (e.target.classList.contains('default-image')) {
      photo.src = e.target.src;
      convertImageToBase64(e.target.src).then(
        (url) => (data.photo = url.split(',')[1])
      );
    }
  });

  if (userImageInput) {
    userImageInput.addEventListener('change', () => {
      const fileReader = new FileReader();
      const arrayFromImageInput = userImageInput.value.split('.');
      const promise = new Promise((res, rej) => {
        if (
          !imageFormats.includes(
            arrayFromImageInput[arrayFromImageInput.length - 1].toLowerCase()
          )
        ) {
          rej('Invalid file format');
          return;
        }

        fileReader.readAsDataURL(userImageInput.files[0]);
        fileReader.onload = () => {
          photo.src = fileReader.result;
          res(photo);
        };
      });

      promise
        .then(() => {
          data.photo = photo.src.split(',')[1];
        })
        .catch(() => {
          photo.src = controller.api.user.photo;
          errorMessage.classList.add('signin-error-open');
          errorMessage.innerText = 'Invalid file format.';
          setTimeout(() => {
            errorMessage.classList.add('signin-error-close');
            errorMessage.classList.remove('signin-error-open');
            setTimeout(() => {
              errorMessage.classList.remove('signin-error-close');
            }, 1000);
          }, 2000);
        });
    });
  }

  if (toggleEditButton) {
    toggleEditButton.addEventListener('change', () => {
      if (toggleEditButton.checked) {
        main.classList.add('edit-mode');
        setTimeout(() => {
          setEventOnUserPage();
        }, 20);
      } else {
        main.classList.remove('edit-mode');
        setTimeout(() => {
          setEventOnUserPage();
        }, 20);
      }
    });
  }

  if (toggleEditButtonMobile) {
    toggleEditButtonMobile.addEventListener('change', () => {
      if (toggleEditButtonMobile.checked) {
        main.classList.add('edit-mode');
        setTimeout(() => {
          setEventOnUserPage();
        }, 20);
      } else {
        main.classList.remove('edit-mode');
        setTimeout(() => {
          setEventOnUserPage();
        }, 20);
      }
    });
  }

  form.addEventListener('click', (e) => {
    toggleShowPassword(e);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('usernameUserPage');
    const confirmPasswordInput = document.getElementById(
      'user-confirm-password'
    );

    data.userName = nameInput.value
      ? nameInput.value
      : controller.api.user.userName;
    data.password = confirmPasswordInput.value
      ? confirmPasswordInput.value
      : controller.api.user.password;
    data.retypedPassword = confirmPasswordInput.value;
    data.photo = data.photo ? data.photo : photo.src.split(',')[1];

    loader = true;
    setLoader('main', loader, body);
    controller.editUser(controller.api.user.id, data).then((message) => {
      if (message) {
        errorMessage.classList.add('signin-error-open');
        errorMessage.innerText = `${message[0]}`;

        setTimeout(() => {
          errorMessage.classList.add('signin-error-close');
          errorMessage.classList.remove('signin-error-open');
          setTimeout(() => {
            errorMessage.classList.remove('signin-error-close');
          }, 1000);
        }, 2000);
      } else {
        controller.getMyProfile().then((user) => {
          controller.setCurrentUser(user);
          window.localStorage.setItem('currentUser', JSON.stringify(user));
          main.classList.remove('edit-mode');
          setEventOnUserPage();
          loader = false;
          setLoader('main', loader, body);
        });
      }
    });
  });

  form.addEventListener('reset', () => {
    main.classList.remove('edit-mode');
    setEventOnUserPage();
  });

  returnToTheMainPageButton.addEventListener('click', () => {
    container.classList.remove('container-user');
    if (main.classList.contains('edit-mode')) {
      main.classList.remove('edit-mode');
    }
    container.classList.add('container-main');
    renderAsideSection(main);
    controller.getFeed();
    setEventOnFilters();
    setEventOnNewTask();
    setEventOnNewTaskMobile(body);
    setListenerOnStatusGroupButtons();
  });
}

async function setEventOnNewTask() {
  const registeredUsers = await controller.getAllUsers();
  controller.showNewTask(registeredUsers);

  const form = document.querySelector('.new-task-form');
  const { elements } = form;
  const elementsArray = Array.from(elements);
  const createTaskButton = form.querySelector('.create-task');
  const newTaskDescription = form.querySelector('.task-description');
  const taskAssignee = document.getElementById('assignee-input-new-task');
  const resetChangesButton = document.querySelector('.reset-changes');

  elementsArray.forEach((el) => {
    if (!el.classList.contains('button')) {
      el.addEventListener('input', () => {
        resetChangesButton.removeAttribute('disabled');
      });
    }
  });

  elementsArray.forEach((el) => {
    if (el.classList.contains('form__input')) {
      el.addEventListener('input', () => {
        elementsArray.some(
          (element) => !validateField(element, controller, registeredUsers)
        ) ||
        !validateDescription(newTaskDescription) ||
        newTaskDescription.value === ''
          ? createTaskButton.setAttribute('disabled', true)
          : createTaskButton.removeAttribute('disabled');
        validateField(el, controller, registeredUsers);
      });
    }
  });

  newTaskDescription.addEventListener('input', () => {
    !validateDescription(newTaskDescription) ||
    elementsArray.some(
      (element) => !validateField(element, controller, registeredUsers)
    ) ||
    newTaskDescription.value === ''
      ? createTaskButton.setAttribute('disabled', true)
      : createTaskButton.removeAttribute('disabled');
    validateDescription(newTaskDescription);
  });

  taskAssignee.addEventListener('change', () => {
    const list = form.querySelector('[id="list"]');

    for (let i = 0; i < list.options.length; i++) {
      if (list.options[i].value === taskAssignee.value) {
        taskAssignee.setAttribute('userId', list.options[i].getAttribute('id'));
      }
    }
  });

  resetChangesButton.addEventListener('click', (e) => {
    e.preventDefault();

    const confirmResetModal = document.createElement('div');
    confirmResetModal.className = 'task-confirm-modal';
    confirmResetModal.innerHTML = `
          <p class="task-confirm-modal__text">ARE YOU SURE YOU WANT TO RESET ALL CHANGES?</p>
          <div class="task-confirm-modal__buttons-wrapper">
              <button id="cancelReset" class="button cancel">CANCEL</button>
              <button id="confirmReset" class="button delete delete-confirm">RESET</button>
          </div>
        `;
    body.classList.add('confirm');
    main.prepend(confirmResetModal);

    const cancelReset = document.getElementById('cancelReset');
    const confirmReset = document.getElementById('confirmReset');

    confirmReset.addEventListener('click', () => {
      body.classList.remove('confirm');
      confirmResetModal.remove();
      resetChangesButton.setAttribute('disabled', true);
      createTaskButton.setAttribute('disabled', true);
      form.reset();
    });

    cancelReset.addEventListener('click', () => {
      body.classList.remove('confirm');
      confirmResetModal.remove();
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskName = document.getElementById('task-name-input');
    const taskStatus = document.getElementById('status-select-new-task');
    const taskPriority = document.getElementById('priority-select-new-task');
    const taskPrivacy = document.getElementById('privacy-select-new-task');
    const taskDescription = form.querySelector('.task-description');
    const task = {};

    task.name = taskName.value;
    task.description = taskDescription.value;
    task.assignee = registeredUsers.find(
      (user) => user.id === taskAssignee.getAttribute('userId')
    ).id;
    task.status = taskStatus.value;
    task.priority = taskPriority.value;
    task.isPrivate = Boolean(Number(taskPrivacy.value));
    task.creator = controller.api.user;

    loader = true;
    setLoader('article', loader, body);

    controller.postTask(task).then(() => {
      controller.api.tasks = [];
      tasksToSkip = 0;
      controller
        .getTasks(tasksToSkip, 10, 1)
        .then(() => {
          return controller.getTasks(tasksToSkip, 10, 2);
        })
        .then(() => {
          return controller.getTasks(tasksToSkip, 10, 3);
        })
        .finally(() => {
          loader = false;
          setLoader('article', loader, body);
          controller.getFeed();
          form.reset();
          resetChangesButton.setAttribute('disabled', true);
          createTaskButton.setAttribute('disabled', true);
          setEventOnNewTaskMobile(body);
          setListenerOnStatusGroupButtons();
        });
    });
  });
}

function setEventOnError() {
  const returnButton = document.querySelector('.return-to-main-button');

  returnButton.addEventListener('click', () => {
    tasksToSkip = 0;
    loader = true;
    setLoader('main', loader, body);
    controller.api.tasks = [];
    controller
      .getTasks(0, 10, 1)
      .then(() => {
        return controller.getTasks(0, 10, 2);
      })
      .then(() => {
        return controller.getTasks(0, 10, 3);
      })
      .then(() => {
        if (main.classList.contains('edit-mode')) {
          main.classList.remove('edit-mode');
        }
        main.classList.remove('error-page');
        main.classList.add('main-page');
        container.classList.add('container-main');
        renderAsideSection(main);
        controller.getFeed();
        setEventOnFilters();
        setEventOnNewTaskMobile(body);
        setListenerOnStatusGroupButtons();
        setEventOnNewTask();
        loader = false;
        setLoader('article', loader, body);
      });
  });
}

setEventOnTaskCard();
setEventOnHeader();
setEventOnNewTask();
setEventOnFilters();

console.log(controller.api.registeredUsers);
