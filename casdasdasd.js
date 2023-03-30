if (filtersHead) {
  filtersHead.addEventListener('click', () => {
    filters.classList.toggle('open');
  });
}

if (taskNameInput) {
  filterConfig.name = taskNameInput.value;
  this.controller.getFeed(0, 40, filterConfig);
}

assigneeLabel.addEventListener('input', (e) => {
  if (e.target.className === 'assignee-input') {
    filterConfig.assignee = e.target.value;
  }
  this.controller.getFeed(0, 40, filterConfig);
});

statusLabel.addEventListener('change', (e) => {
  if (e.target.id === 'status-select') {
    filterConfig.status = e.target.value;
  }

  this.controller.getFeed(0, 40, filterConfig);
});

priorityLabel.addEventListener('change', (e) => {
  if (e.target.id === 'priority-select') {
    filterConfig.priority = e.target.value;
  }

  this.controller.getFeed(0, 40, filterConfig);
});

privacyLabel.addEventListener('change', (e) => {
  if (e.target.id === 'privacy-select') {
    filterConfig.isPrivate = Boolean(Number(e.target.value));
  }

  this.controller.getFeed(0, 40, filterConfig);
});

dateFromLabel.addEventListener('input', (e) => {
  if (
    e.target.className === 'filter-date' ||
    e.target.className === 'filter-time'
  ) {
    filterConfig.dateFrom = new Date(e.target.value);
    this.controller.getFeed(0, 40, filterConfig);
  }
});

dateToLabel.addEventListener('input', (e) => {
  if (
    e.target.className === 'filter-date' ||
    e.target.className === 'filter-time'
  ) {
    filterConfig.dateTo = new Date(e.target.value);
    this.controller.getFeed(0, 40, filterConfig);
  }
});
