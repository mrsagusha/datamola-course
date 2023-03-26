function createCalendar(elem, year, month) {
  const container = document.getElementById(elem);
  const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
  const table = document.createElement('table');
  const tableWeekDays = document.createElement('tr');
  const date = new Date(year, month - 1);

  table.setAttribute('border', '1px');

  for (let i = 0; i < getDay(date); i++) {
    const td = document.createElement('td');
    td.setAttribute('align', 'center');
    table.append(td);
  }

  while (date.getMonth() === month - 1) {
    const td = document.createElement('td');
    td.innerText = date.getDate();
    td.setAttribute('align', 'center');
    table.append(td);

    if (getDay(date) % 7 === 6) {
      const tr = document.createElement('tr');
      table.append(tr);
    }

    date.setDate(date.getDate() + 1);
  }

  weekDays.forEach((day) => {
    const weekDay = document.createElement('th');
    weekDay.setAttribute('align', 'center');
    weekDay.innerText = day;
    tableWeekDays.append(weekDay);
  });

  table.prepend(tableWeekDays);
  container.append(table);
}

function getDay(date) {
  let day = date.getDay();
  if (day === 0) day = 7;
  return day - 1;
}

createCalendar('body', 2021, 2);
