let stop = false;
const arrData = document.querySelectorAll('[data-num]');
const newGameButton = document.querySelector('.start-new-game-btn');
const alert = document.querySelector('.alert');
let step = 0;
let arr = [null, null, null, null, null, null, null, null, null];
const concat = (a, b, c) => {
  let result = arr[a] + arr[b] + arr[c];

  if (result === 'xxx' || result === 'ooo') {
    return result;
  }

  switch (result) {
    case 'xxnull':
      return ['x', c];

    case 'xnullx':
      return ['x', b];

    case 'nullxx':
      return ['x', a];

    case 'oonull':
      return ['o', c];

    case 'onullo':
      return ['o', b];

    case 'nulloo':
      return ['o', a];
  }
};

const changeColorAndStop = (a, b, c) => {
  arrData[a].style.color = 'red';
  arrData[b].style.color = 'red';
  arrData[c].style.color = 'red';

  stop = true;
};

const checkDraw = () => {
  if (step === 5 && !stop) {
    alert.innerHTML = 'Draw!';
    alert.classList.add('alert-open');
    newGameButton.classList.add('active');
  }
};

const checkWin = () => {
  for (let i = 0; i < 3; i++) {
    const result = concat(i, i + 3, i + 6);

    if (result === 'xxx') {
      changeColorAndStop(i, i + 3, i + 6);
      alert.innerHTML = 'You win!';
      alert.classList.add('alert-open');
      newGameButton.classList.add('active');
    } else if (result === 'ooo') {
      changeColorAndStop(i, i + 3, i + 6);
      alert.innerHTML = 'Computer win!';
      alert.classList.add('alert-open');
      newGameButton.classList.add('active');
    }
  }

  for (let i = 0; i <= 6; i += 3) {
    const result = concat(i, i + 1, i + 2);

    if (result === 'xxx') {
      changeColorAndStop(i, i + 1, i + 2);
      alert.innerHTML = 'You win!';
      alert.classList.add('alert-open');
      newGameButton.classList.add('active');
    } else if (result === 'ooo') {
      changeColorAndStop(i, i + 1, i + 2);
      alert.innerHTML = 'Computer win!';
      alert.classList.add('alert-open');
      newGameButton.classList.add('active');
    }
  }

  result = concat(0, 4, 8);

  if (result === 'xxx' || result === 'ooo') {
    changeColorAndStop(0, 4, 8);
    alert.innerHTML = 'You win!';
    alert.classList.add('alert-open');
    newGameButton.classList.add('active');
  } else if (result === 'ooo') {
    changeColorAndStop(0, 4, 8);
    alert.innerHTML = 'Computer win!';
    alert.classList.add('alert-open');
    newGameButton.classList.add('active');
  }

  result = concat(2, 4, 6);

  if (result === 'xxx' || result === 'ooo') {
    changeColorAndStop(2, 4, 6);
    alert.innerHTML = 'You win!';
    alert.classList.add('alert-open');
    newGameButton.classList.add('active');
  } else if (result === 'ooo') {
    changeColorAndStop(2, 4, 6);
    alert.innerHTML = 'Computer win!';
    alert.classList.add('alert-open');
    newGameButton.classList.add('active');
  }
};

const bot = () => {
  for (let i = 0; i < 3; i++) {
    const result = concat(i, i + 3, i + 6);

    if (typeof result === 'object' && result[0] === 'o') {
      arrData[result[1]].innerHTML = 'o';
      arr[result[1]] = 'o';
      return;
    }
  }

  for (let i = 0; i <= 6; i += 3) {
    const result = concat(i, i + 1, i + 2);

    if (typeof result === 'object' && result[0] === 'o') {
      arrData[result[1]].innerHTML = 'o';
      arr[result[1]] = 'o';
      return;
    }
  }

  result = concat(0, 4, 8);

  if (typeof result === 'object' && result[0] === 'o') {
    arrData[result[1]].innerHTML = 'o';
    arr[result[1]] = 'o';
    return;
  }

  result = concat(2, 4, 6);

  if (typeof result === 'object' && result[0] === 'o') {
    arrData[result[1]].innerHTML = 'o';
    arr[result[1]] = 'o';
    return;
  }

  for (let i = 0; i < 3; i++) {
    const result = concat(i, i + 3, i + 6);

    if (typeof result === 'object' && result[0] === 'x') {
      arrData[result[1]].innerHTML = 'o';
      arr[result[1]] = 'o';
      return;
    }
  }

  for (let i = 0; i <= 6; i += 3) {
    const result = concat(i, i + 1, i + 2);

    if (typeof result === 'object' && result[0] === 'x') {
      arrData[result[1]].innerHTML = 'o';
      arr[result[1]] = 'o';
      return;
    }
  }

  result = concat(0, 4, 8);

  if (typeof result === 'object' && result[0] === 'x') {
    arrData[result[1]].innerHTML = 'o';
    arr[result[1]] = 'o';
    return;
  }

  result = concat(2, 4, 6);

  if (typeof result === 'object' && result[0] === 'x') {
    arrData[result[1]].innerHTML = 'o';
    arr[result[1]] = 'o';
    return;
  }

  const tempArr = [];

  for (let i = 0; i < 9; i++) {
    if (arr[i] === null) {
      tempArr.push(i);
    }
  }

  let randomIndexTempArr = Math.floor(Math.random() * tempArr.length);

  const randomNull = tempArr[randomIndexTempArr];

  arrData[randomNull].innerHTML = 'o';
  arr[randomNull] = 'o';
};

addEventListener('click', (e) => {
  if (stop === true) {
    newGameButton.classList.add('active');
    return;
  }
  if (e.target.className === 'cell' && e.target.textContent === '') {
    step += 1;
    console.log(step);
    e.target.style.color = 'blue';
    e.target.innerHTML = 'x';

    arr[e.target.dataset.num] = 'x';
  } else {
    return;
  }
  checkDraw();
  checkWin();

  if (stop === true) {
    newGameButton.classList.add('active');
    return;
  }

  bot();
  checkDraw();
  checkWin();
});

newGameButton.addEventListener('click', () => {
  arr = arr.map((el) => (el = null));
  arrData.forEach((el) => {
    el.innerHTML = '';
    el.style.removeProperty('color');
  });
  newGameButton.classList.remove('active');
  alert.classList.remove('alert-open');
  stop = false;
  step = 0;
});
