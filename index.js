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
        author: 'Liana Sherif',
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
    this._createdAT = new Date();
    this.assignee = assignee;
    this.status = status;
    this.priority = priority;
    this.isPrivate = isPrivate;
    this.comments = [];
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get createdAt() {
    return this._createdAt;
  }

  set createdAt(value) {
    this._createdAT = value;
  }

  get user() {
    return this._user;
  }

  set user(newUser) {
    this._user = newUser;
  }

  static _validateTask(task) {
    if (task) {
      if (
        !task._id ||
        typeof task._id !== 'string' ||
        !task.name ||
        typeof task.name !== 'string' ||
        task.name.length > 100 ||
        !task.description ||
        typeof task.description !== 'string' ||
        task.description.length > 280 ||
        !task.assignee ||
        typeof task.assignee !== 'string' ||
        !task.status ||
        typeof task.status !== 'string' ||
        (task.status !== 'To Do' &&
          task.status !== 'In Progress' &&
          task.status !== 'Complete') ||
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
    this._createdAT = new Date();
    this._author = user;
  }

  get id() {
    return this._id;
  }

  get createdAT() {
    return this._createdAT;
  }

  get author() {
    return this._author;
  }

  static _validateComment(comment) {
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

  _user = 'Vasu Irati';

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
    let slicedArray = this._tasks.slice(skip, skip + top);

    if (filterConfig) {
      slicedArray = slicedArray
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

    return slicedArray.sort((a, b) => b._createdAt - a._createdAt);
  }

  get(id) {
    return this._tasks.find((task) => task._id === id);
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

    if (!Task._validateTask(newTask)) {
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

    if (!Task._validateTask(editTask)) {
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

    if (!Comment._validateComment(comment) || !task) {
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
      Task._validateTask(task)
        ? this._tasks.push(task)
        : notValideTasksList.push(task);
    });

    return notValideTasksList;
  }

  clear() {
    this._tasks = [];
  }
}

const list = new TasksCollection(tasks);

console.log(
  list.getPage(0, 20, {
    assignee: '',
    isPrivate: false,
    status: 'to do',
  })
);
