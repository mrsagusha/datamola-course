import {
  validateField,
  toggleShowPassword,
  setInputsValuesToEditConfig,
  validateComment,
  validateDescription,
  setInputsValuesToCurrentTaskConfig,
  getLengthOfTasks,
  renderAsideSection,
  setListenerOnStatusGroupButtons,
  closeSideMenu,
  setEventOnNewTaskMobile,
} from './utils.js';

let itemsOnPageToRender = 10;

class TaskFeedApiService {
  constructor(server) {
    this.server = server;
  }
}

class UserCollection {
  constructor() {
    this._registeredUsers = this.restore();
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

  save() {
    window.localStorage.setItem('users', JSON.stringify(this._registeredUsers));
  }

  restore() {
    const users = JSON.parse(window.localStorage.getItem('users'));
    return users ? users : [];
  }
}

class Task {
  constructor(
    name,
    description,
    assignee,
    status,
    priority,
    isPrivate,
    creator
  ) {
    this._id = Date.now().toString();
    this.name = name;
    this.description = description;
    this._createdAt = new Date();
    this.assignee = assignee;
    this.status = status;
    this.priority = priority;
    this.isPrivate = isPrivate;
    this.comments = [];
    this._creator = creator;
  }

  get id() {
    return this._id;
  }

  get createdAt() {
    return this._createdAt;
  }

  get creator() {
    return this._creator;
  }

  static validateTask(task) {
    const _NAME_MAX_LENGTH = 100;
    const _DESCRIPTION_MAX_LENGTH = 280;

    const statusList = ['To Do', 'In Progress', 'Complete'];
    if (task) {
      if (
        !task._id ||
        typeof task._id !== 'string' ||
        !task.name ||
        typeof task.name !== 'string' ||
        task.name.length > _NAME_MAX_LENGTH ||
        !task.description ||
        typeof task.description !== 'string' ||
        task.description.length > _DESCRIPTION_MAX_LENGTH ||
        // !task.assignee ||
        // typeof task.assignee !== 'string' ||
        !task.status ||
        typeof task.status !== 'string' ||
        !statusList.includes(task.status) ||
        !task.priority ||
        typeof task.priority !== 'string' ||
        (task.priority !== 'Low' &&
          task.priority !== 'Medium' &&
          task.priority !== 'High') ||
        typeof task.isPrivate !== 'boolean' ||
        !task.comments ||
        !Array.isArray(task.comments)
      ) {
        return false;
      }
    }

    return true;
  }
}

class Comment {
  constructor(text, user) {
    this._id = Date.now().toString();
    this.text = text;
    this._createdAt = new Date();
    this._author = user;
  }

  get id() {
    return this._id;
  }

  get createdAt() {
    return this._createdAt;
  }

  get author() {
    return this._author;
  }

  static validateComment(comment) {
    if (
      !comment._id ||
      typeof comment._id !== 'string' ||
      !comment.text ||
      typeof comment.text !== 'string' ||
      comment.text.length > 280
      // !comment.author ||
      // typeof comment.author !== 'string'
    ) {
      return false;
    }

    return true;
  }
}

class TasksCollection {
  constructor() {
    this._tasks = this.restore();
  }

  _user = {};

