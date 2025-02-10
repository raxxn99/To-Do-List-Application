let tasks = [];

const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskList = document.getElementById("taskList");

function renderTasks() {
  taskList.innerHTML = ""; // Clear the list

  if (tasks.length === 0) {
    taskList.innerHTML = '<li class="no-tasks">No tasks added</li>';
  } else {
    tasks.forEach((task, index) => {
      const taskItem = document.createElement("li");
      taskItem.className = `taskItem ${task.completed ? "completed" : ""}`;
      taskItem.innerHTML = `
        <span>${task.title}</span>
        <div class="taskActions">
          <button class="editBtn" onclick="editTask(${index})">Edit</button>
          <button class="deleteBtn" onclick="deleteTask(${index})">Delete</button>
          <button onclick="toggleComplete(${index})">${task.completed ? "Undo" : "Complete"}</button>
        </div>
      `;
      taskList.appendChild(taskItem);
    });
  }
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = taskTitle.value.trim();

  if (title) {
    const newTask = {
      title,
      completed: false,
    };
    tasks.push(newTask); // Add task to the array
    renderTasks(); // Re-render the list
    taskForm.reset(); // Clear the form
  } else {
    alert("Task title is required!");
  }
});

function deleteTask(index) {
  tasks.splice(index, 1); // Remove task from the array
  renderTasks(); // Re-render the list
}

function editTask(index) {
  const task = tasks[index];
  const newTitle = prompt("Edit Task Title", task.title);

  if (newTitle !== null) {
    tasks[index] = {
      ...task,
      title: newTitle,
    };
    renderTasks(); // Re-render the list
  }
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed; // Toggle completion status
  renderTasks(); // Re-render the list
}

// Initial render
renderTasks();