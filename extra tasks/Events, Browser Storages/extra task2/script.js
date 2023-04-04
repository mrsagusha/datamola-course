const body = document.getElementById('body');

function createList(title, list) {
  const body = document.getElementById('body');
  const titleElement = document.createElement('h2');

  titleElement.innerText = title;
  body.prepend(titleElement);
  body.append(createListDOM(list));
}

function createListDOM(list) {
  const ul = document.createElement('ul');

  list.forEach((el) => {
    const li = document.createElement('li');

    if (!el.children) {
      li.innerText = el.value;
      ul.append(li);
    } else {
      const childUl = createListDOM(el.children);
      childUl.style.fontSize = '0.9em';
      li.innerText = el.value;
      ul.append(li);
      li.append(childUl);
    }
  });

  return ul;
}

createList('Main list', [
  {
    value: 'Пункт 1.',

    children: null,
  },

  {
    value: 'Пункт 2.',

    children: [
      {
        value: 'Подпункт 2.1.',

        children: null,
      },

      {
        value: 'Подпункт 2.2.',

        children: [
          {
            value: 'Подпункт 2.2.1.',

            children: null,
          },

          {
            value: 'Подпункт 2.2.2.',

            children: null,
          },
        ],
      },

      {
        value: 'Подпункт 2.3.',

        children: null,
      },
    ],
  },

  {
    value: 'Пункт 3.',

    children: null,
  },
]);

body.addEventListener('click', (e) => {
  if (e.target.tagName !== 'UL' && e.target.tagName !== 'BODY') {
    if (e.target.firstElementChild) {
      const child = e.target.firstElementChild;

      child.classList.contains('hidden')
        ? child.classList.remove('hidden')
        : child.classList.add('hidden');
    }
  }
});
