let tasks = [
  {
    _id: '0',
    name: 'Lorem ipsum dolor sit amet.',
    description: 'Fusce sed leo vehicula, facilisis.',
    _createdAt: new Date('2023-03-09T23:00:00'),
    assignee: 'Zehra Marta',
    status: 'To Do',
    priority: 'High',
    isPrivate: true,
    comments: [
      {
        _id: '0',
        text: 'In non eros tortor. Maecenas et eleifend ex, porta varius libero. Nunc dictum lacus vitae.',
        _createdAt: new Date('2023-03-09T23:12:00'),
        _author: 'Madeleine Lakshman',
      },
    ],
  },
  {
    _id: '1',
    name: 'Nullam velit ligula.',
    description: 'Aenean rhoncus, magna eget tincidunt sagittis, tellus odio.',
    _createdAt: new Date('2023-03-10T13:02:00'),
    assignee: 'Vasu Irati',
    status: 'In Progress',
    priority: 'Medium',
    isPrivate: false,
    comments: [
      {
        _id: '0',
        text: 'Nam fringilla laoreet purus vel posuere. Suspendisse a est finibus, tincidunt lectus.',
        _createdAt: new Date('2023-03-01T08:09:00'),
        _author: 'Madeleine Lakshman',
      },
    ],
  },
  {
    _id: '2',
    name: 'Nam lobortis ante ut est.',
    description:
      'Quisque pellentesque, ante a egestas viverra, enim ex ultrices eros, vitae viverra risus nulla vitae.',
    _createdAt: new Date('2023-03-08T23:00:00'),
    assignee: 'Ludolf Colm',
    status: 'Complete',
    priority: 'Low',
    isPrivate: false,
    comments: [],
  },
  {
    _id: '3',
    name: 'Ut dictum arcu.',
    description:
      'Duis non ex varius leo aliquet elementum. Etiam egestas nibh tortor, vitae efficitur.',
    _createdAt: new Date('2023-03-09T12:48:00'),
    assignee: 'Marie-Louise Mahavir',
    status: 'To Do',
    priority: 'High',
    isPrivate: false,
    comments: [
      {
        _id: '0',
        text: 'Aliquam interdum elementum turpis ut eleifend. Donec placerat faucibus odio.',
        _createdAt: new Date('2023-03-09T13:18:00'),
        _author: 'Arnoud Matěj',
      },
      {
        _id: '1',
        text: 'Nulla mollis et enim sit amet blandit. Duis rhoncus, quam eu commodo vestibulum, diam nisi molestie.',
        _createdAt: new Date('2023-03-10T11:34:00'),
        _author: 'Liana Sherif',
      },
    ],
  },
  {
    _id: '4',
    name: 'Orci varius natoque penatibus et magnis dis.',
    description:
      'Cras in diam consequat, facilisis dolor tincidunt, scelerisque purus. Maecenas elementum lobortis sem et blandit. Suspendisse potenti.',
    _createdAt: new Date('2023-03-12T14:53:00'),
    assignee: 'Pentti Theodoros',
    status: 'To Do',
    priority: 'High',
    isPrivate: false,
    comments: [
      {
        _id: '0',
        text: 'Mauris vitae ornare tortor. Integer nibh est, fringilla sed molestie sed, porta sed ex. Nam convallis, erat.',
        _createdAt: new Date('2023-03-12T15:02:00'),
        _author: 'Rok Bartolomeo',
      },
      {
        _id: '1',
        text: 'Aliquam consequat felis in sagittis ullamcorper. Nam consequat sollicitudin felis, at.',
        _createdAt: new Date('2023-03-12T19:30:00'),
        _author: 'Agafon Nisus',
      },
    ],
  },
  {
    _id: '5',
    name: 'Nulla commodo cursus.',
    description:
      'Nullam varius elementum risus. Curabitur sem ex, dignissim sed enim eget, consequat aliquam sem.',
    _createdAt: new Date('2023-03-11T12:23:00'),
    assignee: 'Oddrun Gobannos',
    status: 'To Do',
    priority: 'Low',
    isPrivate: true,
    comments: [
      {
        _id: '0',
        text: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse.',
        _createdAt: new Date('2023-03-11T13:16:00'),
        _author: 'Melqart Orinthia',
      },
    ],
  },
  {
    _id: '6',
    name: 'Mauris feugiat pulvinar purus id posuere. Nunc.',
    description:
      'Donec eu tristique quam. In turpis velit, posuere sit amet arcu sit amet, hendrerit ultrices elit. Integer.',
    _createdAt: new Date('2023-03-12T11:45:00'),
    assignee: 'Keren-Happuch Bjǫrg',
    status: 'Complete',
    priority: 'Low',
    isPrivate: false,
    comments: [],
  },
  {
    _id: '7',
    name: 'Mauris magna est, rhoncus sed.',
    description:
      'Vestibulum consequat congue interdum. Phasellus quis dui eros. Vivamus lobortis nec augue vel vehicula. Curabitur.',
    _createdAt: new Date('2023-03-08T15:27:00'),
    assignee: 'Toygar Justin',
    status: 'In Progress',
    priority: 'Low',
    isPrivate: false,
    comments: [],
  },
  {
    _id: '8',
    name: 'Nullam vehicula ullamcorper lacus, in.',
    description:
      'Proin lacus odio, luctus ac facilisis non, pellentesque a libero. Integer eget magna ligula. Fusce.',
    _createdAt: new Date('2023-03-08T19:56:00'),
    assignee: 'Umukoro Faustina',
    status: 'In Progress',
    priority: 'High',
    isPrivate: false,
    comments: [],
  },
  {
    _id: '9',
    name: 'Nullam vehicula ullamcorper lacus, in.',
    description:
      'Sed vitae nisl a orci dignissim mollis eu at orci. Vivamus eget.',
    _createdAt: new Date('2023-03-16T11:54:00'),
    assignee: 'Chibuzo Hrōþigaizaz',
    status: 'Complete',
    priority: 'Medium',
    isPrivate: false,
    comments: [
      {
        _id: '0',
        text: 'Pellentesque interdum placerat ex, quis congue tortor tempor vitae. Nunc interdum sodales.',
        _createdAt: new Date('2023-03-16T15:23:00'),
        _author: 'Salil Zosime',
      },
      {
        _id: '1',
        text: 'Vestibulum varius magna quis nisl porta, in fermentum ante hendrerit.',
        _createdAt: new Date('2023-03-17T09:12:00'),
        _author: 'Thekla Julius',
      },
      {
        _id: '2',
        text: 'Fusce id magna hendrerit, cursus odio id, fermentum mi. Curabitur fermentum tincidunt neque, id sagittis felis malesuada.',
        _createdAt: new Date('2023-03-18T15:37:00'),
        _author: 'Louisette Bakari',
      },
    ],
  },
  {
    _id: '10',
    name: 'Curabitur commodo suscipit tellus.',
    description:
      'Quisque dictum, libero vitae pretium vestibulum, odio metus eleifend massa, eget laoreet risus leo.',
    _createdAt: new Date('2023-03-29T12:24:00'),
    assignee: 'Tadhg Mahin',
    status: 'In Progress',
    priority: 'High',
    isPrivate: false,
    comments: [],
  },
  {
    _id: '11',
    name: 'Lorem ipsum dolor sit amet.',
    description: 'Fusce sed leo vehicula, facilisis.',
    _createdAt: new Date('2023-04-02T15:02:00'),
    assignee: 'Deepika Fiacre',
    status: 'To Do',
    priority: 'High',
    isPrivate: true,
    comments: [
      {
        _id: '0',
        text: 'In non eros tortor. Maecenas et eleifend ex, porta varius libero. Nunc dictum lacus vitae.',
        _createdAt: new Date('2023-04-02T17:12:00'),
        _author: 'Gwawl Toma',
      },
    ],
  },
  {
    _id: '12',
    name: 'Nullam velit ligula.',
    description: 'Aenean rhoncus, magna eget tincidunt sagittis, tellus odio.',
    _createdAt: new Date('2023-04-06T11:43:00'),
    assignee: 'Barbara Ingríðr',
    status: 'In Progress',
    priority: 'Medium',
    isPrivate: false,
    comments: [
      {
        _id: '0',
        text: 'Nam fringilla laoreet purus vel posuere. Suspendisse a est finibus, tincidunt lectus.',
        _createdAt: new Date('2023-04-07T15:13:00'),
        _author: 'Ioann Cibor',
      },
    ],
  },
  {
    _id: '13',
    name: 'Nam lobortis ante ut est.',
    description:
      'Quisque pellentesque, ante a egestas viverra, enim ex ultrices eros, vitae viverra risus nulla vitae.',
    _createdAt: new Date('2023-03-03T21:17:00'),
    assignee: 'Kostis Osvaldo',
    status: 'Complete',
    priority: 'Low',
    isPrivate: false,
    comments: [],
  },
  {
    _id: '14',
    name: 'Ut dictum arcu.',
    description:
      'Duis non ex varius leo aliquet elementum. Etiam egestas nibh tortor, vitae efficitur.',
    _createdAt: new Date('2023-03-01T15:42:00'),
    assignee: 'Nelda Rita',
    status: 'To Do',
    priority: 'High',
    isPrivate: false,
    comments: [
      {
        _id: '0',
        text: 'Aliquam interdum elementum turpis ut eleifend. Donec placerat faucibus odio.',
        _createdAt: new Date('2023-03-01T16:42:00'),
        _author: 'Nirupama Ásbjörn',
      },
      {
        _id: '1',
        text: 'Nulla mollis et enim sit amet blandit. Duis rhoncus, quam eu commodo vestibulum, diam nisi molestie.',
        _createdAt: new Date('2023-03-01T17:12:00'),
        _author: 'Florinus Damaris',
      },
    ],
  },
  {
    _id: '15',
    name: 'Orci varius natoque penatibus et magnis dis.',
    description:
      'Cras in diam consequat, facilisis dolor tincidunt, scelerisque purus. Maecenas elementum lobortis sem et blandit. Suspendisse potenti.',
    _createdAt: new Date('2023-04-11T15:09:00'),
    assignee: 'Eun-Young Oreste',
    status: 'To Do',
    priority: 'High',
    isPrivate: false,
    comments: [
      {
        _id: '0',
        text: 'Mauris vitae ornare tortor. Integer nibh est, fringilla sed molestie sed, porta sed ex. Nam convallis, erat.',
        _createdAt: new Date('2023-04-12T10:59:00'),
        _author: 'Noora Tonatiuh',
      },
      {
        _id: '1',
        text: 'Aliquam consequat felis in sagittis ullamcorper. Nam consequat sollicitudin felis, at.',
        _createdAt: new Date('2023-04-12T12:43:00'),
        _author: 'Ihsan Chaim',
      },
    ],
  },
  {
    _id: '16',
    name: 'Nulla commodo cursus.',
    description:
      'Nullam varius elementum risus. Curabitur sem ex, dignissim sed enim eget, consequat aliquam sem.',
    _createdAt: new Date('2023-04-15T23:52:00'),
    assignee: 'Devdas Demyan',
    status: 'To Do',
    priority: 'Low',
    isPrivate: true,
    comments: [
      {
        _id: '0',
        text: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse.',
        _createdAt: new Date('2023-04-16T23:46:00'),
        _author: 'Kliment Ellen',
      },
    ],
  },
  {
    _id: '17',
    name: 'Mauris feugiat pulvinar purus id posuere. Nunc.',
    description:
      'Donec eu tristique quam. In turpis velit, posuere sit amet arcu sit amet, hendrerit ultrices elit. Integer.',
    _createdAt: new Date('2023-03-18T15:23:00'),
    assignee: 'Marius Silvan',
    status: 'Complete',
    priority: 'Low',
    isPrivate: false,
    comments: [],
  },
  {
    _id: '18',
    name: 'Mauris magna est, rhoncus sed.',
    description:
      'Vestibulum consequat congue interdum. Phasellus quis dui eros. Vivamus lobortis nec augue vel vehicula. Curabitur.',
    _createdAt: new Date('2023-04-15T13:31:00'),
    assignee: 'Gulnora Bijay',
    status: 'In Progress',
    priority: 'Low',
    isPrivate: false,
    comments: [],
  },
  {
    _id: '19',
    name: 'Nullam vehicula ullamcorper lacus, in.',
    description:
      'Proin lacus odio, luctus ac facilisis non, pellentesque a libero. Integer eget magna ligula. Fusce.',
    _createdAt: new Date('2023-03-12T20:02:00'),
    assignee: 'Ruy Gabinus',
    status: 'In Progress',
    priority: 'High',
    isPrivate: false,
    comments: [],
  },
  {
    _id: '20',
    name: 'Nullam vehicula ullamcorper lacus, in.',
    description:
      'Sed vitae nisl a orci dignissim mollis eu at orci. Vivamus eget.',
    _createdAt: new Date('2023-04-01T19:52:00'),
    assignee: 'Diodotus Isi',
    status: 'Complete',
    priority: 'Medium',
    isPrivate: false,
    comments: [
      {
        _id: '0',
        text: 'Pellentesque interdum placerat ex, quis congue tortor tempor vitae. Nunc interdum sodales.',
        _createdAt: new Date('2023-04-01T20:12:00'),
        _author: 'Swathi Selahattin',
      },
      {
        _id: '1',
        text: 'Vestibulum varius magna quis nisl porta, in fermentum ante hendrerit.',
        _createdAt: new Date('2023-04-02T09:13:00'),
        _author: 'Ethelbert Jake',
      },
      {
        _id: '2',
        text: 'Fusce id magna hendrerit, cursus odio id, fermentum mi. Curabitur fermentum tincidunt neque, id sagittis felis malesuada.',
        _createdAt: new Date('2023-04-03T10:48:00'),
        _author: 'Wigbert Philippa',
      },
    ],
  },
];