  get tasks() {
    return this.tasks;
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

  getPage(itemsOnPageToRender, filterConfig) {
    let taskCopy = this._tasks;
    const toDoTasks = taskCopy
      .filter((task) => task.status === 'To Do')
      .slice(0, itemsOnPageToRender);
    const inProgressTasks = taskCopy
      .filter((task) => task.status === 'In Progress')
      .slice(0, itemsOnPageToRender);
    const completeTasks = taskCopy
      .filter((task) => task.status === 'Complete')
      .slice(0, itemsOnPageToRender);
    taskCopy = [...toDoTasks, ...inProgressTasks, ...completeTasks];

    if (filterConfig) {
      taskCopy = taskCopy
        .filter((task) => {
          return filterConfig.hasOwnProperty('assignee')
            ? filterConfig.assignee.userName
              ? task.assignee.userName
                  .toLowerCase()
                  .includes(filterConfig.assignee.userName.toLowerCase())
              : task.assignee.userName
                  .toLowerCase()
                  .includes(filterConfig.assignee.toLowerCase())
            : task;
        })
        .filter((task) => {
          return filterConfig.hasOwnProperty('dateFrom')
            ? new Date(task._createdAt) >= filterConfig.dateFrom
            : task;
        })
        .filter((task) => {
          return filterConfig.hasOwnProperty('dateTo')
            ? new Date(task._createdAt) <= filterConfig.dateTo
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
            ? task.name.toLowerCase().includes(filterConfig.name.toLowerCase())
            : task;
        });
    }

    return taskCopy.sort(
      (a, b) => new Date(b._createdAt) - new Date(a._createdAt)
    );
  }

  get(id) {
    return this._tasks.find((task) => task._id === String(id));
  }

  add(name, description, assignee, status, priority, isPrivate) {
    const newTask = new Task(
      name,
      description,
      assignee,
      status,
      priority,
      isPrivate,
      this._user
    );

    if (!Task.validateTask(newTask)) {
      return false;
    }
    this._tasks.push(newTask);
    return true;
  }

  edit(id, name, description, assignee, status, priority, isPrivate = false) {
    if (
      arguments.length === 0 ||
      this.get(id)._creator._id !== this._user._id
    ) {
      return false;
    }

    const editTask = JSON.parse(JSON.stringify(this.get(id)));

    editTask._createdAt = new Date(editTask._createdAt);

    name === undefined ? (name = editTask.name) : (editTask.name = name);
    description === undefined
      ? (description = editTask.description)
      : (editTask.description = description);
    assignee === undefined
      ? (assignee = editTask.assignee)
      : (editTask.assignee = assignee);
    status === undefined
      ? (status = editTask.status)
      : (editTask.status = status);
    priority === undefined
      ? (priority = editTask.priority)
      : (editTask.priority = priority);
    isPrivate === undefined
      ? (isPrivate = editTask.isPrivate)
      : (editTask.isPrivate = isPrivate);

    if (!Task.validateTask(editTask)) {
      return false;
    }

    this._tasks = this._tasks.map((task) => {
      return task._id === id ? (task = editTask) : task;
    });

    return true;
  }

  remove(id) {
    if (!this.get(id) || !id || this.get(id)._creator._id !== this._user._id) {
      return false;
    }

    this._tasks = this._tasks.filter((task) => task._id !== id);

    return true;
  }

  addComment(id, text) {
    const task = this.get(id);
    const comment = new Comment(text, this._user.userName);

    if (!Comment.validateComment(comment) || !task) {
      return false;
    }

    task.comments.push(comment);
    return true;
  }

  changeUser(newUser) {
    this._user = newUser;
  }

  addAll(tasks) {
    const notValideTasksList = [];

    tasks.forEach((task) => {
      Task.validateTask(task)
        ? this._tasks.push(task)
        : notValideTasksList.push(task);
    });

    return notValideTasksList;
  }

  clear() {
    this._tasks = [];
  }

  save() {
    window.localStorage.setItem('tasks', JSON.stringify(this._tasks));
  }

  restore() {
    const tasks = JSON.parse(window.localStorage.getItem('tasks'));
    return tasks ? tasks : [];
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
      ? user.userName === controller.list._user.userName
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
                  ? `<img class="user-image" src=${user.photo} alt="user"></img>`
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

    if (!viewToggleSection.classList.contains('list-view')) {
      tasksFeed.append(toDoGroup);
      tasksFeed.append(inProgressGroup);
      tasksFeed.append(completeGroup);

      for (let i = 0; i < tasks.length; i++) {
        if (
          tasks[i].isPrivate &&
          tasks[i].assignee._id !== controller.list.user._id &&
          tasks[i]._creator._id !== controller.list.user._id
        ) {
          continue;
        }
        const newTask = document.createElement('div');
        newTask.classList.add('card');
        newTask.setAttribute('id', tasks[i]._id);
        newTask.setAttribute('status', tasks[i].status);
        newTask.innerHTML = `
        <i class="fa-solid fa-ellipsis-vertical ${
          controller.list._user._id === tasks[i]._creator._id ? '' : 'forbidden'
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
                <p class="card__priority ${tasks[i].priority.toLowerCase()}">${
          tasks[i].priority
        }</p>
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
                  ('0' + new Date(tasks[i]._createdAt).getDate()).slice(-2) +
                  '.' +
                  ('0' + (new Date(tasks[i]._createdAt).getMonth() + 1)).slice(
                    -2
                  ) +
                  '.' +
                  new Date(tasks[i]._createdAt).getFullYear()
                }</time>
                <time class="card__date">
                  ${
                    new Date(tasks[i]._createdAt).getHours() +
                    ':' +
                    (String(new Date(tasks[i]._createdAt).getMinutes())
                      .length === 1
                      ? '0' + new Date(tasks[i]._createdAt).getMinutes()
                      : new Date(tasks[i]._createdAt).getMinutes())
                  }
                </time>
            </div>
        </div>
        `;

        if (tasks[i].status === 'To Do') {
          toDoGroup.lastElementChild.append(newTask);
        }

        if (tasks[i].status === 'In Progress') {
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
          tasks[i].assignee._id !== controller.list.user._id &&
          tasks[i]._creator._id !== controller.list.user._id
        ) {
          continue;
        }
        const newTask = document.createElement('div');
        newTask.classList.add('card-list-view');
        newTask.setAttribute('id', tasks[i]._id);
        newTask.setAttribute('status', tasks[i].status);
        newTask.innerHTML = `
              <span class="card-name-list-view">${tasks[i].name}</span>
              <span>${tasks[i].assignee.userName}</span>
              <div class="task-date-list-view-wrapper">
                <time>${
                  ('0' + new Date(tasks[i]._createdAt).getDate()).slice(-2) +
                  '.' +
                  ('0' + (new Date(tasks[i]._createdAt).getMonth() + 1)).slice(
                    -2
                  ) +
                  '.' +
                  new Date(tasks[i]._createdAt).getFullYear()
                }</time>
                <time>${
                  new Date(tasks[i]._createdAt).getHours() +
                  ':' +
                  (String(new Date(tasks[i]._createdAt).getMinutes()).length ===
                  1
                    ? '0' + new Date(tasks[i]._createdAt).getMinutes()
                    : new Date(tasks[i]._createdAt).getMinutes())
                }</time>
              </div>
              <span>${tasks[i].description}</span>
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

        if (tasks[i].status === 'In Progress') {
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

    if (tasks.length === 0) {
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

    if (
      getLengthOfTasks('In Progress', controller) >
        document.querySelectorAll('[status="To Do"]').length ||
      getLengthOfTasks('To Do', controller) >
        document.querySelectorAll('[status="In Progress"]').length ||
      getLengthOfTasks('Complete', controller) >
        document.querySelectorAll('[status="Complete"]').length
    ) {
      loadMoreButton.removeAttribute('disabled');
    } else {
      loadMoreButton.setAttribute('disabled', true);
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

  display() {
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
            ${controller.users._registeredUsers
              .map((user) => {
                return `
                <option id='${user._id}' value='${user.userName}'></option>
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
        <option value="In Progress">In Progress</option>
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

  display(tasks, id) {
    const mainTaskWrapper = document.getElementById(this._id);
    const isEditMode = mainTaskWrapper.classList.contains('edit-mode');
    const task = tasks.find((task) => task._id === String(id));

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
                ('0' + new Date(task._createdAt).getDate()).slice(-2) +
                '.' +
                ('0' + (new Date(task._createdAt).getMonth() + 1)).slice(-2) +
                '.' +
                new Date(task._createdAt).getFullYear()
              }</time>
              <time class="task-date">${new Date(
                task._createdAt
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
                controller.list._user._id === task._creator._id
                  ? ''
                  : 'disabled'
              }><i class="fa-solid ${
        !isEditMode ? 'fa-pen pen-task-page' : 'fa-floppy-disk'
      }"></i></button>
              <button class="delete" ${
                controller.list._user._id === task._creator._id
                  ? ''
                  : 'disabled'
              }><i class="fa-solid fa-trash trash-task-page"></i></button>
          </div>
      </div>
      <div class="task-main">
          <div class="task-details">
           
                  ${
                    !isEditMode
                      ? `<div class="task-info-wrapper">
                      <span class="task-info-span">assignee: </span><p class="task-assignee" id="${task.assignee._id}">${task.assignee.userName}</p>
                    </div>`
                      : `<div class="task-info-wrapper">
                          <span class="task-info-span">assignee: </span>
                          <div class="form__input-error-message error-task-page-assignee"></div>
                          <input class="assignee-input assignee-input-edit" id="assignee-input" type="text" autocomplete="off" name="assignee" list="assignee-list" userId="${
                            task.assignee._id
                          }">
                          <datalist id="assignee-list">
                          ${controller.users._registeredUsers
                            .map((user) => {
                              return `
                          <option id='${user._id}' value='${user.userName}'></option>
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
                      <option value="In Progress">In Progress</option>
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
                    .sort((a, b) => a._createdAt - b._createdAt)
                    .map((comment) => {
                      return `
                    <div class="comment">
                      <div class="comment__info">
                          <p class="comment__author">${comment._author}</p>
                          <div>
                          <time class="comment__date">${
                            (
                              '0' + new Date(comment._createdAt).getDate()
                            ).slice(-2) +
                            '.' +
                            (
                              '0' +
                              (new Date(comment._createdAt).getMonth() + 1)
                            ).slice(-2) +
                            '.' +
                            new Date(comment._createdAt).getFullYear()
                          }</time>
                          <time class="comment__date">${new Date(
                            comment._createdAt
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
                    !controller.list._user.userName || isEditMode
                      ? 'disabled'
                      : ''
                  } placeholder="Enter new comment..."></textarea>
                  <button class="button new-comment-button" disabled>
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
                    }" src="./assets/user.png" alt="user">
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
                  controller.list._user.userName
                }</p>
                <div class="user-info-form__login-wrapper">
                    <i class="fa-solid fa-user user-page"></i>
                    <input id="user-login" class="user-info-form__login" type="text" name="" id="" value="${
                      controller.list._user.login
                    }" disabled>
                </div>
                <div class="user-info-field-wrapper">
    
                    ${
                      isEditMode
                        ? '<label for="user-current-password">Current password:</label>'
                        : ''
                    }
                    <div class="user-info-form__password-wrapper">
                        <i class="fa-solid fa-lock"></i>
                        <div class="form__input-error-message"></div>
                        <input id="user-current-password" class="user-info-form__password" type="password" name="" id="" value="${
                          controller.list._user.password
                        }" disabled>
                        <i class="fa-solid fa-eye"></i>
                    </div>
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
        <input class="form__input" type="password" placeholder="Confirm password" name="confirmPassword">
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
        <img class="form__registration-image" src="./assets/user.png" alt="image">
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

  display() {
    const aside = document.getElementById(this._id);
    const newTaskForm = document.createElement('form');
    newTaskForm.classList.add('new-task-form');
    newTaskForm.innerHTML = `
    <label for="task-name-input">Task name
    <div class="form__input-error-message new-task-error"></div>
    <input placeholder="" class="form__input new-task-input" id="task-name-input" type="text" name="taskName" autocomplete="off" ${
      !controller.list._user.userName ? 'disabled' : ''
    }>
</label>
<label for="assignee-input">Assignee
    <div class="form__input-error-message new-task-error"></div>
    <input class="form__input new-task-input" id="assignee-input-new-task" type="text" list="assignee-list" name="assignee" autocomplete="off" ${
      !controller.list._user.userName ? 'disabled' : ''
    }>
    <datalist id="assignee-list">
    ${controller.users._registeredUsers
      .map((user) => {
        return `
        <option id='${user._id}' value='${user.userName}'></option>
      `;
      })
      .join('')}
    </datalist>
</label>
<label for="status-select">Status
    <select name="status" id="status-select-new-task" ${
      !controller.list._user.userName ? 'disabled' : ''
    }>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Complete">Complete</option>
    </select>
</label>
<label for="priority-select">
    Priority
    <select name="priority" id="priority-select-new-task" ${
      !controller.list._user.userName ? 'disabled' : ''
    }>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
    </select>
</label>
<label for="privacy-select">
    Privacy
    <select name="privacy" id="privacy-select-new-task" ${
      !controller.list._user.userName ? 'disabled' : ''
    }>
        <option value="0">Public</option>
        <option value="1">Private</option>
    </select>
</label>
<label for="description">
    Description
    <div class="form__input-error-message new-task-error"></div>
    <textarea class="task-description new-task-description" name="description" id="description" cols="25" rows="10" ${
      !controller.list._user.userName ? 'disabled' : ''
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

class TasksController {
  constructor(
    list,
    users,
    header,
    taskFeed,
    filters,
    taskPage,
    logIn,
    registrationPage,
    userPage,
    newTask
  ) {
    this.list = list;
    this.users = users;
    this.header = header;
    this.taskFeed = taskFeed;
    this.filters = filters;
    this.taskPage = taskPage;
    this.logIn = logIn;
    this.registrationPage = registrationPage;
    this.userPage = userPage;
    this.newTask = newTask;
  }

  setCurrentUser(user) {
    this.list.changeUser(user);
    this.header.display(user);
  }

  getFeed(itemsOnPageToRender, filterConfig) {
    const arr = this.list.getPage(itemsOnPageToRender, filterConfig);
    this.taskFeed.display(arr);
  }

  getFilters() {
    this.filters.display(this.list._tasks);
  }

  addTask(task) {
    this.list.add(
      task.name,
      task.description,
      task.assignee,
      task.status,
      task.priority,
      task.isPrivate,
      task.creator
    );
    this.getFeed(itemsOnPageToRender);
  }

  editTask(id, task) {
    this.list.edit(
      String(id),
      task.name,
      task.description,
      task.assignee,
      task.status,
      task.priority,
      task.isPrivate
    );
  }

  removeTask(id) {
    this.list.remove(String(id));
    this.getFeed(itemsOnPageToRender);
  }

  addUser(login, userName, password, photo) {
    this.users.addUser(login, userName, password, photo);
  }

  editUser(id, user) {
    this.users.edit(String(id), user.userName, user.password, user.photo);
  }

  showTask(id) {
    this.taskPage.display(this.list._tasks, id);
  }

  showLogIn(id) {
    this.logIn.display(id);
  }

  showRegistration(id) {
    this.registrationPage.display(id);
  }

  addComment(id, text) {
    this.list.addComment(id, text);
  }

  showUser(id) {
    this.userPage.display(id);
  }

  showNewTask(id) {
    this.newTask.display(id);
  }

  saveUsers() {
    this.users.save();
  }

  restoreUsers() {
    this.users.restore();
  }

  saveTasks() {
    this.list.save();
  }

  restoreTasks() {
    this.list.restore();
  }
}

const list = new TasksCollection();
const users = new UserCollection();
const header = new HeaderView('header');
const taskFeed = new TaskFeedView('article');
const filters = new FilterView('filtersWrapper');
const taskPage = new TaskView('main');
const logIn = new LogInView('main');
const registrationPage = new RegistrationView('main');
const userPage = new UserView('main');
const newTask = new NewTaskView('aside');
const controller = new TasksController(
  list,
  users,
  header,
  taskFeed,
  filters,
  taskPage,
  logIn,
  registrationPage,
  userPage,
  newTask
);

window.localStorage.getItem('currentUser')
  ? controller.setCurrentUser(
      JSON.parse(window.localStorage.getItem('currentUser'))
    )
  : controller.setCurrentUser({});
controller.getFeed(itemsOnPageToRender);

const main = document.getElementById('main');
const body = document.getElementById('body');
const container = document.querySelector('.container');
const aside = document.getElementById('aside');
const userProfileButton = document.querySelector('.side-menu__profile-button');
const burgerMenu = document.querySelector('.burger-menu');
const sideMenu = document.querySelector('.side-menu');
const sideMenuProfileImage = document.querySelector(
  '.side-menu__profile-image'
);
const sideMenuUser = document.querySelector('.side-menu__user-name');
const sideMenuProfileButton = document.querySelector('.side-menu__button');
const registeredUsers = controller.users._registeredUsers;
const editConfig = {};
const currentTaskConfig = {};
let currentTaskId = null;

function setEventOnTaskCard() {
  setListenerOnStatusGroupButtons();

  main.addEventListener('click', (e) => {
    if (
      (e.target.className === 'card' ||
        e.target.className === 'card-list-view') &&
      controller.list.user._id
    ) {
      currentTaskId = e.target.getAttribute('id');
      controller.showTask(currentTaskId);
      container.classList.remove('container-main');
      setEventsOnTaskPage();
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
        body.classList.remove('confirm');
        confirmDeleteModal.remove();
        controller.removeTask(e.target.closest('.card').getAttribute('id'));
        controller.saveTasks();

        setListenerOnStatusGroupButtons();
      });

      cancelDelete.addEventListener('click', () => {
        body.classList.remove('confirm');
        confirmDeleteModal.remove();
        controller.getFeed(itemsOnPageToRender);
      });
    }

    if (e.target.classList.contains('edit-task-board')) {
      currentTaskId = e.target.closest('.card').getAttribute('id');
      controller.showTask(currentTaskId);
      setInputsValuesToCurrentTaskConfig(currentTaskConfig, registeredUsers);
      container.classList.remove('container-main');
      main.classList.add('edit-mode');
      controller.showTask(currentTaskId);
      setEventsOnTaskPage();
      setInputsValuesToEditConfig(editConfig, currentTaskConfig);
    }

    if (e.target.classList.contains('fa-list-ul')) {
      const viewTiggle = document.querySelector('.view-wrapper');
      const defautlViewButton = document.querySelector('.fa-table-columns');
      viewTiggle.classList.add('list-view');
      defautlViewButton.classList.remove('view-selected');
      e.target.classList.add('view-selected');
      controller.getFeed(itemsOnPageToRender);
    }

    if (e.target.classList.contains('fa-table-columns')) {
      const viewTiggle = document.querySelector('.view-wrapper');
      const listViewButton = document.querySelector('.fa-list-ul');
      if (viewTiggle.classList.contains('list-view')) {
        viewTiggle.classList.remove('list-view');
        listViewButton.classList.remove('view-selected');
        e.target.classList.add('view-selected');
        controller.getFeed(itemsOnPageToRender);
      }
    }
  });

  if (burgerMenu) {
    burgerMenu.addEventListener('click', () => {
      if (!sideMenu.classList.contains('side-menu-open')) {
        burgerMenu.classList.add('burger-menu-open');
        sideMenu.classList.add('side-menu-open');
        body.classList.add('confirm');
        if (!controller.list.user._id) {
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
            controller.setCurrentUser('');
          });
        } else {
          sideMenuProfileImage.src = controller.list.user.photo;
          sideMenuUser.textContent = controller.list.user.userName;
          userProfileButton.style.display = 'flex';
          sideMenuProfileImage.style.display = 'block';
          sideMenuUser.textContent = `${controller.list.user.userName}`;
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
}

function setEventsOnTaskPage() {
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
        (element) => !validateField(element, controller)
      ) ||
      !validateDescription(descriptionTextArea) ||
      descriptionTextArea.value === ''
        ? editButton.setAttribute('disabled', true)
        : editButton.removeAttribute('disabled');
      validateField(el, controller);
    });
  });

  returnToTheMainPageButton.addEventListener('click', () => {
    if (main.classList.contains('edit-mode')) {
      main.classList.remove('edit-mode');
    }
    container.classList.add('container-main');
    renderAsideSection(main);
    controller.getFeed(itemsOnPageToRender);
    setEventOnNewTaskMobile(body);
    setListenerOnStatusGroupButtons();
    setEventOnFilters();
    setEventOnNewTask();
  });

  deleteButton.addEventListener('click', () => {
    const confirmDeleteModal = document.createElement('div');
    confirmDeleteModal.className = 'task-confirm-modal';
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
      itemsOnPageToRender = 10;
      body.classList.remove('confirm');
      renderAsideSection(main);
      controller.removeTask(currentTaskId);
      controller.saveTasks();
      setEventOnFilters();
      setEventOnNewTask();
      setEventOnNewTaskMobile(body);
      setListenerOnStatusGroupButtons();
    });

    cancelDelete.addEventListener('click', () => {
      body.classList.remove('confirm');
      controller.showTask(currentTaskId);
      setEventsOnTaskPage();
    });
  });

  editButton.addEventListener('click', () => {
    if (main.classList.contains('edit-mode')) {
      controller.editTask(currentTaskId, editConfig);
      controller.saveTasks();
      main.classList.remove('edit-mode');
      controller.showTask(currentTaskId);
      setEventsOnTaskPage();
    } else {
      setInputsValuesToCurrentTaskConfig(currentTaskConfig, registeredUsers);
      main.classList.add('edit-mode');
      controller.showTask(currentTaskId);
      setEventsOnTaskPage();
      setInputsValuesToEditConfig(
        editConfig,
        currentTaskConfig,
        registeredUsers
      );
    }
  });

  if (descriptionTextArea) {
    descriptionTextArea.addEventListener('input', () => {
      !validateDescription(descriptionTextArea) ||
      Array.from(taskPageInputs).some(
        (element) => !validateField(element, controller)
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
    controller.addComment(currentTaskId, commentTextArea.value);
    controller.saveTasks();
    controller.showTask(currentTaskId);
    setEventsOnTaskPage();
  });
}

function setEventOnFilters() {
  controller.getFilters();
  const form = document.getElementById('filters');
  const { elements } = form;
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
  let filterConfig = {};

  filtersHead.addEventListener('click', () => {
    filters.classList.toggle('open');
  });

  taskNameInput.addEventListener('input', () => {
    filterConfig.name = taskNameInput.value;
    controller.getFeed(itemsOnPageToRender, filterConfig);
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
          (user) => user._id === assigneeInput.getAttribute('userID')
        )
      : assigneeInput.value;
    controller.getFeed(itemsOnPageToRender, filterConfig);
    setEventOnNewTaskMobile(body);
    setListenerOnStatusGroupButtons();
  });

  statusSelect.addEventListener('change', () => {
    filterConfig.status = statusSelect.value;
    controller.getFeed(itemsOnPageToRender, filterConfig);
    setEventOnNewTaskMobile(body);
    setListenerOnStatusGroupButtons();
  });

  prioritySelect.addEventListener('change', () => {
    filterConfig.priority = prioritySelect.value;
    controller.getFeed(itemsOnPageToRender, filterConfig);
    setEventOnNewTaskMobile(body);
    setListenerOnStatusGroupButtons();
  });

  privacySelect.addEventListener('change', () => {
    filterConfig.isPrivate = Boolean(Number(privacySelect.value));
    controller.getFeed(itemsOnPageToRender, filterConfig);
    setEventOnNewTaskMobile(body);
    setListenerOnStatusGroupButtons();
  });

  dateFromDateSelect.addEventListener('input', () => {
    dateFromDateSelect.value
      ? dateFromTimeSelect.removeAttribute('disabled')
      : dateFromTimeSelect.setAttribute('disabled', 'true');
    filterConfig.dateFrom = new Date(dateFromDateSelect.value);
    controller.getFeed(itemsOnPageToRender, filterConfig);
    setEventOnNewTaskMobile(body);
    setListenerOnStatusGroupButtons();
  });

  dateFromTimeSelect.addEventListener('input', () => {
    filterConfig.dateFrom = new Date(
      `${dateFromDateSelect.value}:${dateFromTimeSelect.value}`
    );
    controller.getFeed(itemsOnPageToRender, filterConfig);
    setEventOnNewTaskMobile(body);
    setListenerOnStatusGroupButtons();
  });

  dateToDateSelect.addEventListener('input', () => {
    dateToDateSelect.value
      ? dateToTimeSelect.removeAttribute('disabled')
      : dateToTimeSelect.setAttribute('disabled', 'true');
    filterConfig.dateTo = new Date(dateToDateSelect.value);
    controller.getFeed(itemsOnPageToRender, filterConfig);
    setEventOnNewTaskMobile(body);
    setListenerOnStatusGroupButtons();
  });

  dateToTimeSelect.addEventListener('input', () => {
    filterConfig.dateTo = new Date(
      `${dateToDateSelect.value}:${dateToTimeSelect.value}`
    );
    controller.getFeed(itemsOnPageToRender, filterConfig);
    setEventOnNewTaskMobile(body);
    setListenerOnStatusGroupButtons();
  });

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('clear-filters-button')) {
      filterConfig = {};
      controller.getFeed(itemsOnPageToRender, filterConfig);

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
      data.photo = e.target.src;
    }
  });

  registrationForm.addEventListener('click', (e) => {
    toggleShowPassword(e);
  });

  registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const login = registrationForm.querySelector('[name="login"]');
    const user = registrationForm.querySelector('[name="username"]');
    const password = registrationForm.querySelector('[name="password"]');
    let isRegistered = null;

    data.login = login.value;
    data.userName = user.value;
    data.password = password.value;
    data.photo = photo.src;

    isRegistered = registeredUsers.find((user) => user.login === data.login);

    if (!isRegistered) {
      controller.addUser(data.login, data.userName, data.password, data.photo);
      controller.saveUsers();
      controller.showLogIn();
      setEventOnLogIn();
    } else {
      errorMessage.classList.add('signin-error-open');
      errorMessage.innerText =
        'User with this username already exists! Enter a different login.';
    }

    setTimeout(() => {
      errorMessage.classList.add('signin-error-close');
      errorMessage.classList.remove('signin-error-open');
      setTimeout(() => {
        errorMessage.classList.remove('signin-error-close');
      }, 1000);
    }, 2000);
  });

