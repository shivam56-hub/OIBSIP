const inputBox = document.getElementById("input");
const addBtn = document.getElementById("addBtn");
const filters = document.querySelectorAll(".filters span");
const clearBtn = document.getElementById("clearBtn");
const taskBox = document.querySelector(".task-box");

// Jab keyboard ke liya
inputBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

let todos = JSON.parse(localStorage.getItem("todos")) || [];
console.log(todos);
let editId;
let isEditTask = false;

const activeFilter = document.querySelector(".filters span.active").id;

function addTask() {
  const taskValue = inputBox.value.trim();

  if (taskValue === "") {
    alert("You must write something...");
    return;
  }

  if (isEditTask === false) {
    let taskInfo = {
      name: taskValue,
      status: "pending",
    };

    todos.push(taskInfo);
  } else {
    todos[editId].name = taskValue;

    isEditTask = false;
    editId = null;
    addBtn.innerHTML = "Add";
  }

  localStorage.setItem("todos", JSON.stringify(todos));
  showData("all");
  inputBox.value = "";
}
addBtn.addEventListener("click", () => {
  console.log("Button is clicked");
  addTask();
});

taskBox.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.tagName === "SPAN") {
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      const taskId = e.target.parentElement.dataset.id;
      todos.splice(taskId, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
      showData("all");
    }
  }
  if (e.target.type === "checkbox") {
    const taskId = e.target.dataset.id;
    if (e.target.checked) {
      todos[taskId].status = "completed";
    } else {
      todos[taskId].status = "pending";
    }
    localStorage.setItem("todos", JSON.stringify(todos));
    const activeFilter =
    document.querySelector(".filters span.active").id;
    showData(activeFilter);
  }
  if (e.target.tagName === "BUTTON") {
    const taskId = e.target.dataset.id;

    editId = taskId;
    isEditTask = true;

    inputBox.value = todos[taskId].name;
    addBtn.innerHTML = "Update";
  }
});

function showData(filter) {
  taskBox.innerHTML = "";
  todos.forEach((todo, index) => {
    if (filter === "all" || filter === todo.status) {
      let li = document.createElement("li");
      // li.innerHTML = todo.name;
      taskBox.append(li);
      li.dataset.id = index;

      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.dataset.id = index;
      checkbox.classList.add("todo-checkbox");
      li.append(checkbox);

      let taskName = document.createElement("p");
      taskName.innerHTML = todo.name;
      li.append(taskName);

      let editBtn = document.createElement("button");
      editBtn.innerHTML = "✏️"; //Edit button
      editBtn.classList.add("edit-btn");
      editBtn.dataset.id = index;
      li.append(editBtn);

      let span = document.createElement("span");
      span.innerHTML = "\u00d7"; // \u00d7  -> X
      li.append(span);

      if (todo.status === "completed") {
        checkbox.checked = true;
        taskName.classList.add("checked");
      }
    }
  });
  if (taskBox.children.length === 0) {
    let message = document.createElement("p");
    message.innerHTML = "No tasks found";
    taskBox.append(message);
  }

  if (todos.length === 0) {
    clearBtn.style.display = "none";
  } else {
    clearBtn.style.display = "block";
  }
}
showData("all");

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    console.log(filter.id);
    document.querySelector(".filters span.active").classList.remove("active");

    filter.classList.add("active");
    showData(filter.id);
  });
});

clearBtn.addEventListener("click", () => {
  const confirmDelete = confirm("Are you sure you want to delete all tasks?");
  if (confirmDelete) {
    todos.length = 0;
    localStorage.setItem("todos", JSON.stringify(todos));

    showData("all");
  }
});