class Task {
  constructor(name, description, assignee, status, priority, isPrivate) {
    this._id = Date.now().toString();
    this.name = name;
    this.description = description;
    this._createdAt = new Date();
    this.assignee = assignee;
    this.status = status;
    this.priority = priority;
    this.isPrivate = isPrivate;
    this.comments = [];
  }

  get id() {
    return this._id;
  }

  get createdAt() {
    return this._createdAt;
  }

  get user() {
    return this._user;
  }

  set user(newUser) {
    this._user = newUser;
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
        !task.assignee ||
        typeof task.assignee !== 'string' ||
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
      comment.text.length > 280 ||
      !comment.author ||
      typeof comment.author !== 'string'
    ) {
      return false;
    }

    return true;
  }
}

class TasksCollection {
  constructor(tasks) {
    this._tasks = tasks;
  }

  _user = '';

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

  getPage(skip = 0, top = 10, filterConfig) {
    let taskCopy = this._tasks;

    if (filterConfig) {
      taskCopy = taskCopy
        .filter((task) => {
          return filterConfig.hasOwnProperty('assignee')
            ? task.assignee
                .toLowerCase()
                .includes(filterConfig.assignee.toLowerCase())
            : task;
        })
        .filter((task) => {
          return filterConfig.hasOwnProperty('dateFrom')
            ? task._createdAt >= filterConfig.dateFrom
            : task;
        })
        .filter((task) => {
          return filterConfig.hasOwnProperty('dateTo')
            ? task._createdAt <= filterConfig.dateTo
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
          return filterConfig.hasOwnProperty('description')
            ? task.description
                .toLowerCase()
                .includes(filterConfig.description.toLowerCase())
            : task;
        });
    }

    return taskCopy
      .slice(skip, skip + top)
      .sort((a, b) => b._createdAt - a._createdAt);
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
      isPrivate
    );

