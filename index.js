let tasksArray = [
  {
    id: '0',
    name: 'Lorem ipsum dolor sit amet.',
    description: 'Fusce sed leo vehicula, facilisis.',
    createdAt: new Date('2023-03-09T23:00:00'),
    assignee: 'Zehra Marta',
    status: 'To Do',
    priority: 'High',
    isPrivate: true,
    comments: [
      {
        id: '0',
        text: 'In non eros tortor. Maecenas et eleifend ex, porta varius libero. Nunc dictum lacus vitae.',
        createdAt: new Date('2023-03-09T23:12:00'),
        author: 'Madeleine Lakshman',
      },
    ],
  },
  {
    id: '1',
    name: 'Nullam velit ligula.',
    description: 'Aenean rhoncus, magna eget tincidunt sagittis, tellus odio.',
    createdAt: new Date('2023-03-10T13:02:00'),
    assignee: 'Vasu Irati',
    status: 'In Progress',
    priority: 'Medium',
    isPrivate: false,
    comments: [
      {
        id: '0',
        text: 'Nam fringilla laoreet purus vel posuere. Suspendisse a est finibus, tincidunt lectus.',
        createdAt: new Date('2023-03-01T08:09:00'),
        author: 'Madeleine Lakshman',
      },
    ],
  },
  {
    id: '2',
    name: 'Nam lobortis ante ut est.',
    description:
      'Quisque pellentesque, ante a egestas viverra, enim ex ultrices eros, vitae viverra risus nulla vitae.',
    createdAt: new Date('2023-03-08T23:00:00'),
    assignee: 'Ludolf Colm',
    status: 'Complete',
    priority: 'Low',
    isPrivate: false,
    comments: [],
  },
  {
    id: '3',
    name: 'Ut dictum arcu.',
    description:
      'Duis non ex varius leo aliquet elementum. Etiam egestas nibh tortor, vitae efficitur.',
    createdAt: new Date('2023-03-09T12:48:00'),
    assignee: 'Marie-Louise Mahavir',
    status: 'To Do',
    priority: 'High',
    isPrivate: false,
    comments: [
      {
        id: '0',
        text: 'Aliquam interdum elementum turpis ut eleifend. Donec placerat faucibus odio.',
        createdAt: new Date('2023-03-09T13:18:00'),
        author: 'Arnoud Matěj',
      },
      {
        id: '1',
        text: 'Nulla mollis et enim sit amet blandit. Duis rhoncus, quam eu commodo vestibulum, diam nisi molestie.',
        createdAt: new Date('2023-03-10T11:34:00'),
        author: 'Liana Sherif',
      },
    ],
  },
  {
    id: '4',
    name: 'Orci varius natoque penatibus et magnis dis.',
    description:
      'Cras in diam consequat, facilisis dolor tincidunt, scelerisque purus. Maecenas elementum lobortis sem et blandit. Suspendisse potenti.',
    createdAt: new Date('2023-03-12T14:53:00'),
    assignee: 'Pentti Theodoros',
    status: 'To Do',
    priority: 'High',
    isPrivate: false,
    comments: [
      {
        id: '0',
        text: 'Mauris vitae ornare tortor. Integer nibh est, fringilla sed molestie sed, porta sed ex. Nam convallis, erat.',
        createdAt: new Date('2023-03-12T15:02:00'),
        author: 'Rok Bartolomeo',
      },
      {
        id: '1',
        text: 'Aliquam consequat felis in sagittis ullamcorper. Nam consequat sollicitudin felis, at.',
        createdAt: new Date('2023-03-12T19:30:00'),
        author: 'Agafon Nisus',
      },
    ],
  },
  {
    id: '5',
    name: 'Nulla commodo cursus.',
    description:
      'Nullam varius elementum risus. Curabitur sem ex, dignissim sed enim eget, consequat aliquam sem.',
    createdAt: new Date('2023-03-11T12:23:00'),
    assignee: 'Oddrun Gobannos',
    status: 'To Do',
    priority: 'Low',
    isPrivate: true,
    comments: [
      {
        id: '0',
        text: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse.',
        createdAt: new Date('2023-03-11T13:16:00'),
        author: 'Melqart Orinthia',
      },
    ],
  },
  {
    id: '6',
    name: 'Mauris feugiat pulvinar purus id posuere. Nunc.',
    description:
      'Donec eu tristique quam. In turpis velit, posuere sit amet arcu sit amet, hendrerit ultrices elit. Integer.',
    createdAt: new Date('2023-03-12T11:45:00'),
    assignee: 'Keren-Happuch Bjǫrg',
    status: 'Complete',
    priority: 'Low',
    isPrivate: false,
    comments: [],
  },
  {
    id: '7',
    name: 'Mauris magna est, rhoncus sed.',
    description:
      'Vestibulum consequat congue interdum. Phasellus quis dui eros. Vivamus lobortis nec augue vel vehicula. Curabitur.',
    createdAt: new Date('2023-03-08T15:27:00'),
    assignee: 'Toygar Justin',
    status: 'In Progress',
    priority: 'Low',
    isPrivate: false,
    comments: [],
  },
  {
    id: '8',
    name: 'Nullam vehicula ullamcorper lacus, in.',
    description:
      'Proin lacus odio, luctus ac facilisis non, pellentesque a libero. Integer eget magna ligula. Fusce.',
    createdAt: new Date('2023-03-08T19:56:00'),
    assignee: 'Umukoro Faustina',
    status: 'In Progress',
    priority: 'High',
    isPrivate: false,
    comments: [],
  },
  {
    id: '9',
    name: 'Nullam vehicula ullamcorper lacus, in.',
    description:
      'Sed vitae nisl a orci dignissim mollis eu at orci. Vivamus eget.',
    createdAt: new Date('2023-03-16T11:54:00'),
    assignee: 'Chibuzo Hrōþigaizaz',
    status: 'Complete',
    priority: 'Medium',
    isPrivate: false,
    comments: [
      {
        id: '0',
        text: 'Pellentesque interdum placerat ex, quis congue tortor tempor vitae. Nunc interdum sodales.',
        createdAt: new Date('2023-03-16T15:23:00'),
        author: 'Salil Zosime',
      },
      {
        id: '1',
        text: 'Vestibulum varius magna quis nisl porta, in fermentum ante hendrerit.',
        createdAt: new Date('2023-03-17T09:12:00'),
        author: 'Thekla Julius',
      },
      {
        id: '2',
        text: 'Fusce id magna hendrerit, cursus odio id, fermentum mi. Curabitur fermentum tincidunt neque, id sagittis felis malesuada.',
        createdAt: new Date('2023-03-18T15:37:00'),
        author: 'Louisette Bakari',
      },
    ],
  },
  {
    id: '10',
    name: 'Curabitur commodo suscipit tellus.',
    description:
      'Quisque dictum, libero vitae pretium vestibulum, odio metus eleifend massa, eget laoreet risus leo.',
    createdAt: new Date('2023-03-29T12:24:00'),
    assignee: 'Tadhg Mahin',
    status: 'In Progress',
    priority: 'High',
    isPrivate: false,
    comments: [],
  },
  {
    id: '11',
    name: 'Lorem ipsum dolor sit amet.',
    description: 'Fusce sed leo vehicula, facilisis.',
    createdAt: new Date('2023-04-02T15:02:00'),
    assignee: 'Deepika Fiacre',
    status: 'To Do',
    priority: 'High',
    isPrivate: true,
    comments: [
      {
        id: '0',
        text: 'In non eros tortor. Maecenas et eleifend ex, porta varius libero. Nunc dictum lacus vitae.',
        createdAt: new Date('2023-04-02T17:12:00'),
        author: 'Gwawl Toma',
      },
    ],
  },
  {
    id: '12',
    name: 'Nullam velit ligula.',
    description: 'Aenean rhoncus, magna eget tincidunt sagittis, tellus odio.',
    createdAt: new Date('2023-04-06T11:43:00'),
    assignee: 'Barbara Ingríðr',
    status: 'In Progress',
    priority: 'Medium',
    isPrivate: false,
    comments: [
      {
        id: '0',
        text: 'Nam fringilla laoreet purus vel posuere. Suspendisse a est finibus, tincidunt lectus.',
        createdAt: new Date('2023-04-07T15:13:00'),
        author: 'Ioann Cibor',
      },
    ],
  },
  {
    id: '13',
    name: 'Nam lobortis ante ut est.',
    description:
      'Quisque pellentesque, ante a egestas viverra, enim ex ultrices eros, vitae viverra risus nulla vitae.',
    createdAt: new Date('2023-03-03T21:17:00'),
    assignee: 'Kostis Osvaldo',
    status: 'Complete',
    priority: 'Low',
    isPrivate: false,
    comments: [],
  },
  {
    id: '14',
    name: 'Ut dictum arcu.',
    description:
      'Duis non ex varius leo aliquet elementum. Etiam egestas nibh tortor, vitae efficitur.',
    createdAt: new Date('2023-03-01T15:42:00'),
    assignee: 'Nelda Rita',
    status: 'To Do',
    priority: 'High',
    isPrivate: false,
    comments: [
      {
        id: '0',
        text: 'Aliquam interdum elementum turpis ut eleifend. Donec placerat faucibus odio.',
        createdAt: new Date('2023-03-01T16:42:00'),
        author: 'Nirupama Ásbjörn',
      },
      {
        id: '1',
        text: 'Nulla mollis et enim sit amet blandit. Duis rhoncus, quam eu commodo vestibulum, diam nisi molestie.',
        createdAt: new Date('2023-03-01T17:12:00'),
        author: 'Florinus Damaris',
      },
    ],
  },
  {
    id: '15',
    name: 'Orci varius natoque penatibus et magnis dis.',
    description:
      'Cras in diam consequat, facilisis dolor tincidunt, scelerisque purus. Maecenas elementum lobortis sem et blandit. Suspendisse potenti.',
    createdAt: new Date('2023-04-11T15:09:00'),
    assignee: 'Eun-Young Oreste',
    status: 'To Do',
    priority: 'High',
    isPrivate: false,
    comments: [
      {
        id: '0',
        text: 'Mauris vitae ornare tortor. Integer nibh est, fringilla sed molestie sed, porta sed ex. Nam convallis, erat.',
        createdAt: new Date('2023-04-12T10:59:00'),
        author: 'Noora Tonatiuh',
      },
      {
        id: '1',
        text: 'Aliquam consequat felis in sagittis ullamcorper. Nam consequat sollicitudin felis, at.',
        createdAt: new Date('2023-04-12T12:43:00'),
        author: 'Ihsan Chaim',
      },
    ],
  },
  {
    id: '16',
    name: 'Nulla commodo cursus.',
    description:
      'Nullam varius elementum risus. Curabitur sem ex, dignissim sed enim eget, consequat aliquam sem.',
    createdAt: new Date('2023-04-15T23:52:00'),
    assignee: 'Devdas Demyan',
    status: 'To Do',
    priority: 'Low',
    isPrivate: true,
    comments: [
      {
        id: '0',
        text: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse.',
        createdAt: new Date('2023-04-16T23:46:00'),
        author: 'Kliment Ellen',
      },
    ],
  },
  {
    id: '17',
    name: 'Mauris feugiat pulvinar purus id posuere. Nunc.',
    description:
      'Donec eu tristique quam. In turpis velit, posuere sit amet arcu sit amet, hendrerit ultrices elit. Integer.',
    createdAt: new Date('2023-03-18T15:23:00'),
    assignee: 'Marius Silvan',
    status: 'Complete',
    priority: 'Low',
    isPrivate: false,
    comments: [],
  },
  {
    id: '18',
    name: 'Mauris magna est, rhoncus sed.',
    description:
      'Vestibulum consequat congue interdum. Phasellus quis dui eros. Vivamus lobortis nec augue vel vehicula. Curabitur.',
    createdAt: new Date('2023-04-15T13:31:00'),
    assignee: 'Gulnora Bijay',
    status: 'In Progress',
    priority: 'Low',
    isPrivate: false,
    comments: [],
  },
  {
    id: '19',
    name: 'Nullam vehicula ullamcorper lacus, in.',
    description:
      'Proin lacus odio, luctus ac facilisis non, pellentesque a libero. Integer eget magna ligula. Fusce.',
    createdAt: new Date('2023-03-12T20:02:00'),
    assignee: 'Ruy Gabinus',
    status: 'In Progress',
    priority: 'High',
    isPrivate: false,
    comments: [],
  },
  {
    id: '20',
    name: 'Nullam vehicula ullamcorper lacus, in.',
    description:
      'Sed vitae nisl a orci dignissim mollis eu at orci. Vivamus eget.',
    createdAt: new Date('2023-04-01T19:52:00'),
    assignee: 'Diodotus Isi',
    status: 'Complete',
    priority: 'Medium',
    isPrivate: false,
    comments: [
      {
        id: '0',
        text: 'Pellentesque interdum placerat ex, quis congue tortor tempor vitae. Nunc interdum sodales.',
        createdAt: new Date('2023-04-01T20:12:00'),
        author: 'Swathi Selahattin',
      },
      {
        id: '1',
        text: 'Vestibulum varius magna quis nisl porta, in fermentum ante hendrerit.',
        createdAt: new Date('2023-04-02T09:13:00'),
        author: 'Ethelbert Jake',
      },
      {
        id: '2',
        text: 'Fusce id magna hendrerit, cursus odio id, fermentum mi. Curabitur fermentum tincidunt neque, id sagittis felis malesuada.',
        createdAt: new Date('2023-04-03T10:48:00'),
        author: 'Wigbert Philippa',
      },
    ],
  },
];

