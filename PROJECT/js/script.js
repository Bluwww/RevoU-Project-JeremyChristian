var tasks = [];
var currentFilter = "all";

function addTask() {
  var taskInput = document.getElementById("taskInput");
  var dueDateInput = document.getElementById("dueDateInput");
  var taskText = taskInput.value.trim();
  var dueDate = dueDateInput.value;
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }
  var newTask = {
    id: Date.now(),
    text: taskText,
    dueDate: dueDate,
    status: "pending",
  };
  tasks.push(newTask);
  taskInput.value = "";
  dueDateInput.value = "";
  displayTasks();
}

function displayTasks() {
  var taskList = document.getElementById("taskList");
  var filteredTasks = [];
  for (var i = 0; i < tasks.length; i++) {
    if (currentFilter === "all") {
      filteredTasks.push(tasks[i]);
    } else if (currentFilter === tasks[i].status) {
      filteredTasks.push(tasks[i]);
    }
  }

  if (filteredTasks.length === 0) {
    var message =
      currentFilter === "all"
        ? "No tasks available. Add a new task to get started!"
        : "No " + currentFilter + " tasks found.";
    taskList.innerHTML =
      '<tr><td colspan="4" class="no-task">' + message + "</td></tr>";
    return;
  }

  var html = "";
  for (var i = 0; i < filteredTasks.length; i++) {
    var task = filteredTasks[i];
    var dueDateText = task.dueDate ? task.dueDate : "No due date";
    var statusClass = task.status === "completed" ? "completed" : "pending";
    var statusText = task.status === "completed" ? "Completed" : "Pending";

    html += "<tr>";
    html += "<td>" + task.text + "</td>";
    html += "<td>" + dueDateText + "</td>";
    html +=
      '<td><span class="status ' +
      statusClass +
      '">' +
      statusText +
      "</span></td>";
    html += "<td>";

    if (task.status === "pending") {
      html +=
        '<button class="action-btn complete-btn" onclick="completeTask(' +
        task.id +
        ')">✓ Complete</button>';
    }

    html +=
      '<button class="action-btn delete-btn" onclick="deleteTask(' +
      task.id +
      ')">✗ Delete</button>';
    html += "</td>";
    html += "</tr>";
  }

  taskList.innerHTML = html;
}

function completeTask(id) {
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks[i].status = "completed";
      break;
    }
  }
  displayTasks();
}

function deleteTask(id) {
  if (confirm("Are you sure you want to delete this task?")) {
    var newTasks = [];
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id !== id) {
        newTasks.push(tasks[i]);
      }
    }
    tasks = newTasks;
    displayTasks();
  }
}

function filterTasks(filter) {
  currentFilter = filter;
  var buttons = document.querySelectorAll(".filter-buttons button");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active");
  }
  if (filter === "all") {
    buttons[0].classList.add("active");
  } else if (filter === "pending") {
    buttons[1].classList.add("active");
  } else if (filter === "completed") {
    buttons[2].classList.add("active");
  }

  displayTasks();
}

function deleteAllTasks() {
  if (tasks.length === 0) {
    alert("No tasks to delete!");
    return;
  }

  if (
    confirm(
      "Are you sure you want to delete ALL tasks? This action cannot be undone!"
    )
  ) {
    tasks = [];
    displayTasks();
  }
}

document.getElementById("taskInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});
displayTasks();