    if (!Task.validateTask(newTask)) {
      return false;
    }

    this._tasks.push(newTask);
    return true;
  }

  edit(id, name, description, assignee, status, priority, isPrivate = false) {
    if (arguments.length === 0 || this.get(id).assignee !== this._user) {
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
    if (!this.get(id) || !id || this.get(id).assignee !== this._user) {
      return false;
    }

    this._tasks = this._tasks.filter((task) => task._id !== id);

    return true;
  }

  addComment(id, text) {
    const task = this.get(id);
    const comment = new Comment(text, this._user);

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
    let isUser = user === list._user;

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
              <p class="user-profile__user-name">${user ? user : 'Guest'}</p>
              ${
                isUser
                  ? '<img class="user-image" src="./assets/User_main.png" alt="user"></img>'
                  : ''
              }
          </div>
          ${
            isUser
              ? `<button class="button button__logout">LOGOUT<i class="fa-solid fa-arrow-right-from-bracket"></i></button>`
              : `<button class="button button__signin">SIGN IN</button>`
          }
      </div>
      <div class="burger-menu"></div>
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
    const loadMoreButton = document.querySelector('.load-more');
    const tasksFeedContainer = document.getElementById(this._id);
    const tasksFeed = document.createElement('div');
    tasksFeed.classList.add('article__tasks-wrapper');
    const toDoGroup = createSection('to-do-group');
    const inProgressGroup = createSection('in-progress-group');
    const completeGroup = createSection('complete-group');

    if (loadMoreButton) {
      if (
        loadMoreButton.previousElementSibling.className ===
        'article__tasks-wrapper'
      ) {
        loadMoreButton.previousElementSibling.remove();
      }
    }

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

    tasksFeed.append(toDoGroup);
    tasksFeed.append(inProgressGroup);
    tasksFeed.append(completeGroup);

    tasks.forEach((task) => {
      const newTask = document.createElement('div');
      newTask.classList.add('card');
      newTask.innerHTML = `
      <i class="fa-solid fa-ellipsis-vertical ${
        list._user === task.assignee ? '' : 'forbidden'
      }"></i>
      <div class="card__main-info">
          <div class="card__task-info">
              <div class="card__task-name-wrapper">
                <p class="card__task-name">${task.name}</p>
                <p class="card__privacy card__privacy-laptop">${
                  task.isPrivate ? 'Private' : 'Public'
                }</p>
              </div>
              <div class="card__task-assignee-wrapper">
                  <i class="fa-solid fa-user"></i>
                  <p  class="card__task-assignee">${task.assignee}</p>
              </div>
              <p class="card__task-description">${task.description} </p>
          </div>
          <div class="card__status-info">
              <p class="card__privacy">${
                task.isPrivate ? 'Private' : 'Public'
              }</p>
              <p class="card__status ${task.status
                .split(' ')
                .join('-')
                .toLowerCase()}">${task.status}</p>
              <p class="card__priority ${task.priority.toLowerCase()}">${
        task.priority
      }</p>
          </div>
      </div>
      <div class="card__footer">
          <i class="fa-regular fa-message">
          ${
            task.comments.length > 0
              ? `<span class="message-quantity">
                ${task.comments.length}
              </span>`
              : ''
          }                             
          </i>
          <i class="fa-solid fa-paperclip">
              <span class="attachments-quantity">3</span>
          </i>
          <div class="task-date-wrapper">
              <time class="card__date">${
                ('0' + new Date(task._createdAt).getDate()).slice(-2) +
                '.' +
                ('0' + (new Date(task._createdAt).getMonth() + 1)).slice(-2) +
                '.' +
                new Date(task._createdAt).getFullYear()
              }</time>
              <time class="card__date">
                ${
                  new Date(task._createdAt).getHours() +
                  ':' +
                  (String(new Date(task._createdAt).getMinutes()).length === 1
                    ? '0' + new Date(task._createdAt).getMinutes()
                    : new Date(task._createdAt).getMinutes())
                }
              </time>
          </div>
      </div>
      `;

      if (task.status === 'To Do') {
        toDoGroup.lastElementChild.append(newTask);
      }

      if (task.status === 'In Progress') {
        inProgressGroup.lastElementChild.append(newTask);
      }

      if (task.status === 'Complete') {
        completeGroup.lastElementChild.append(newTask);
      }
    });

    if (loadMoreButton) {
      loadMoreButton.insertAdjacentElement('beforebegin', tasksFeed);
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

  display(tasks) {
    const filters = document.getElementById('filters');
    if (filters) {
      filters.classList.toggle('open');
    }
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
    <input class="assignee-input" id="assignee-input" type="text" autocomplete="off" list="assignee-list" >
        <datalist id="assignee-list">
            ${tasks
              .map((task) => {
                return `
                <option value='${task.assignee}'></option>
              `;
              })
              .join('')}
        </datalist>
    `;

    priorityLabel.innerHTML = `
    Priority
    <select name="priority" id="priority-select">
        <option value="2">Low</option>
        <option value="1">Medium</option>
        <option value="0">High</option>
    </select>
    `;

    privacyLabel.innerHTML = `
    Privacy
    <select name="privacy" id="privacy-select">
        <option value="1">Public</option>
        <option value="0">Private</option>
    </select>
    `;

    statusLabel.innerHTML = `
    Status
    <select name="status" id="status-select">
        <option value="2">To Do</option>
        <option value="1">In Progress</option>
        <option value="0">Complete</option>
    </select>
    `;

    dateFromLabel.innerHTML = `
    Date from
    <div class="filter-date-container">
        <input class="filter-date" type="date"></input>
        <input class="filter-time" type="time"></input>
    </div>
    `;

    dateToLabel.innerHTML = `
    Date to
    <div class="filter-date-container">
        <input class="filter-date" type="date"></input>
        <input class="filter-time" type="time"></input>
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
    const taskWrapper = document.getElementById(this._id);
    const task = tasks.find((task) => task._id === String(id));
    if (taskWrapper) {
      taskWrapper.innerHTML = `
      <div class="task-head">
          <button class="return-to-main-button">
              <i class="fa-solid fa-arrow-left"></i>
                  Return to the main page
          </button>
          <div class="task-date-wrapper">
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
          <h1 class="task-top__task-name">${task.name}</h1>
          <div class="task-top__buttons-section">
              <button class="button edit ${
                list._user === task.assignee ? '' : 'disabled'
              }">EDIT TASK</button>
              <button class="button edit edit-mobile ${
                list._user === task.assignee ? '' : 'disabled'
              }">EDIT</button>
              <button class="button delete ${
                list._user === task.assignee ? '' : 'disabled'
              }">DELETE TASK</button>
              <button class="button delete delete-mobile ${
                list._user === task.assignee ? '' : 'disabled'
              }">DELETE</button>
          </div>
      </div>
      <div class="task-main">
          <div class="task-details">
              <div class="task-assignee-wrapper">
                  <i class="fa-solid fa-user user-task-page"></i>
                  <p class="task-assignee">${task.assignee}</p>
              </div>
              <p class="task-privace"><span class="privacy-span">privacy:</span> ${
                task.isPrivate ? 'Private' : 'Public'
              }</p>
              <p class="task-description-text">${task.description}</p>
              <div class="task-status-wrapper">
                  <p class="task-status ${task.status
                    .toLowerCase()
                    .split(' ')
                    .join('')}-task">${task.status}</p>
                  <p class="task-priority ${task.priority.toLowerCase()}-task">${
        task.priority
      }</p>
              </div>
              <div class="task-attachments-wrapper">
                  <div class="task-attachment-title-wrapper">
                      <i class="fa-solid fa-paperclip"></i>
                      <p class="task-attachments-title">Attachments:</p>
                  </div>
                  <div class="task-attachments">
                      <img class="task-attachment-image" src="./assets/attachment 1.png" alt="attachment">
                  <img class="task-attachment-image" src="./assets/attachment 2.png" alt="attachment">
                  </div>
              </div>
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
              <p class="task-comments__title">New comment</p>
              <div class="task-comments__new-comment-wrapper">
                  <textarea class="task-comments__new-comment" name="" id="" cols="30" rows="10"></textarea>
                  <button class="button new-task-button">
                      <i class="fa-solid fa-plus new-task-plus"></i>
                  </button>
              </div>
          </div>
      </div>`;
    }
  }
}

function setCurrentUser(user) {
  list.changeUser(user);
  header.display(user);
}

function getFeed(skip, top, filterConfig) {
  const arr = list.getPage(skip, top, filterConfig);

  taskFeed.display(arr);
}

function addTask(task) {
  list.add(
    task.name,
    task.description,
    task.assignee,
    task.status,
    task.priority,
    task.isPrivate
  );
  getFeed(0, list._tasks.length);
}

function editTask(id, task) {
  list.edit(
    String(id),
    task.name,
    task.description,
    task.assignee,
    task.status,
    task.priority,
    task.isPrivate
  );
  getFeed(0, list._tasks.length);
}

function removeTask(id) {
  list.remove(String(id));
  getFeed(0, list._tasks.length);
}

const list = new TasksCollection(tasks);
const taskFeed = new TaskFeedView('article');
const header = new HeaderView('header');
const task = new TaskView('taskWrapper');
const filters = new FilterView('filtersWrapper');
filters.display(list._tasks);
setCurrentUser('Chibuzo Hrōþigaizaz');
// document.addEventListener('click', () => {
//   filters.display(list._tasks);
// });

addTask(
  new Task(
    'Create new task',
    'Create my first task',
    'Aleksandr Golubovskiy',
    'In Progress',
    'Medium',
    true
  )
);
task.display(list._tasks, 9);
