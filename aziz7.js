let task = [];

function addTask() {
  const taskInput = document.getElementById(`taskInput`);
  const taskText = taskInput.value;

  if (taskText.trim() === ``) {
    alert(`You have to write someting!!!!`);
    return;
  }
  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };
  task.push(newTask);
  taskInput.value = ``;
  renderTask();
}

function toggleTask(id) {
  for (let task of task) {
    if (task.id === id) {
      task.completed = !task.completed;
      break;
    }
  }
  renderTask();
}
function deleteTask(id) {
  task = task.filter((task) => task.id !== id);
  renderTask();
}

function renderTask() {
  const taskList = document.getElementById(`taskList`);
  const emptyMessage = document.getElementById(`emptyMessage`);

  taskList.innerHTML = ``;
  task.forEach((task) => {
    const li = document.createElement(`li`);

    if (task.completed) {
      li.classList.add(`completed`);
    }
    li.innerHTML = `
    <span class="task-text" onclick="toogleTask(${task.id})">
    ${task.text}
    </span>
    <button class ="delete-btn" onclick="deleteTask(${task.id})">
    Delete
    </button>
    `;

    taskList.appendChild(li);
  });

  if (task.length === 0) {
    emptyMessage.style.display = `block`;
  } else {
    emptyMessage.style.display = `none`;
  }
  updateStats();
}
function updateStats() {
  const total = task.length;
  const completed = task.filter((task) => task.completed).length;
  const remaining = total - completed;

  document.getElementById(`totalTasks`).textContent = total;
  document.getElementById(`completTasks`).textContent = completed;
  document.getElementById(`remainingTasks`).textContent = remaining;
}

function handleKeyPress(event) {
  if (event.key === `Enter`) {
    addTask();
  }
}
renderTask();