  Array.from(elements).forEach((el) => {
    if (el.classList.contains('form__input')) {
      el.addEventListener('input', () => {
        Array.from(elements).some(
          (element) => !validateField(element, controller)
        )
          ? registerButton.setAttribute('disabled', true)
          : registerButton.removeAttribute('disabled');
        validateField(el, controller);
      });
    }
  });

  document.getElementById('imageInput').addEventListener('change', () => {
    const imageInput = document.getElementById('imageInput');
    const fileReader = new FileReader();
    const arrayFromimageInput = imageInput.value.split('.');
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
        data.photo = photo.src;
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
    controller.getFeed(itemsOnPageToRender);
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

  elementsArray.forEach((el) => {
    if (el.classList.contains('form__input')) {
      el.addEventListener('input', () => {
        validateField(el, controller);
      });
    }
  });

  signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const login = signInForm.querySelector('[name="login"]');
    const password = signInForm.querySelector('[name="password"]');
    const registeredUsers = controller.users._registeredUsers;
    const userLogIn = registeredUsers.find(
      (user) => user.login === login.value
    );
    const errorMessage = document.querySelector('.signin-error');

    if (userLogIn) {
      if (userLogIn.password === password.value) {
        renderAsideSection(main);
        controller.setCurrentUser(userLogIn);
        window.localStorage.setItem('currentUser', JSON.stringify(userLogIn));
        controller.getFeed(itemsOnPageToRender);

        setEventOnNewTaskMobile(body);
        setListenerOnStatusGroupButtons();
        setEventOnFilters();
        setEventOnHeader();
        setEventOnNewTask();
      } else {
        errorMessage.classList.add('signin-error-open');
        errorMessage.innerText =
          'The password you entered is incorrect! Please try again.';
      }
    } else {
      errorMessage.classList.add('signin-error-open');
      errorMessage.innerText = 'User was not found!';
    }

    setTimeout(() => {
      errorMessage.classList.add('signin-error-close');
      errorMessage.classList.remove('signin-error-open');
      setTimeout(() => {
        errorMessage.classList.remove('signin-error-close');
      }, 1000);
    }, 2000);
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
    controller.getFeed(itemsOnPageToRender);
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
      controller.getFeed(itemsOnPageToRender);
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
  const userImage = document.querySelector('.user-main-image');
  const userImageInput = document.getElementById('userImageInput');
  const photo = document.querySelector('.user-main-image');
  userImage.src = controller.list.user.photo;
  container.classList.remove('container-main');
  main.classList.remove('main-page');
  main.classList.add('main-task');
  setEventOnHeader();
  const form = document.querySelector('.user-info-form');
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
  const { elements } = form;

  Array.from(elements).forEach((el) => {
    el.addEventListener('input', (e) => {
      if (
        e.target.classList.contains('user-info-form__name') ||
        e.target.classList.contains('user-info-form__password')
      ) {
        Array.from(elements).some(
          (element) => !validateField(element, controller)
        )
          ? saveChangesButton.setAttribute('disabled', true)
          : saveChangesButton.removeAttribute('disabled');
        validateField(el, controller);
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
      data.photo = e.target.src;
    }
  });

  if (userImageInput) {
    userImageInput.addEventListener('change', () => {
      const fileReader = new FileReader();
      const arrayFromimageInput = userImageInput.value.split('.');
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
      const promise = new Promise((res, rej) => {
        if (
          !imageFormats.includes(
            arrayFromimageInput[arrayFromimageInput.length - 1].toLowerCase()
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
          data.photo = photo.src;
        })
        .catch(() => {
          photo.src = controller.list.user.photo;
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
      : controller.list.user.userName;
    data.password = confirmPasswordInput.value
      ? confirmPasswordInput.value
      : controller.list.user.password;
    data.photo = userImage.src;

    controller.editUser(controller.list._user._id, data);
    controller.saveUsers();
    controller.setCurrentUser(
      controller.users._registeredUsers.find(
        (user) => user._id === controller.list._user._id
      )
    );
    window.localStorage.setItem(
      'currentUser',
      JSON.stringify(controller.list.user)
    );
    main.classList.remove('edit-mode');
    setEventOnUserPage();
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
    controller.getFeed(itemsOnPageToRender);
    setEventOnFilters();
    setEventOnNewTask();
    setEventOnNewTaskMobile(body);
    setListenerOnStatusGroupButtons();
  });
}

function setEventOnNewTask() {
  controller.showNewTask();

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
        elementsArray.some((element) => !validateField(element, controller)) ||
        !validateDescription(newTaskDescription) ||
        newTaskDescription.value === ''
          ? createTaskButton.setAttribute('disabled', true)
          : createTaskButton.removeAttribute('disabled');
        validateField(el, controller);
      });
    }
  });

  newTaskDescription.addEventListener('input', () => {
    !validateDescription(newTaskDescription) ||
    elementsArray.some((element) => !validateField(element, controller)) ||
    newTaskDescription.value === ''
      ? createTaskButton.setAttribute('disabled', true)
      : createTaskButton.removeAttribute('disabled');
    validateDescription(newTaskDescription);
  });

  taskAssignee.addEventListener('change', () => {
    const list = form.querySelector('[id="assignee-list"]');

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
      (user) => user._id === taskAssignee.getAttribute('userId')
    );
    task.status = taskStatus.value;
    task.priority = taskPriority.value;
    task.isPrivate = Boolean(Number(taskPrivacy.value));
    task.creator = controller.list._user;

    controller.addTask(task);
    controller.saveTasks();
    controller.getFeed(itemsOnPageToRender);
    form.reset();
    createTaskButton.setAttribute('disabled', true);
    setEventOnNewTaskMobile(body);
    setListenerOnStatusGroupButtons();
  });
}

setEventOnTaskCard();
setEventOnHeader();
setEventOnNewTask();
setEventOnFilters();