const taskModule = (function () {
  let user = '';

  function getTask(id) {
    return tasksArray.find((task) => task.id === id);
  }

  function validateTask(task) {
    if (
      !task.id ||
      !task.name ||
      task.name.length > 100 ||
      !task.description ||
      task.description.length > 280 ||
      !task.assignee ||
      !task.status ||
      !task.priority ||
      !task.isPrivate
    )
      return false;
    return true;
  }

  function addTask(name, description, assignee, status, priority, isPrivate) {
    const task = {};

    task.id = `${parseInt(tasksArray[tasksArray.length - 1].id) + 1}`;
    task.name = name;
    task.description = description;
    task.createdAt = new Date();
    task.assignee = assignee;
    task.status = status;
    task.priority = priority;
    task.isPrivate = isPrivate;
    task.comments = [];

    if (!validateTask(task)) {
      return false;
    } else {
      tasksArray.push(task);
      return true;
    }
  }

  function removeTask(id) {
    if (getTask(id).assignee !== user) return false;

    tasksArray = tasksArray.filter((task) => task.id !== id);

    return tasksArray;
  }

  function validateComment(comment) {
    if (!comment.text || comment.text.length > 280 || !user) return false;

    return true;
  }

  function addComment(id, text) {
    const task = getTask(id);
    const comment = {};

    task.comments.length > 0
      ? (comment.id = `${
          parseInt(task.comments[task.comments.length - 1].id) + 1
        }`)
      : (comment.id = '0');
    comment.text = text;
    comment.createdAt = new Date();
    comment.author = user;

    if (!validateComment(comment)) {
      return false;
    } else {
      task.comments.push(comment);
      return true;
    }
  }

  function changeUser(usr) {
    user = usr;
  }

  return { getTask, changeUser, addComment, removeTask, validateTask, addTask };
})();
