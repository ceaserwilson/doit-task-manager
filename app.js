const form = document.getElementById("form");
const input = document.getElementById("input");
const tasksEl = document.getElementById("tasks");

const tasks = JSON.parse(localStorage.getItem("tasks"));

if (tasks) {
  tasks.forEach((task) => addTask(task));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  addTask();
});

function addTask(task) {
  let taskText = input.value;

  if (task) {
    taskText = task.text;
  }

  if (taskText) {
    const taskli = document.createElement("li");

    if (task && task.completed) {
      taskli.classList.add("completed");
    }

    taskli.innerText = taskText;

    taskli.addEventListener("click", () => {
      taskli.classList.toggle("completed");
      updateLS();
    });
    taskli.addEventListener("contextmenu", (e) => {
      e.preventDefault();

      taskli.remove();
      updateLS();
    });

    tasksEl.appendChild(taskli);
    input.value = "";

    updateLS();
  }
}

function updateLS() {
  const allTasks = document.querySelectorAll("li");

  const tasks = [];

  allTasks.forEach((task) => {
    tasks.push({
      text: task.innerText,
      completed: task.classList.contains("completed"),
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
